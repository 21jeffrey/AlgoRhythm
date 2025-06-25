<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    public function index()
    {
        $leaderboard = DB::table('leaderboard_learner')
            ->join('users', 'leaderboard_learner.learner_id', '=', 'users.id')
            ->orderByDesc('score')
            ->select('users.name', 'leaderboard_learner.score', 'leaderboard_learner.rank')
            ->get();
            return response()->json($leaderboard);
    }
}
