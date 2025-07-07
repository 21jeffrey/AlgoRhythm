'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


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
    <div className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">👥 Your Friends</h1>
      <button
        onClick={() =>  router.push('/friends/send')}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
      > Add Friend</button>
      <ul className="space-y-2">
        {friends.map((f) => (
          <li key={f.id} className="flex justify-between border p-2 rounded">
            <span>{f.name}</span>
            <button onClick={() => unfriend(f.id)} className="text-white bg-red-600 hover:bg-red-700 cursor-pointer px-3 py-1 rounded transition-colors">Unfriend</button>
          </li>
        ))}
      </ul>

<h2 className="text-xl font-semibold mt-6">📥 Incoming Requests</h2>
<ul className="space-y-2">
  {incoming.map((r) => (
    <li key={r.id} className="flex justify-between border p-2 rounded">
      <span>
        From: {r.sender_name} ({r.sender_email})
      </span>
      <div className="space-x-2">
        <button onClick={() => accept(r.sender_id)} className="text-green-600">Accept</button>
        <button onClick={() => reject(r.sender_id)} className="text-yellow-600">Reject</button>
      </div>
    </li>
  ))}
</ul>



<h2 className="text-xl font-semibold mt-6">📤 Sent Requests</h2>
<ul className="space-y-2">
  {sent.map((r) => (
    <li key={r.id} className="border p-2 rounded">
      To: {r.recipient_name} ({r.recipient_email})
    </li>
  ))}
</ul>


    </div>
  );
}
