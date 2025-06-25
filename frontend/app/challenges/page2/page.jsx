"use client";
import React, { useState } from "react";

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

  // Filter and search logic
  const filteredChallenges = challenges.filter((c) => {
    const matchesDifficulty = difficulty === "All" || c.difficulty === difficulty;
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Filter and Search Bar */}
      <div className="bg-white px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 gap-4">
        <select
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 w-48"
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
          className="border border-gray-300 rounded px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Challenge Cards Grid */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-100">
        {filteredChallenges.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No challenges found.</div>
        ) : (
          filteredChallenges.map((challenge) => (
            <div key={challenge.id} className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
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
                <h3 className="font-bold text-lg mb-2">{challenge.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {challenge.description}
                </p>
              </div>
              <a
                href={`/challenges/attempt/${challenge.id}`}
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