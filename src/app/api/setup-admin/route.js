import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import User from '../../../models/User';

export async function GET() {
  try {
    await dbConnect();
    
    const adminExists = await User.findOne({ email: 'admin@ayigroup.com' });
    
    if (adminExists) {
      return NextResponse.json({ message: 'Admin already exists' });
    }
    
    const admin = await User.create({
      name: 'AYI Admin',
      email: 'admin@ayigroup.com',
      password: 'admin123', // This will be hashed by the model pre-save hook
      role: 'superadmin',
    });
    
    return NextResponse.json({ success: true, message: 'Admin created successfully', data: { email: admin.email } });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
