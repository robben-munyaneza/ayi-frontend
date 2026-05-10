import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Team from '../../../models/Team';
import Insight from '../../../models/Insight';
import { defaultTeamMembers, defaultInsights } from '../../../context/defaultContent';

export async function GET() {
  try {
    await dbConnect();
    
    // Seed Team
    const teamCount = await Team.countDocuments();
    if (teamCount === 0) {
      await Team.insertMany(defaultTeamMembers.map(m => ({
        name: m.name,
        role: m.role,
        email: m.email,
        phone: m.phone,
        imageKey: m.imageKey,
        image: m.image,
        order: parseInt(m.id)
      })));
    }
    
    // Seed Insights
    const insightCount = await Insight.countDocuments();
    if (insightCount === 0) {
      await Insight.insertMany(defaultInsights.map(i => ({
        title: i.title,
        category: i.category,
        content: "This is a placeholder for the article content. You can edit this in the admin dashboard.",
        imageKey: i.imageKey,
        image: i.image,
        slug: i.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        date: i.date
      })));
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully',
      stats: {
        team: await Team.countDocuments(),
        insights: await Insight.countDocuments()
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
