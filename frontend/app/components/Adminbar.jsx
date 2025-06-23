'use client';

import React from 'react';
import { AcademicCapIcon, ArrowLeftEndOnRectangleIcon, HomeIcon, TrophyIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';


function Adminbar() {
  const Navbar = [
    {
        name: "Home",
        link: "/admin/dashboard",
        icon: HomeIcon,
    },
    {
      name: "Challenges",
      link: "/admin/dashboard/challenges",
      icon: AcademicCapIcon,
    },
    {
      name: "Users",
      link: "/admin/dashboard/users",
      icon: UserGroupIcon,
    },
    {
      name: "Badges",
      link: "/admin/dashboard/badges",
      icon: TrophyIcon,
    },
    {
      name: "Analytics",
      link: "/admin/dashboard/analytics",
      icon: ChartBarIcon,
    },
    {
      name: "Logout",
      link: "/admin/logout",
      icon: ArrowLeftEndOnRectangleIcon,  
    },

  ];

  return (
    <aside className="bg-gray-900 h-screen text-white p-4 w-64">
      <div className="flex items-center space-x-4 mb-8">
        <Image
          src="/logo.jpg"
          alt="Profile"
          className="w-15 h-15 rounded-full"
            width={60}
            height={60}
        />
        <div>
          <h2 className="text-lg font-semibold">Admin</h2>
        </div>
      </div>

      <nav>
        <ul className="space-y-10">
          {Navbar.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
                className="flex items-center hover:text-purple-700  text-[1.1rem] tracking-wide"
              >
                <item.icon className="h-6 w-6 mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Adminbar;
