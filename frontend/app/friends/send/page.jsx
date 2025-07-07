'use client';
import { useState } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Sidebar from '../../components/dashboard/Sidebar';
import { useRouter } from 'next/navigation';

export default function SendFriendPage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const token = Cookies.get('token');
  const router = useRouter();

  const sendRequest = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/friend-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      }).then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          throw { response: { data: error } };
        }
      });
      setMessage('Friend request sent');
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Friend request sent',
      });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error sending request');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'Error sending request',
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-black-200">
      <Sidebar />
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
          <button
            onClick={() => router.push('/friends')}
            className="mb-6 text-purple-400 hover:text-purple-200 font-semibold flex items-center gap-2"
          >
            ← Back to Friends
          </button>
          <h1 className="text-2xl font-bold mb-6 text-white text-center">➕ Send Friend Request</h1>
          <form onSubmit={sendRequest} className="space-y-6">
            <input
              type="text"
              placeholder="Enter name or email"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-900 border border-purple-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors shadow"
            >
              Send
            </button>
            {message && (
              <div className="text-center text-sm mt-2 text-purple-300">{message}</div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
