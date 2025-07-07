<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'          => 'required|string|max:255|unique:users',
            'email'         => 'required|string|email|max:255|unique:users',
            'password'      => 'required|string|min:8|confirmed',
            'avatar_image'  => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $imagePath = null;
        if ($request->hasFile('avatar_image')) {
            $imagePath = $request->file('avatar_image')->store('user_avatars', 'public');
        }

        $user = User::create([
            'name'          => $request->name,
            'email'         => $request->email,
            'password'      => Hash::make($request->password),
            'avatar_image'  => $imagePath,
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'User registered successfully',
            'user'    => $user,
        ]);
    }

    public function login(Request $request)
{
    $request->validate([
        'email'    => 'required|string|email',
        'password' => 'required|string|min:8',
    ]);

    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json([
            'status' => false,
            'message' => 'Invalid credentials',
        ], 401);
    }

    $user = Auth::user();
    $token = $user->createToken('authToken')->plainTextToken;

    return response()->json([
        'status' => true,
        'message' => 'Login successful',
        'token' => $token,
        'user' => $user,
        'is_verified' => $user->hasVerifiedEmail(),
    ]);
}


    public function profile(){
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }


        return response()->json([
            'status' => true,
            'user' => $user,
            
        ]);

        
    }
    
    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => true,
            'message' => 'User logged out successfully',
        ]);
    }

public function addFriend(Request $request)
{
    $user = $request->user();
    $friendId = $request->input('friend_id');

    if (!$friendId || $friendId == $user->id) {
        return response()->json(['message' => 'Invalid friend ID'], 400);
    }

    // Prevent duplicates
    if ($user->friends()->where('friend_id', $friendId)->exists()) {
        return response()->json(['message' => 'Already friends'], 409);
    }

    $user->friends()->attach($friendId);

    return response()->json(['message' => 'Friend added']);
}


    public function removeFriend(Request $request , $FriendId)
{
    $user = $request->user();
    $user->friends()->detach($FriendId);
    if (!$user->friends()->where('friend_id', $FriendId)->exists()) {
        return response()->json(['message' => 'Friend not found'], 404);
    }
    return response()->json(['message'=> 'Friend Removed']);
}

    public function attemptedChallenges(Request $request)
    {
        $user = $request->user();
        $attemptedChallenges = $user->attemptedChallenges()->get();

        return response()->json([
            'status' => true,
            'attemptedChallenges' => $attemptedChallenges,
        ]);
    }

    
}
