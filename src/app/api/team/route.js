import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Team from '../../../models/Team';

export async function GET() {
  try {
    await dbConnect();
    const team = await Team.find({}).sort({ order: 1 });
    return NextResponse.json({ success: true, data: team });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const member = await Team.create(body);
    return NextResponse.json({ success: true, data: member }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
