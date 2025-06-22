"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import Particles from "@/public/Backgrounds/Particles/Particles";

const Contacts = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: false,
      mirror: true,
      offset: 200,
    });
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <section
      id="contacts"
      className="relative w-full min-h-screen bg-black text-white overflow-hidden flex items-center justify-center px-4"
    >
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            background: {
              color: {
                value: "##310347",
              },
            },
            particles: {
              number: {
                value: 160,
              },
              color: {
             value: "rgb(71, 5, 107)", // 🎯 Deep purple color
      },
              size: {
                value: 2,
              },
              move: {
                enable: true,
                speed: 0.2,
              },
              opacity: {
                value: 0.5,
              },
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
              },
            },
          }}
        />
      </div>

      {/* Foreground Contact Content with AOS animation */}
      <div className="relative z-10 text-center" data-aos="zoom-in">
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Have questions or feedback? Reach out to us and we’ll get back to you!
          <br />
          Find us on our socials below
        </p>
         <div className="flex justify-center gap-6 mt-6">
    <a
      href="https://github.com/yourusername"
      target="_blank"
      rel="noopener noreferrer"
      className="text-purple-400 hover:text-purple-300 transition text-3xl"
    >
      <FaGithub />
    </a>
    <a
      href="https://linkedin.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-purple-400 hover:text-purple-300 transition text-3xl"
    >
      <FaLinkedin />
    </a>
    <a
      href="https://twitter.com/yourusername"
      target="_blank"
      rel="noopener noreferrer"
      className="text-purple-400 hover:text-purple-300 transition text-3xl"
    >
      <FaTwitter />
    </a>
    <a
      href="https://instagram.com/yourusername"
      target="_blank"
      rel="noopener noreferrer"
      className="text-purple-400 hover:text-purple-300 transition text-3xl"
    >
      <FaInstagram />
    </a>
  </div>
       
      </div>
    </section>
  );
};

export default Contacts;
