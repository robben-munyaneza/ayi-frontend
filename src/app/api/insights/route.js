import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Insight from '../../../models/Insight';

export async function GET() {
  try {
    await dbConnect();
    const insights = await Insight.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: insights });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Simple slug generator
    const slug = body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const insight = await Insight.create({ ...body, slug });
    
    return NextResponse.json({ success: true, data: insight }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
