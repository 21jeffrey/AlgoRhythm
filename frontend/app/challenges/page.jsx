'use client';
import React ,{ useEffect }  from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';

function page() {
    const router = useRouter();
    

    

  return (
    <div>
        <Header />
        page
    </div>
  )
}

export default page