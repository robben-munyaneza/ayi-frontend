"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUsers, FaNewspaper, FaCogs, FaBullseye, FaChartBar, FaSignOutAlt, FaHome, FaInbox } from 'react-icons/fa';

import logo from '../assets/logo.png';

const links = [
  { to: '/admin/dashboard/team', icon: FaUsers, label: 'Team Members' },
  { to: '/admin/dashboard/insights', icon: FaNewspaper, label: 'Insights / Blog' },
  { to: '/admin/dashboard/contacts', icon: FaInbox, label: 'Messages' },
  { to: '/admin/dashboard/services', icon: FaCogs, label: 'Services' },
  { to: '/admin/dashboard/objectives', icon: FaBullseye, label: 'Objectives' },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    window.location.href = '/admin/login';
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#0d1117] border-r border-white/5 flex flex-col z-40">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
        <img src={logo.src || logo} alt="AYI" className="w-8 h-8 object-contain" />
        <div>
          <p className="text-white font-bold text-sm">AYI Admin</p>
          <p className="text-gray-500 text-xs">Fullstack Portal</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map(({ to, icon: Icon, label }) => {
          const isActive = pathname === to;
          return (
            <Link
              key={to}
              href={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="text-base" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/5 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <FaHome className="text-base" />
          View Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <FaSignOutAlt className="text-base" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
