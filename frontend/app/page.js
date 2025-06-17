import React from 'react'
import Navbar from './components/navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Contacts from './components/Contacts';

function page() {
  return (
    <div className='bg-black'>
      <Navbar/>
      <Hero/>
      <Features/>
      <Contacts/>
        </div>
  )
}

export default page;