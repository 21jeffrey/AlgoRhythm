'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BadgeCard from './BadgeCard';

const BadgeList = () => {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/badges`)
      .then(res => setBadges(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {badges.map(badge => (
        <BadgeCard key={badge.id} badge={badge} />
      ))}
    </div>
  );
};

export default BadgeList;
