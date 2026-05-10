import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';

const AdminDashboard = () => {
  const token = localStorage.getItem('admin-token');
  const user = JSON.parse(localStorage.getItem('admin-user') || '{}');

  if (!token) return <Navigate to="/admin/login" />;

  return (
    <div className="min-h-screen bg-[#030712] flex">
      <AdminSidebar adminName={user?.names || user?.email || 'Admin'} />

      {/* Main content area — offset for sidebar */}
      <main className="flex-1 ml-64 min-h-screen">
        {/* Top header bar */}
        <header className="sticky top-0 z-30 bg-[#030712]/95 backdrop-blur-md border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest">AYI Group</p>
            <h1 className="text-white font-bold text-lg">Content Management</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-gray-400">Live — changes publish instantly</span>
          </div>
        </header>

        {/* Page content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
