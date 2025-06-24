'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import Cards from '@/app/components/dashboard/Cards'

function Page() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/admin/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => setAdmin(res.data.admin))
    .catch(err => {
      console.error(err);
      toast.error('Failed to fetch admin profile');
    });
  }, []);

  return (
    <div className="mt-15">
      <div className="text-2xl font-semibold text-center mt-4">
        {admin ? `Welcome ${admin.name} to the Admin Dashboard` : 'Loading...'}
      </div>
        {admin ? (               
          <div className="flex flex-col items-center space-y-4">
            <p className="">Email: {admin.email}</p>
          </div>
        ) : (
          <p className="text-gray-300">Loading profile...</p>
        )}

      <div className="mt-15">
        <Cards />
        </div>
      </div>
      
  );
}

export default Page;
