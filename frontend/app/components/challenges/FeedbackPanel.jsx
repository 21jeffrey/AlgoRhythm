'use client';
import React from 'react';

export default function FeedbackPanel({ feedback }) {
  if (!feedback || !Array.isArray(feedback)) {
    return <div className="p-4">No feedback available.</div>;
  }

  return (
    <div className="p-4 text-sm">
      <h3 className="font-semibold mb-2">Submission Feedback</h3>

      {feedback.map((item, idx) => (
        <div key={idx} className="mb-4 border-b pb-2">
          <div>
            <strong>Test Case {idx + 1}:</strong>{' '}
            <span className={item.status?.description === 'Accepted' ? 'text-green-600' : 'text-red-600'}>
              {item.status?.description || 'No status'}
            </span>
          </div>

          {item.stdout && (
            <div>
              <strong>Output:</strong>
              <pre className="bg-gray-100 p-2 rounded">{item.stdout}</pre>
            </div>
          )}

          {item.stderr && (
            <div className="text-red-600">
              <strong>Error:</strong>
              <pre className="bg-red-100 p-2 rounded">{item.stderr}</pre>
            </div>
          )}

          {item.compile_output && (
            <div className="text-yellow-600">
              <strong>Compile Output:</strong>
              <pre className="bg-yellow-100 p-2 rounded">{item.compile_output}</pre>
            </div>
          )}

          {item.time && (
            <div>
              <strong>Execution Time:</strong> {item.time}s
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
