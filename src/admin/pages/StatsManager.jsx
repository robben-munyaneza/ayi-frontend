import React, { useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { useContent } from '../../context/ContentContext';

const StatsManager = () => {
  const { content, updateSection } = useContent();
  const [stats, setStats] = useState(content.stats);
  const [saved, setSaved] = useState(false);

  const update = (id, field, val) =>
    setStats((s) => s.map((x) => (x.id === id ? { ...x, [field]: val } : x)));

  const handleSave = () => {
    updateSection('stats', stats);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputCls = "w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-center text-xl font-extrabold";

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Stats Bar</h2>
          <p className="text-gray-500 text-sm mt-1">Numbers shown in the Services section strip</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 font-semibold rounded-xl transition-all shadow-lg ${saved ? 'bg-green-600 text-white shadow-green-500/20' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20'}`}
        >
          <FaSave className="text-sm" /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-[#0d1117] border border-white/5 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 text-center">Value</label>
              <input
                value={stat.value}
                onChange={(e) => update(stat.id, 'value', e.target.value)}
                placeholder="e.g. 10K+"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 text-center">Label</label>
              <input
                value={stat.label}
                onChange={(e) => update(stat.id, 'label', e.target.value)}
                placeholder="e.g. Youth Members"
                className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-center text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Preview */}
      <div className="mt-8 rounded-2xl overflow-hidden border border-white/5 bg-white/3">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3 border-b border-white/5">Preview</p>
        <div className="grid grid-cols-4 divide-x divide-white/5">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center py-6 px-2">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent">{stat.value}</span>
              <span className="text-gray-500 text-xs mt-1 uppercase tracking-wide">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsManager;
