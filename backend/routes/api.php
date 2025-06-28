<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\BadgeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ChallengeController;
use App\Http\Controllers\LeaderboardController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\SubmissionController;

Route::apiResource('challenges', ChallengeController::class);
Route::get('challenges/{challenge}/subproblems', [ChallengeController::class, 'subproblemIndex']);
Route::post('challenges/{challenge}/subproblems', [ChallengeController::class, 'subproblemStore']);
Route::put('challenges/{challenge}/subproblems/{subproblem}', [ChallengeController::class, 'subproblemUpdate']);
Route::delete('challenges/{challenge}/subproblems/{subproblem}', [ChallengeController::class, 'subproblemDestroy']);

Route::apiResource('users', UserController::class);
Route::get('/leaderboard', [LeaderboardController::class, 'index']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [NewPasswordController::class, 'store']);
Route::post('/admin/register', [AdminController::class, 'register']);
Route::post('/admin/login', [AdminController::class, 'login']);




Route::middleware('auth:sanctum')->group(function () {
    // For regular users
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/user/logout', [AuthController::class, 'logout']);

    // For admins
    Route::get('/admin/profile', [AdminController::class, 'profile']);
    Route::post('/admin/logout', [AdminController::class, 'logout']);
    
    // For user badges
    Route::get('/my-badges', [BadgeController::class, 'myBadges']);
    Route::get('/badges/new', [BadgeController::class, 'newBadges']);
    Route::get('/badges/new/count', [BadgeController::class, 'newBadgeCount']);

    // For user submissions
    Route::post('/submissions', [SubmissionController::class, 'store']);
    Route::get('/submissions/mine', [SubmissionController::class, 'mySubmissions']);
    Route::get('/submissions/{id}', [SubmissionController::class, 'show']);
});

Route::apiResource('badges', BadgeController::class);

/*Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');*/
