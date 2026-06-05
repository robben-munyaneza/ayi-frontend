"use client";
import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaTwitter, FaLinkedinIn, FaPaperPlane } from "react-icons/fa";
import { toast, Toaster } from "sonner";
import axios from "axios";

const inputCls = "w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const charLimit = 500;
  const remaining = charLimit - form.message.length;

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.message.length < 10) { toast.error("Please write a message of at least 10 characters."); return; }
    setIsSubmitting(true);
    try {
      // 1. Save to local database for admin dashboard
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      // 2. Send email via external service (Non-blocking)
      axios.post("https://ayi-backend.onrender.com/sendemail", {
        username: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
      }).catch(e => {
        console.warn("External email service failed, but message was saved locally.");
      });
      toast.success("Message sent! We'll be in touch soon.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-24 bg-[#030712] relative overflow-hidden">
      <Toaster richColors position="top-center" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-indigo-500" />
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Connect</span>
            <div className="h-px w-8 bg-indigo-500" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Get in Touch</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Have a question about our investment programs or community? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Left: Contact Info */}
          <motion.div className="lg:col-span-2 space-y-8" initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Let's Talk</h3>
              <p className="text-gray-400">Reach out and our team will respond within 24 hours.</p>
            </div>

            <div className="space-y-5">
              {[
                { href: "mailto:afriyouthinvest@gmail.com", icon: FaEnvelope, label: "Email", value: "afriyouthinvest@gmail.com" },
                { href: "tel:+250782029528", icon: FaPhoneAlt, label: "Phone", value: "+250 782 029 528 / +250 788 967 462" },
                { href: null, icon: FaMapMarkerAlt, label: "Location", value: "Kigali, Rwanda" },
              ].map(({ href, icon: Icon, label, value }) => {
                const inner = (
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors flex-shrink-0">
                      <Icon className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-0.5">{label}</p>
                      <p className="text-white font-medium group-hover:text-indigo-400 transition-colors text-sm">{value}</p>
                    </div>
                  </div>
                );
                return href ? <a key={label} href={href}>{inner}</a> : <div key={label}>{inner}</div>;
              })}
            </div>

            <div className="pt-6 border-t border-white/5">
              <p className="text-sm text-gray-500 mb-4">Follow us</p>
              <div className="flex gap-3">
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
          <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }}>
            <div className="bg-[#0d1117] border border-white/5 p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 blur-3xl rounded-full" />
              <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1.5">Name *</label>
                    <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1.5">Email *</label>
                    <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className={inputCls} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1.5">Phone <span className="text-gray-600">(optional)</span></label>
                    <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+250 7XX XXX XXX" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1.5">Subject *</label>
                    <input type="text" id="subject" name="subject" value={form.subject} onChange={handleChange} required placeholder="e.g. Investment inquiry" className={inputCls} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400">Message *</label>
                    <span className={`text-xs ${remaining < 50 ? "text-amber-400" : "text-gray-600"}`}>{remaining} chars left</span>
                  </div>
                  <textarea id="message" name="message" value={form.message} onChange={handleChange} required rows="5" maxLength={charLimit}
                    className={`${inputCls} resize-none`} placeholder="How can we help you?" />
                </div>

                <button type="submit" disabled={isSubmitting}
                  className="w-full py-4 mt-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Sending…</>
                  ) : (<><FaPaperPlane className="text-sm" /> Send Message</>)}
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
