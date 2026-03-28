"use client";

import Image from 'next/image';

export default function Error({ error, reset }) {
  return (
    <div style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 5%' }}>
      <Image 
        src="/assets/LogoNoBg.png" 
        alt="Error" 
        width={120} height={120} 
        style={{ filter: 'grayscale(100%)', opacity: 0.5, marginBottom: '2rem' }} 
      />
      <h2 className="heading-lg sanoof" style={{ marginBottom: '1rem' }}>Something went wrong!</h2>
      <p className="text-sub" style={{ marginBottom: '2rem', textAlign: 'center' }}>An unexpected error occurred while loading this page.</p>
      <button onClick={() => reset()} className="btn btn-primary">Try Again</button>
    </div>
  );
}
