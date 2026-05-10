"use client";
import React from 'react';
import { FaCogs, FaTools } from 'react-icons/fa';

const ServicesManagement = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-white">Services Management</h3>
      </div>

      <div className="bg-[#0d1117] border border-white/5 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
          <FaTools className="text-indigo-400 text-3xl" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Module Under Construction</h2>
        <p className="text-gray-400 max-w-md">
          The Services API and MongoDB models have not been fully implemented yet. Once the backend routes are created, this dashboard will allow you to dynamically add, edit, and remove company services.
        </p>
      </div>
    </div>
  );
};

export default ServicesManagement;
