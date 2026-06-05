import React, { useState } from "react";
import { FaLock, FaEnvelope, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetStatus, setResetStatus] = useState({ msg: "", ok: true });
  const [resetLoading, setResetLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch('/api/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user._id);
        navigate("/profile");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    setResetStatus({ msg: "", ok: true });
    try {
      const res = await fetch("https://ayi-backend.onrender.com/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setResetStatus({ msg: "Reset link sent! Check your inbox.", ok: true });
      } else {
        setResetStatus({ msg: data.message || "Failed to send reset link.", ok: false });
      }
    } catch {
      setResetStatus({ msg: "Network error. Please try again.", ok: false });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)" }} />

      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center relative p-12">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-md text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <img src={logo} alt="AYI Group" className="w-20 h-20 object-contain mx-auto mb-8" />
            <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
              Empowering<br /><span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Africa's Youth.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              One ecosystem built for Africa's next generation — Investment, Community, Finance.
            </p>
            <div className="grid grid-cols-2 gap-4 text-left">
              {[
                { val: "10K+", lbl: "Youth Members" },
                { val: "5+", lbl: "Countries" },
                { val: "6+", lbl: "Services" },
                { val: "24/7", lbl: "Support" },
              ].map((s) => (
                <div key={s.lbl} className="bg-white/4 border border-white/6 rounded-xl p-4">
                  <p className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 to-indigo-400 bg-clip-text text-transparent">{s.val}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mt-0.5">{s.lbl}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 relative z-10">
        <motion.div className="w-full max-w-md" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          {/* Logo (mobile only) */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <img src={logo} alt="AYI" className="w-8 h-8 object-contain" />
            <span className="font-bold text-white text-sm tracking-wide">AYI Group</span>
          </div>

          <div className="bg-[#0d1117] border border-white/8 rounded-3xl p-8 shadow-2xl">
            {!showForgot ? (
              <>
                <h2 className="text-2xl font-extrabold text-white mb-1">Welcome back</h2>
                <p className="text-gray-500 text-sm mb-6">Sign in to manage your savings &amp; investments.</p>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Address</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com"
                        className="w-full pl-11 pr-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
                      <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••"
                        className="w-full pl-11 pr-12 py-3 bg-[#030712] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all" />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors">
                        {showPass ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="w-4 h-4 rounded border-white/20 bg-[#030712] text-indigo-500 focus:ring-indigo-500/30" />
                      <span className="text-sm text-gray-400">Remember me</span>
                    </label>
                    <button type="button" onClick={() => setShowForgot(true)} className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                      Forgot password?
                    </button>
                  </div>

                  <button type="submit" disabled={isLoading}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 mt-2">
                    {isLoading ? (
                      <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Signing in…</>
                    ) : (<>Sign In <FaArrowRight className="text-sm" /></>)}
                  </button>
                </form>

                <div className="my-5 flex items-center gap-4">
                  <div className="flex-1 h-px bg-white/8" />
                  <span className="text-xs text-gray-600">or continue with</span>
                  <div className="flex-1 h-px bg-white/8" />
                </div>

                <div className="flex justify-center">
                  <GoogleLogin onSuccess={(r) => console.log("Google:", r)} onError={() => console.log("Google login failed")} useOneTap />
                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                  New to AYI Group?{" "}
                  <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">Create account</Link>
                </p>
              </>
            ) : (
              <>
                <button onClick={() => { setShowForgot(false); setResetStatus({ msg: "", ok: true }); }} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors">
                  ← Back to login
                </button>
                <h2 className="text-2xl font-extrabold text-white mb-1">Reset password</h2>
                <p className="text-gray-500 text-sm mb-6">Enter your email and we'll send you a reset link.</p>

                {resetStatus.msg && (
                  <div className={`rounded-xl px-4 py-3 mb-5 border ${resetStatus.ok ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
                    <p className="text-sm">{resetStatus.msg}</p>
                  </div>
                )}

                <form onSubmit={handleReset} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Address</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
                      <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required placeholder="you@example.com"
                        className="w-full pl-11 pr-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all" />
                    </div>
                  </div>
                  <button type="submit" disabled={resetLoading}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2">
                    {resetLoading ? "Sending…" : "Send Reset Link"}
                  </button>
                </form>
              </>
            )}
          </div>

          <p className="text-center text-xs text-gray-600 mt-6">
            <Link to="/" className="hover:text-gray-400 transition-colors">← Back to homepage</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;