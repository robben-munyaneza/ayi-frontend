import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTimes, FaSave, FaPlus, FaTrash } from 'react-icons/fa';
import { useContent } from '../../context/ContentContext';

// Static services list — editable descriptions/highlights only
// (icons, gradients and links are kept fixed to preserve design integrity)
const ServicesManager = () => {
  const { content, updateSection } = useContent();

  // We keep the full services array in defaultContent but allow
  // editing title, subtitle, description, highlights, and link.
  // Since services live in defaultContent (not in ContentContext yet),
  // we store overrides in context under 'services'.
  const rawServices = content.services || defaultServices;
  const [services, setServices] = useState(rawServices);
  const [editing, setEditing] = useState(null); // { index, form }
  const [saved, setSaved] = useState(false);

  const openEdit = (i) => {
    setEditing({ index: i, form: { ...services[i] } });
  };

  const handleFieldChange = (field, value) => {
    setEditing((e) => ({ ...e, form: { ...e.form, [field]: value } }));
  };

  const handleHighlightChange = (hi, value) => {
    const highlights = [...editing.form.highlights];
    highlights[hi] = value;
    handleFieldChange('highlights', highlights);
  };

  const addHighlight = () => handleFieldChange('highlights', [...editing.form.highlights, '']);
  const removeHighlight = (hi) => handleFieldChange('highlights', editing.form.highlights.filter((_, i) => i !== hi));

  const handleSave = () => {
    const updated = services.map((s, i) => i === editing.index ? editing.form : s);
    setServices(updated);
    updateSection('services', updated);
    setEditing(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputCls = "w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Services</h2>
          <p className="text-gray-500 text-sm mt-1">Edit service card content — titles, descriptions, highlights and links</p>
        </div>
        {saved && (
          <span className="text-sm text-green-400 font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400" /> All changes saved
          </span>
        )}
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {services.map((svc, i) => (
          <div key={svc.id} className="bg-[#0d1117] border border-white/5 rounded-2xl overflow-hidden">
            <div className={`h-1 w-full bg-gradient-to-r ${svc.gradient}`} />
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${svc.badgeColor}`}>{svc.badge}</span>
                  <h3 className="text-white font-bold mt-2">{svc.title}</h3>
                  <p className={`text-xs font-medium bg-gradient-to-r ${svc.gradient} bg-clip-text text-transparent`}>{svc.subtitle}</p>
                </div>
                <button
                  onClick={() => openEdit(i)}
                  className="flex-shrink-0 p-2 rounded-lg bg-white/5 hover:bg-indigo-500/20 hover:text-indigo-400 text-gray-400 transition-colors"
                >
                  <FaEdit className="text-sm" />
                </button>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-3">{svc.description}</p>
              <ul className="space-y-1">
                {svc.highlights.map((h, hi) => (
                  <li key={hi} className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setEditing(null)} />
            <motion.div
              className="relative bg-[#0d1117] border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 22 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-xl">Edit: {editing.form.title}</h3>
                <button onClick={() => setEditing(null)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400"><FaTimes /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Title</label>
                  <input value={editing.form.title} onChange={(e) => handleFieldChange('title', e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Subtitle</label>
                  <input value={editing.form.subtitle} onChange={(e) => handleFieldChange('subtitle', e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Description</label>
                  <textarea rows={4} value={editing.form.description} onChange={(e) => handleFieldChange('description', e.target.value)} className={`${inputCls} resize-none`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Link URL</label>
                  <input value={editing.form.link} onChange={(e) => handleFieldChange('link', e.target.value)} placeholder="e.g. /ayi-sphere or https://…" className={inputCls} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-400">Highlights</label>
                    <button onClick={addHighlight} className="flex items-center gap-1 text-xs px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-lg transition-colors">
                      <FaPlus className="text-xs" /> Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {editing.form.highlights.map((h, hi) => (
                      <div key={hi} className="flex gap-2">
                        <input value={h} onChange={(e) => handleHighlightChange(hi, e.target.value)} placeholder={`Highlight ${hi + 1}`} className={`${inputCls} flex-1`} />
                        <button onClick={() => removeHighlight(hi)} className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors">
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setEditing(null)} className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-medium transition-colors">Cancel</button>
                <button onClick={handleSave} className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors flex items-center justify-center gap-2">
                  <FaSave className="text-sm" /> Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Default services fallback (same as hardcoded in Services.jsx)
const defaultServices = [
  { id: 'ayi-coin', badge: 'Digital Asset', title: 'AYI Coin', subtitle: "Africa's Youth Investment Token", description: 'AYI Coin is the native digital currency of the AYI ecosystem — designed to empower Africa\'s youth with a decentralised store of value, reward mechanism, and investment vehicle.', highlights: ['Earn rewards on every transaction', 'Stake & grow your holdings', 'Cross-border payments, zero hassle', 'Exclusive member benefits'], gradient: 'from-amber-500 via-orange-500 to-yellow-400', badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/40', link: '#', comingSoon: true },
  { id: 'ayi-space', badge: 'Community', title: 'AYI Space', subtitle: "Where Africa's Youth Connect", description: 'AYI Space is our flagship community platform — a social hub for African youth to share ideas, collaborate on ventures, access educational content, and build meaningful networks.', highlights: ['Feed, posts & real-time chat', 'VIP membership tiers', 'Group creation & management', 'Exclusive announcements & events'], gradient: 'from-blue-500 via-indigo-500 to-violet-500', badgeColor: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40', link: '/ayi-sphere', comingSoon: false },
  { id: 'ayi-wallet', badge: 'FinTech', title: 'AYI Wallet', subtitle: 'Your Smart Financial Companion', description: 'AYI Wallet is the all-in-one financial layer of the AYI ecosystem — enabling seamless saving, money transfers, investment tracking, and mobile money integration tailored for African youth.', highlights: ['Mobile money integration (MTN, Airtel)', 'Track investments & savings', 'Instant peer-to-peer transfers', 'Secure, encrypted vault'], gradient: 'from-emerald-500 via-teal-500 to-cyan-500', badgeColor: 'bg-teal-500/20 text-teal-300 border border-teal-500/40', link: '/ayi-wallet', comingSoon: false },
  { id: 'financial-advisory', badge: 'Consultancy', title: 'Financial Advisory', subtitle: 'Wealth Management & Advice', description: 'Providing expert wealth management, investment advice, and comprehensive consultation for sustainable financial growth.', highlights: ['Wealth management', 'Investment advice', 'Financial consultation', 'Portfolio strategy'], gradient: 'from-purple-500 via-fuchsia-500 to-pink-500', badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40', link: '#', comingSoon: false },
  { id: 'business-consultancy', badge: 'Advisory', title: 'Business Consultancy', subtitle: 'Financial Education & Advisory', description: 'Expert business and management consultancy focusing on financial education, youth investment training, and strategic advisory services.', highlights: ['Financial education', 'Youth investment training', 'Advisory services', 'Business strategy'], gradient: 'from-rose-500 via-red-500 to-orange-500', badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/40', link: '#', comingSoon: false },
  { id: 'training-capacity', badge: 'Education', title: 'Training Services', subtitle: 'Capacity Building & Literacy', description: 'Empowering the next generation through dedicated financial literacy programs and comprehensive youth education initiatives.', highlights: ['Financial literacy', 'Youth education programs', 'Capacity building', 'Skill development'], gradient: 'from-sky-500 via-blue-500 to-indigo-500', badgeColor: 'bg-sky-500/20 text-sky-300 border border-sky-500/40', link: '#', comingSoon: false },
];

export default ServicesManager;
