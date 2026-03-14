import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import dbConnect from '@/lib/mongodb';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  // declare outside so catch block can reference it
  let email: string | undefined;

  try {
    await dbConnect();
    const { name, email: reqEmail, password } = await request.json();
    email = reqEmail;

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    logger.logAuthEvent('signup', email, true);

    return NextResponse.json({ message: 'User created successfully', userId: user._id }, { status: 201 });
  } catch (error) {
    logger.logAuthEvent('signup', email || 'unknown', false);
    logger.trackApiError('POST', '/api/auth/register', error);
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}