import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaLinkedinIn } from 'react-icons/fa';
import devotha from '../assets/team/devotha.jpg'
import gilbert from '../assets/team/gilbert.jpg'
import immaculee from '../assets/team/immaculee.jpg'
import paul from '../assets/team/paul.jpg'
import rukundo from '../assets/team/rukundo.jpg'
import mugema from '../assets/team/mugema.jpg'
import adrien from '../assets/team/adrien.jpg'
import murara from '../assets/team/murara.jpg'
import tuyizere from '../assets/team/tuyizere.jpg'
import xavier from '../assets/team/xavier.jpg'

// ─── Data ───────────────────────────────────────────────────────────────────

const teamMembers = [
  { name: 'Paul HAKUZIMANA', role: 'Chief Executive Officer', email: 'hakuzapaul@gmail.com', phone: '+250782029528', image: paul },
  { name: 'ADRIEN NIYIBIGIRA', role: 'Chief Operations Officer', email: 'adrienniyibigira@gmail.com', phone: '+250787524578', image: adrien },
  { name: 'MURARA Geofrey', role: 'Administrative Manager', email: 'geofreymurara@gmail.com', phone: '+250780763207', image: murara },
  { name: 'Devotha IKUZWE', role: 'Finance Manager', email: 'devothaikuzwe2021@gmail.com', phone: '+250789899108', image: devotha },
  { name: 'HABIMANA Xavier', role: 'Dir. Customer Experience', email: 'xavierhabimana00@gmail.com', phone: '+250785510884', image: xavier },
  { name: 'DUSABE IHIRWE', role: 'Customer Support Officer', email: 'ihirweimmaculee@gmail.com', phone: '+250786074811', image: immaculee },
  { name: 'Jean Damour', role: 'Training & Capacity Dir.', email: 'tuyizerej92@yahoo.com', phone: '+250786960424', image: tuyizere },
  { name: 'Mugisha Gilbert', role: 'Dir. of AYI Capital', email: 'mugishagilbert41@gmail.com', phone: '+250786459304', image: gilbert },
  { name: 'Rukundo Dieudonne', role: 'AYI Group Director', email: 'rukudieu12@gmail.com', phone: '+250785063133', image: rukundo },
  { name: 'Mugemana Aime', role: 'Tourism & Hospitality', email: 'mugemandayishimiyeaime@gmail.com', phone: '+250787228096', image: mugema },
];

// ─── Animation ───────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ─── Component ──────────────────────────────────────────────────────────────

const OurTeam = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ourteam" ref={ref} className="py-24 bg-[#030712] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
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

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="group relative bg-[#0d1117] border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-colors"
            >
              {/* Image Container */}
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400/1f2937/4b5563?text=AYI' }}
                />
                {/* Contact Overlay */}
                <div className="absolute inset-0 bg-indigo-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                  <a href={`mailto:${member.email}`} className="w-10 h-10 rounded-full bg-white text-indigo-900 flex items-center justify-center hover:scale-110 transition-transform">
                    <FaEnvelope />
                  </a>
                  <a href={`tel:${member.phone}`} className="w-10 h-10 rounded-full bg-white text-indigo-900 flex items-center justify-center hover:scale-110 transition-transform">
                    <FaPhoneAlt />
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 text-center">
                <h3 className="text-white font-bold text-sm tracking-wide mb-1 truncate">{member.name}</h3>
                <p className="text-indigo-400 text-xs font-medium uppercase tracking-wider line-clamp-2 min-h-[2rem] flex items-center justify-center">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurTeam;
