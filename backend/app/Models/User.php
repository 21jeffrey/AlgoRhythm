<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\DB;
use Hootlex\Friendships\Traits\Friendable;

class User extends Authenticatable implements MustVerifyEmail

{
    public function attemptedChallenges(){
        return $this->belongsToMany(Challenge::class, 'user_attempt_challenge')
        ->WithTimestamps()
        ->withPivot('attempted_at');
    }
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens, Friendable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar_image',
        'points',
        'current_streak',
        'last_activity_date',
        'email_verified_at',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    
public function sendPasswordResetNotification($token) {
    $this->notify(new \App\Notifications\ResetPasswordNotification($token));
}

public function badges()
{
    return $this->belongsToMany(\App\Models\Badge::class, 'learner_badge', 'learner_id', 'badge_id')
                ->using(\App\Models\LearnerBadge::class)
                ->withTimestamps()
                ->withPivot('awarded_at');
}

    public function updateStreak()
    {
        $today = now()->format('Y-m-d');
        $yesterday = now()->subDay()->format('Y-m-d');
        
        if (!$this->last_activity_date) {
            $this->current_streak = 1;
        } elseif ($this->last_activity_date === $today) {
            return;
        } elseif ($this->last_activity_date === $yesterday) {
            $this->current_streak += 1;
        } else {
            $this->current_streak = 1;
        }
        
        $this->last_activity_date = $today;
        $this->save();
    }
    
    public function awardEligibleBadges()
    {
        $unearnedBadges = Badge::whereNotIn('id', $this->badges()->pluck('badges.id'))->get();

        
        foreach ($unearnedBadges as $badge) {
            if ($this->meetsBadgeCriteria($badge)) {
                $this->badges()->attach($badge->id, ['awarded_at' => now()]);
            }
        }
    }
    
    public function meetsBadgeCriteria(Badge $badge)
    {
        switch ($badge->threshold_type) {
            case 'points':
                return $this->points >= $badge->threshold_value;
            case 'streak':
                return $this->current_streak >= $badge->threshold_value;
            default:
                return false;
        }
    }

public function leaderboard()
{
    $leaderboard = DB::table('leaderboard_learner')
        ->join('users', 'leaderboard_learner.learner_id', '=', 'users.id')
        ->orderByDesc('score')
        ->select('users.name', 'leaderboard_learner.score', 'leaderboard_learner.rank')
        ->get();

    return response()->json($leaderboard);
}

public function submissions()
{
    return $this->hasMany(Submission::class);
}

public function checkFriendStatus(Request $request)
{
    $user = $request->user(); // authenticated user
    $recipientId = $request->input('recipient_id');

    // Make sure this is a User model instance
    $recipient = User::findOrFail($recipientId);

    if ($user->isFriendWith($recipient)) {
        return response()->json(['status' => 'friends']);
    } else {
        return response()->json(['status' => 'not friends']);
    }
}
}
