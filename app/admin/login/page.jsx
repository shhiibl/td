'use client';
import { useState } from 'react';
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
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Login failed.'); return; }
      router.push('/admin');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Brand Header */}
        <div style={styles.header}>
          <div style={styles.logo}>TM</div>
          <h1 style={styles.title}>Admin Portal</h1>
          <p style={styles.subtitle}>Tidy Mimo Management</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.errorBox}>{error}</div>}

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              id="admin-email"
              type="email"
              placeholder="admin@tidymimo.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <input
              id="admin-password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
              style={styles.input}
            />
          </div>

          <button
            id="admin-login-btn"
            type="submit"
            disabled={loading}
            style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>

          <div style={styles.links}>
            <Link href="/admin/forgot-password" style={styles.link}>
              Forgot password? Resend link
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #FCE8F4 0%, #EDD5F5 100%)',
    padding: '2rem',
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    background: 'rgba(255,255,255,0.9)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '28px',
    overflow: 'hidden',
    boxShadow: '0 32px 80px rgba(108,42,121,0.18)',
    border: '1px solid rgba(217,168,232,0.4)',
  },
  header: {
    background: 'linear-gradient(135deg, #6C2A79, #D41479)',
    padding: '2.5rem 2rem',
    textAlign: 'center',
  },
  logo: {
    width: '60px',
    height: '60px',
    borderRadius: '18px',
    background: 'rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
    fontSize: '1.4rem',
    fontWeight: 800,
    color: '#fff',
    border: '2px solid rgba(255,255,255,0.3)',
  },
  title: { color: '#fff', margin: 0, fontSize: '1.6rem', fontWeight: 700, fontFamily: 'var(--font-clash)' },
  subtitle: { color: 'rgba(255,255,255,0.75)', margin: '6px 0 0', fontSize: '0.9rem' },
  form: { padding: '2rem' },
  errorBox: {
    background: 'rgba(212,20,121,0.08)',
    border: '1px solid rgba(212,20,121,0.3)',
    borderRadius: '12px',
    padding: '0.85rem 1rem',
    color: '#D41479',
    fontSize: '0.9rem',
    marginBottom: '1.2rem',
    fontWeight: 500,
  },
  fieldGroup: { marginBottom: '1.2rem' },
  label: { display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#6C2A79', marginBottom: '8px' },
  input: {
    width: '100%',
    padding: '0.85rem 1rem',
    borderRadius: '14px',
    border: '1.5px solid rgba(217,168,232,0.5)',
    fontSize: '1rem',
    outline: 'none',
    background: 'rgba(252,232,244,0.3)',
    color: '#1A0A1D',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  btn: {
    width: '100%',
    padding: '1rem',
    borderRadius: '14px',
    border: 'none',
    background: 'linear-gradient(135deg, #6C2A79, #D41479)',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: '0.5rem',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 8px 24px rgba(212,20,121,0.35)',
  },
  links: { textAlign: 'center', marginTop: '1.2rem' },
  link: { color: '#D41479', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none' },
};
