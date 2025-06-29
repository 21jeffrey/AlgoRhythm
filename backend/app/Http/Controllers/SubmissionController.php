<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use App\Models\Subproblem;
use Illuminate\Http\Request;
use App\Jobs\ProcessSubmissionJob as EvaluateCodeWithJudge0;
use Illuminate\Support\Facades\Auth;

class SubmissionController extends Controller
{
    /**
     * Store a new code submission and dispatch Judge0 job.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'subproblem_id' => 'required|exists:subproblems,id',
            'code' => 'required|string',
            'language' => 'required|string',
        ]);

        $submission = Submission::create([
            'user_id' => Auth::id(),
            'subproblem_id' => $validated['subproblem_id'],
            'code' => $validated['code'],
            'language' => $validated['language'],
            'passed' => false, // Default until Judge0 updates it
            'score' => 0,
        ]);

        // Dispatch the Judge0 evaluation job
        EvaluateCodeWithJudge0::dispatch($submission);

        return response()->json([
            'message' => 'Submission created and queued for evaluation.',
            'submission_id' => $submission->id
        ], 201);
    }

    /**
     * Show a specific submission.
     */
public function show($id)
{
    $submission = Submission::with(['subproblem', 'user'])->findOrFail($id);

    if ($submission->user_id !== Auth::id()) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    return response()->json($submission);
}

    /**
     * List all submissions of the current user.
     */
public function mySubmissions(Request $request)
{
    $query = Submission::where('user_id', Auth::id())
        ->with('subproblem')
        ->orderBy('created_at', 'desc');

    // Add condition if parameter exists
    if ($request->has('subproblem_id')) {
        $request->validate([
            'subproblem_id' => 'integer|exists:subproblems,id'
        ]);
        $query->where('subproblem_id', $request->subproblem_id);
    }

    return response()->json($query->get());
}
}
