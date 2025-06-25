'use client';
import React , {useEffect , useState} from 'react';
import Sidebar from '../components/dashboard/Sidebar';

function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}api/leaderboard`)
    .then(res=>res.json())
    .then(data=>setLeaderboard(data));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <p className="mt-2 mb-6">See where you rank among your peers.</p>
        <table className="w-full bg-purple-700 text-white">
          <thead>
            <tr>
              <th className=" py-2 px-4">Rank</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry , idx) =>(
              <tr key={idx}>
                <td className="bg-black py-2 px-4">{entry.rank ?? idx+1}</td>
                <td className="bg-black py-2 px-4">{entry.name}</td>
                <td className="bg-black py-2 px-4">{entry.score}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </main>
    </div>
  );
}

export default LeaderboardPage;