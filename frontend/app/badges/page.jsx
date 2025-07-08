'use client';
import React , {useEffect , useState} from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Cookies from 'js-cookie';


function BadgesPage() {
  const[badges, setBadges] = useState([]);

  useEffect(()=>{
    const token = Cookies.get('token');
    fetch(`${process.env.NEXT_PUBLIC_API_URL}api/my-badges`,{
      headers:{
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res)=> res.json())
    .then(setBadges);
  }, []);


  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-black-200 text-white">
        <h1 className="text-3xl font-bold">Badges</h1>
        <p className="mt-2 mb-6">Here are the badges you've earned.</p>
      <ul>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {badges.map(badge => (
                <div key={badge.id} className="bg-purple-700 rounded-lg shadow p-4 flex flex-col items-center">
                  <img
                    src={badge.image ? `${process.env.NEXT_PUBLIC_API_URL}storage/${badge.image}` : '/default-badge.png'}
                    alt={badge.name}
                    className="w-25 h-20 mb-2 rounded-full object-cover "
                  />
                  <div className="font-bold text-lg text-white">{badge.name}</div>
                  <div className="text-gray-200 text-sm text-center">{badge.description}</div>
                </div>
              ))}
            </div> 
        </ul>
      </main>
    </div>
  );
}

export default BadgesPage;