'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';

export default function FriendsPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [friends, setFriends] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  // Fetch current friends and all users on mount
  useEffect(() => {
    // Fetch friends
    fetch(`${process.env.NEXT_PUBLIC_API_URL}api/friends`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => setFriends(data));

    // Fetch all users
    fetch(`${process.env.NEXT_PUBLIC_API_URL}api/users`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => setAllUsers(data));
  }, []);

  // Search users (client-side from allUsers)
  const handleSearch = () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const lower = query.toLowerCase();
    const filtered = allUsers.filter(u =>
      (u.name && u.name.toLowerCase().includes(lower)) ||
      (u.email && u.email.toLowerCase().includes(lower))
    );
    setResults(filtered);
  };

  // Add friend
  const handleAddFriend = async (userId) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/friends/${userId}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    // Find user from allUsers (not just results)
    const user = allUsers.find(u => u.id === userId);
    if (user) setFriends([...friends, user]);
  };

  // Remove friend
  const handleRemoveFriend = async (userId) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/friends/${userId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    setFriends(friends.filter(f => f.id !== userId));
  };

  // Helper to check if user is a friend
  const isFriend = (userId) => friends.some(f => f.id === userId);

  return (
    <div className="flex min-h-screen bg-black-200 text-white">
      <Sidebar />
      <main className="flex-1 p-6">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <input
              type="text"
              placeholder="Search users by name or email"
              className=" flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-violet-700 text-white font-semibold rounded-r-lg shadow hover:from-purple-600 hover:to-violet-800 transition"
            >
              🔍 Search
            </button>
          </div>

          {/* Search Results (show all users if no query, or filtered results) */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-2">{query.trim() ? 'Search Results' : 'All Users'}</h2>
            <ul className="space-y-3">
              {(query.trim() ? results : allUsers).map(user => (
                <li key={user.id} className="flex items-center gap-4 bg-gray-100 rounded-lg p-3 shadow">
                  <img
                    src={user.avatar_image || '/default-avatar.png'}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <span className="flex-1 font-medium">{user.name}</span>
                  {isFriend(user.id) ? (
                    <button
                      onClick={() => handleRemoveFriend(user.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Unadd Friend
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddFriend(user.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      Add Friend
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Friends List */}
          <div>
            <h2 className="text-lg font-bold mb-2">Your Friends</h2>
            {friends.length === 0 ? (
              <p className="text-gray-500">You have no friends yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {friends.map(friend => (
                  <div key={friend.id} className="flex items-center gap-4 bg-purple-100 rounded-lg p-3 shadow">
                    <img
                      src={friend.avatar_image || '/default-avatar.png'}
                      alt={friend.name}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <span className="flex-1 font-medium">{friend.name}</span>
                    <button
                      onClick={() => handleRemoveFriend(friend.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Unadd Friend
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}