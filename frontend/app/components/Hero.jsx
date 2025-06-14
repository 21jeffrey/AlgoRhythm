 "use client";
 import React from 'react';
import  {ReactTyped}  from "react-typed";
 const Hero = ()=> {
    return (
        <div className='text-white'>
            <div className= ' max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center '>
               <p className='text-[#310347] font-bold p-2'>GROWING WITH ALGORHYTHM</p>
               <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Grow with code.</h1>
               <div className=' flex justify-center items-center whitespace-nowrap text-center '>
                <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4 '>
                    Efficient Learning for 
                    </p>
              <ReactTyped 
              className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
              strings={['BEGINNER', 'ADVANCED']} 
              typeSpeed={120} 
               backSpeed={140}
                loop

                />
                 <p className='md:text-5xl sm:text-4xl text-xl font-bold '>
                    LEARNERS
                    </p>
               </div>
               <p className='md:text-2xl text-xl font-bold text-gray-500'>Become one of the best developers within your field </p>
         <button className='bg-[#310347] w-[200px] rounded-md font-medium my-6 mx-auto py-3 '>Join Us</button>
       

            </div>
        </div>
    );
 };
 export default Hero;