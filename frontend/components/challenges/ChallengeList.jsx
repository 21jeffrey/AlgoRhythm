'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ChallengeCard from './ChallengeCard';
import { toast } from 'react-hot-toast';
import Loading from '../Loading';

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/challenges`)
      .then(res => {
        if (res.data.error) {
          toast.error(res.data.error);
          console.error(res.data.error);
        } else {
          setChallenges(res.data);
        }
        setLoading(false);
      })
      .catch(err => {
        toast.error('Failed to fetch challenges');
        console.error('Failed to fetch challenges:', err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setChallenges(prev => prev.filter(c => c.id !== id));
  };
  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {challenges.map(ch => (
        <ChallengeCard key={ch.id} challenge={ch} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ChallengeList;

