import React, { useState } from "react";
import { LuLanguages } from "react-icons/lu";
import { GiLookAt } from "react-icons/gi";
import {
  FaUserCog,
  FaLock,
  FaEnvelope,
  FaLanguage,
  FaRegHandPointUp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Settings = () => {
  const goto = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [email, setEmail] = useState("");
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });
  const userId = localStorage.getItem("userId");

  // Dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ayi-sphere-token");
    sessionStorage.clear();
    localStorage.clear();
    goto("/account-page");
  };

  const handleLeavePage = () => {
    goto("/account-page");
  };

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://ayi-backend.onrender.com/api/user/${userId}/${email}`, { email });
      alert("Email updated successfully.");
      setShowEmailModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to update email", error);
      alert("Failed to update email.");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://ayi-backend.onrender.com/api/user/${userId}/password`, passwords);
      alert("Password updated successfully.");
      setShowPasswordModal(false);
    } catch (error) {
      console.error("Failed to update password", error);
      alert("Failed to update password.");
    }
  };

  return (
    <div
      className={`font-sans ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      } min-h-screen`}
    >
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-center mb-10">Settings</h2>

        {/* Account Settings */}
        <div className={`bg-white ${darkMode ? "dark:bg-gray-700" : ""} shadow-lg rounded-lg p-6 mb-8`}>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FaUserCog className="mr-3 text-blue-600" /> Account Settings
          </h3>
          <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="flex justify-between items-center">
              <p className="text-lg">Change Email</p>
              <button onClick={() => setShowEmailModal(true)} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                Update Email
              </button>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg">Change Password</p>
              <button onClick={() => setShowPasswordModal(true)} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                Update Password
              </button>
            </div>
          </motion.div>
        </div>

        {/* Security Settings */}
        <div className={`bg-white ${darkMode ? "dark:bg-gray-700" : ""} shadow-lg rounded-lg p-6 mb-8`}>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FaLock className="mr-3 text-red-600" /> Security Settings
          </h3>
          <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="flex justify-between items-center">
              <p className="text-lg">Two-Factor Authentication</p>
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                Enable 2FA
              </button>
            </div>
          </motion.div>
        </div>

        {/* Language Settings */}
        <div className={`bg-white ${darkMode ? "dark:bg-gray-700" : ""} shadow-lg rounded-lg p-6 mb-8`}>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <LuLanguages className="mr-3 text-yellow-600" /> Language Settings
          </h3>
          <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="flex justify-between items-center">
              <p className="text-lg">Select Language</p>
              <select className="py-2 px-4 rounded-lg text-black">
                <option>English</option>
              </select>
            </div>
          </motion.div>
        </div>

        {/* Appearance + Logout */}
        <div className={`bg-white ${darkMode ? "dark:bg-gray-700" : ""} shadow-lg rounded-lg p-6 mb-8`}>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <GiLookAt className="mr-3 text-green-600" /> Appearance
          </h3>
          <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="flex justify-between items-center">
              <p className="text-lg">Dark Mode</p>
              <button onClick={toggleDarkMode} className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">
                {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
              </button>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg">Leave Page</p>
              <button onClick={handleLeavePage} className="bg-cyan-700 text-white py-2 px-4 rounded-lg hover:bg-cyan-800">
                Leave Current Page
              </button>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg">Logout</p>
              <button onClick={handleLogout} className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">
                Logout
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ✅ Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-center">Update Email</h3>
            <form onSubmit={handleEmailUpdate} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter new email"
                className="w-full border p-2 rounded"
                required
              />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowEmailModal(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-center">Update Password</h3>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <input
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                value={passwords.oldPassword}
                onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                className="w-full border p-2 rounded"
                required
              />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowPasswordModal(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
