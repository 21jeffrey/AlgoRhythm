"use client";
import React, { useState } from "react";
import Aurora from "@/public/Backgrounds/Aurora/Aurora";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

// Dummy data for demonstration
const challenges = [
  {
    id: 1,
    title: "FizzBuzz",
    description: "Write a program that prints the numbers from 1 to 100. But for multiples of three print 'Fizz' instead of the number and for the multiples of five print 'Buzz'.",
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Two Sum",
    description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
    difficulty: "Medium",
  },
  {
    id: 3,
    title: "LRU Cache",
    description: "Design and implement a data structure for Least Recently Used (LRU) cache.",
    difficulty: "Hard",
  },
  // Add more challenges as needed
];

export default function ChallengesPage2() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const router = useRouter();

  // Filter and search logic
  const filteredChallenges = challenges.filter((c) => {
    const matchesDifficulty = difficulty === "All" || c.difficulty === difficulty;
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  const handleAttemptClick = (challengeId) => {
    const token = Cookies.get('token');
    
    if (!token) {
      toast.error('Please login to attempt challenges');
      router.push('/login');
      return;
    }
    
    router.push(`/challenges/${challengeId}/attempt`);
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#530C73", "#63126E", "#7B248F", "#A64DBD"]}
          blend={0.84}
          amplitude={0.6}
          speed={1.5}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Filter and Search Bar */}
        <div className="bg-purple-600/30 backdrop-blur-sm px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-purple-500/30">
          <select
            className="border border-purple-400 bg-purple-900/30 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 w-48"
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
          >
            <option value="All">All Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <input
            type="text"
            placeholder="Search challenge"
            className="border border-purple-400 bg-purple-900/30 text-white rounded-full px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-purple-300"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Challenge Cards Grid */}
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredChallenges.length === 0 ? (
            <div className="col-span-full text-center text-gray-300">No challenges found.</div>
          ) : (
            filteredChallenges.map((challenge) => (
              <div key={challenge.id} className="bg-purple-900/20 backdrop-blur-sm rounded-lg shadow-lg border border-purple-500/30 p-6 flex flex-col justify-between hover:transform hover:scale-105 transition duration-300">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      challenge.difficulty === 'Easy'
                        ? 'bg-green-100 text-green-700'
                        : challenge.difficulty === 'Medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-white">{challenge.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    {challenge.description}
                  </p>
                </div>
                <button
                  onClick={() => handleAttemptClick(challenge.id)}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-center py-2 px-4 rounded-full font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-purple-900"
                >
                  Attempt Challenge
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}