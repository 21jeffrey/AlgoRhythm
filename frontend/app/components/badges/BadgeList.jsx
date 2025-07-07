'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BadgeCard from './BadgeCard';
import { toast } from 'react-hot-toast';
import Loading from '../Loading';

const BadgeList = () => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/badges`)
      .then(res => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          setBadges(res.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch badges:', err);
        setLoading(false);
      });
  }, []);

   const handleDelete = (id) => {
    setBadges(prev => prev.filter(b => b.id !== id));
  };
  
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {badges.map(badge => (
        <BadgeCard key={badge.id} badge={badge} onDelete={handleDelete}  />
      ))}
    </div>
  );
};

export default BadgeList;
