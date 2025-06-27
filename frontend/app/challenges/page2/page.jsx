"use client";
import React, { useState, useEffect } from "react";

export default function ChallengesPage2() {
  const [challenges, setChallenges] = useState([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}api/challenges`)
      .then(res => res.json())
      .then(data => {
        setChallenges(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter and search logic
  const filteredChallenges = challenges.filter((c) => {
    const matchesDifficulty = difficulty === "All" || c.difficulty === difficulty;
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-700 p-8">
      {/* Filter and Search Bar */}
      <div className="bg-gray-700 px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-700 gap-4">
        <select
          className="border border-gray-300 bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 w-48"
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
        >
          <option value="All">All Difficulty</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <input
          type="text"
          placeholder="Search challenge"
          className="border border-gray-300 rounded px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Challenge Cards Grid */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-700">
        {loading ? (
          <div className="col-span-full text-center text-gray-500">Loading...</div>
        ) : filteredChallenges.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No challenges found.</div>
        ) : (
          filteredChallenges.map((challenge) => (
            <div key={challenge.id} className="bg-purple-700 rounded-lg shadow p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    challenge.difficulty === 'Beginner'
                      ? 'bg-green-100 text-green-700'
                      : challenge.difficulty === 'Intermediate'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2">{challenge.title}</h3>
                <p className="text-white mb-4 text-sm">
                  {challenge.description}
                </p>
              </div>
              <a
                href={`/challenges/${challenge.id}/attempt/`}
                className="mt-2 bg-purple-600 hover:bg-purple-700 text-white text-center py-2 rounded font-semibold transition"
              >
                Attempt
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}