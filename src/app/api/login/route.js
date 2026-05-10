import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();
    console.log(`Attempting login for: ${email}`);

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.NEXTAUTH_SECRET || 'fallback_secret',
      { expiresIn: '1d' }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Detailed Login API Error:', {
      message: error.message,
      stack: error.stack,
      env: {
        hasMongo: !!process.env.MONGODB_URI,
        hasSecret: !!process.env.NEXTAUTH_SECRET
      }
    });
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      details: "Check your server terminal for full stack trace."
    }, { status: 500 });
  }
}
