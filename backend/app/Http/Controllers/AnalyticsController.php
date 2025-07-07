<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Challenge;
use App\Models\Badge;
use App\Models\LearnerBadge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AnalyticsController extends Controller
{
       public function index()
    {
        // 1. New registrations by month (last 6 months)
        $registrations = User::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count')
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // 2. Top users by points and streak
        $topUsers = User::select('id', 'name', 'points', 'current_streak')
            ->orderByDesc('points')
            ->take(5)
            ->get();

        // 3. Total challenges
        $totalChallenges = Challenge::count();

        // 4. Most earned badges
        $topBadges = LearnerBadge::select('badge_id', DB::raw('count(*) as count'))
            ->groupBy('badge_id')
            ->orderByDesc('count')
            ->with('badge:id,name')
            ->take(5)
            ->get()
            ->map(function ($item) {
                return [
                    'badge_name' => $item->badge->name ?? 'Unknown',
                    'count' => $item->count,
                ];
            });

        return response()->json([
            'registrations_over_time' => $registrations,
            'top_users' => $topUsers,
            'total_challenges' => $totalChallenges,
            'most_earned_badges' => $topBadges,
        ]);
    }
}
