import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { toast, Toaster } from "sonner";
import axios from "axios";

axios.defaults.baseURL = "https://ayi-backend.onrender.com";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("/sendemail", {
        username: formData.name,
        email: formData.email,
        message: formData.message
      });
      toast.success("Message sent successfully. We'll be in touch!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" ref={ref} className="py-24 bg-[#030712] relative overflow-hidden">
      <Toaster richColors position="top-center" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-indigo-500" />
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Connect</span>
            <div className="h-px w-8 bg-indigo-500" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Get in Touch</h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Left: Contact Info */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Let's Talk</h3>
              <p className="text-gray-400">Have questions about our investment programs or community? Drop us a line.</p>
            </div>

            <div className="space-y-6">
              <a href="mailto:afriyouthinvest@gmail.com" className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-white font-medium group-hover:text-indigo-400 transition-colors">afriyouthinvest@gmail.com</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400">
                  <FaPhoneAlt className="text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <p className="text-white font-medium">+250 782 029 528</p>
                  <p className="text-white font-medium">+250 788 967 462</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="text-white font-medium">Kigali, Rwanda</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="pt-6 border-t border-white/5">
              <p className="text-sm text-gray-500 mb-4">Follow us</p>
              <div className="flex gap-4">
                <a href="https://x.com/Afriyouthinvest" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#1DA1F2] transition-colors">
                  <FaTwitter />
                </a>
                <a href="https://www.linkedin.com/in/afriyouthinvest" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#0A66C2] transition-colors">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-[#0d1117] border border-white/5 p-8 rounded-2xl relative overflow-hidden">
              {/* Form abstract shape */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 blur-3xl rounded-full" />

              <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-gray-400 ml-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-gray-400 ml-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-gray-400 ml-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 mt-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-500/25"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;
