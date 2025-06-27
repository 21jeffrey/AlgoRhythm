<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable

{
    public function attemptedChallenges(){
        return $this->belongsToMany(Challenge::class, 'user_attempt_challenge')
        ->WithTimestamps()
        ->withPivot('attempted_at');
    }
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

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
                ->withTimestamps()
                ->withPivot('awarded_at');
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

}
