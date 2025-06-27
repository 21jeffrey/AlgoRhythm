<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function attemptedChallenges(Request $request){
        $user = $request->user();
        $challenges= $user->attemptedChallenges()->get();
        return response()->json($challenges);
    }
    public function index()
    {
        return response()->json(User::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function addFriend(Request $request)
    {
        $user= $request->user();
        $user->friends()->attach($FriendId);
        return response()->json(['message'=> 'Friend Added']);
    }
    public function removeFriend(Request $request , $FriendId)
{
    $user = $request->user();
    $user->friends()->detach($FriendId);
    return response()->json(['message'=> 'Friend Removed']);
}
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function search(Request $request)
    {
        $query = $request->input('query');
        $users = User::where('name','like', "%query")
        ->orWhere('email','like', "%query")
        ->get(['id', 'name', 'avatar_image']);
        return response()->json($users);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);

        if ($user->avatar_image) {
            Storage::disk('public')->delete($user->avatar_image);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted']);
    }
}
