'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

function ResetPasswordContent() {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    const emailParam = searchParams.get('email');

    if (!tokenParam || !emailParam) {
      toast.error("Invalid reset link.");
      router.push('/forgot-password');
      return;
    }

    setToken(tokenParam);
    setEmail(emailParam);
  }, [searchParams, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/reset-password`, {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });

      toast.success("Password reset successfully. You can now log in.");
      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || error.response?.data?.email?.[0] || "Something went wrong";
        toast.error(msg);
      } else {
        toast.error("Unexpected error.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-l from-purple-500 to-violet-900'>
      <div className="w-full flex justify-center">
        <div className="max-w-2xl w-full">
          <div
            style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            className="bg-gray-800 rounded-lg shadow-l overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-center text-3xl font-extrabold text-white">
                Reset Password
              </h2>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm">
                  <div>
                    <label className="sr-only" htmlFor="password">New Password</label>
                    <input
                      placeholder="New Password"
                      className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                      required
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="sr-only" htmlFor="password_confirmation">Confirm New Password</label>
                    <input
                      placeholder="Confirm New Password"
                      className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                      required
                      type="password"
                      name="password_confirmation"
                      id="password_confirmation"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-l from-purple-500 to-violet-900">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
