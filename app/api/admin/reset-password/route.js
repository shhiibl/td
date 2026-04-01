import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ error: 'Token and new password are required.' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    }

    const admin = await prisma.admin.findFirst({
      where: {
        resetToken: token,
        resetExpiresAt: { gt: new Date() },
      },
    });

    if (!admin) {
      return NextResponse.json({ error: 'Reset link is invalid or has expired.' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        passwordHash,
        resetToken: null,
        resetExpiresAt: null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[RESET-PASSWORD]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
