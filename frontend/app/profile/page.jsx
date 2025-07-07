'use client';	
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Cookies from 'js-cookie';
import { FireIcon } from '@heroicons/react/24/outline';
import Loading from '@/app/components/Loading';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile
    fetch(`${process.env.NEXT_PUBLIC_API_URL}api/profile`, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        setLoading(false);
      });
    // Fetch user badges
    fetch(`${process.env.NEXT_PUBLIC_API_URL}api/my-badges`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => setBadges(data));
  }, []);

  if (loading) return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-black-200">
        <div className="text-center text-xl"><Loading/></div>
      </main>
    </div>
  );

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-black-200 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Welcome to your Profile</h1>
        {user && (
          <div className="flex items-center gap-6 mb-10 bg-gray-800 p-6 rounded-lg shadow">
            <img
              src={user.avatar_image ? `${process.env.NEXT_PUBLIC_API_URL}storage/${user.avatar_image}` : '/default-avatar.png'}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-purple-500"
            />
            <div>
              <div className="text-2xl font-semibold">{user.name}</div>
              <div className="text-gray-400">{user.email}</div>
            </div>
            <div className='ml-auto jusify-end'>
              <div className="text-gray-400">
                <span className="font-semibold text-red-500 flex"> {user.current_streak} <FireIcon className='w-5 h-5'/></span> 
              </div>
              <div className="text-gray-400">
                <span className="font-semibold">Points:</span> {user.points || 0}
              </div>
            </div>
          </div>
        )}
        <section>
          <h2 className="text-2xl font-bold mb-4">Your Badges</h2>
          {badges.length === 0 ? (
            <p className="text-gray-400">You have not earned any badges yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {badges.map(badge => (
                <div key={badge.id} className="bg-purple-700 rounded-lg shadow p-4 flex flex-col items-center">
                  <img
                    src={badge.image ? `${process.env.NEXT_PUBLIC_API_URL}storage/${badge.image}` : '/default-badge.png'}
                    alt={badge.name}
                    className="w-25 h-20 mb-2 rounded-full object-cover "
                  />
                  <div className="font-bold text-lg text-white">{badge.name}</div>
                  <div className="text-gray-200 text-sm text-center">{badge.description}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}