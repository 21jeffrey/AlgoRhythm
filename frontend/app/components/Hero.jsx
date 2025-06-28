"use client";
import React from 'react';
import { ReactTyped } from "react-typed";
import { ChevronDown, ArrowUp } from "lucide-react";
import Aurora from '@/public/Backgrounds/Aurora/Aurora';
import Link from 'next/link';

const Hero = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-screen text-white overflow-hidden">
      
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#530C73", "#63126E", "#7B248F", "#A64DBD"]}
          blend={0.84}
          amplitude={0.6}
          speed={1.5}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-[800px] w-full min-h-screen mx-auto text-center flex flex-col justify-center pt-28 pb-12">
<<<<<<< HEAD
        <p className='text-purple-300 font-bold p-2'>GROWING WITH ALGORHYTHM</p>
=======
>>>>>>> 09c79a52065076a8c987f3a38bfdaf56d318077d
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Grow with code.</h1>
        
        <div className='flex justify-center items-center whitespace-nowrap text-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            Efficient Learning for 
          </p>
          <ReactTyped
            className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2 text-purple-300'
            strings={['BEGINNER', 'ADVANCED']}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
          <p className='md:text-5xl sm:text-4xl text-xl font-bold'>
            LEARNERS
          </p>
        </div>

        <p className='md:text-2xl text-xl font-bold text-gray-300 mb-8'>Become one of the best developers within your field</p>
        <Link href="/register">
          <button className='bg-purple-600 hover:bg-purple-700 w-[200px] rounded-md font-medium my-6 mx-auto py-3 transition duration-300'>
            Join Us
          </button>
        </Link>
        
        {/* Scroll to Features Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={scrollToFeatures}
            className="flex flex-col items-center px-4 py-2 border-2 border-purple-400 rounded-xl bg-black/40 text-purple-300 hover:bg-purple-600 hover:text-white transition duration-300 shadow-md animate-bounce"
            style={{backdropFilter: 'blur(4px)'}}
          >
            <span className="text-sm mb-1">Explore Features</span>
            <ChevronDown className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
