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

  return (
    <>
      <div id="features" className="relative w-full bg-black text-white py-20 px-4 overflow-hidden">
        {/* Aurora Background that covers entire section */}
        <div className="absolute inset-0 z-0">
          <Aurora
    colorStops={["#530C73", "#63126E", "#7B248F", "#A64DBD"]}
    blend={0.84}
    amplitude={0.6}
    speed={1.5}
  />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-[1240px] mx-auto">
          {/* Features Title */}
          <div data-aos="zoom-in" className="mb-16 text-center">
            <h1
              className="text-4xl sm:text-6xl md:text-8xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(130,0,255,0.7)] transition duration-300 hover:scale-105 hover:drop-shadow-[0_4px_32px_rgba(130,0,255,0.8)] cursor-pointer animate-pulse"
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
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-purple-200 transition duration-300 hover:text-yellow-400 cursor-pointer">Leaderboard</h3>
              <p className="text-lg sm:text-2xl md:text-3xl text-purple-100 mb-4 transition duration-300 hover:text-pink-300 cursor-pointer">
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
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-purple-200 transition duration-300 hover:text-yellow-400 cursor-pointer">Friends & Collabs</h3>
              <p className="text-lg sm:text-2xl md:text-3xl text-purple-100 mb-4 transition duration-300 hover:text-pink-300 cursor-pointer">
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
        </div>
      </div>
      {/* Streaks Feature as its own full-screen section */}
      <section className="relative w-full min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Aurora
            colorStops={["#530C73", "#63126E", "#7B248F", "#A64DBD"]}
            blend={0.84}
            amplitude={0.6}
            speed={1.5}
          />
        </div>
        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-4 py-20 grid md:grid-cols-2 gap-8 items-center">
          <div className="relative flex justify-center items-center">
            {/* Animated Glowing Rings */}
            <div className="absolute z-0">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border-4 border-purple-500 opacity-30 animate-pulse"></span>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border-2 border-pink-400 opacity-20 animate-ping"></span>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full border-2 border-yellow-400 opacity-10 animate-pulse"></span>
            </div>
            {/* Floating Badge */}
            <span className="absolute -top-6 right-10 z-10 animate-bounce">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="22" fill="#A64DBD" stroke="#fff" strokeWidth="4" />
                <path d="M24 14L27.09 21.26L35 22.27L29 27.14L30.18 35L24 31.77L17.82 35L19 27.14L13 22.27L20.91 21.26L24 14Z" fill="#fff"/>
              </svg>
            </span>
            {/* Lottie Animation */}
            <div className="relative z-10 animate-[float_3s_ease-in-out_infinite]">
              <Player
                autoplay
                loop
                src="/lottie/streak.json"
                style={{ height: "340px", width: "340px" }}
              />
            </div>
            <style jsx>{`
              @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-18px); }
              }
            `}</style>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-purple-200 transition duration-300 hover:text-yellow-400 cursor-pointer">Streaks</h3>
            <p className="text-lg sm:text-2xl md:text-3xl text-purple-100 mb-4 transition duration-300 hover:text-pink-300 cursor-pointer">
              Build a daily problem-solving streak and stay motivated.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
