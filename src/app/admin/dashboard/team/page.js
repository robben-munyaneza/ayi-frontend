"use client";
import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import { toast, Toaster } from 'sonner';
import Image from 'next/image';
import { motion } from 'framer-motion';

import devotha from '../../../../assets/team/devotha.jpg';
import gilbert from '../../../../assets/team/gilbert.jpg';
import immaculee from '../../../../assets/team/immaculee.jpg';
import paul from '../../../../assets/team/paul.jpg';
import rukundo from '../../../../assets/team/rukundo.jpg';
import mugema from '../../../../assets/team/mugema.jpg';
import adrien from '../../../../assets/team/adrien.jpg';
import murara from '../../../../assets/team/murara.jpg';
import tuyizere from '../../../../assets/team/tuyizere.jpg';
import xavier from '../../../../assets/team/xavier.jpg';

const originalImages = { devotha, gilbert, immaculee, paul, rukundo, mugema, adrien, murara, tuyizere, xavier };

const TeamManagement = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', email: '', phone: '', image: '' });

  const fetchTeam = async () => {
    try {
      const res = await fetch('/api/team');
      const data = await res.json();
      if (data.success) setMembers(data.data);
    } catch (err) {
      toast.error("Failed to fetch team.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/team/${editing._id}` : '/api/team';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editing ? "Member updated!" : "Member added!");
        setShowModal(false);
        setEditing(null);
        setForm({ name: '', role: '', email: '', phone: '', image: '' });
        fetchTeam();
      }
    } catch (err) {
      toast.error("Save failed.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/team/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success("Member removed.");
        fetchTeam();
      }
    } catch (err) {
      toast.error("Delete failed.");
    }
  };

  return (
    <div>
      <Toaster richColors />
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-white">Team Members</h3>
        <button
          onClick={() => { setShowModal(true); setEditing(null); }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all"
        >
          <FaPlus /> Add Member
        </button>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <p className="text-gray-500">Loading team...</p>
        ) : (
          members.map((member) => {
            const fallback = originalImages[member.imageKey];
            const imgSrc = member.image || (fallback?.src || fallback) || 'https://via.placeholder.com/400x400/1f2937/4b5563?text=AYI';
            return (
            <div key={member._id} className="bg-[#0d1117] border border-white/5 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800 relative">
                  <img src={imgSrc} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-bold">{member.name}</h4>
                  <p className="text-gray-500 text-sm">{member.role}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setEditing(member); setForm(member); setShowModal(true); }}
                  className="p-2 text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(member._id)}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          );
        })
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0d1117] border border-white/10 rounded-3xl p-8 w-full max-w-md"
          >
            <h3 className="text-xl font-bold text-white mb-6">{editing ? 'Edit Member' : 'Add Member'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <input
                placeholder="Full Name"
                className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white focus:border-indigo-500 outline-none"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                placeholder="Role"
                className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white focus:border-indigo-500 outline-none"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white focus:border-indigo-500 outline-none"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                placeholder="Phone Number (Optional)"
                className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white focus:border-indigo-500 outline-none"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Profile Image</label>
                <div className="flex items-center gap-4">
                  {form.image && (
                    <img src={form.image} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-white/10" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-2 bg-[#030712] border border-white/10 rounded-xl text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 transition-all cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
                >
                  <FaSave className="inline mr-2" /> Save
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
