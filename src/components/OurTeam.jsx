"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

// Bundled photos for the original team members. These are real image assets
// (not content) — the member DATA itself comes from the database. A member
// document references one of these by `imageKey`, or stores its own `image`.
import devotha from '../assets/team/devotha.jpg';
import gilbert from '../assets/team/gilbert.jpg';
import immaculee from '../assets/team/immaculee.jpg';
import paul from '../assets/team/paul.jpg';
import rukundo from '../assets/team/rukundo.jpg';
import mugema from '../assets/team/mugema.jpg';
import adrien from '../assets/team/adrien.jpg';
import murara from '../assets/team/murara.jpg';
import tuyizere from '../assets/team/tuyizere.jpg';
import xavier from '../assets/team/xavier.jpg';

const originalImages = { devotha, gilbert, immaculee, paul, rukundo, mugema, adrien, murara, tuyizere, xavier };

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const OurTeam = ({ members }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [teamMembers, setTeamMembers] = useState(members || []);
  const [loading, setLoading] = useState(!members);

  useEffect(() => {
    // If a parent passed members in, use those and skip fetching.
    if (members && members.length > 0) {
      setTeamMembers(members);
      setLoading(false);
      return;
    }
    let active = true;
    const fetchTeam = async () => {
      try {
        const res = await fetch('/api/team');
        if (!res.ok) throw new Error('API response not ok');
        const data = await res.json();
        if (active && data.success) setTeamMembers(data.data || []);
      } catch (error) {
        console.error('Failed to fetch team:', error);
        if (active) setTeamMembers([]);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchTeam();
    return () => { active = false; };
  }, [members]);

  return (
    <section id="ourteam" ref={ref} className="py-24 bg-[#030712] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-indigo-500" />
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Leadership</span>
            <div className="h-px w-8 bg-indigo-500" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Meet the Team</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Driving impactful change in youth development through innovation, integrity, and collaboration.
          </p>
        </motion.div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-[#0d1117] border border-white/5 rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-square bg-white/5" />
                <div className="p-5 space-y-2">
                  <div className="h-3 bg-white/10 rounded w-2/3 mx-auto" />
                  <div className="h-3 bg-white/5 rounded w-1/2 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && teamMembers.length === 0 && (
          <p className="text-center text-gray-500">No team members have been added yet.</p>
        )}

        {!loading && teamMembers.length > 0 && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {teamMembers.map((member, index) => {
            const fallback = originalImages[member.imageKey];
            const imgSrc = member.image || (fallback?.src || fallback) || 'https://via.placeholder.com/400x400/1f2937/4b5563?text=AYI';
            return (
              <motion.div
                key={member._id || index}
                variants={cardVariants}
                className="group relative bg-[#0d1117] border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-colors"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={imgSrc}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400/1f2937/4b5563?text=AYI'; }}
                  />
                  <div className="absolute inset-0 bg-indigo-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                    <a href={`mailto:${member.email}`} className="w-10 h-10 rounded-full bg-white text-indigo-900 flex items-center justify-center hover:scale-110 transition-transform">
                      <FaEnvelope />
                    </a>
                    <a href={`tel:${member.phone}`} className="w-10 h-10 rounded-full bg-white text-indigo-900 flex items-center justify-center hover:scale-110 transition-transform">
                      <FaPhoneAlt />
                    </a>
                  </div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-white font-bold text-sm tracking-wide mb-1 truncate">{member.name}</h3>
                  <p className="text-indigo-400 text-xs font-medium uppercase tracking-wider line-clamp-2 min-h-[2rem] flex items-center justify-center">{member.role}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        )}
      </div>
    </section>
  );
};

export default OurTeam;
