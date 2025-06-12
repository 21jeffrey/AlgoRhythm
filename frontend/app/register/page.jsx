'use client';
import React, { useRef, useState } from 'react'
import Link from 'next/link';

// Registration page component
function page() {
  // Ref for file input to trigger click programmatically
  const fileInputRef = useRef(null);
  // State to store image preview URL
  const [preview, setPreview] = useState(null);

  // Handle file input change and set preview image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    // Centered background container with gradient
    <div className='flex items-center justify-center min-h-screen bg-blend-purple bg-gradient-to-l from-purple-500 to-violet-900'>
      <div className="w-full flex justify-center">
        <div className="max-w-2xl w-full"> 
          {/* Card container with shadow */}
          <div
            style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            className="bg-gray-800 rounded-lg shadow-l overflow-hidden"
          >
            <div className="p-8">
              {/* Title and subtitle */}
              <h2 className="text-center text-3xl font-extrabold text-white">
                Welcome 
              </h2>
              <p className="mt-4 text-center text-gray-400">Sign in to continue</p>
              {/* Registration form */}
              <form method="POST" action="#" className="mt-8 space-y-6" encType="multipart/form-data">
                {/* Profile photo upload section */}
                <div className="flex flex-col items-center mb-4">
                  <div
                    className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden cursor-pointer border-2 border-violet-500"
                    onClick={() => fileInputRef.current.click()} 
                  >
                    {/* Show image preview if selected, else prompt */}
                    {preview ? (
                      <img src={preview} alt="Profile Preview" className="object-cover w-full h-full" />
                    ) : (
                      <span className="text-gray-400 text-center">Upload Photo</span>
                    )}
                  </div>
                  {/* Hidden file input for image upload */}
                  <input
                    type="file"
                    accept="image/*"
                    name="profilePhoto"
                    id="profilePhoto"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    required={true}
                  />
                  {/* Label to trigger file input */}
                  <label htmlFor="profilePhoto" className="mt-2 text-sm text-gray-400 cursor-pointer hover:text-violet-400" required={true}>
                    Choose Profile Photo
                  </label>
                </div>
                {/* Input fields for email and passwords */}
                <div className="rounded-md shadow-sm">
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
                    <div className="mt-4">
                    <label className="sr-only" htmlFor="password">Username</label>
                    <input
                      placeholder="Username"
                      className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                      required={true}
                      type="text"
                      name="username"
                      id="username"
                    />
                  </div>
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
                  <div className="mt-4">
                    <label className="sr-only" htmlFor="confirmpassword">Confirm Password</label>
                    <input
                      placeholder="Confirm Password"
                      className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                      required={true}
                      type="password"
                      name="confirmpassword"
                      id="confirmpassword"
                    />
                  </div>
                </div>
                {/* Submit button */}
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
            {/* Footer with link to login page */}
            <div className="px-8 py-4 bg-gray-700 text-center">
              <span className="text-gray-400">Already have an account?</span>
              <Link className="font-medium text-violet-500 hover:text-violet-400" href="/login">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page