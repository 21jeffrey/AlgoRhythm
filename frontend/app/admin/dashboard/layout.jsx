'use client';
import React from 'react';
import Adminbar from '@/app/components/Adminbar';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
     const token = Cookies.get('token');
    if (!token) {
      router.push('/admin/login'); 
      toast.error('You must be logged in to access the admin dashboard.');
    }
  }, []);
  return (
    <div className="flex min-h-screen  ">
      {/* Sidebar */}
      <div className="w-64 ">
        <Adminbar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto bg-gray-800 text-white">
        {children}
      </div>
    </div>
  );
}
