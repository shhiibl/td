"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function OfflineDetector() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    if (typeof navigator !== 'undefined') {
      setIsOffline(!navigator.onLine);
    }
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'var(--bg-main)', zIndex: 999999,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <Image 
        src="/assets/LogoNoBg.png" 
        alt="Tidymimo Offline" 
        width={120} height={120} 
        style={{ filter: 'grayscale(100%)', opacity: 0.6, marginBottom: '2rem' }} 
      />
      <h2 className="heading-md" style={{ color: 'var(--text-primary)', marginBottom: '1rem', textAlign: 'center' }}>No Internet Connection</h2>
      <p className="text-sub" style={{ textAlign: 'center' }}>Please check your network settings and try again.</p>
    </div>
  );
}
