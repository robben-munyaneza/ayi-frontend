"use client";
import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import { toast, Toaster } from 'sonner';
import Image from 'next/image';
import { motion } from 'framer-motion';

import invest from '../../../../assets/insights/invest.jpeg';
import invest1 from '../../../../assets/insights/invest1.jpeg';
import people from '../../../../assets/insights/people.jpeg';
import tree from '../../../../assets/insights/tree.jpeg';

const originalImages = { invest, invest1, people, tree };

const InsightsManagement = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', category: '', content: '', image: '', date: '' });

  const fetchInsights = async () => {
    try {
      const res = await fetch('/api/insights');
      const data = await res.json();
      if (data.success) setInsights(data.data);
    } catch (err) {
      toast.error("Failed to fetch insights.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
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
    const url = editing ? `/api/insights/${editing._id}` : '/api/insights';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editing ? "Insight updated!" : "Insight published!");
        setShowModal(false);
        setEditing(null);
        setForm({ title: '', category: '', content: '', image: '', date: '' });
        fetchInsights();
      }
    } catch (err) {
      toast.error("Save failed.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/insights/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success("Insight deleted.");
        fetchInsights();
      }
    } catch (err) {
      toast.error("Delete failed.");
    }
  };

  return (
    <div>
      <Toaster richColors />
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-white">Insights / Blog</h3>
        <button
          onClick={() => { setShowModal(true); setEditing(null); }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all"
        >
          <FaPlus /> New Article
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-gray-500">Loading insights...</p>
        ) : (
          insights.map((item) => {
            const fallback = originalImages[item.imageKey];
            const imgSrc = item.image || (fallback?.src || fallback) || 'https://via.placeholder.com/600x400/1f2937/4b5563?text=Article';
            return (
            <div key={item._id} className="bg-[#0d1117] border border-white/5 rounded-2xl overflow-hidden group">
              <div className="aspect-video relative overflow-hidden bg-gray-900">
                  <img src={imgSrc} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2">
                  <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">{item.category}</span>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-white font-bold mb-2 line-clamp-2">{item.title}</h4>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-500 text-xs">{item.date}</span>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditing(item); setForm(item); setShowModal(true); }} className="text-gray-400 hover:text-indigo-400 transition-colors"><FaEdit /></button>
                    <button onClick={() => handleDelete(item._id)} className="text-gray-400 hover:text-red-400 transition-colors"><FaTrash /></button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0d1117] border border-white/10 rounded-3xl p-8 w-full max-w-2xl my-auto"
          >
            <h3 className="text-xl font-bold text-white mb-6">{editing ? 'Edit Article' : 'New Article'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Title"
                  className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white focus:border-indigo-500 outline-none"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
                <input
                  placeholder="Category (e.g. Education)"
                  className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white focus:border-indigo-500 outline-none"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Article Cover Image</label>
                <div className="flex items-center gap-4">
                  {form.image && (
                    <img src={form.image} alt="Preview" className="w-16 h-10 object-cover rounded-lg border border-white/10" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-2 bg-[#030712] border border-white/10 rounded-xl text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 transition-all cursor-pointer"
                  />
                </div>
              </div>
              <textarea
                placeholder="Content (Markdown or HTML supported)"
                rows={8}
                className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white focus:border-indigo-500 outline-none resize-none"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
              />
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-white/5 text-white rounded-xl font-semibold">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20">
                  <FaSave className="inline mr-2" /> {editing ? 'Update' : 'Publish'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default InsightsManagement;
