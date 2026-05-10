"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '../../../components/AdminSidebar';

import { useSession } from 'next-auth/react';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white font-bold">Loading secure portal...</div>;
  }

  return (
    <div className="min-h-screen bg-[#030712] flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen p-8">
        <header className="mb-10">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">AYI Group</p>
          <h2 className="text-2xl font-bold text-white">Admin Management</h2>
        </header>
        {children}
      </main>
    </div>
  );
}
