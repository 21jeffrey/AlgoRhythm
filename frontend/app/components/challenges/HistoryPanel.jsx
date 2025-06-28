// components/challenges/HistoryPanel.jsx
'use client';
import React from 'react';

export default function HistoryPanel({ history, isLoading }) {
  if (isLoading) {
    return (
      <div className="p-4">
        <h3 className="font-semibold mb-2">Loading History...</h3>
        <div className="flex items-center space-x-2">
          <div className="animate-pulse rounded-full bg-blue-400 h-4 w-4"></div>
          <div className="animate-pulse rounded-full bg-blue-400 h-4 w-4 delay-100"></div>
          <div className="animate-pulse rounded-full bg-blue-400 h-4 w-4 delay-200"></div>
          <span className="text-gray-600">Fetching submissions</span>
        </div>
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="p-4">
        <h3 className="font-semibold mb-2">Submission History</h3>
        <p>No submissions found for this problem.</p>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Truncate code for display
  const truncateCode = (code, maxLength = 50) => {
    if (code.length <= maxLength) return code;
    return code.substring(0, maxLength) + '...';
  };

  return (
    <div className="p-4">
      <h3 className="font-semibold mb-4 text-lg">Submission History</h3>
      
      <div className="space-y-3">
        {history.map((submission, index) => (
          <div 
            key={submission.id} 
            className="border border-gray-300 rounded-lg p-3 bg-violet-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-gray-900">
                    Submission #{history.length - index}
                    {index === 0 && (
                      <span className="ml-2 badge badge-primary badge-xs">Latest</span>
                    )}
                  </div>
                  <span className={`badge ${submission.passed ? 'badge-success' : 'badge-error'}`}>
                    {submission.passed ? 'Passed' : 'Failed'}
                  </span>
                </div>
                
                <div className="mb-2">
                  <p className="text-xs text-gray-300 mb-1">
                    {formatDate(submission.created_at)}
                  </p>
                  
                  <div className="flex gap-2 text-xs">
                    <div className="bg-gray-800 px-2 py-1 rounded">
                      <span className="font-medium">Language:</span> {submission.language}
                    </div>
                    <div className="bg-gray-800 px-2 py-1 rounded">
                      <span className="font-medium">Time:</span> {submission.execution_time}s
                    </div>
                    <div className="bg-gray-800 px-2 py-1 rounded">
                      <span className="font-medium">Memory:</span> {submission.memory} KB
                    </div>
                    <div className="bg-gray-800 px-2 py-1 rounded">
                      <span className="font-medium">Score:</span> {submission.score}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-2">
              <p className="text-xs font-medium text-gray-300 mb-1">Code:</p>
              <pre className="bg-gray-800 text-gray-100 p-2 rounded text-xs overflow-auto">
                {(submission.code)}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}