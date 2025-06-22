import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';

function LeaderboardPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <p className="mt-2 mb-6">See where you rank among your peers.</p>
        {/* Leaderboard content goes here */}
      </main>
    </div>
  );
}

export default LeaderboardPage;