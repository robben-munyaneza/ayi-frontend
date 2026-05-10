import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa';
import { useContent } from '../../context/ContentContext';
import ImageUploader from '../components/ImageUploader';
import ConfirmModal from '../components/ConfirmModal';

// Original images for preview in table
import devotha from '../../assets/team/devotha.jpg';
import gilbert from '../../assets/team/gilbert.jpg';
import immaculee from '../../assets/team/immaculee.jpg';
import paul from '../../assets/team/paul.jpg';
import rukundo from '../../assets/team/rukundo.jpg';
import mugema from '../../assets/team/mugema.jpg';
import adrien from '../../assets/team/adrien.jpg';
import murara from '../../assets/team/murara.jpg';
import tuyizere from '../../assets/team/tuyizere.jpg';
import xavier from '../../assets/team/xavier.jpg';

const originalImages = { devotha, gilbert, immaculee, paul, rukundo, mugema, adrien, murara, tuyizere, xavier };

const emptyMember = { id: '', name: '', role: '', email: '', phone: '', imageKey: '', image: null };

const TeamManager = () => {
  const { content, updateSection } = useContent();
  const members = content.teamMembers;

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null); // null = add mode
  const [form, setForm] = useState(emptyMember);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const openAdd = () => {
    setForm({ ...emptyMember, id: Date.now().toString() });
    setEditing(null);
    setModal(true);
  };

  const openEdit = (member) => {
    setForm({ ...member });
    setEditing(member.id);
    setModal(true);
  };

  const closeModal = () => { setModal(false); setForm(emptyMember); };

  const handleSave = () => {
    if (!form.name.trim() || !form.role.trim()) return alert('Name and Role are required.');
    let updated;
    if (editing) {
      updated = members.map((m) => (m.id === editing ? form : m));
    } else {
      updated = [...members, form];
    }
    updateSection('teamMembers', updated);
    closeModal();
  };

  const handleDelete = () => {
    updateSection('teamMembers', members.filter((m) => m.id !== deleteTarget));
    setDeleteTarget(null);
  };

  const getImg = (m) => m.image || originalImages[m.imageKey] || null;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Team Members</h2>
          <p className="text-gray-500 text-sm mt-1">{members.length} members — changes publish to website instantly</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-500/20">
          <FaPlus className="text-sm" /> Add Member
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#0d1117] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Member</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Role</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Contact</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-white/2 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                      {getImg(m)
                        ? <img src={getImg(m)} alt={m.name} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs font-bold">{m.name[0]}</div>
                      }
                    </div>
                    <span className="text-white font-medium text-sm">{m.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="text-indigo-400 text-xs font-medium uppercase tracking-wider">{m.role}</span>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <p className="text-gray-400 text-sm">{m.email}</p>
                  <p className="text-gray-600 text-xs">{m.phone}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(m)} className="p-2 rounded-lg bg-white/5 hover:bg-indigo-500/20 hover:text-indigo-400 text-gray-400 transition-colors">
                      <FaEdit className="text-sm" />
                    </button>
                    <button onClick={() => setDeleteTarget(m.id)} className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-400 transition-colors">
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
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
                <h3 className="text-white font-bold text-xl">{editing ? 'Edit Member' : 'Add Member'}</h3>
                <button onClick={closeModal} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-colors"><FaTimes /></button>
              </div>

              <div className="space-y-4">
                <ImageUploader label="Profile Photo" value={form.image} onChange={(v) => setForm((f) => ({ ...f, image: v }))} />

                {[
                  { label: 'Full Name *', key: 'name', placeholder: 'e.g. Paul HAKUZIMANA' },
                  { label: 'Role / Position *', key: 'role', placeholder: 'e.g. Chief Executive Officer' },
                  { label: 'Email Address', key: 'email', placeholder: 'e.g. paul@example.com', type: 'email' },
                  { label: 'Phone Number', key: 'phone', placeholder: 'e.g. +250 782 029 528' },
                ].map(({ label, key, placeholder, type = 'text' }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">{label}</label>
                    <input
                      type={type}
                      value={form[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={closeModal} className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-medium transition-colors">Cancel</button>
                <button onClick={handleSave} className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors flex items-center justify-center gap-2">
                  <FaSave className="text-sm" /> {editing ? 'Save Changes' : 'Add Member'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Remove Team Member"
        message="This will remove the member from the website. This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        confirmLabel="Remove"
      />
    </div>
  );
};

export default TeamManager;
