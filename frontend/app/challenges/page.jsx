import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';

function ChallengesPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold">Challenges</h1>
        <p className="mt-2 mb-6">Here are your active challenges.</p>
        {/* Challenges content goes here */}
      </main>
    </div>
  );
}

export default ChallengesPage;