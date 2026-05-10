import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTimes, FaSave, FaPlus, FaTrash } from 'react-icons/fa';
import { useContent } from '../../context/ContentContext';

const ObjectivesManager = () => {
  const { content, updateSection } = useContent();
  const obj = content.objectives;

  const [mission, setMission] = useState(obj.mission);
  const [vision, setVision] = useState(obj.vision);
  const [values, setValues] = useState(obj.values);
  const [objectives, setObjectives] = useState(obj.objectives);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSection('objectives', { mission, vision, values, objectives });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // Values CRUD
  const addValue = () => setValues((v) => [...v, { id: Date.now().toString(), title: '', desc: '' }]);
  const updateValue = (id, field, val) => setValues((v) => v.map((x) => x.id === id ? { ...x, [field]: val } : x));
  const removeValue = (id) => setValues((v) => v.filter((x) => x.id !== id));

  // Objectives CRUD
  const addObj = () => setObjectives((v) => [...v, { id: Date.now().toString(), title: '', desc: '' }]);
  const updateObj = (id, field, val) => setObjectives((v) => v.map((x) => x.id === id ? { ...x, [field]: val } : x));
  const removeObj = (id) => setObjectives((v) => v.filter((x) => x.id !== id));

  const inputCls = "w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm";

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-white">About &amp; Objectives</h2>
          <p className="text-gray-500 text-sm mt-1">Edit mission, vision, core values and key objectives</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 font-semibold rounded-xl transition-all shadow-lg ${saved ? 'bg-green-600 text-white shadow-green-500/20' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20'}`}
        >
          <FaSave className="text-sm" /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-8">
        {/* Mission */}
        <div className="bg-[#0d1117] border border-white/5 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">M</span>
            Mission Statement
          </h3>
          <textarea value={mission} onChange={(e) => setMission(e.target.value)} rows={4} className={inputCls} placeholder="Our mission is…" />
        </div>

        {/* Vision */}
        <div className="bg-[#0d1117] border border-white/5 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">V</span>
            Vision Statement
          </h3>
          <textarea value={vision} onChange={(e) => setVision(e.target.value)} rows={4} className={inputCls} placeholder="Our vision is…" />
        </div>

        {/* Core Values */}
        <div className="bg-[#0d1117] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold">Core Values</h3>
            <button onClick={addValue} className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-lg transition-colors">
              <FaPlus /> Add Value
            </button>
          </div>
          <div className="space-y-3">
            {values.map((v) => (
              <div key={v.id} className="flex gap-3 items-start p-3 bg-[#030712] rounded-xl border border-white/5">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <input value={v.title} onChange={(e) => updateValue(v.id, 'title', e.target.value)} placeholder="Title (e.g. Integrity)" className={inputCls} />
                  <input value={v.desc} onChange={(e) => updateValue(v.id, 'desc', e.target.value)} placeholder="Short description…" className={inputCls} />
                </div>
                <button onClick={() => removeValue(v.id)} className="p-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 mt-0.5 transition-colors">
                  <FaTrash className="text-xs" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Key Objectives */}
        <div className="bg-[#0d1117] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold">Key Objectives</h3>
            <button onClick={addObj} className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-lg transition-colors">
              <FaPlus /> Add Objective
            </button>
          </div>
          <div className="space-y-3">
            {objectives.map((o) => (
              <div key={o.id} className="flex gap-3 items-start p-3 bg-[#030712] rounded-xl border border-white/5">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <input value={o.title} onChange={(e) => updateObj(o.id, 'title', e.target.value)} placeholder="Title (e.g. Profitability)" className={inputCls} />
                  <input value={o.desc} onChange={(e) => updateObj(o.id, 'desc', e.target.value)} placeholder="Short description…" className={inputCls} />
                </div>
                <button onClick={() => removeObj(o.id)} className="p-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 mt-0.5 transition-colors">
                  <FaTrash className="text-xs" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectivesManager;
