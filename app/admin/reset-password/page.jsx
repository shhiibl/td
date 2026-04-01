'use client';
import { useState, useEffect, Suspense } from 'react';
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
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Reset failed.'); setStatus('error'); return; }
      setStatus('success');
      setTimeout(() => router.push('/admin/login'), 2500);
    } catch {
      setError('Network error. Please try again.'); setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1A0A1D', margin: '0 0 0.8rem' }}>Password Updated!</h2>
        <p style={{ color: 'rgba(26,10,29,0.7)', fontSize: '0.95rem' }}>Redirecting you to login…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
      {error && <div style={styles.errorBox}>{error}</div>}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>New Password</label>
        <input id="new-password" type="password" placeholder="Min 8 characters" value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required style={styles.input} />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Confirm Password</label>
        <input id="confirm-password" type="password" placeholder="Repeat password" value={form.confirm}
          onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} required style={styles.input} />
      </div>
      <button id="reset-submit-btn" type="submit" disabled={status === 'loading' || !token}
        style={{ ...styles.btn, opacity: (status === 'loading' || !token) ? 0.7 : 1 }}>
        {status === 'loading' ? 'Updating…' : 'Set New Password →'}
      </button>
      <div style={{ textAlign: 'center', marginTop: '1.2rem' }}>
        <Link href="/admin/login" style={styles.link}>← Back to Login</Link>
      </div>
    </form>
  );
}

export default function ResetPassword() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>🔐</div>
          <h1 style={styles.title}>Set New Password</h1>
          <p style={styles.subtitle}>Choose a strong password for your admin account</p>
        </div>
        <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading…</div>}>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'linear-gradient(135deg, #FCE8F4 0%, #EDD5F5 100%)', padding: '2rem',
  },
  card: {
    width: '100%', maxWidth: '440px', background: 'rgba(255,255,255,0.9)',
    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRadius: '28px',
    overflow: 'hidden', boxShadow: '0 32px 80px rgba(108,42,121,0.18)',
    border: '1px solid rgba(217,168,232,0.4)',
  },
  header: { background: 'linear-gradient(135deg, #6C2A79, #D41479)', padding: '2.5rem 2rem', textAlign: 'center' },
  title: { color: '#fff', margin: 0, fontSize: '1.5rem', fontWeight: 700 },
  subtitle: { color: 'rgba(255,255,255,0.75)', margin: '6px 0 0', fontSize: '0.88rem' },
  errorBox: {
    background: 'rgba(212,20,121,0.08)', border: '1px solid rgba(212,20,121,0.3)', borderRadius: '12px',
    padding: '0.85rem 1rem', color: '#D41479', fontSize: '0.9rem', marginBottom: '1.2rem', fontWeight: 500,
  },
  fieldGroup: { marginBottom: '1.2rem' },
  label: { display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#6C2A79', marginBottom: '8px' },
  input: {
    width: '100%', padding: '0.85rem 1rem', borderRadius: '14px', border: '1.5px solid rgba(217,168,232,0.5)',
    fontSize: '1rem', outline: 'none', background: 'rgba(252,232,244,0.3)', color: '#1A0A1D', boxSizing: 'border-box',
  },
  btn: {
    width: '100%', padding: '1rem', borderRadius: '14px', border: 'none',
    background: 'linear-gradient(135deg, #6C2A79, #D41479)', color: '#fff', fontSize: '1rem',
    fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 24px rgba(212,20,121,0.35)',
  },
  link: { color: '#D41479', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none' },
};
