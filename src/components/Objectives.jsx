import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaHandshake, FaLightbulb, FaUserFriends, FaTools, FaDollarSign } from "react-icons/fa";

// ─── Data ───────────────────────────────────────────────────────────────────

const values = [
  { icon: FaHandshake, title: "Integrity", desc: "Honesty and strong moral principles in all we do." },
  { icon: FaLightbulb, title: "Ambitious", desc: "Driven to achieve excellence beyond expectations." },
  { icon: FaUserFriends, title: "Accountability", desc: "Taking full responsibility for our actions." },
  { icon: FaTools, title: "Collaboration", desc: "Valuing teamwork to drive innovation." },
];

const objectives = [
  {
    icon: FaDollarSign,
    title: "Profitability",
    desc: "Financing growth to provide robust investment resources.",
  },
  {
    icon: FaUserFriends,
    title: "Customer First",
    desc: "Delivering the highest quality and greatest possible value.",
  },
  {
    icon: FaTools,
    title: "Innovation (Tech)",
    desc: "Building on our technology to enable continuous growth.",
  },
  {
    icon: FaHandshake,
    title: "Social Impact",
    desc: "Acting as an economic, intellectual, and social asset.",
  },
];

// ─── Animation Variants ──────────────────────────────────────────────────────

const fadeUpObj = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// ─── Component ────────────────────────────────────────────────────────

const Objectives = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Background abstract shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpObj}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-indigo-500" />
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">About Us</span>
            <div className="h-px w-8 bg-indigo-500" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Driving Africa's <span className="text-gradient">Future</span>
          </h2>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpObj} className="bg-gray-900/50 border border-white/5 p-8 sm:p-10 rounded-2xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm">M</span>
              Mission
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Equipping young people with the financial tools, investment opportunities, and entrepreneurial support they need to build wealth. By fostering a culture of smart saving, we empower the next generation to shape Africa’s economy.
            </p>
          </motion.div>
          <motion.div variants={fadeUpObj} className="bg-gray-900/50 border border-white/5 p-8 sm:p-10 rounded-2xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm">V</span>
              Vision
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              A future where African youth lead the way in financial empowerment, turning dreams into thriving businesses through smart capital ventures, driving economic growth and creating widespread opportunity.
            </p>
          </motion.div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          className="mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h3 variants={fadeUpObj} className="text-2xl font-bold text-center text-white mb-10">Our Core Values</motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={i} variants={fadeUpObj} className="bg-gray-900/30 border border-white/5 p-6 rounded-xl text-center group hover:bg-gray-800/50 transition-colors">
                  <div className="mx-auto w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <Icon className="text-xl" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">{v.title}</h4>
                  <p className="text-gray-500 text-sm hidden sm:block">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Key Objectives */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h3 variants={fadeUpObj} className="text-2xl font-bold text-center text-white mb-10">Key Objectives</motion.h3>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {objectives.map((obj, i) => {
              const Icon = obj.icon;
              return (
                <motion.div key={i} variants={fadeUpObj} className="flex gap-4 p-6 sm:p-8 bg-gray-900/30 border border-white/5 rounded-xl hover:border-indigo-500/30 transition-colors">
                  <div className="w-10 h-10 flex-shrink-0 bg-gray-800 rounded-lg flex items-center justify-center text-indigo-400 mt-1">
                    <Icon className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-2">{obj.title}</h4>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{obj.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Objectives;
