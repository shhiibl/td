import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 5%' }}>
      <Image 
        src="/assets/LogoNoBg.png" 
        alt="Not Found" 
        width={120} height={120} 
        style={{ filter: 'grayscale(100%)', opacity: 0.5, marginBottom: '2rem' }} 
      />
      <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>Page Not Found</h2>
      <p className="text-sub" style={{ marginBottom: '2rem', textAlign: 'center' }}>We couldn't find the page you were looking for.</p>
      <Link href="/" className="btn btn-primary">Return Home</Link>
    </div>
  );
}
