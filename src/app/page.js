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
    await dbConnect();
    
    // Fetch from DB
    const teamDB = await Team.find({}).sort({ order: 1 }).lean();
    const insightsDB = await Insight.find({}).sort({ createdAt: -1 }).limit(4).lean();
    
    // Transform Mongo data for components (e.g. stringify IDs)
    const team = teamDB.length > 0 ? JSON.parse(JSON.stringify(teamDB)) : defaultTeamMembers;
    const insights = insightsDB.length > 0 ? JSON.parse(JSON.stringify(insightsDB)) : defaultInsights;
    
    // For now, objectives and stats are static fallbacks or can be added to DB later
    const objectives = defaultObjectives;
    const stats = defaultStats;
    
    return { team, insights, objectives, stats };
  } catch (error) {
    console.error("Data fetch error:", error);
    return {
      team: defaultTeamMembers,
      insights: defaultInsights,
      objectives: defaultObjectives,
      stats: defaultStats
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
