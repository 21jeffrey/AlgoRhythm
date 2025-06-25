'use client';
import React , {useEffect , useState} from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Cookies from 'js-cookie';

function BadgesPage() {
  const[badges, setBadges] = useState([]);
  useEffect(()=>{
    const token = Cookies.get('token');
    fetch('${process.env.NEXT_PUBLIC_API_URL}api/my-badges',{
      headers:{
        Authorization: 'Bearer ${token}',
      },
    })
    .then((res)=> res.json())
    .then(setBadges);
  }, []);


  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold">Badges</h1>
        <p className="mt-2 mb-6">Here are the badges you've earned.</p>
      <ul>
        {badges.map((badge)=>(
          <li key={badge.id}>
            <strong>{badge.name}</strong>: {badge.description}
          </li>
        ))}
        </ul>
      </main>
    </div>
  );
}

export default BadgesPage;