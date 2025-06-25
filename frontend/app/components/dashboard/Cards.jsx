import React from 'react'
import { AcademicCapIcon,  HomeIcon,  UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import {Award} from 'lucide-react';
import Link from 'next/link';


function Cards() {
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
      name: "Learners",
      link: "/admin/dashboard/learners",
      icon: UserGroupIcon,
    },
    {
      name: "Badges",
      link: "/admin/dashboard/badges",
      icon: Award,
    },
    {
      name: "Analytics",
      link: "/admin/dashboard/analytics",
      icon: ChartBarIcon,
    },


  ];
  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
            {Navbar.map((item, index) => (
            <Link href={item.link} key={index} className="bg-violet-800 rounded-lg shadow-md p-6 hover:shadow-[0_10px_15px_rgba(139,92,246,0.4)] transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                <item.icon className="h-8 w-8 text-gray-500" />
               
                </div>
                 <h3 className="text-xl font-semibold">{item.name}</h3>
            </Link>
            ))}
        </div>
    </div>
  )
}

export default Cards