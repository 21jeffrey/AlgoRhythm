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
        
        $allResults = [];
        $allPassed = true;
        $totalTime = 0;
        $totalMemory = 0;
        $passedCount = 0;

        // Loop through all test cases
        foreach ($testCases as $index => $case) {
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
            
            // Add test case information to result
            $result['test_case_index'] = $index + 1;
            $result['test_case_input'] = $input;
            $result['test_case_expected'] = $expectedOutput;
            
            // Check if this test case passed
            $statusDesc = $result['status']['description'] ?? '';
            $testPassed = ($statusDesc === 'Accepted');
            $result['test_passed'] = $testPassed;
            
            $allResults[] = $result;

            if ($testPassed) {
                $passedCount++;
            } else {
                $allPassed = false;
            }

            // Accumulate time and memory
            $totalTime += $result['time'] ?? 0;
            $totalMemory = max($totalMemory, $result['memory'] ?? 0);
        }

        // Create a summary result
        $summaryResult = [
            'status' => ['description' => $allPassed ? 'Accepted' : 'Wrong Answer'],
            'time' => count($testCases) > 0 ? $totalTime / count($testCases) : 0, // Average time
            'memory' => $totalMemory, // Max memory used
            'all_test_results' => $allResults,
            'passed_count' => $passedCount,
            'total_count' => count($testCases),
            'all_passed' => $allPassed
        ];

        $this->updateSubmission($summaryResult);
    }

protected function normalizeData($data)
{
    // Handle empty arrays
    if (is_array($data) && empty($data)) {
        return ''; // Return empty string for empty arrays
    }
    
    if (is_array($data)) {
        return implode(' ', $data);
    }

    if (is_string($data)) {
        // Remove surrounding quotes if present
        $trimmed = trim($data, '"\'');
        
        // Try to decode as JSON
        $decoded = json_decode($trimmed, true);
        if (json_last_error() === JSON_ERROR_NONE) {
            if (is_array($decoded)) {
                // Handle empty decoded arrays
                if (empty($decoded)) {
                    return '';
                }
                return implode(' ', $decoded);
            }
        }

        // Handle array-like strings directly
        if (preg_match('/^\[\s*\]$/', $trimmed)) {
            return ''; // Empty array string
        }
        
        if (preg_match('/^\[.*\]$/', $trimmed)) {
            $inside = trim($trimmed, '[]');
            if (trim($inside) === '') {
                return ''; // Empty array content
            }
            $parts = array_map('trim', explode(',', $inside));
            return implode(' ', $parts);
        }
        
        return $trimmed;
    }

    return $data;
}

    protected function updateSubmission($result)
    {
        $passed = $result['all_passed'] ?? false;
        $time = $result['time'] ?? 0;
        $memory = $result['memory'] ?? 0;
        $finalScore = 0;

        if ($passed) {
            $baseScore = 5;
            $timeBonus = $time <= 1.0 ? 2 : ($time <= 2.0 ? 1 : 0);
            $memoryBonus = $memory <= 50000 ? 3 : ($memory <= 100000 ? 1 : 0);
            $finalScore = $baseScore + $timeBonus + $memoryBonus;
        }

        // Create detailed output with individual test case results
        $detailedOutput = [
            'summary' => [
                'passed' => $passed,
                'passed_count' => $result['passed_count'] ?? 0,
                'total_count' => $result['total_count'] ?? 0,
                'average_time' => $time,
                'max_memory' => $memory,
                'final_score' => $finalScore
            ],
            'test_cases' => []
        ];

        // Format each test case result for better readability
        foreach ($result['all_test_results'] ?? [] as $testResult) {
            $detailedOutput['test_cases'][] = [
                'test_case' => $testResult['test_case_index'] ?? 0,
                'status' => $testResult['status']['description'] ?? 'Unknown',
                'passed' => $testResult['test_passed'] ?? false,
                'time' => $testResult['time'] ?? 0,
                'memory' => $testResult['memory'] ?? 0,
                'input' => $testResult['test_case_input'] ?? '',
                'expected_output' => $testResult['test_case_expected'] ?? '',
                'actual_output' => $testResult['stdout'] ?? '',
                'error' => $testResult['stderr'] ?? null,
                'compile_output' => $testResult['compile_output'] ?? null
            ];
        }

        $this->submission->update([
            'passed' => $passed,
            'score' => $finalScore,
            'output' => json_encode($detailedOutput),
            'execution_time' => $time,
            'memory' => $memory,
        ]);

        if ($passed && $this->submission->user) {
            $this->submission->user->increment('points', $finalScore);
            $this->submission->user->updateStreak();
            $this->submission->user->awardEligibleBadges();
        }
    }
}