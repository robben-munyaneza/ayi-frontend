import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUsers, FaNewspaper, FaCogs, FaBullseye, FaChartBar, FaSignOutAlt, FaHome } from 'react-icons/fa';
import logo from '../../assets/logo.png';

const links = [
  { to: '/admin/team', icon: FaUsers, label: 'Team Members' },
  { to: '/admin/insights', icon: FaNewspaper, label: 'Insights / Blog' },
  { to: '/admin/services', icon: FaCogs, label: 'Services' },
  { to: '/admin/objectives', icon: FaBullseye, label: 'About & Objectives' },
  { to: '/admin/stats', icon: FaChartBar, label: 'Stats Bar' },
];

const AdminSidebar = ({ adminName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-user');
    navigate('/admin/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#0d1117] border-r border-white/5 flex flex-col z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
        <img src={logo} alt="AYI" className="w-8 h-8 object-contain" />
        <div>
          <p className="text-white font-bold text-sm">AYI Admin</p>
          <p className="text-gray-500 text-xs">Content Management</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Icon className="text-base flex-shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/5 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <FaHome className="text-base" />
          View Website
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <FaSignOutAlt className="text-base" />
          Sign Out
          {adminName && <span className="ml-auto text-xs text-gray-600 truncate">{adminName}</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
