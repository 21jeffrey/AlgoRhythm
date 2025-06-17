"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Player } from "@lottiefiles/react-lottie-player";
import ShinyText from "@/public/TextAnimations/ShinyText/ShinyText";
import Aurora from "@/public/Backgrounds/Aurora/Aurora";

const Features = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: false,
      mirror: true,
      offset: 200,
    });
  }, []);

  return (
    <div className="relative w-full bg-black text-white py-20 px-4 overflow-hidden">
      {/* ✅ Aurora Background that covers entire section */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#310347"]} // dark + light purple
          blend={0.6}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* ✅ Foreground Content */}
      <div className="relative z-10 max-w-[1240px] mx-auto">
        {/* Features Title */}
        <div data-aos="zoom-in" className="mb-12 text-center">
          <ShinyText
            text="Features"
            className="md:text-7xl sm:text-6xl text-4xl font-bold text-white"
            shinyColor="#fff"
            shinyDuration={1500}
            shinyDelay={200}
          />
        </div>

        {/* Leaderboard Feature */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-32">
          <div data-aos="fade-right">
            <Player
              autoplay
              loop
              src="/lottie/leaderboard.json"
              style={{ height: "300px", width: "300px" }}
            />
          </div>
          <div data-aos="fade-left">
            <h3 className="text-3xl font-bold mb-2">Leaderboard</h3>
            <p className="text-gray-300 mb-4">
              Climb the ranks, beat your friends, and become a top coder.
            </p>
            <a href="/leaderboard">
              <button className="bg-blue-600 px-6 py-2 rounded-full hover:bg-blue-700 transition">
                View Leaderboard
              </button>
            </a>
          </div>
        </div>

        {/* Friends and Collabs Feature */}
        <div className="grid md:grid-cols-2 gap-4 items-center mb-32">
          <div
            data-aos="fade-right"
            className="order-2 md:order-1 px-4 md:px-8"
          >
            <h3 className="text-3xl font-bold mb-2">Friends & Collabs</h3>
            <p className="text-gray-300 mb-4">
              Add friends, solve problems together, and grow as a team.
            </p>
            <a href="/friends">
              <button className="bg-green-600 px-6 py-2 rounded-full hover:bg-green-700 transition">
                Collaborate
              </button>
            </a>
          </div>
          <div
            data-aos="fade-left"
            className="order-1 md:order-2 flex justify-center"
          >
            <Player
              autoplay
              loop
              src="/lottie/friends2.json"
              style={{ height: "300px", width: "300px" }}
            />
          </div>
        </div>

        {/* Streaks Feature */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-32">
          <div data-aos="fade-right">
            <Player
              autoplay
              loop
              src="/lottie/streak.json"
              style={{ height: "300px", width: "300px" }}
            />
          </div>
          <div data-aos="fade-left">
            <h3 className="text-3xl font-bold mb-2">Streaks</h3>
            <p className="text-gray-300 mb-4">
              Build a daily problem-solving streak and stay motivated.
            </p>
            <a href="/streaks">
              <button className="bg-red-600 px-6 py-2 rounded-full hover:bg-red-700 transition">
                Track Streak
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
