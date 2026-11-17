import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Team from '../../../../models/Team';
import { getAdminSession } from '../../../../lib/requireAdmin';

export async function PUT(req, { params }) {
  try {
    if (!(await getAdminSession())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    
    const member = await Team.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    
    if (!member) {
      return NextResponse.json({ success: false, error: 'Member not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: member });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    if (!(await getAdminSession())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    await dbConnect();
    const { id } = await params;
    
    const member = await Team.findByIdAndDelete(id);
    
    if (!member) {
      return NextResponse.json({ success: false, error: 'Member not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
