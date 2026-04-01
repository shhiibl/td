import nodemailer from 'nodemailer';

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendPasswordResetEmail({ to, name, resetUrl }) {
  const transporter = createTransporter();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #FCE8F4; margin: 0; padding: 40px 20px; }
        .card { background: #fff; max-width: 520px; margin: 0 auto; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(108,42,121,0.12); }
        .header { background: linear-gradient(135deg, #6C2A79, #D41479); padding: 40px 36px; text-align: center; }
        .header h1 { color: #fff; margin: 0; font-size: 1.6rem; font-weight: 700; }
        .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 0.95rem; }
        .body { padding: 36px; }
        .body p { color: #4a2155; line-height: 1.7; margin: 0 0 20px; }
        .btn { display: block; background: linear-gradient(135deg, #6C2A79, #D41479); color: #fff; text-decoration: none; text-align: center; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 1rem; margin: 28px 0; }
        .note { background: rgba(217,168,232,0.15); border-left: 3px solid #D41479; padding: 14px 18px; border-radius: 8px; font-size: 0.88rem; color: #6C2A79; }
        .footer { text-align: center; color: #aaa; font-size: 0.8rem; padding: 24px 36px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>🔐 Password Reset</h1>
          <p>Tidy Mimo Admin Panel</p>
        </div>
        <div class="body">
          <p>Hi <strong>${name}</strong>,</p>
          <p>We received a request to reset your admin password. Click the button below to set a new password:</p>
          <a href="${resetUrl}" class="btn">Reset My Password →</a>
          <div class="note">
            ⏰ This link expires in <strong>1 hour</strong>. If you didn't request this, you can safely ignore this email.
          </div>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} Tidy Mimo. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Tidy Mimo Admin" <${process.env.SMTP_USER}>`,
    to,
    subject: '🔐 Reset your Tidy Mimo admin password',
    html,
  });
}
