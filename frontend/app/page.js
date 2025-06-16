import React from 'react'
import Navbar from './components/navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Cards from './components/cards';

function page() {
  return (
    <div className='bg-black'>
      <Navbar/>
      <Hero/>
      <Features/>
      <Cards/>

        </div>
  )
}

export default page;