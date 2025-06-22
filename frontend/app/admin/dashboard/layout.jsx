'use client';
import React from 'react';
import Adminbar from '@/app/components/Adminbar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen  ">
      {/* Sidebar */}
      <div className="w-64 ">
        <Adminbar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        {children}
      </div>
    </div>
  );
}
