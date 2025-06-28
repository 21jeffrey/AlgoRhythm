"use client";
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const dropdownRef = useRef(null);
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}api/user/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) setUser(data.user);
        });
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const linkClass = (href) =>
    `px-6 py-2 transition text-lg cursor-pointer select-none
      ${pathname === href ? "text-purple-400 font-bold border-b-2 border-purple-500" : "hover:text-purple-400"}
      hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500`;

  return (
    <div className="flex justify-between items-center h-24 w-full px-4 text-white bg-black" style={{backgroundColor: '#000'}}>
      <h1 className="text-3xl font-bold text-[#2d0f4a] select-none">ALGO.</h1>
      <ul className="hidden md:flex flex-row items-center space-x-2">
        <li>
          <Link href="/" className={linkClass("/")}>Home</Link>
        </li>
        <li>
          <Link href="/challenges/page2" className={linkClass("/challenges/page2")}>Challenges</Link>
        </li>
        <li>
          <Link href="/about" className={linkClass("/about")}>About Us</Link>
        </li>
        <li>
          <a href="#contact" className={linkClass("#contact")} onClick={handleScrollToContact}>Contact Us</a>
        </li>
        <li className="relative">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="p-0 border-2 border-purple-500 rounded-full bg-white hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-purple-400"
                onClick={() => setDropdownOpen((open) => !open)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
              >
                <img
                  src={user.avatar_image ? `${process.env.NEXT_PUBLIC_API_URL}storage/${user.avatar_image}` : '/default-avatar.png'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-lg z-50 p-4 min-w-max">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={user.avatar_image ? `${process.env.NEXT_PUBLIC_API_URL}storage/${user.avatar_image}` : '/default-avatar.png'}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
                    />
                    <div>
                      <div className="font-bold text-lg">{user.name}</div>
                      <div className="text-gray-600 text-sm">{user.email}</div>
                    </div>
                  </div>
                  <Link href="/profile" className="block mt-2 text-purple-700 font-semibold hover:underline">View Profile</Link>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-semibold transition cursor-pointer hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500">
                Login
              </button>
            </Link>
          )}
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
        style={{backgroundColor: '#000'}}
      >
        <h1 className="text-3xl font-bold text-[#2d0f4a] m-4 select-none">ALGO.</h1>
        <ul className="flex flex-col space-y-6 items-center w-full">
          <li className="w-full text-center">
            <Link href="/" className={linkClass("/")} onClick={handleCloseNav}>Home</Link>
          </li>
          <li className="w-full text-center">
           <Link href="/challenges/page2" className={linkClass("/challenges/page2")} onClick={handleCloseNav}>Challenges</Link> 
          </li>
          <li className="w-full text-center">
            <Link href="/about" className={linkClass("/about")} onClick={handleCloseNav}>About Us</Link>
          </li>
          <li className="w-full text-center">
            <a href="#contact" className={linkClass("#contact")} onClick={(e) => { handleScrollToContact(e); handleCloseNav(); }}>Contact Us</a>
          </li>
          <li className="w-full text-center">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="p-0 border-2 border-purple-500 rounded-full bg-white hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-purple-400 mx-auto"
                  onClick={() => setDropdownOpen((open) => !open)}
                  onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                >
                  <img
                    src={user.avatar_image ? `${process.env.NEXT_PUBLIC_API_URL}storage/${user.avatar_image}` : '/default-avatar.png'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-lg z-50 p-4 min-w-max">
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={user.avatar_image ? `${process.env.NEXT_PUBLIC_API_URL}storage/${user.avatar_image}` : '/default-avatar.png'}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
                      />
                      <div>
                        <div className="font-bold text-lg">{user.name}</div>
                        <div className="text-gray-600 text-sm">{user.email}</div>
                      </div>
                    </div>
                    <Link href="/profile" className="block mt-2 text-purple-700 font-semibold hover:underline">View Profile</Link>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" onClick={handleCloseNav}>
                <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-semibold transition cursor-pointer hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500">
                  Login
                </button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
