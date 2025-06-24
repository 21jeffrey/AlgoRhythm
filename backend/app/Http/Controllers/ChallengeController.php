<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Challenge;
use App\Models\Subproblem;

class ChallengeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Challenge::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'difficulty' => 'required|in:beginner,intermediate,advanced',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('challenges', 'public');
        }

        $challenge = Challenge::create($validated);

        return response()->json($challenge, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $challenge = Challenge::findOrFail($id);
        return response()->json($challenge);
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
        $challenge = Challenge::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'difficulty' => 'required|in:beginner,intermediate,advanced',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($challenge->image) {
                Storage::disk('public')->delete($challenge->image);
            }
            $validated['image'] = $request->file('image')->store('challenges', 'public');
        }

        $challenge->update($validated);

        return response()->json($challenge, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $challenge = Challenge::findOrFail($id);
        if ($challenge->image) {
            Storage::disk('public')->delete($challenge->image);
        }
        $challenge->delete();

        return response()->json([
            'status' => true,
            'message' => 'Challenge deleted successfully',
        ]);
    }

    public function subproblemIndex($challengeId)
    {
        $challenge = Challenge::with('subproblems')->findOrFail($challengeId);
        return response()->json($challenge->subproblems);
    }

    public function subproblemStore(Request $request, $challengeId)
    {
        $challenge = Challenge::findOrFail($challengeId);

        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
        ]);

        $subproblem = $challenge->subproblems()->create($validated);

        return response()->json($subproblem, 201);
    }

    public function subproblemUpdate(Request $request, Subproblem $subproblem)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
        ]);

        $subproblem->update($validated);

        return response()->json($subproblem);
    }

    public function subproblemDestroy(Subproblem $subproblem)
    {
        $subproblem->delete();

        return response()->json([
            'status' => true,
            'message' => 'Subproblem deleted successfully',
        ]);
    }
}
