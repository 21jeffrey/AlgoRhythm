"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ShinyText from "@/public/TextAnimations/ShinyText/ShinyText";
import Aurora from "@/public/Backgrounds/Aurora/Aurora";
import dynamic from "next/dynamic";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

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

  const Player = dynamic(
  () =>
    import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

  return (
    <div id="features" className="relative w-full bg-black text-white py-20 px-4 overflow-hidden">
      {/* ✅ Aurora Background that covers entire section */}
      <div className="absolute inset-0 z-0">
        <Aurora
  colorStops={["#530C73", "#63126E", "#7B248F", "#A64DBD"]}
  blend={0.84}
  amplitude={0.6} // increased for more visible movement
  speed={1.5} // increased to match Silk motion
/>
      </div>

      {/* ✅ Foreground Content */}
      <div className="relative z-10 max-w-[1240px] mx-auto">
        {/* Features Title */}
        <div data-aos="zoom-in" className="mb-16 text-center">
          <h1
            className="text-5xl md:text-8xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(130,0,255,0.7)] animate-pulse"
            style={{ letterSpacing: '0.05em', lineHeight: 1.1 }}
          >
            Features
          </h1>
          <div className="flex justify-center items-center gap-4 mt-4">
            <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse"></span>
            <span className="h-2 w-2 rounded-full bg-pink-400 animate-pulse delay-200"></span>
            <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse delay-400"></span>
          </div>
        </div>

        {/* Leaderboard Feature */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-32">
          <div data-aos="fade-right">
            <Player
              autoplay
              loop
              src="/lottie/leaderboard.json"
              style={{ height: "340px", width: "340px" }}
            />
          </div>
          <div data-aos="fade-left">
            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-purple-200">Leaderboard</h3>
            <p className="text-2xl md:text-3xl text-purple-100 mb-4">
              Climb the ranks, beat your friends, and become a top coder.
            </p>
          </div>
        </div>

        {/* Friends and Collabs Feature */}
        <div className="grid md:grid-cols-2 gap-4 items-center mb-32">
          <div
            data-aos="fade-right"
            className="order-2 md:order-1 px-4 md:px-8"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-purple-200">Friends & Collabs</h3>
            <p className="text-2xl md:text-3xl text-purple-100 mb-4">
              Add friends, solve problems together, and grow as a team.
            </p>
          </div>
          <div
            data-aos="fade-left"
            className="order-1 md:order-2 flex justify-center"
          >
            <Player
              autoplay
              loop
              src="/lottie/friends2.json"
              style={{ height: "340px", width: "340px" }}
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
              style={{ height: "340px", width: "340px" }}
            />
          </div>
          <div data-aos="fade-left">
            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-purple-200">Streaks</h3>
            <p className="text-2xl md:text-3xl text-purple-100 mb-4">
              Build a daily problem-solving streak and stay motivated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
