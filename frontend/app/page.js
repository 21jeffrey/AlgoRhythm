import React from 'react'
import Navbar from './components/navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Contacts from './components/Contacts';

function page() {
  return (
    <main className="scroll-smooth bg-black text-white">
      <Navbar/>
      <Hero />
      <Features />
      <Contacts />
    </main>
  )
}

export default page;