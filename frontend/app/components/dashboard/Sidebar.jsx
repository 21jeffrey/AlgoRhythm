'use client';
import React from 'react';
import { Home, User, Settings, LogOut, Users, BarChart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const Sidebar = () => {
        const router = useRouter();
        const handleLogout = () => {
            Cookies.remove('token');
    
            setTimeout(() => {
              router.push('/login');
              toast.success("Logged out successful");
            }, 300); 
        }

  return (
    <div className="w-64 h-screen bg-purple-800 text-white flex flex-col">
      <div className="p-4 font-bold text-2xl border-b border-gray-700">
        AlgoRhythm
      </div>
      <nav className="flex-1 p-2">
        <ul>
          <li className="mb-2">
            <a href="/dashboard" className="flex items-center p-2 rounded-md hover:bg-gray-700">
              <Home className="mr-3" />
              Dashboard
            </a>
          </li>
          <li className="mb-2">
            <a href="/profile" className="flex items-center p-2 rounded-md hover:bg-gray-700">
              <User className="mr-3" />
              Profile
            </a>
          </li>
          <li className="mb-2">
            <a href="/friends" className="flex items-center p-2 rounded-md hover:bg-gray-700">
              <Users className="mr-3" />
              Friends
            </a>
          </li>
         
         
        </ul>
      </nav>
      <div className="p-2 border-t border-gray-700">
        <button onClick={handleLogout} className="flex items-center p-2 rounded-md hover:bg-gray-700">
          <LogOut className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
