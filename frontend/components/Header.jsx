'use client'
import React from 'react'
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AcademicCapIcon, UserIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';




function Header() {

    const router = useRouter();
    const token = Cookies.get('token');
    
    const handleLogout = () => {
            Cookies.remove('token');
    
            setTimeout(() => {
              router.push('/login');
              toast.success("Logged out successful");
            }, 300); 
        }
    const [navbar, setNavbar] = useState(false);
    const Navbar = [
        {   
            name: "Challenges",
            link: "/challenges",
            icon: AcademicCapIcon 
        },
  ...(token
    ? [{ 
        name: "Dashboard",
        link: "/dashboard",
        icon: UserIcon }]
    : [{ 
        name: "Login", 
        link: "/login", 
        icon: ArrowLeftEndOnRectangleIcon }]),
];

return (
    <nav className="w-full bg-blend-purple bg-gradient-to-l from-purple-500 to-violet-900 shadow-md relative">
        <div className="flex justify-between items-center px-4 mx-auto lg:max-w-7xl md:px-8">
            {/* Logo */}
            <Link href="/" className="text-3xl text-gray-800 font-semibold tracking-wider py-3 md:py-5">
                ALGO.
            </Link>
            <div
                className={`${
                    navbar ? "block" : "hidden"
                } md:block`}
            >
                <ul className="flex items-center space-x-6">
                    {Navbar.map((item, index) => (
                        <li key={index} className="text-gray-800">
                            <Link
                                href={item.link}
                                className="flex items-center text-gray-800 hover:text-gray-400 text-[1.15rem] font-medium tracking-wider"
                                onClick={() => setNavbar(false)}
                            >
                                <item.icon className="h-6 w-6 mr-2" />
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    <li>
                        {token && <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                        >
                            Logout
                        </button>}
                    </li>
                </ul>
            </div>
        </div>
    </nav>
)
}

export default Header