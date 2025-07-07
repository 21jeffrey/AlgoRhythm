<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class FriendController extends Controller
{
    public function send(Request $request)
    {
        $user = $request->user();
        $nameOrEmail = $request->input('name');

        $receiver = User::where('name', $nameOrEmail)
                        ->orWhere('email', $nameOrEmail)
                        ->first();

        if (!$receiver) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if ($user->id === $receiver->id) {
            return response()->json(['message' => 'You cannot send a friend request to yourself'], 400);
        }

        if ($user->hasSentFriendRequestTo($receiver)) {
            return response()->json(['message' => 'Friend request already sent'], 409);
        }

        $user->befriend($receiver);

        return response()->json(['message' => 'Friend request sent']);
    }

    public function accept(Request $request, $senderId)
    {
        $user = $request->user();
        $sender = User::findOrFail($senderId);

        $user->acceptFriendRequest($sender);

        return response()->json(['message' => 'Friend request accepted']);
    }

    public function reject(Request $request, $senderId)
    {
        $user = $request->user();
        $sender = User::findOrFail($senderId);

        $user->denyFriendRequest($sender);

        return response()->json(['message' => 'Friend request rejected']);
    }

    public function remove(Request $request, $friendId)
    {
        $user = $request->user();
        $friend = User::findOrFail($friendId);

        $user->unfriend($friend);

        return response()->json(['message' => 'Friend removed']);
    }

    public function listFriends(Request $request)
    {
        $user = $request->user();

        return response()->json($user->getFriends());
    }

 public function incomingRequests(Request $request)
{
    $user = $request->user();

    $requests = $user->getFriendRequests()->map(function ($friendship) {
        $sender = User::find($friendship->sender_id);
        return [
            'id' => $friendship->id,
            'sender_id' => $sender->id,
            'sender_name' => $sender->name,
            'sender_email' => $sender->email,
            'created_at' => $friendship->created_at,
            'status' => $friendship->status,
        ];
    });

    return response()->json($requests);
}


public function sentRequests(Request $request)
{
    $user = $request->user();

    $requests = $user->getPendingFriendships()->map(function ($friendship) {
        $recipient = User::find($friendship->recipient_id);
        return [
            'id' => $friendship->id,
            'recipient_id' => $recipient->id,
            'recipient_name' => $recipient->name,
            'recipient_email' => $recipient->email,
            'created_at' => $friendship->created_at,
            'status' => $friendship->status,
        ];
    });

    return response()->json($requests);
}

}
