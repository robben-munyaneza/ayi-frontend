import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Insight from '../../../../models/Insight';

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    
    const slug = body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    const insight = await Insight.findByIdAndUpdate(id, { ...body, slug }, {
      new: true,
      runValidators: true,
    });
    
    if (!insight) {
      return NextResponse.json({ success: false, error: 'Insight not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: insight });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const insight = await Insight.findByIdAndDelete(id);
    
    if (!insight) {
      return NextResponse.json({ success: false, error: 'Insight not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
