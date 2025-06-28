<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Http;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Models\Submission;

class ProcessSubmissionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $submission;

    public function __construct(Submission $submission)
    {
        $this->submission = $submission;
    }

    public function handle(): void
    {
        $subproblem = $this->submission->subproblem;
        $testCases = is_array($subproblem->test_cases)
            ? $subproblem->test_cases
            : json_decode($subproblem->test_cases, true);

        $languageMap = [
            'python' => 71,
            'javascript' => 63,
            'java' => 62,
        ];

        $languageId = $languageMap[$this->submission->language] ?? 71;
        $case = $testCases[0]; // Only first test case

        $input = $this->normalizeData($case['input']);
        $expectedOutput = $this->normalizeData($case['output']);

        $response = Http::withHeaders([
            'X-RapidAPI-Key' => env('RAPIDAPI_KEY'),
            'X-RapidAPI-Host' => 'judge0-ce.p.rapidapi.com',
        ])->post('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true', [
            'source_code' => $this->submission->code,
            'language_id' => $languageId,
            'stdin' => $input,
            'expected_output' => $expectedOutput,
        ]);

        $result = $response->json();
        $this->updateSubmission($result);
    }

    protected function normalizeData($data)
    {
        if (is_array($data)) {
            return implode(' ', $data);
        }

        if (is_string($data)) {
            // Remove surrounding quotes if present
            $trimmed = trim($data, '"\'');
            
            // Try to decode as JSON
            $decoded = json_decode($trimmed, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                return implode(' ', $decoded);
            }

            // Handle array-like strings directly
            if (preg_match('/^\[.*\]$/', $trimmed)) {
                $inside = trim($trimmed, '[]');
                $parts = array_map('trim', explode(',', $inside));
                return implode(' ', $parts);
            }
            
            return $trimmed;
        }

        return $data;
    }

    protected function updateSubmission($result)
    {
        $passed = $result['status']['id'] === 3;
        $time = $result['time'] ?? 0;
        $memory = $result['memory'] ?? 0;

        $baseScore = $passed ? 5 : 0;
        $timeBonus = $time <= 1.0 ? 2 : ($time <= 2.0 ? 1 : 0);
        $memoryBonus = $memory <= 50000 ? 3 : ($memory <= 100000 ? 1 : 0);
        $finalScore = $baseScore + $timeBonus + $memoryBonus;

        $this->submission->update([
            'passed' => $passed,
            'score' => $finalScore,
            'output' => json_encode([$result]),
            'execution_time' => $time,
            'memory' => $memory,
        ]);

        if ($this->submission->user) {
            $this->submission->user->increment('points', $finalScore);
            $this->submission->user->updateStreak();

            $this->submission->user->awardEligibleBadges();
            
        }
    }
}