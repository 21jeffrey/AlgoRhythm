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
        $hasRuntimeError = false;
        $hasCompileError = false;

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
            
            // Check status and determine if test passed
            $statusId = $result['status']['id'] ?? 0;
            $statusDesc = $result['status']['description'] ?? '';
            
            // Judge0 status IDs: 3=Accepted, 4=Wrong Answer, 5=Time Limit Exceeded, 
            // 6=Compile Error, 7=Runtime Error (SIGSEGV), 8=Runtime Error (SIGXFSZ), 
            // 9=Runtime Error (SIGFPE), 10=Runtime Error (SIGABRT), 11=Runtime Error (NZEC), 
            // 12=Runtime Error (Other), 13=Internal Error, 14=Exec Format Error
            
            $testPassed = ($statusId === 3); // Only status 3 is "Accepted"
            $result['test_passed'] = $testPassed;
            
            // Track different types of errors
            if ($statusId === 6) {
                $hasCompileError = true;
            } elseif (in_array($statusId, [7, 8, 9, 10, 11, 12])) {
                $hasRuntimeError = true;
            }
            
            $allResults[] = $result;

            if ($testPassed) {
                $passedCount++;
            } else {
                $allPassed = false;
            }

            // Only accumulate time and memory for successful executions
            if ($statusId === 3 || $statusId === 4) { // Accepted or Wrong Answer
                $totalTime += $result['time'] ?? 0;
                $totalMemory = max($totalMemory, $result['memory'] ?? 0);
            }
        }

        // Determine overall status
        $overallStatus = $this->determineOverallStatus($allPassed, $hasCompileError, $hasRuntimeError, $allResults);

        // Create a summary result
        $summaryResult = [
            'status' => ['description' => $overallStatus],
            'time' => count($testCases) > 0 ? $totalTime / count($testCases) : 0,
            'memory' => $totalMemory,
            'all_test_results' => $allResults,
            'passed_count' => $passedCount,
            'total_count' => count($testCases),
            'all_passed' => $allPassed,
            'has_runtime_error' => $hasRuntimeError,
            'has_compile_error' => $hasCompileError
        ];

        $this->updateSubmission($summaryResult);
    }

    protected function determineOverallStatus($allPassed, $hasCompileError, $hasRuntimeError, $allResults)
    {
        if ($hasCompileError) {
            return 'Compilation Error';
        }
        
        if ($hasRuntimeError) {
            return 'Runtime Error';
        }
        
        if ($allPassed) {
            return 'Accepted';
        }
        
        // Check for other specific errors
        foreach ($allResults as $result) {
            $statusId = $result['status']['id'] ?? 0;
            $statusDesc = $result['status']['description'] ?? '';
            
            if ($statusId === 5) {
                return 'Time Limit Exceeded';
            }
            if ($statusId === 13) {
                return 'Internal Error';
            }
            if ($statusId === 14) {
                return 'Exec Format Error';
            }
        }
        
        return 'Wrong Answer';
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
                'final_score' => $finalScore,
                'overall_status' => $result['status']['description'] ?? 'Unknown',
                'has_runtime_error' => $result['has_runtime_error'] ?? false,
                'has_compile_error' => $result['has_compile_error'] ?? false
            ],
            'test_cases' => []
        ];

        // Format each test case result for better readability
        foreach ($result['all_test_results'] ?? [] as $testResult) {
            $statusId = $testResult['status']['id'] ?? 0;
            $statusDesc = $testResult['status']['description'] ?? 'Unknown';
            
            $testCaseData = [
                'test_case' => $testResult['test_case_index'] ?? 0,
                'status' => $statusDesc,
                'status_id' => $statusId,
                'passed' => $testResult['test_passed'] ?? false,
                'time' => $testResult['time'] ?? 0,
                'memory' => $testResult['memory'] ?? 0,
                'input' => $testResult['test_case_input'] ?? '',
                'expected_output' => $testResult['test_case_expected'] ?? '',
                'actual_output' => $testResult['stdout'] ?? '',
                'error' => $testResult['stderr'] ?? null,
                'compile_output' => $testResult['compile_output'] ?? null
            ];
            
            // Add more detailed error information if available
            if ($statusId === 6 && !empty($testResult['compile_output'])) {
                $testCaseData['error_detail'] = $testResult['compile_output'];
            } elseif (in_array($statusId, [7, 8, 9, 10, 11, 12]) && !empty($testResult['stderr'])) {
                $testCaseData['error_detail'] = $testResult['stderr'];
            }
            
            $detailedOutput['test_cases'][] = $testCaseData;
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