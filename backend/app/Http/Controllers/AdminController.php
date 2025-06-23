<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|max:255|unique:admins',
            'email'    => 'required|string|email|max:255|unique:admins',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $admin = Admin::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'Admin registered successfully',
            'admin'   => $admin,
        ]);
    }

public function login(Request $request)
{
    $request->validate([
        'email'    => 'required|email',
        'password' => 'required|min:8',
    ]);

    $admin = \App\Models\Admin::where('email', $request->email)->first();

    if (!$admin || !\Hash::check($request->password, $admin->password)) {
        return response()->json([
            'status'  => false,
            'message' => 'Invalid credentials',
        ], 401);
    }

    $token = $admin->createToken('admin-token')->plainTextToken;

    return response()->json([
        'status'  => true,
        'message' => 'Login successful',
        'admin'   => $admin,
        'token'   => $token,
    ]);
}

    public function logout(Request $request)
    {
        $admin = Auth::guard('admin')->user();
        $admin->tokens()->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Logged out successfully',
        ]);
    }

    public function profile(Request $request)
    {
    return response()->json([
        'status' => true,
        'admin'  => $request->user(),
    ]);
    }
}