<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;
use App\Http\Controllers\Controller;

class VerificationController extends Controller
{
public function verify(Request $request, $id, $hash)
{
    $user = \App\Models\User::findOrFail($id);
     \Log::info('Verifying', ['id' => $id, 'hash' => $hash, 'query' => $request->query()]);

if (!hash_equals(sha1($user->getEmailForVerification()), (string) $hash)) {
        return redirect(env('FRONTEND_URL') . '/verify/success?message=invalid_link');
    }
    if ($user->hasVerifiedEmail()) {
        return redirect(env('FRONTEND_URL') . '/verify/success?message=already_verified');
    }
    
    if ($user->markEmailAsVerified()) {
        event(new Verified($user));
    }
    
    return redirect(env('FRONTEND_URL') . '/verify/success');
}

    public function resend(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified']);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json(['message' => 'Verification email resent']);
    }

    
}
