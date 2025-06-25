'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ChallengeCard from './ChallengeCard';

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/challenges`)
      .then(res => setChallenges(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    setChallenges(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {challenges.map(ch => (
        <ChallengeCard key={ch.id} challenge={ch} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ChallengeList;

