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
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\Auth\VerificationController;
use App\Http\Controllers\FriendController;

Route::apiResource('challenges', ChallengeController::class);
Route::get('challenges/{challenge}/subproblems', [ChallengeController::class, 'subproblemIndex']);
Route::post('challenges/{challenge}/subproblems', [ChallengeController::class, 'subproblemStore']);
Route::put('challenges/{challenge}/subproblems/{subproblem}', [ChallengeController::class, 'subproblemUpdate']);
Route::delete('challenges/{challenge}/subproblems/{subproblem}', [ChallengeController::class, 'subproblemDestroy']);

Route::get('/users/search', [UserController::class, 'search']);
Route::apiResource('users', UserController::class);
Route::get('/leaderboard', [LeaderboardController::class, 'index']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [NewPasswordController::class, 'store']);
Route::post('/admin/register', [AdminController::class, 'register']);
Route::post('/admin/login', [AdminController::class, 'login']);
Route::get('/analytics', [AnalyticsController::class, 'index']);



Route::middleware('auth:sanctum')->group(function () {
    // for seeing the attempted challenges
    Route::get('/user/attempted-challenges',[AuthController::class , 'attemptedChallenges']);

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

    // For email verification

    Route::post('/email/verification-notification', [VerificationController::class, 'resend'])
        ->middleware(['auth:sanctum'])
        ->name('verification.send');
    
    
    
    // For friend requests and management
    Route::post('/friend-request', [FriendController::class, 'send']);
    Route::post('/friend-request/{senderId}/accept', [FriendController::class, 'accept']);
    Route::post('/friend-request/{senderId}/reject', [FriendController::class, 'reject']);
    Route::delete('/friend/{friendId}', [FriendController::class, 'remove']);
    Route::get('/friends', [FriendController::class, 'listFriends']);
    Route::get('/friend-requests/incoming', [FriendController::class, 'incomingRequests']);
    Route::get('/friend-requests/sent', [FriendController::class, 'sentRequests']);


});

Route::get('/email/verify/{id}/{hash}', [VerificationController::class, 'verify'])
    //->middleware(['signed', 'throttle:6,1'])  
    ->name('verification.verify');
    

Route::apiResource('badges', BadgeController::class);

