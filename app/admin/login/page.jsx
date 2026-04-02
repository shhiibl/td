'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/admin/login', form);
      router.push('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FCE8F4] to-[#EDD5F5] p-5 font-[Inter]">
      <div className="w-full max-w-[440px] bg-white/90 backdrop-blur-xl rounded-[28px] overflow-hidden shadow-[0_32px_80px_rgba(108,42,121,0.18)] border border-[#D9A8E8]/40 animate-fadeIn">
        
        {/* Brand Header */}
        <div className="bg-gradient-to-br from-[#6C2A79] to-[#D41479] py-10 px-8 text-center">
          <div className="w-[60px] h-[60px] mx-auto mb-4 rounded-[18px] bg-white/20 flex items-center justify-center text-[1.4rem] font-black text-white border-2 border-white/30 shadow-inner">
            TM
          </div>
          <h1 className="m-0 text-white text-2xl font-bold tracking-wide">
            Admin Portal
          </h1>
          <p className="m-0 mt-2 text-white/80 text-sm font-medium">
            Tidy Mimo Management
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          {error && (
            <div className="bg-[#D41479]/10 border border-[#D41479]/30 rounded-xl px-4 py-3 text-[#D41479] text-sm font-medium mb-5 animate-fadeIn">
              {error}
            </div>
          )}

          <div className="mb-5 flex flex-col gap-2">
            <label className="text-[0.85rem] font-bold text-[#6C2A79]">Email Address</label>
            <input
              id="admin-email"
              type="email"
              placeholder="admin@tidymimo.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
              className="w-full px-4 py-3.5 rounded-xl border-[1.5px] border-[#D9A8E8]/50 text-base outline-none bg-[#FCE8F4]/30 text-[#1A0A1D] focus:border-[#D41479] transition-colors focus:bg-white"
            />
          </div>

          <div className="mb-7 flex flex-col gap-2">
            <label className="text-[0.85rem] font-bold text-[#6C2A79]">Password</label>
            <input
              id="admin-password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
              className="w-full px-4 py-3.5 rounded-xl border-[1.5px] border-[#D9A8E8]/50 text-base outline-none bg-[#FCE8F4]/30 text-[#1A0A1D] focus:border-[#D41479] transition-colors focus:bg-white tracking-widest"
            />
          </div>

          <button
            id="admin-login-btn"
            type="submit"
            disabled={loading}
            className={`
              w-full py-4 rounded-xl border-none bg-gradient-to-br from-[#6C2A79] to-[#D41479] text-white text-base font-bold cursor-pointer shadow-[0_8px_24px_rgba(212,20,121,0.35)] hover:scale-[1.02] transition-all duration-300
              ${loading ? 'opacity-70 cursor-not-allowed transform-none' : ''}
            `}
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>

          <div className="text-center mt-6">
            <Link href="/admin/forgot-password" className="text-[#D41479] text-[0.88rem] font-bold no-underline hover:underline">
              Forgot password? Resend link
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}
