'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/dashboard/Sidebar';
import Cookies from 'js-cookie';

export default function AttemptedChallengesPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get('token');
  const API = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '');

useEffect(() => {
  if (!token) return;

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API}/api/submissions/mine`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 404) {
        setHistory([]);
        setLoading(false);
        return;
      }

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setHistory(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching challenges:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  fetchHistory();
}, [token]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex ">
        <Sidebar />
        <main className="flex-1 p-10 bg-black-200">
          <div className="text-center text-xl">Loading...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-10 bg-black-200">
          <div className="text-red-500">Error loading challenges: {error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-black-200 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-white">Your Attempted Challenges</h1>

        {history.length === 0 ? (
          <div className="text-center mt-10">
            <p className="mb-4 text-gray-300">You haven't attempted any challenges yet.</p>
            <Link href="/challenges/page2">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-semibold transition">
                Try a Challenge
              </button>
            </Link>
          </div>
        ) : (
          <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-4">
            {history.map((submission, index) => (
              <div
                key={submission.id}
                className="border border-gray-600 rounded-lg p-4 bg-gray-900 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-white font-semibold">
                    Submission #{history.length - index}
                    {index === 0 && (
                      <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                        Latest
                      </span>
                    )}
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      submission.passed ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    }`}
                  >
                    {submission.passed ? 'Passed' : 'Failed'}
                  </span>
                </div>

                <p className="text-xs text-gray-400 mb-2">{formatDate(submission.created_at)}</p>

                <div className="flex flex-wrap gap-2 text-xs mb-3 text-gray-300">
                  <div className="bg-gray-800 px-2 py-1 rounded">
                    <span className="font-medium">Language:</span> {submission.language}
                  </div>
                  <div className="bg-gray-800 px-2 py-1 rounded">
                    <span className="font-medium">Time:</span> {submission.execution_time}s
                  </div>
                  <div className="bg-gray-800 px-2 py-1 rounded">
                    <span className="font-medium">Memory:</span> {submission.memory} KB
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-300 mb-1">Code:</p>
                  <pre className="bg-gray-800 text-gray-100 p-2 rounded text-xs overflow-auto whitespace-pre-wrap break-words">
                    {submission.code}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
