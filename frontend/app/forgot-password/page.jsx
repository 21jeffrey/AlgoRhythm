'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

function Page() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/forgot-password`,
        { email }
      );
        
        toast.success(response.data.message || "Check your email");
        router.push("/login");
       
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || 'An error occurred');
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-l from-purple-500 to-violet-900'>
      <div className='max-w-lg w-full'>
        <div
          className='bg-gray-800 rounded-lg shadow-xl overflow-hidden'
          style={{
            boxShadow:
              '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div className='p-8'>
            <p className='mt-4 text-center text-gray-400'>Forgot Password</p>

            <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
              <div className='space-y-4'>
                <div>
                  <label className='sr-only' htmlFor='email'>
                    Email address
                  </label>
                  <input
                    placeholder='Email address'
                    className='appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm'
                    required
                    autoComplete='email'
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    className='group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
                    type='submit'
                    disabled={loading}
                  >
                    {loading ? 'Sending Link...' : 'Send'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
