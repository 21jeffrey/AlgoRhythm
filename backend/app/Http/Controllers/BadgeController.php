<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Badge;
use Illuminate\Support\Facades\Storage;


class BadgeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      return response()->json(Badge::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
            $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'threshold_type' => 'required|in:streak,points',
            'threshold_value' => 'required|integer|min:1',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('badges', 'public');
        }

        $badge = Badge::create($validated);

        return response()->json($badge, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $badge = Badge::findOrFail($id);
        return response()->json($badge);
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
    public function update(Request $request, string $id)
{
    $badge = Badge::findOrFail($id);

    $validated = $request->validate([
        'name' => 'sometimes|required|string|max:255',
        'description' => 'sometimes|required|string',
        'threshold_type' => 'sometimes|required|in:streak,points',
        'threshold_value' => 'sometimes|required|integer|min:1',
        'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
    ]);

    // Handle image replacement if provided
    if ($request->hasFile('image')) {
        if ($badge->image && Storage::disk('public')->exists($badge->image)) {
            Storage::disk('public')->delete($badge->image);
        }
        $validated['image'] = $request->file('image')->store('badges', 'public');
    }

    $badge->update($validated);

    return response()->json($badge, 200);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $badge = Badge::findOrFail($id);

        if ($badge->image) {
            Storage::disk('public')->delete($badge->image);
        }

        $badge->delete();

        return response()->json(['message' => 'Badge deleted']);
    }
    
}
