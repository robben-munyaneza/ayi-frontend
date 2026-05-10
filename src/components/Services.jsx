"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaCoins, FaUsers, FaWallet, FaArrowRight, FaCheckCircle, FaChartLine, FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { useContent } from "../context/ContentContext";

// ─── Data ───────────────────────────────────────────────────────────────────

const services = [
  {
    id: "ayi-coin",
    icon: FaCoins,
    badge: "Digital Asset",
    title: "AYI Coin",
    subtitle: "Africa's Youth Investment Token",
    description:
      "AYI Coin is the native digital currency of the AYI ecosystem — designed to empower Africa's youth with a decentralised store of value, reward mechanism, and investment vehicle.",
    highlights: [
      "Earn rewards on every transaction",
      "Stake & grow your holdings",
      "Cross-border payments, zero hassle",
      "Exclusive member benefits",
    ],
    gradient: "from-amber-500 via-orange-500 to-yellow-400",
    glowColor: "rgba(251,146,60,0.25)",
    borderColor: "border-amber-500/30",
    badgeColor: "bg-amber-500/20 text-amber-300 border border-amber-500/40",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
    linkLabel: "Coming Soon",
    link: "#",
    comingSoon: true,
  },
  {
    id: "ayi-space",
    icon: FaUsers,
    badge: "Community",
    title: "AYI Space",
    subtitle: "Where Africa's Youth Connect",
    description:
      "AYI Space is our flagship community platform — a social hub for African youth to share ideas, collaborate on ventures, access educational content, and build meaningful networks.",
    highlights: [
      "Feed, posts & real-time chat",
      "VIP membership tiers",
      "Group creation & management",
      "Exclusive announcements & events",
    ],
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    glowColor: "rgba(99,102,241,0.25)",
    borderColor: "border-indigo-500/30",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    linkLabel: "Explore Community",
    link: "/ayi-sphere",
    comingSoon: false,
  },
  {
    id: "ayi-wallet",
    icon: FaWallet,
    badge: "FinTech",
    title: "AYI Wallet",
    subtitle: "Your Smart Financial Companion",
    description:
      "AYI Wallet is the all-in-one financial layer of the AYI ecosystem — enabling seamless saving, money transfers, investment tracking, and mobile money integration tailored for African youth.",
    highlights: [
      "Mobile money integration (MTN, Airtel)",
      "Track investments & savings",
      "Instant peer-to-peer transfers",
      "Secure, encrypted vault",
    ],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    glowColor: "rgba(20,184,166,0.25)",
    borderColor: "border-teal-500/30",
    badgeColor: "bg-teal-500/20 text-teal-300 border border-teal-500/40",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    linkLabel: "Open Wallet",
    link: "/ayi-wallet",
    comingSoon: false,
  },
  {
    id: "financial-advisory",
    icon: FaChartLine,
    badge: "Consultancy",
    title: "Financial Advisory",
    subtitle: "Wealth Management & Advice",
    description:
      "Providing expert wealth management, investment advice, and comprehensive consultation for sustainable financial growth.",
    highlights: [
      "Wealth management",
      "Investment advice",
      "Financial consultation",
      "Portfolio strategy"
    ],
    gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
    glowColor: "rgba(217,70,239,0.25)",
    borderColor: "border-fuchsia-500/30",
    badgeColor: "bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40",
    iconBg: "bg-gradient-to-br from-purple-500 to-fuchsia-600",
    linkLabel: "Learn More",
    link: "#",
    comingSoon: false,
  },
  {
    id: "business-consultancy",
    icon: FaBriefcase,
    badge: "Advisory",
    title: "Business Consultancy",
    subtitle: "Financial Education & Advisory",
    description:
      "Expert business and management consultancy focusing on financial education, youth investment training, and strategic advisory services.",
    highlights: [
      "Financial education",
      "Youth investment training",
      "Advisory services",
      "Business strategy"
    ],
    gradient: "from-rose-500 via-red-500 to-orange-500",
    glowColor: "rgba(244,63,94,0.25)",
    borderColor: "border-rose-500/30",
    badgeColor: "bg-rose-500/20 text-rose-300 border border-rose-500/40",
    iconBg: "bg-gradient-to-br from-rose-500 to-red-600",
    linkLabel: "Learn More",
    link: "#",
    comingSoon: false,
  },
  {
    id: "training-capacity",
    icon: FaGraduationCap,
    badge: "Education",
    title: "Training Services",
    subtitle: "Capacity Building & Literacy",
    description:
      "Empowering the next generation through dedicated financial literacy programs and comprehensive youth education initiatives.",
    highlights: [
      "Financial literacy",
      "Youth education programs",
      "Capacity building",
      "Skill development"
    ],
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    glowColor: "rgba(14,165,233,0.25)",
    borderColor: "border-sky-500/30",
    badgeColor: "bg-sky-500/20 text-sky-300 border border-sky-500/40",
    iconBg: "bg-gradient-to-br from-sky-500 to-blue-600",
    linkLabel: "Learn More",
    link: "#",
    comingSoon: false,
  },
];

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ─── Service Card ────────────────────────────────────────────────────────────

