import React from "react";
import { FaTwitter, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../../assets/logo.png"

const Footer = () => {
  return (
    <footer className="bg-[#030712] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}54
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="AYI Group" className="w-8 h-8 object-contain" />
              <span className="font-bold text-white tracking-wide">AYI Group</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering Africa's youth through innovative investment, financial education, and a thriving community ecosystem.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://x.com/Afriyouthinvest" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 transition-all">
                <FaTwitter className="text-sm" />
              </a>
              <a href="https://www.linkedin.com/in/afriyouthinvest" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 transition-all">
                <FaLinkedinIn className="text-sm" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Explore</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">Ecosystem Services</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">Our Objectives</a></li>
              <li><a href="#ourteam" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">Leadership Team</a></li>
              <li><a href="#insights" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">Latest Insights</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-indigo-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Kigali, Rwanda</span>
              </li>
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-indigo-500 mt-0.5 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <p>+250 782 029 528</p>
                  <p className="mt-1">+250 788 967 462</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-indigo-500 mt-0.5 flex-shrink-0" />
                <a href="mailto:afriyouthinvest@gmail.com" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">afriyouthinvest@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-6">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest updates and youth investment insights.</p>
            <form className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-[#0d1117] border border-white/10 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-gray-600"
                required
              />
              <button
                type="button"
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 rounded-lg text-sm font-semibold transition-colors"
                onClick={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }}
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} AYI Group. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;