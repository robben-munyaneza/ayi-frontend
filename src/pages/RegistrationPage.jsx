import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import logo from "../assets/logo.png";
import axios from "axios";

axios.defaults.baseURL = "";

const Field = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-400 mb-1.5">{label}</label>
    {children}
  </div>
);

const inputCls = "w-full pl-11 pr-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all";

const RegistrationPage = () => {
  const [form, setForm] = useState({ fullnames: "", email: "", phone: "", location: "", bd: "", nationalId: "", password: "", confirmPassword: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      const res = await axios.post("/api/register", {
        names: form.fullnames, email: form.email, phone: form.phone,
        password: form.password, confirmPassword: form.confirmPassword,
        location: form.location, bd: form.bd, nationalId: form.nationalId,
      });
      alert(res.data.message || "Registration successful!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)" }} />

      {/* Left branding */}
      <div className="hidden lg:flex lg:w-5/12 flex-col justify-center px-12 relative">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, transparent 60%)" }} />
        <motion.div className="relative z-10 max-w-sm" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <img src={logo} alt="AYI Group" className="w-16 h-16 object-contain mb-8" />
          <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Join AYI Group.<br />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Build your future.</span>
          </h1>
          <p className="text-gray-400 leading-relaxed mb-8">
            Access investment tools, a thriving community, and a smart financial wallet — all in one ecosystem designed for Africa's next generation.
          </p>
          <div className="space-y-3">
            {["Smart savings & investment tracking", "AYI Community — connect & collaborate", "AYI Wallet — mobile money integration", "Expert financial advisory"].map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                </div>
                <span className="text-gray-400 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center px-6 py-10 relative z-10">
        <motion.div className="w-full max-w-lg" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 mb-6 lg:hidden">
            <img src={logo} alt="AYI" className="w-8 h-8 object-contain" />
            <span className="font-bold text-white text-sm tracking-wide">AYI Group</span>
          </div>

          <div className="bg-[#0d1117] border border-white/8 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-extrabold text-white mb-1">Create your account</h2>
            <p className="text-gray-500 text-sm mb-6">Start your financial journey with AYI Group.</p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full Name *">
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
                    <input type="text" value={form.fullnames} onChange={set("fullnames")} required placeholder="Your full name" className={inputCls} />
                  </div>
                </Field>
                <Field label="Email Address *">
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
                    <input type="email" value={form.email} onChange={set("email")} required placeholder="you@example.com" className={inputCls} />
                  </div>
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Phone Number">
                  <div className="relative">
                    <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
                    <input type="tel" value={form.phone} onChange={set("phone")} placeholder="+250 7XX XXX XXX" className={inputCls} />
                  </div>
                </Field>
                <Field label="Location">
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
                    <input type="text" value={form.location} onChange={set("location")} placeholder="e.g. Kigali, Rwanda" className={inputCls} />
                  </div>
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Date of Birth">
                  <input type="date" value={form.bd} onChange={set("bd")} className={`${inputCls} pl-4`} />
                </Field>
                <Field label="National ID">
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
                    <input type="text" value={form.nationalId} onChange={set("nationalId")} placeholder="National ID number" className={inputCls} />
                  </div>
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Password *">
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
                    <input type={showPass ? "text" : "password"} value={form.password} onChange={set("password")} required placeholder="Min. 6 characters" className={`${inputCls} pr-12`} />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors">
                      {showPass ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </Field>
                <Field label="Confirm Password *">
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
                    <input type={showConfirm ? "text" : "password"} value={form.confirmPassword} onChange={set("confirmPassword")} required placeholder="Repeat password" className={`${inputCls} pr-12`} />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors">
                      {showConfirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </Field>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 mt-2">
                {loading ? (
                  <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Creating account…</>
                ) : (<>Create Account <FaArrowRight className="text-sm" /></>)}
              </button>
            </form>

            <div className="my-5 flex items-center gap-4">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-xs text-gray-600">or</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            <div className="flex justify-center">
              <GoogleLogin onSuccess={(r) => console.log("Google:", r)} onError={() => console.log("Google login failed")} useOneTap text="signup_with" />
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">Sign in</Link>
            </p>
          </div>

          <p className="text-center text-xs text-gray-600 mt-6">
            <Link to="/" className="hover:text-gray-400 transition-colors">← Back to homepage</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegistrationPage;
