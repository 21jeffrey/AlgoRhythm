'use client';
import { useState } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function SendFriendPage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const token = Cookies.get('token');

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
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">➕ Send Friend Request</h1>
      <form onSubmit={sendRequest} className="space-y-4">
        <input
          type="text"
          placeholder="Enter name or email"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-purple-600 cursor-pointer text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
}
