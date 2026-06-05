import React, { useState } from 'react';
import { FaLock, FaCheck, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../assets/logo.png';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', isError: false });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const token = searchParams.get('token');
  const userId = searchParams.get('id');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      return setMessage({ text: 'Please fill in all fields', isError: true });
    }

    if (newPassword.length < 6) {
      return setMessage({ text: 'Password must be at least 6 characters', isError: true });
    }

    if (newPassword !== confirmPassword) {
      return setMessage({ text: 'Passwords do not match', isError: true });
    }

    setIsLoading(true);
    setMessage({ text: '', isError: false });

    try {
      const response = await fetch('https://ayi-backend.onrender.com/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, userId, newPassword }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage({ text: data.message, isError: false });
        setSuccess(true);
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setMessage({ text: data.message || 'Password reset failed', isError: true });
      }
    } catch (error) {
      setMessage({ text: 'Network error. Please try again.', isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  if (!token || !userId) {
    navigate('/forgot-password');
    return nul
    
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <div className="flex flex-col items-center justify-center w-full p-6 bg-white text-black rounded-xl shadow-2xl relative mx-4 my-8 sm:mx-auto sm:max-w-md">
        {/* Logo */}
        <div className="absolute top-4 left-4">
          <a href="/">
            <img src={logo} alt="AYI Group Logo" className="w-20 h-auto" />
          </a>
        </div>

        <motion.div
          className="w-full p-6 text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-3xl font-medium mb-6">Reset Password</h2>
          
          {success ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <FaCheck className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-green-600 mb-6">{message.text}</p>
              <p>Redirecting to login page...</p>
            </div>
          ) : (
            <>
              <p className="text-center text-sm text-gray-500 mb-6">
                Enter your new password below
              </p>

              {message.text && (
                <p className={`text-center mb-6 ${message.isError ? 'text-red-600' : 'text-green-600'}`}>
                  {message.text}
                </p>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-sm text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative mt-2">
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                      required
                      minLength="6"
                    />
                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-sm text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative mt-2">
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                      required
                      minLength="6"
                    />
                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-200 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Resetting...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </motion.button>
              </form>

              <button
                onClick={() => navigate('/login')}
                className="w-full mt-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg shadow-md hover:bg-gray-300 transition duration-200 flex items-center justify-center"
              >
                <FaArrowLeft className="mr-2" />
                Back to Login
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;