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
    </div>
  )
}

export default page