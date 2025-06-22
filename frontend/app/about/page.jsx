"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Users, Target, Award, Zap, ArrowUp, Home as HomeIcon } from "lucide-react";
import Aurora from "@/public/Backgrounds/Aurora/Aurora";
import Link from "next/link";

const AboutUs = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: false,
      mirror: true,
      offset: 200,
    });

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#530C73", "#63126E", "#7B248F", "#A64DBD"]}
          blend={0.84}
          amplitude={0.6}
          speed={1.5}
        />
      </div>

      {/* Go Home Button */}
      <div className="relative z-20 flex justify-center pt-8">
        <Link href="/">
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition">
            <HomeIcon className="w-5 h-5" /> Go to Home
          </button>
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-4 py-20">
        {/* Header */}
        <div data-aos="zoom-in" className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6">About AlgoRhythm</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Empowering developers to grow through collaborative learning, 
            competitive challenges, and continuous improvement.
          </p>
        </div>

        {/* Mission Section */}
        <div data-aos="fade-up" className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-300 mb-6">
                At AlgoRhythm, we believe that the best way to learn coding is through 
                practice, collaboration, and friendly competition. Our platform is designed 
                to make learning algorithms and data structures engaging and effective.
              </p>
              <p className="text-lg text-gray-300">
                We're committed to helping developers of all skill levels improve their 
                problem-solving abilities and build a strong foundation in computer science.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
                <Target className="h-20 w-20 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div data-aos="fade-up" className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-800 rounded-lg border border-purple-500">
              <Users className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Community</h3>
              <p className="text-gray-300">
                Building a supportive community where developers can learn from each other 
                and grow together.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-800 rounded-lg border border-purple-500">
              <Award className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Excellence</h3>
              <p className="text-gray-300">
                Striving for excellence in everything we do, from problem quality to 
                user experience.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-800 rounded-lg border border-purple-500">
              <Zap className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Innovation</h3>
              <p className="text-gray-300">
                Continuously innovating our platform to provide the best learning 
                experience possible.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div data-aos="fade-up">
          <h2 className="text-4xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-2 gap-8 justify-center">
            {[
              { name: "Ayana", role: "Co-Founder", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Ayana" },
              { name: "Jeff", role: "Co-Founder", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Jeff" }
            ].map((member, index) => (
              <div key={index} className="text-center p-6 bg-gray-800 rounded-lg border border-purple-500">
                <div className="flex justify-center mb-4">
                  <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full border-4 border-purple-400 shadow-lg object-cover bg-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-purple-300">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition duration-300 z-50"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default AboutUs; 