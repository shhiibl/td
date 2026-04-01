import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/mailer';

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({ where: { email: email.toLowerCase().trim() } });

    // Always return success to prevent email enumeration
    if (!admin) {
      return NextResponse.json({ success: true });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.admin.update({
      where: { id: admin.id },
      data: { resetToken, resetExpiresAt },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const resetUrl = `${appUrl}/admin/reset-password?token=${resetToken}`;

    await sendPasswordResetEmail({
      to: admin.email,
      name: admin.name,
      resetUrl,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[FORGOT-PASSWORD]', err);
    return NextResponse.json({ error: 'Failed to send reset email. Check SMTP configuration.' }, { status: 500 });
  }
}
