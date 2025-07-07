// components/challenges/SubproblemInfo.jsx
'use client';
import React from 'react';
import FeedbackPanel from './FeedbackPanel';
import HistoryPanel from './HistoryPanel';

export default function SubproblemInfo({
  subproblem,
  currentIndex,
  total,
  selectedTab,
  setSelectedTab,
  showHint,
  toggleHint,
  feedback,
  submissionHistory,
  isLoadingHistory,
  isProcessing,
  currentSubmissionId,
  onPrev, // Add these as props
  onNext
}) {
  // Parse test cases
  const testCases = Array.isArray(subproblem?.test_cases) 
    ? subproblem.test_cases 
    : JSON.parse(subproblem?.test_cases || '[]');

  return (
    <div className="w-full lg:w-[40%] border-r flex flex-col">
        <h1 className="text-2xl font-bold mb-4">{subproblem.title}</h1>
        
        <div className="flex items-center px-4 py-2 text-purple-800 border-b bg-base-100">
        <button
          className={`btn btn-sm btn-outline mr-2${currentIndex === 0 ? ' text-gray-400 cursor-not-allowed' : ''} cursor-pointer`}
          onClick={onPrev}
          disabled={currentIndex === 0}
          type="button"
        >
          Previous
        </button>
        <span className="text-sm text-gray-500 font-medium flex-1 text-center">
          {`Subproblem ${currentIndex + 1} of ${total}`}
        </span>
        <button
          className={`btn btn-sm btn-outlinex${currentIndex === total - 1 ? ' text-gray-400 cursor-not-allowed' : ''} cursor-pointer`}
          onClick={onNext}
          disabled={currentIndex === total - 1} 
          type="button"
        >
          Next
        </button>
      </div>
      
      

      <div className="tabs tabs-boxed  bg-base-100 p-2 ">
        
        <button
          className={`tab ${selectedTab === 'description' ? 'tab-active' : ''} p-5 text-purple-700 cursor-pointer`}
          onClick={() => setSelectedTab('description')}
        >
          Description
        </button>
        <button
          className={`tab ${selectedTab === 'feedback' ? 'tab-active' : ''} p-5 text-purple-700 cursor-pointer`}
          onClick={() => setSelectedTab('feedback')}
        >
          Feedback
        </button>
        <button
          className={`tab ${selectedTab === 'history' ? 'tab-active' : ''} p-5 text-purple-700 cursor-pointer`}
          onClick={() => setSelectedTab('history')}
        >
          History
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {selectedTab === 'description' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold mb-2">{subproblem.title}</h2>
              <div 
                className="prose max-w-none mb-4" 
                dangerouslySetInnerHTML={{ __html: subproblem.description }} 
              />
            </div>

            {/* Hint button */}
            <div className="mb-4">
              <button 
                className="cursor-pointer bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                onClick={toggleHint}
              >
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              {showHint && (
                <div className="mt-3 p-3 text-purple-800 bg-yellow-50 border-l-4 border-yellow-400">
                  <p className="whitespace-pre-wrap">{subproblem.hint}</p>
                </div>
              )}
            </div>

            {/* Test Cases Section */}
            <div>
              <h3 className="text-lg font-bold mb-3">Test Cases</h3>
              <div className="space-y-3">
                {testCases.map((testCase, index) => (
                  <div key={index} className="border rounded-lg p-3 bg-purple-800">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-1">Input:</h4>
                        <pre className="bg-gray-800 text-gray-100 p-2 rounded text-sm overflow-auto">
                          {typeof testCase.input === 'string' 
                            ? testCase.input 
                            : JSON.stringify(testCase.input)}
                        </pre>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Expected Output:</h4>
                        <pre className="bg-gray-800 text-gray-100 p-2 rounded text-sm overflow-auto">
                          {typeof testCase.output === 'string' 
                            ? testCase.output 
                            : JSON.stringify(testCase.output)}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {selectedTab === 'feedback' && (
          <FeedbackPanel 
            feedback={feedback} 
            isProcessing={isProcessing}
            submissionId={currentSubmissionId}
          />
        )}
        
        {selectedTab === 'history' && (
          <HistoryPanel 
            history={submissionHistory} 
            isLoading={isLoadingHistory}
          />
        )}
      </div>
    </div>
  );
}