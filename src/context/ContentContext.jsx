"use client";
import React, { createContext, useContext, useState } from 'react';
import {
  defaultTeamMembers,
  defaultInsights,
  defaultObjectives,
  defaultStats,
} from './defaultContent';

const ContentContext = createContext(null);

const STORAGE_KEY = 'ayi_content_v1';

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return null;
};

const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Storage save failed:', e);
  }
};

const getDefaults = () => ({
  teamMembers: defaultTeamMembers,
  insights: defaultInsights,
  objectives: defaultObjectives,
  stats: defaultStats,
});

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    const stored = loadFromStorage();
    return stored ? { ...getDefaults(), ...stored } : getDefaults();
  });

  // updateSection('teamMembers', [...])
  const updateSection = (section, data) => {
    setContent((prev) => {
      const next = { ...prev, [section]: data };
      saveToStorage(next);
      return next;
    });
  };

  // Reset a single section to its default
  const resetSection = (section) => {
    updateSection(section, getDefaults()[section]);
  };

  return (
    <ContentContext.Provider value={{ content, updateSection, resetSection }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used inside <ContentProvider>');
  return ctx;
};
