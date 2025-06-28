'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '../../components/dashboard/Sidebar';

export default function AttemptedChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}api/user/attempted-challenges`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        if (res.status === 404) {
          // Treat 404 as no attempted challenges
          setChallenges([]);
          setLoading(false);
          return null;
        }
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data) setChallenges(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching challenges:', err);
      });
  }, []);

  if (loading) return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-black-200">
        <div className="text-center text-xl">Loading...</div>
      </main>
    </div>
  );
  
  if (error) return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-black-200">
        <div className="text-red-500">Error loading challenges: {error}</div>
      </main>
    </div>
  );

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-black-200 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Your Attempted Challenges</h1>
        {challenges.length === 0 ? (
          <div className="text-center mt-10">
            <p className="mb-4">You haven't attempted any challenges yet.</p>
            <Link href="/challenges/page2">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-semibold transition">
                Try a Challenge
              </button>
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {challenges.map(challenge => (
              <li key={challenge.id} className="bg-purple-700 rounded-lg p-4 shadow">
                <strong className="text-lg">{challenge.title}</strong>
                <br />
                <span className="text-gray-200">{challenge.description}</span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}