'use client';
import React from 'react'
import Link from 'next/link';

// Login page component
function Page() {
  return (
    // Center the login form vertically and horizontally with a gradient background
    <div className='flex items-center justify-center min-h-screen bg-blend-purple bg-gradient-to-l from-purple-500 to-violet-900'>
      <div className="max-w-lg w-full">
        <div
          // Custom box shadow for the card
          style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
          className="bg-gray-800 rounded-lg shadow-xl overflow-hidden"
        >
          <div className="p-8">
            {/* Title and subtitle */}
            <h2 className="text-center text-3xl font-extrabold text-white">
              Welcome Back
            </h2>
            <p className="mt-4 text-center text-gray-400">Sign in to continue</p>
            {/* Login form */}
            <form method="POST" action="#" className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm">
                {/* Email input */}
                <div>
                  <label className="sr-only" htmlFor="email">Email address</label>
                  <input
                    placeholder="Email address"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                    required={true}
                    autoComplete="email"
                    type="email"
                    name="email"
                    id="email"
                  />
                </div>
                {/* Password input */}
                <div className="mt-4">
                  <label className="sr-only" htmlFor="password">Password</label>
                  <input
                    placeholder="Password"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                    required={true}
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
              </div>

              {/* Forgot password link */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm">
                  <Link
                    className="font-medium text-purple-500 hover:text-purple-400"
                    href="#"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              {/* Sign In button */}
              <div>
                <button
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
          {/* Sign up link */}
          <div className="px-8 py-4 bg-gray-700 text-center">
            <span className="text-gray-400">Don't have an account?</span>
            <Link className="font-medium text-violet-500 hover:text-violet-400" href="/register">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page