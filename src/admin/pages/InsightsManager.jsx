import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa';
import { useContent } from '../../context/ContentContext';
import ImageUploader from '../components/ImageUploader';
import ConfirmModal from '../components/ConfirmModal';

import invest from '../../assets/insights/invest.jpeg';
import invest1 from '../../assets/insights/invest1.jpeg';
import people from '../../assets/insights/people.jpeg';
import tree from '../../assets/insights/tree.jpeg';
const originalImages = { invest, invest1, people, tree };

const emptyInsight = { id: '', title: '', category: '', date: '', link: '', imageKey: '', image: null };

const CATEGORIES = ['Education', 'Investment', 'Innovation', 'Sustainability', 'Community', 'Finance', 'News'];

const InsightsManager = () => {
  const { content, updateSection } = useContent();
  const insights = content.insights;

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyInsight);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const openAdd = () => {
    setForm({ ...emptyInsight, id: Date.now().toString(), date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) });
    setEditing(null);
    setModal(true);
  };

  const openEdit = (item) => { setForm({ ...item }); setEditing(item.id); setModal(true); };
  const closeModal = () => { setModal(false); setForm(emptyInsight); };

  const handleSave = () => {
    if (!form.title.trim() || !form.category.trim()) return alert('Title and Category are required.');
    const updated = editing
      ? insights.map((i) => (i.id === editing ? form : i))
      : [...insights, form];
    updateSection('insights', updated);
    closeModal();
  };

  const handleDelete = () => {
    updateSection('insights', insights.filter((i) => i.id !== deleteTarget));
    setDeleteTarget(null);
  };

  const getImg = (item) => item.image || originalImages[item.imageKey] || null;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Insights / Blog</h2>
          <p className="text-gray-500 text-sm mt-1">{insights.length} articles published</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-500/20">
          <FaPlus className="text-sm" /> Add Article
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {insights.map((item) => (
          <div key={item.id} className="bg-[#0d1117] border border-white/5 rounded-2xl overflow-hidden group">
            <div className="aspect-[4/3] overflow-hidden relative bg-gray-900">
              {getImg(item)
                ? <img src={getImg(item)} alt={item.title} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-gray-700 text-xs">No image</div>
              }
              <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold uppercase px-2.5 py-1 rounded-full">
                {item.category}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold text-sm line-clamp-2 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-xs mb-4">{item.date}</p>
              <div className="flex gap-2">
                <button onClick={() => openEdit(item)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-indigo-500/20 hover:text-indigo-400 text-gray-400 text-xs font-medium transition-colors">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => setDeleteTarget(item.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-400 text-xs font-medium transition-colors">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />
            <motion.div
              className="relative bg-[#0d1117] border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 22 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-xl">{editing ? 'Edit Article' : 'Add Article'}</h3>
                <button onClick={closeModal} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400"><FaTimes /></button>
              </div>

              <div className="space-y-4">
                <ImageUploader label="Cover Image" value={form.image} onChange={(v) => setForm((f) => ({ ...f, image: v }))} />

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Title *</label>
                  <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Article title…" className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Category *</label>
                    <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all">
                      <option value="">Select…</option>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Date</label>
                    <input value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} placeholder="e.g. May 4, 2025" className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Article Link (URL)</label>
                  <input type="url" value={form.link} onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))} placeholder="https://…" className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all" />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={closeModal} className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-medium transition-colors">Cancel</button>
                <button onClick={handleSave} className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors flex items-center justify-center gap-2">
                  <FaSave className="text-sm" /> {editing ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmModal isOpen={!!deleteTarget} title="Delete Article" message="This will permanently remove this article from the website." onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} confirmLabel="Delete" />
    </div>
  );
};

export default InsightsManager;
