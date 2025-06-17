'use client';
import React ,{ useEffect }  from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

function page() {
    const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      // Redirect to login if no token
      router.push('/login');
    }
  }, []);

    const handleLogout = () => {
        Cookies.remove('token');

        setTimeout(() => {
          router.push('/login');
          toast.success("Logged out successfully");
        }, 300); 
    }
  return (
    <div className='bg-white'>
        <h1 className='text-3xl font-bold text-center mt-10 '>Dashboard</h1>
        <p className='text-center mt-4'>This is the dashboard page where you can manage your account and settings.</p>
        <button onClick={handleLogout} className='mt-8 mx-auto block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300'>
            Logout
        </button>
    </div>
  )
}

export default page