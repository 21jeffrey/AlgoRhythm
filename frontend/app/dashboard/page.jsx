"use client";
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardStats from '../components/dashboard/DashboardStats';
import RecentActivity from '../components/dashboard/RecentActivity';
import axios from 'axios';
import Cookies from 'js-cookie';

function DashboardPage() {
  const [user, setUser] = useState(null);
   useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/app/login'); 
      toast.error('You must be logged in to access the admin dashboard.');
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/user/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    };

    fetchUser();
  }, []);


  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 mb-6">
          Welcome back
        </p>
        <DashboardStats />
        {/* Other dashboard content goes here */}
      </main>
    </div>
  );
}

export default DashboardPage;
