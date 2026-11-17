import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import dbConnect from '../../../../lib/db';
import User from '../../../../models/User';

export async function POST(request) {
  try {
    // 1. Must be logged in as an admin
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Both current and new password are required.' },
        { status: 400 }
      );
    }
    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 8 characters.' },
        { status: 400 }
      );
    }

    await dbConnect();

    // 2. Load the logged-in user WITH the password field
    const user = await User.findOne({ email: session.user.email }).select('+password');
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 });
    }

    // 3. Verify the current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect.' },
        { status: 403 }
      );
    }

    // 4. Set the new password — the model's pre-save hook hashes it once
    user.password = newPassword;
    await user.save();

    return NextResponse.json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    console.error('CHANGE PASSWORD ERROR:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
