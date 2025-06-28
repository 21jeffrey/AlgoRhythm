// components/challenges/FeedbackPanel.jsx
'use client';
import { useEffect, useState } from 'react';

export default function FeedbackPanel({ 
  feedback, 
  subproblem,
  isProcessing,
  submissionId 
}) {
  if (isProcessing) {
    return (
      <div className="p-4">
        <h3 className="font-semibold mb-2">Evaluating Submission...</h3>
        <div className="flex items-center space-x-2">
          <div className="animate-pulse rounded-full bg-blue-400 h-4 w-4"></div>
          <div className="animate-pulse rounded-full bg-blue-400 h-4 w-4 delay-100"></div>
          <div className="animate-pulse rounded-full bg-blue-400 h-4 w-4 delay-200"></div>
          <span className="text-gray-600">Processing your code</span>
        </div>
      </div>
    );
  }

  if (!feedback || !feedback.outputs) {
    return (
      <div className="p-4">
        <h3 className="font-semibold mb-2">Submission Feedback</h3>
        <p>No feedback available yet for this submission.</p>
        {submissionId && (
          <p className="text-sm text-gray-500 mt-2">
            Submission ID: {submissionId}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 text-sm">
      <h3 className="font-semibold mb-4 text-lg">Submission Feedback</h3>
      
      {/* Summary Section */}
      <div className={`p-4 rounded-lg mb-6 ${feedback.passed ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-gray-500 text-lg">
              <span className="ml-2 text-gray-700">Score: {feedback.score}</span>
            </p>
            <div className="mt-1">
              <span className="text-gray-600">Time: {feedback.time}s</span>
              <span className="mx-2">|</span>
              <span className="text-gray-600">Memory: {feedback.memory} KB</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full ${feedback.passed ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {feedback.passed ? 'Success' : 'Failed'}
          </span>
        </div>
      </div>
    </div>
  );
}
