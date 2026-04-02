'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | sent | error
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong.'); setStatus('error'); return; }
      setStatus('sent');
    } catch {
      setError('Network error. Please try again.');
      setStatus('error');
    }
  }

  async function handleResend(e) {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong.'); setStatus('error'); return; }
      setStatus('sent');
    } catch {
      setError('Network error. Please try again.');
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FCE8F4] to-[#EDD5F5] p-5 font-[Inter]">
      <div className="w-full max-w-[440px] bg-white/90 backdrop-blur-xl rounded-[28px] overflow-hidden shadow-[0_32px_80px_rgba(108,42,121,0.18)] border border-[#D9A8E8]/40 animate-fadeIn">
        <div className="bg-gradient-to-br from-[#6C2A79] to-[#D41479] py-10 px-8 text-center">
          <div className="text-[2.5rem] mb-3 leading-none">🔑</div>
          <h1 className="m-0 text-white text-2xl font-bold tracking-wide">Reset Password</h1>
          <p className="m-0 mt-2 text-white/80 text-sm font-medium">Enter your admin email to receive a reset link</p>
        </div>

        <div className="p-8">
          {status === 'sent' ? (
            <div className="text-center">
              <div className="text-[3rem] mb-4 leading-none">✉️</div>
              <h2 className="text-[1.4rem] font-bold text-[#1A0A1D] mb-3">Check your inbox!</h2>
              <p className="text-[#1A0A1D]/70 leading-relaxed text-[0.95rem] mb-6">
                A password reset link has been sent to <strong>{email}</strong>.
                Check your spam folder if it doesn't arrive within a few minutes.
              </p>
              <div className="flex flex-col gap-3 items-center">
                <button
                  id="admin-resend-btn"
                  onClick={handleResend}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-br from-[#6C2A79] to-[#D41479] text-white border-none font-bold cursor-pointer text-[0.95rem] shadow-[0_8px_24px_rgba(212,20,121,0.3)] hover:scale-[1.02] transition-transform w-full"
                >
                  Resend Email
                </button>
                <Link href="/admin/login" className="text-[#D41479] font-semibold text-[0.9rem] no-underline hover:underline mt-2">← Back to Login</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {(status === 'error' && error) && (
                <div className="bg-[#D41479]/10 border border-[#D41479]/30 rounded-xl px-4 py-3.5 text-[#D41479] text-[0.9rem] mb-5 font-medium animate-fadeIn">
                  {error}
                </div>
              )}
              <div className="mb-5 flex flex-col gap-2">
                <label className="block text-[0.85rem] font-bold text-[#6C2A79]">Admin Email</label>
                <input
                  id="forgot-email"
                  type="email"
                  placeholder="admin@tidymimo.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 rounded-[14px] border-[1.5px] border-[#D9A8E8]/50 text-base outline-none bg-[#FCE8F4]/30 text-[#1A0A1D] focus:border-[#D41479] transition-colors focus:bg-white"
                />
              </div>
              <button
                id="forgot-submit-btn"
                type="submit"
                disabled={status === 'loading'}
                className={`
                  w-full p-4 rounded-[14px] border-none bg-gradient-to-br from-[#6C2A79] to-[#D41479] text-white text-base font-bold cursor-pointer shadow-[0_8px_24px_rgba(212,20,121,0.35)] hover:scale-[1.02] transition-all duration-300 mb-5
                  ${status === 'loading' ? 'opacity-70 cursor-not-allowed transform-none' : ''}
                `}
              >
                {status === 'loading' ? 'Sending…' : 'Send Reset Link →'}
              </button>
              <div className="text-center mt-2">
                <Link href="/admin/login" className="text-[#D41479] text-[0.88rem] font-bold no-underline hover:underline">← Back to Login</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
