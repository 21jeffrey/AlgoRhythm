import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';

function FriendsPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold">Friends</h1>
        <p className="mt-2 mb-6">This is where you can manage your friends.</p>
        {/* Friends content goes here */}
      </main>
    </div>
  );
}

export default FriendsPage;