"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

// Original image imports (fallback)
import invest from '../assets/insights/invest.jpeg';
import invest1 from '../assets/insights/invest1.jpeg';
import people from '../assets/insights/people.jpeg';
import tree from '../assets/insights/tree.jpeg';

const originalImages = { invest, invest1, people, tree };

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Insights = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch('/api/insights');
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setInsights(data.data);
        } else {
          // Auto-seed and retry if empty
          const fallbackRes = await fetch('/api/seed');
          if(fallbackRes.ok) fetchInsights();
        }
      } catch (error) {
        console.error("Failed to fetch insights:", error);
      }
    };
    fetchInsights();
  }, []);

  return (
    <section id="insights" ref={ref} className="py-24 bg-[#0d1117] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-indigo-500" />
              <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">News &amp; Media</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white">Latest Insights</h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
            View All Articles <FaArrowRight className="text-sm" />
          </a>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {insights.map((insight, index) => {
            const fallback = originalImages[insight.imageKey];
            const imgSrc = insight.image || (fallback?.src || fallback) || 'https://via.placeholder.com/600x400/1f2937/4b5563?text=Article';
            return (
              <motion.a
                key={insight._id || index}
                href={insight.link || '#'}
                target={insight.link && insight.link !== '#' ? '_blank' : undefined}
                rel="noreferrer"
                variants={cardVariants}
                className="group flex flex-col bg-[#030712] border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={insight.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400/1f2937/4b5563?text=Article'; }}
                  />
                  <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {insight.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-white font-bold text-lg leading-snug mb-4 group-hover:text-indigo-400 transition-colors">
                    {insight.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-gray-500 text-sm font-medium">{insight.date}</span>
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                      <FaArrowRight className="text-xs" />
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        <a href="#" className="mt-8 md:hidden inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
          View All Articles <FaArrowRight className="text-sm" />
        </a>
      </div>
    </section>
  );
};

export default Insights;