const ServiceCard = ({ service }) => {
  const Icon = service.icon;

  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "rgba(15,23,42,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: `0 0 0 0 ${service.glowColor}`,
      }}
      whileHover={{
        y: -8,
        boxShadow: `0 32px 80px -12px ${service.glowColor}, 0 0 0 1px rgba(255,255,255,0.12)`,
        transition: { duration: 0.35, ease: "easeOut" },
      }}
    >
      {/* Top gradient bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${service.gradient}`} />

      {/* Subtle gradient glow inside card top */}
      <div
        className={`absolute top-0 left-0 w-full h-40 opacity-10 bg-gradient-to-br ${service.gradient} pointer-events-none`}
      />

      <div className="relative z-10 p-8 flex flex-col h-full">
        {/* Badge */}
        <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wider uppercase ${service.badgeColor}`}>
          {service.badge}
        </span>

        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6 shadow-lg`}>
          <Icon className="text-white text-2xl" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
        <p className={`text-sm font-medium mb-4 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
          {service.subtitle}
        </p>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.description}</p>

        {/* Highlights */}
        <ul className="space-y-2 mb-8 flex-1">
          {service.highlights.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <FaCheckCircle
                className="mt-0.5 flex-shrink-0 text-xs"
                style={{ color: service.glowColor.replace("0.25", "1") }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={service.link}
          className={`group/btn relative flex items-center justify-between w-full px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden ${service.comingSoon
              ? "bg-white/5 text-gray-400 border border-white/10 cursor-default"
              : `bg-gradient-to-r ${service.gradient} text-white hover:opacity-90 hover:shadow-lg`
            }`}
          onClick={service.comingSoon ? (e) => e.preventDefault() : undefined}
        >
          <span>{service.linkLabel}</span>
          {service.comingSoon ? (
            <span className="flex items-center gap-1 text-xs font-normal">
              <HiSparkles className="text-amber-400" /> Launching Soon
            </span>
          ) : (
            <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-200" />
          )}
        </a>
      </div>
    </motion.div>
  );
};

// ─── Stats Bar — dynamic from ContentContext ─────────────────────────────────

// ─── Main Component ────────────────────────────────────────────────────────

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { content } = useContent();
  const stats = content.stats;

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #020617 0%, #0a0f1e 40%, #020617 100%)",
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,146,60,0.1) 0%, transparent 70%)" }} />
      <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-500" />
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">
              Our Ecosystem
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-indigo-500" />
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            One Platform,{" "}
            <span className="bg-gradient-to-r from-amber-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent">
              Three Powerful Services
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            The AYI Group ecosystem is built to equip Africa's youth with everything they need —
            a digital currency, a thriving community, and a smart financial wallet.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/5">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center py-8 px-4">
                <span className="text-3xl font-extrabold bg-gradient-to-r from-amber-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-gray-500 text-sm mt-1 uppercase tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
