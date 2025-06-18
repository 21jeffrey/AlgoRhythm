'use client';
import React ,{ useEffect }  from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

function page() {
    const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      toast.error("You need to log in to access the dashboard.");
      router.push('/login');
    }
  }, []);


  return (

    <div className='bg-white'>
          <Header />
        <h1 className='text-3xl font-bold text-center mt-10 '>Dashboard</h1>
        <p className='text-center mt-4'>This is the dashboard page where you can manage your account and settings.</p>

    </div>
  )
}

export default page