import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Contact from '../../../../models/Contact';

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const contact = await Contact.findByIdAndDelete(id);
    
    if (!contact) {
      return NextResponse.json({ success: false, error: 'Message not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
