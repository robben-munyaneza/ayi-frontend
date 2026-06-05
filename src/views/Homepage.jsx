import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaBars, FaTimes, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Objectives from "../components/Objectives";
import OurTeam from "../components/OurTeam";
import Insights from "../components/Insights";
import ContactUs from "../components/ContactUs";
import Services from "../components/Services";
import Footer from "../chat/components/Footer";

/* ─── Navbar ─────────────────────────────────────────────────────── */
const Navbar = ({ isScrolled }) => {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Team", href: "#ourteam" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-gray-950/95 backdrop-blur-md border-b border-white/5 shadow-xl"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <img src={logo} alt="AYI Group" className="w-8 h-8 object-contain" />
          <span className="font-bold text-white text-sm tracking-wide">AYI Group</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            to="/login"
            className="text-sm font-semibold px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {open ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          } bg-gray-950/98 border-b border-white/5`}
      >
        <ul className="px-6 py-4 space-y-1">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-sm text-gray-300 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-3">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block text-center py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition-colors"
            >
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

/* ─── Hero ───────────────────────────────────────────────────────── */
const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const words = ["Investment.", "Community.", "Finance."];

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #030712 0%, #0d1117 50%, #030712 100%)" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Floating dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-indigo-500/20"
          style={{
            width: Math.random() * 6 + 4,
            height: Math.random() * 6 + 4,
            top: `${20 + i * 12}%`,
            left: `${10 + i * 14}%`,
          }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Africa Youth Investment Group
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-4"
        >
          Empowering
          <br />
          <span className="text-gradient">Africa's Youth.</span>
        </motion.h1>

        {/* Sub-tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-lg sm:text-xl mb-4 font-light"
        >
          One ecosystem built for Africa's next generation.
        </motion.p>

        {/* Word row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-10 flex-wrap"
        >
          {words.map((w, i) => (
            <React.Fragment key={w}>
              <span className="text-sm sm:text-base font-semibold text-white">{w}</span>
              {i < words.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-indigo-400" />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/login"
            className="group flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
          >
            Get Started
            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#services"
            className="px-8 py-3.5 border border-white/10 hover:border-white/25 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-200 backdrop-blur-sm"
          >
            Explore Services
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-600 uppercase tracking-widest">Scroll</span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-gray-600 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Page ───────────────────────────────────────────────────────── */
const Homepage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Navbar isScrolled={isScrolled} />
      <Hero />
      <Services />
      <div id="about">
        <Objectives />
      </div>
      <div id="ourteam">
        <OurTeam />
      </div>
      <Insights />
      <div id="contact">
        <ContactUs />
      </div>
      <Footer />
    </>
  );
};

export default Homepage;