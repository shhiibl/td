'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip auth check on public admin routes
    const publicRoutes = ['/admin/login', '/admin/forgot-password', '/admin/reset-password'];
    if (publicRoutes.some(r => pathname.startsWith(r))) return;

    // Verify token exists by pinging a protected endpoint
    fetch('/api/admin/products', { method: 'GET' })
      .then(res => {
        if (res.status === 401) router.replace('/admin/login');
      })
      .catch(() => router.replace('/admin/login'));
  }, [pathname, router]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', fontFamily: 'var(--font-inter)' }}>
      {children}
    </div>
  );
}
