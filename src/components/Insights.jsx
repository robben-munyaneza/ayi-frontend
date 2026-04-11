import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import invest from '../assets/insights/invest.jpeg';
import invest1 from '../assets/insights/invest1.jpeg';
import people from '../assets/insights/people.jpeg';
import tree from '../assets/insights/tree.jpeg';

// ─── Data ───────────────────────────────────────────────────────────────────

const insights = [
  {
    title: 'Empowering Youth Through Financial Education',
    category: 'Education',
    date: 'Feb 12, 2025',
    link: '#',
    image: invest
  },
  {
    title: 'The Future of Youth-Driven Investments',
    category: 'Investment',
    date: 'Jan 25, 2025',
    link: '#',
    image: invest1
  },
  {
    title: 'How Innovation Drives People Empowerment',
    category: 'Innovation',
    date: 'Dec 15, 2024',
    link: '#',
    image: people
  },
  {
    title: 'Creating Sustainable Economic Opportunities',
    category: 'Sustainability',
    date: 'Nov 10, 2024',
    link: '#',
    image: tree
  },
];

// ─── Animations ──────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ─── Component ──────────────────────────────────────────────────────────────

const Insights = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="insights" ref={ref} className="py-24 bg-[#0d1117] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-indigo-500" />
              <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">News & Media</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white">Latest Insights</h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
            View All Articles <FaArrowRight className="text-sm" />
          </a>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {insights.map((insight, i) => (
            <motion.a
              key={i}
              href={insight.link}
              variants={cardVariants}
              className="group flex flex-col bg-[#030712] border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400/1f2937/4b5563?text=Article' }}
                />
                <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {insight.category}
                </div>
              </div>

              {/* Content */}
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
          ))}
        </motion.div>

        <a href="#" className="mt-8 md:hidden inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
          View All Articles <FaArrowRight className="text-sm" />
        </a>

      </div>
    </section>
  );
};

export default Insights;
