"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const pathname = usePathname();

  const handleNav = () => setNav(!nav);
  const handleCloseNav = () => setNav(false);

  // Scroll to Contacts section
  const handleScrollToContact = (e) => {
    e.preventDefault();
    setNav(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const linkClass = (href) =>
    `px-6 py-2 transition text-lg cursor-pointer select-none
      ${pathname === href ? "text-purple-400 font-bold border-b-2 border-purple-500" : "hover:text-purple-400"}
      hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500`;

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white bg-black">
      <h1 className="text-3xl font-bold text-[#2d0f4a] select-none">ALGO.</h1>
      <ul className="hidden md:flex flex-row items-center space-x-2">
        <li>
          <Link href="/" className={linkClass("/")}>Home</Link>
        </li>
        <li>
          <Link href="/about" className={linkClass("/about")}>About Us</Link>
        </li>
        <li>
          <a href="#contact" className={linkClass("#contact")} onClick={handleScrollToContact}>Contact Us</a>
        </li>
        <li>
          <Link href="/login">
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-semibold transition cursor-pointer hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500">
              Login
            </button>
          </Link>
        </li>
      </ul>
      <div onClick={handleNav} className="block md:hidden cursor-pointer absolute top-6 right-6">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      {/* Mobile Menu */}
      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-black ease-in-out duration-500 z-50 flex flex-col items-center pt-24"
            : "fixed left-[-100%] z-50"
        }
      >
        <h1 className="text-3xl font-bold text-[#2d0f4a] m-4 select-none">ALGO.</h1>
        <ul className="flex flex-col space-y-6 items-center w-full">
          <li className="w-full text-center">
            <Link href="/" className={linkClass("/")} onClick={handleCloseNav}>Home</Link>
          </li>
          <li className="w-full text-center">
            <Link href="/about" className={linkClass("/about")} onClick={handleCloseNav}>About Us</Link>
          </li>
          <li className="w-full text-center">
            <a href="#contact" className={linkClass("#contact")} onClick={(e) => { handleScrollToContact(e); handleCloseNav(); }}>Contact Us</a>
          </li>
          <li className="w-full text-center">
            <Link href="/login" onClick={handleCloseNav}>
              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-semibold transition cursor-pointer hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500">
                Login
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
