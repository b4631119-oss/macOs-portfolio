"use client"
import React, { useState, useEffect } from 'react';

const Navigation = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <nav className="macos-navbar fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between h-10 px-4 bg-[#1a1a1a]/90 backdrop-blur-xl border-b border-[#2a2a2a]">
        {/* Left Side: Apple Menu & App Menus */}
        <div className="flex items-center gap-1">
          <div className="nav-item px-3 cursor-pointer hover:bg-white/10 rounded-md transition-colors">
            <img className="w-4 h-4 invert" src="./navbar-icons/apple.svg" alt="apple" />
          </div>
          <div className="flex items-center text-[13px] font-medium text-gray-200">
            <p className="nav-item font-semibold px-3 py-1 cursor-pointer hover:bg-white/10 rounded-md transition-colors">Finder</p>
            <div className="hidden md:flex">
              <p className="nav-item px-3 py-1 cursor-pointer hover:bg-white/10 rounded-md transition-colors">File</p>
              <p className="nav-item px-3 py-1 cursor-pointer hover:bg-white/10 rounded-md transition-colors">Edit</p>
              <p className="nav-item px-3 py-1 cursor-pointer hover:bg-white/10 rounded-md transition-colors">View</p>
              <p className="nav-item px-3 py-1 cursor-pointer hover:bg-white/10 rounded-md transition-colors">Go</p>
              <p className="nav-item px-3 py-1 cursor-pointer hover:bg-white/10 rounded-md transition-colors">Window</p>
              <p className="nav-item px-3 py-1 cursor-pointer hover:bg-white/10 rounded-md transition-colors">Help</p>
            </div>
          </div>
        </div>

        {/* Right Side: Status Icons & Time */}
        <div className="flex items-center gap-2 text-[13px] font-medium text-gray-200">
          <div className="nav-item px-2 py-1 cursor-pointer hover:bg-white/10 rounded-md transition-colors">
            <img className="w-4 h-4 invert" src="./navbar-icons/wifi.svg" alt="wifi" />
          </div>
          <div className="nav-item px-3 py-1 cursor-pointer hover:bg-white/10 rounded-md transition-colors flex gap-3">
            <span>{formatDate(time)}</span>
            <span>{formatTime(time)}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;