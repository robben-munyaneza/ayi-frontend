"use client";
import React, { useState, useEffect } from 'react';
import { FaTrash, FaEnvelope } from 'react-icons/fa';
import { toast, Toaster } from 'sonner';

const ContactsManagement = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (err) {
      toast.error("Failed to fetch messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success("Message deleted.");
        fetchMessages();
      }
    } catch (err) {
      toast.error("Delete failed.");
    }
  };

  return (
    <div>
      <Toaster richColors />
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-white">Incoming Messages</h3>
      </div>

      <div className="bg-[#0d1117] border border-white/5 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No messages found.</div>
        ) : (
          <div className="divide-y divide-white/5">
            {messages.map((msg) => (
              <div key={msg._id} className="p-6 hover:bg-white/5 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-white font-bold text-lg">{msg.name}</h4>
                    <a href={`mailto:${msg.email}`} className="text-indigo-400 text-sm flex items-center gap-2 mt-1 hover:underline">
                      <FaEnvelope /> {msg.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 text-xs">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="text-gray-500 hover:text-red-400 transition-colors p-2"
                      title="Delete Message"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="bg-[#030712] p-4 rounded-xl border border-white/5">
                  <p className="text-gray-300 text-sm whitespace-pre-wrap">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsManagement;
