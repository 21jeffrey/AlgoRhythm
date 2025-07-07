import React from 'react';
import { Award, Shield, Trophy, UsersIcon } from 'lucide-react';
import Link from 'next/link';

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg" >
      <div className="bg-gray-700 p-6 rounded-lg shadow text-center">
        <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Badges</h3>
        <p className="text-white-600 mb-4">View your earned badges.</p>
        <Link href="/badges" className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition">
          View Badges
        </Link>
      </div>
      <div className="bg-gray-700 p-6 rounded-lg shadow text-center">
        <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Submissions</h3>
        <p className="text-white-600 mb-4">See your submission History.</p>
        <Link href="/challenges/attempted" className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition">
          View  Submissions
        </Link>
      </div>
      <div className="bg-gray-700 p-6 rounded-lg shadow text-center">
        <UsersIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Friends</h3>
        <p className="text-white-600 mb-4">Check out your friends!!</p>
        <Link href="/friends" className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition">
          View Friends
        </Link>
      </div>
    </div>
  );
};

export default DashboardStats;