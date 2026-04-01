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
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.icon}>🔑</div>
          <h1 style={styles.title}>Reset Password</h1>
          <p style={styles.subtitle}>Enter your admin email to receive a reset link</p>
        </div>

        <div style={styles.body}>
          {status === 'sent' ? (
            <div style={styles.successBox}>
              <div style={styles.successIcon}>✉️</div>
              <h2 style={styles.successTitle}>Check your inbox!</h2>
              <p style={styles.successText}>
                A password reset link has been sent to <strong>{email}</strong>.
                Check your spam folder if it doesn't arrive within a few minutes.
              </p>
              <div style={styles.actionRow}>
                <button
                  id="admin-resend-btn"
                  onClick={handleResend}
                  style={styles.resendBtn}
                >
                  Resend Email
                </button>
                <Link href="/admin/login" style={styles.backLink}>← Back to Login</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {(status === 'error' && error) && (
                <div style={styles.errorBox}>{error}</div>
              )}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Admin Email</label>
                <input
                  id="forgot-email"
                  type="email"
                  placeholder="admin@tidymimo.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
              <button
                id="forgot-submit-btn"
                type="submit"
                disabled={status === 'loading'}
                style={{ ...styles.btn, opacity: status === 'loading' ? 0.7 : 1 }}
              >
                {status === 'loading' ? 'Sending…' : 'Send Reset Link →'}
              </button>
              <div style={styles.links}>
                <Link href="/admin/login" style={styles.link}>← Back to Login</Link>
              </div>
            </form>
          )}
        </div>
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
    width: '100%', maxWidth: '440px',
    background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)', borderRadius: '28px', overflow: 'hidden',
    boxShadow: '0 32px 80px rgba(108,42,121,0.18)', border: '1px solid rgba(217,168,232,0.4)',
  },
  header: {
    background: 'linear-gradient(135deg, #6C2A79, #D41479)',
    padding: '2.5rem 2rem', textAlign: 'center',
  },
  icon: { fontSize: '2.5rem', marginBottom: '0.8rem' },
  title: { color: '#fff', margin: 0, fontSize: '1.5rem', fontWeight: 700 },
  subtitle: { color: 'rgba(255,255,255,0.75)', margin: '6px 0 0', fontSize: '0.88rem' },
  body: { padding: '2rem' },
  errorBox: {
    background: 'rgba(212,20,121,0.08)', border: '1px solid rgba(212,20,121,0.3)',
    borderRadius: '12px', padding: '0.85rem 1rem', color: '#D41479', fontSize: '0.9rem',
    marginBottom: '1.2rem', fontWeight: 500,
  },
  fieldGroup: { marginBottom: '1.2rem' },
  label: { display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#6C2A79', marginBottom: '8px' },
  input: {
    width: '100%', padding: '0.85rem 1rem', borderRadius: '14px',
    border: '1.5px solid rgba(217,168,232,0.5)', fontSize: '1rem', outline: 'none',
    background: 'rgba(252,232,244,0.3)', color: '#1A0A1D', boxSizing: 'border-box',
  },
  btn: {
    width: '100%', padding: '1rem', borderRadius: '14px', border: 'none',
    background: 'linear-gradient(135deg, #6C2A79, #D41479)', color: '#fff',
    fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(212,20,121,0.35)',
  },
  links: { textAlign: 'center', marginTop: '1.2rem' },
  link: { color: '#D41479', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none' },
  successBox: { textAlign: 'center' },
  successIcon: { fontSize: '3rem', marginBottom: '1rem' },
  successTitle: { fontSize: '1.4rem', fontWeight: 700, color: '#1A0A1D', margin: '0 0 0.8rem' },
  successText: { color: 'rgba(26,10,29,0.7)', lineHeight: 1.7, fontSize: '0.95rem', margin: '0 0 1.5rem' },
  actionRow: { display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' },
  resendBtn: {
    padding: '0.85rem 2rem', borderRadius: '12px',
    background: 'linear-gradient(135deg, #6C2A79, #D41479)',
    color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem',
    boxShadow: '0 8px 24px rgba(212,20,121,0.3)',
  },
  backLink: { color: '#D41479', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' },
};
