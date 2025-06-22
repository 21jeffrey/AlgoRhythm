import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';

function BadgesPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold">Badges</h1>
        <p className="mt-2 mb-6">Here are the badges you've earned.</p>
        {/* Badges content goes here */}
      </main>
    </div>
  );
}

export default BadgesPage;