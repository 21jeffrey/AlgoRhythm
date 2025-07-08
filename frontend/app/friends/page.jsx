'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import { FireIcon, UsersIcon } from '@heroicons/react/24/outline';
import { ClockArrowDown, ClockArrowUp} from 'lucide-react';


export default function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const [incoming, setIncoming] = useState([]);
  const [sent, setSent] = useState([]);
  const token = Cookies.get('token');
  const router = useRouter();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchAll = async () => {
      const res1 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/friends`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/friend-requests/incoming`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res3 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/friend-requests/sent`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data1 = await res1.json();
      const data2 = await res2.json();
      const data3 = await res3.json();

      setFriends(data1);
      setIncoming(data2);
      setSent(data3);
    };

    fetchAll();
  }, [token]);

  const accept = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/friend-request/${id}/accept`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    location.reload();
  };

  const reject = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/friend-request/${id}/reject`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    location.reload();
  };

  const unfriend = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/friend/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    location.reload();
  };
  return (
    <div className="flex min-h-screen bg-black-200">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-white flex gap-1"><UsersIcon className='w-7 h-10 text-purple-600'/> Your Friends</h1>
          <button
            onClick={() => router.push('/friends/send')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-semibold mb-8 shadow-lg"
          >
            + Add Friend
          </button>

          {/* Friends Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {friends.length === 0 ? (
              <div className="col-span-full text-gray-400 text-center">No friends yet.</div>
            ) : (
              friends.map((f) => (
                <div key={f.id} className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center relative">
                  <img
                    src={f.avatar_image ? `${process.env.NEXT_PUBLIC_API_URL}storage/${f.avatar_image}` : '/default-avatar.png'}
                    alt={f.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-purple-500 mb-3"
                    onError={e => { e.target.src = '/default-avatar.png'; }}
                  />
                  <div className="text-xl font-semibold text-white mb-1">{f.name}</div>
                  <div className="text-gray-400 text-sm mb-1">{f.email || <span className='italic'>No email</span>}</div>
                  <div className="text-gray-300 text-sm mb-3">Points: <span className="font-bold text-purple-400">{f.points ?? 0}</span></div>
                  <div className="text-gray-400 text-sm mb-3 flex gap-1">Streak: <span className="font-semibold text-red-500 flex">{f.current_streak} <FireIcon className='w-5 h-5'/></span> </div>
                  <button
                    onClick={() => unfriend(f.id)}
                    className="absolute top-3 right-3 text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors shadow"
                  >Unfriend</button>
                </div>
              ))
            )}
          </div>

          {/* Incoming Requests */}
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-white flex gap-2"><ClockArrowDown className='w-6 h-8 text-purple-600'/> Incoming Requests</h2>
          <ul className="space-y-2 mb-10">
            {incoming.length === 0 ? (
              <li className="text-gray-400">No incoming requests.</li>
            ) : (
              incoming.map((r) => (
                <li key={r.id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow">
                  <span className="text-white">
                    From: <span className="font-semibold">{r.sender_name}</span> <span className="text-gray-400">({r.sender_email})</span>
                  </span>
                  <div className="space-x-2">
                    <button onClick={() => accept(r.sender_id)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition-colors">Accept</button>
                    <button onClick={() => reject(r.sender_id)} className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded transition-colors">Reject</button>
                  </div>
                </li>
              ))
            )}
          </ul>

          {/* Sent Requests */}
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-white flex gap-2"><ClockArrowUp className='w-6 h-8 text-purple-600'/> Sent Requests</h2>
          <ul className="space-y-2">
            {sent.length === 0 ? (
              <li className="text-gray-400">No sent requests.</li>
            ) : (
              sent.map((r) => (
                <li key={r.id} className="bg-gray-700 p-4 rounded-lg shadow text-white">
                  To: <span className="font-semibold">{r.recipient_name}</span> <span className="text-gray-400">({r.recipient_email})</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
