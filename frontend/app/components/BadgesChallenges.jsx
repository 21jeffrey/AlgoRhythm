"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Award, Target, Star, Zap, Trophy, Code } from "lucide-react";
import Particles from "@/public/Backgrounds/Particles/Particles";

const BadgesChallenges = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: false,
      mirror: true,
      offset: 200,
    });

    // Track scroll position for interactive animations
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Badges Section */}
      <div className="relative w-full bg-black text-white py-20 px-4 overflow-hidden">
        {/* Particles Background */}
        <div className="absolute inset-0 z-0">
          <Particles
            color="#530C73"
            particleCount={100}
            speed={0.5}
            size={2}
          />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-[1240px] mx-auto">
          {/* Section Title */}
          <div data-aos="zoom-in" className="mb-16 text-center">
            <h2 className="md:text-6xl sm:text-5xl text-4xl font-bold text-white mb-4">
              Badges
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Collect badges as you progress through your coding journey
            </p>
          </div>

          {/* Badges Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right" className="order-2 md:order-1">
              <div className="flex items-center mb-6">
                <Award className="h-12 w-12 text-yellow-500 mr-4" />
                <h3 className="text-4xl font-bold">Achievement Badges</h3>
              </div>
              <p className="text-gray-300 mb-6 text-lg">
                Each badge represents a milestone in your learning path and showcases 
                your expertise in different areas of programming.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-lg border border-purple-500 hover:border-yellow-400 transition duration-300">
                  <Star className="h-8 w-8 text-yellow-400 mb-2" />
                  <h4 className="font-semibold">Beginner</h4>
                  <p className="text-sm text-gray-400">First steps in coding</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-purple-500 hover:border-blue-400 transition duration-300">
                  <Zap className="h-8 w-8 text-blue-400 mb-2" />
                  <h4 className="font-semibold">Advanced</h4>
                  <p className="text-sm text-gray-400">Complex problem solving</p>
                </div>
              </div>
            </div>
            <div data-aos="fade-left" className="order-1 md:order-2 flex justify-center">
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((badge) => (
                  <div
                    key={badge}
                    className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg hover:scale-110 transition duration-300"
                  >
                    <Award className="h-8 w-8 text-white" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive SVG Divider */}
      <div className="relative z-20 -mt-2">
        <svg viewBox="0 0 1440 120" className="w-full h-24" preserveAspectRatio="none">
          <defs>
            <linearGradient id="purpleWave" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#530C73" />
              <stop offset="50%" stopColor="#7B248F" />
              <stop offset="100%" stopColor="#A64DBD" />
            </linearGradient>
            <filter id="waveGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z"
            fill="url(#purpleWave)"
            filter="url(#waveGlow)"
            opacity="0.95"
          >
            <animate
              attributeName="d"
              dur="6s"
              repeatCount="indefinite"
              values="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z;
                      M0,80 C400,100 1040,20 1440,80 L1440,120 L0,120 Z;
                      M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z"
            />
          </path>
        </svg>
      </div>

      {/* Challenges Section - Simplified */}
      <div className="relative w-full bg-black text-white py-20 px-4 overflow-hidden">
        {/* Simple Purple Background */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-purple-900/20 via-purple-800/15 to-pink-900/20"></div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-[1240px] mx-auto">
          {/* Section Title */}
          <div data-aos="zoom-in" className="mb-16 text-center">
            <h2 className="md:text-6xl sm:text-5xl text-4xl font-bold text-white mb-4">
              Challenges
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Take on coding challenges designed to push your limits
            </p>
          </div>

          {/* Challenges Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right" className="order-2 md:order-1">
              <div className="flex items-center mb-6">
                <Target className="h-12 w-12 text-purple-400 mr-4" />
                <h3 className="text-4xl font-bold">Coding Challenges</h3>
              </div>
              <p className="text-gray-300 mb-6 text-lg">
                From easy warm-ups to complex algorithms, there's always a new challenge 
                waiting to test your skills and improve your problem-solving abilities.
              </p>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-800 rounded-lg border border-green-500 transition duration-300 cursor-pointer hover:scale-105 hover:shadow-lg hover:border-green-400 hover:bg-green-950/30">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-4"></div>
                  <div>
                    <span className="text-gray-300 font-semibold">Easy</span>
                    <p className="text-sm text-gray-400">Perfect for beginners</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-800 rounded-lg border border-yellow-500 transition duration-300 cursor-pointer hover:scale-105 hover:shadow-lg hover:border-yellow-400 hover:bg-yellow-900/20">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-4"></div>
                  <div>
                    <span className="text-gray-300 font-semibold">Medium</span>
                    <p className="text-sm text-gray-400">For intermediate coders</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-800 rounded-lg border border-purple-500 transition duration-300 cursor-pointer hover:scale-105 hover:shadow-lg hover:border-purple-400 hover:bg-purple-900/30">
                  <div className="w-4 h-4 bg-purple-500 rounded-full mr-4"></div>
                  <div>
                    <span className="text-gray-300 font-semibold">Hard</span>
                    <p className="text-sm text-gray-400">Advanced developers only</p>
                  </div>
                </div>
              </div>
            </div>
            <div data-aos="fade-left" className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
                  <div className="text-center">
                    <Code className="h-16 w-16 text-white mb-4" />
                    <p className="text-white font-bold text-lg">Beat The Standard!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BadgesChallenges; 