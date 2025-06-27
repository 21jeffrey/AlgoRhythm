'use client';
import React, { useEffect, useState } from 'react';

export default function AttemptedChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/user/attempted-challenges', {
      headers: {
        'Content-Type': 'application/json',
        // Uncomment if you need authentication
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setChallenges(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching challenges:', err);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading challenges: {error}</div>;

  return (
    <div>
      <h1>Your Attempted Challenges</h1>
      {challenges.length === 0 ? (
        <p>You haven't attempted any challenges yet.</p>
      ) : (
        <ul>
          {challenges.map(challenge => (
            <li key={challenge.id}>
              <strong>{challenge.title}</strong>
              <br />
              {challenge.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}