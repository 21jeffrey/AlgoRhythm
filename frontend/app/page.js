import React from 'react'
import './globals.css';
// import Navbar from './components/navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import BadgesChallenges from './components/BadgesChallenges';
import Contacts from './components/Contacts';

function page() {
  return (
    <main className="scroll-smooth bg-black text-white">
      {/* <Navbar/> */}
      <Hero />
      <Features />
      <BadgesChallenges />
      <Contacts />
    </main>
  )
}

export default page;