import React from "react";
import dbConnect from "../lib/db";
import Team from "../models/Team";
import Insight from "../models/Insight";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Services from "../components/Services.jsx";
import Objectives from "../components/Objectives.jsx";
import OurTeam from "../components/OurTeam.jsx";
import Insights from "../components/Insights.jsx";
import ContactUs from "../components/ContactUs.jsx";
import Footer from "../components/Footer.jsx";

// Fallback data
import { defaultTeamMembers, defaultInsights, defaultObjectives, defaultStats } from "../context/defaultContent";

async function getData() {
  try {
    // Race DB fetch against a 5-second timeout so the page never hangs
    const result = await Promise.race([
      (async () => {
        await dbConnect();
        const teamDB = await Team.find({}).sort({ order: 1 }).lean();
        const insightsDB = await Insight.find({}).sort({ createdAt: -1 }).limit(4).lean();
        return {
          team: teamDB.length > 0 ? JSON.parse(JSON.stringify(teamDB)) : defaultTeamMembers,
          insights: insightsDB.length > 0 ? JSON.parse(JSON.stringify(insightsDB)) : defaultInsights,
          objectives: defaultObjectives,
          stats: defaultStats,
        };
      })(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('DB timeout — using fallback data')), 5000)
      ),
    ]);
    return result;
  } catch (error) {
    console.warn("getData fallback:", error.message);
    return {
      team: defaultTeamMembers,
      insights: defaultInsights,
      objectives: defaultObjectives,
      stats: defaultStats,
    };
  }
}

export default async function HomePage() {
  const { team, insights, objectives, stats } = await getData();

  return (
    <main>
      <Navbar /> {/* Handles scroll logic internally */}
      <Hero />
      <Services stats={stats} />
      <Objectives data={objectives} />
      <OurTeam members={team} />
      <Insights insights={insights} />
      <ContactUs />
      <Footer />
    </main>
  );
}
