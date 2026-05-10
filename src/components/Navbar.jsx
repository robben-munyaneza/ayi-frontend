"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaUserAlt, FaWhatsapp } from "react-icons/fa";
import logo from "../assets/logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const   NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest("button")
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear()
    router.push("/login");
  };

  const isLoggedIn = true;

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.nav
        className={`${
          isFixed
            ? "fixed top-0 left-0 w-full shadow-lg shadow-indigo-500/10 z-50 bg-[#030712]/80 backdrop-blur-md border-b border-white/10"
            : "absolute top-0 left-0 w-full z-50 bg-transparent"
        } py-4 px-8 transition-all duration-300 ease-in-out`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        {/* Left: Logo */}
        <Link href="/" className="z-10">
          <div className="text-white text-2xl font-semibold flex items-center">
            <img
              src={logo.src || logo}
              alt="AYI Group Logo"
              className="w-12 h-12 object-contain mr-3"
            />
            <div>
              <h1 className="text-base font-bold tracking-wide">
                AYI Group
              </h1>
              <h1 className="text-xs font-medium text-gray-300 mt-0.5">
                <span className="text-amber-400">23% offers</span> <span className="mx-1">•</span>
                <span className="text-emerald-400">10% interest</span>
              </h1>
            </div>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2 z-10 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
          <button onClick={() => scrollToSection('services')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Services</button>
          <button onClick={() => scrollToSection('ourteam')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Team</button>
          <button onClick={() => scrollToSection('insights')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Insights</button>
          <button onClick={() => scrollToSection('contact')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Contact</button>
        </div>
          
        {/* Right: Admin Portal Button */}
        <div className="hidden lg:flex items-center z-10">
          <Link href="/admin/login" className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full transition-all shadow-lg shadow-indigo-500/25 border border-indigo-500/50 flex items-center gap-2 hover:scale-105 active:scale-95">
            <FaUserAlt className="text-xs" /> Admin Portal
          </Link>
        </div>

        </div>

      </motion.nav>

      {/* WhatsApp Contact Button */}
      {!isOpen && (
        <motion.div
          className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full shadow-lg shadow-green-500/30 cursor-pointer z-50 flex items-center space-x-3 transition-all"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(255, 165, 0, 0.6)",
          }}
          whileTap={{
            scale: 0.95,
            boxShadow: "0px 5px 15px rgba(255, 165, 0, 0.8)",
          }}
          onClick={() => window.open("https://wa.me/+250788967462", "_blank")}
        >
          <FaWhatsapp className="text-2xl" />
          <span className="text-sm font-semibold">Get in touch</span>
        </motion.div>
      )}
    </>
  );
};

export default NavBar;
