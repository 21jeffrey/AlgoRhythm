import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';

function ProfilePage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="mt-2 mb-6">This is your profile page.</p>
        {/* Profile content goes here */}
      </main>
    </div>
  );
}

export default ProfilePage;