'use client';
import { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [form, setForm] = useState({ password: '', confirm: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) setError('Invalid or missing reset token. Please request a new link.');
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setStatus('loading');
    setError('');
    try {
      await axios.post('/api/admin/reset-password', { token, password: form.password });
      setStatus('success');
      setTimeout(() => router.push('/admin/login'), 2500);
    } catch (err) {
      setError(err.response?.data?.error || 'Reset failed.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center p-8">
        <div className="text-[3rem] mb-4 leading-none">🎉</div>
        <h2 className="text-[1.4rem] font-bold text-[#1A0A1D] mb-3">Password Updated!</h2>
        <p className="text-[#1A0A1D]/70 text-[0.95rem]">Redirecting you to login…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8">
      {error && (
        <div className="bg-[#D41479]/10 border border-[#D41479]/30 rounded-xl px-4 py-3.5 text-[#D41479] text-[0.9rem] mb-5 font-medium animate-fadeIn">
          {error}
        </div>
      )}
      <div className="mb-5 flex flex-col gap-2">
        <label className="block text-[0.85rem] font-bold text-[#6C2A79]">New Password</label>
        <input id="new-password" type="password" placeholder="Min 8 characters" value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required 
          className="w-full px-4 py-3.5 rounded-[14px] border-[1.5px] border-[#D9A8E8]/50 text-base outline-none bg-[#FCE8F4]/30 text-[#1A0A1D] focus:border-[#D41479] transition-colors focus:bg-white tracking-widest"
        />
      </div>
      <div className="mb-5 flex flex-col gap-2">
        <label className="block text-[0.85rem] font-bold text-[#6C2A79]">Confirm Password</label>
        <input id="confirm-password" type="password" placeholder="Repeat password" value={form.confirm}
          onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} required 
          className="w-full px-4 py-3.5 rounded-[14px] border-[1.5px] border-[#D9A8E8]/50 text-base outline-none bg-[#FCE8F4]/30 text-[#1A0A1D] focus:border-[#D41479] transition-colors focus:bg-white tracking-widest"
        />
      </div>
      <button id="reset-submit-btn" type="submit" disabled={status === 'loading' || !token}
        className={`
          w-full p-4 rounded-[14px] border-none bg-gradient-to-br from-[#6C2A79] to-[#D41479] text-white text-base font-bold cursor-pointer shadow-[0_8px_24px_rgba(212,20,121,0.35)] hover:scale-[1.02] transition-all duration-300 mb-5
          ${(status === 'loading' || !token) ? 'opacity-70 cursor-not-allowed transform-none' : ''}
        `}
      >
        {status === 'loading' ? 'Updating…' : 'Set New Password →'}
      </button>
      <div className="text-center mt-2">
        <Link href="/admin/login" className="text-[#D41479] text-[0.88rem] font-bold no-underline hover:underline">← Back to Login</Link>
      </div>
    </form>
  );
}

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FCE8F4] to-[#EDD5F5] p-5 font-[Inter]">
      <div className="w-full max-w-[440px] bg-white/90 backdrop-blur-xl rounded-[28px] overflow-hidden shadow-[0_32px_80px_rgba(108,42,121,0.18)] border border-[#D9A8E8]/40 animate-fadeIn">
        <div className="bg-gradient-to-br from-[#6C2A79] to-[#D41479] py-10 px-8 text-center">
          <div className="text-[2.5rem] mb-3 leading-none">🔐</div>
          <h1 className="m-0 text-white text-2xl font-bold tracking-wide">Set New Password</h1>
          <p className="m-0 mt-2 text-white/80 text-sm font-medium">Choose a strong password for your admin account</p>
        </div>
        <Suspense fallback={<div className="p-8 text-center text-[#1A0A1D]/60 font-medium">Loading…</div>}>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
}
