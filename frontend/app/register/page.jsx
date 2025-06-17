'use client';
import React, { useRef, useState } from 'react'
import Link from 'next/link';
import Swal from 'sweetalert2';

function page() {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', confirmpassword);
    if (avatarImage) {
      formData.append('avatar_image', avatarImage);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "User registered successfully!",
        });
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmpassword('');
        setAvatarImage(null);
        setPreview(null);
      } else {
        const data = await res.json();
        const errorMessages = Object.values(data.errors || {})
          .flat()
          .join('\n');

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessages || "Something went wrong, please try again later.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-blend-purple bg-gradient-to-l from-purple-500 to-violet-900'>
      <div className="w-full flex justify-center">
        <div className="max-w-2xl w-full">
          <div
            style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            className="bg-gray-800 rounded-lg shadow-l overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-center text-3xl font-extrabold text-white">
                Welcome
              </h2>
              <p className="mt-4 text-center text-gray-400">Sign in to continue</p>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6" encType="multipart/form-data">
                <div className="flex flex-col items-center mb-4">
                  <div
                    className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden cursor-pointer border-2 border-violet-500"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {preview ? (
                      <img src={preview} alt="Profile Preview" className="object-cover w-full h-full" />
                    ) : (
                      <span className="text-gray-400 text-center">Upload Photo</span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    name="profilePhoto"
                    id="profilePhoto"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="profilePhoto" className="mt-2 text-sm text-gray-400 cursor-pointer hover:text-violet-400" required={true}>
                    Choose Profile Photo
                  </label>
                </div>
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
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="sr-only" htmlFor="username">Username</label>
                    <input
                      placeholder="Username"
                      className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                      required={true}
                      type="text"
                      name="username"
                      id="username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
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
                      value={password}
                      onChange={e => setPassword(e.target.value)}
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
                      value={confirmpassword}
                      onChange={e => setConfirmpassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-60"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin h-5 w-5 mr-2 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        Signing Up...
                      </span>
                    ) : (
                      'Sign Up'
                    )}
                  </button>
                </div>
              </form>
            </div>
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