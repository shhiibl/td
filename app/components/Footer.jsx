import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-secondary)', padding: '6rem 5% 1.5rem', borderTop: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ position: 'absolute', bottom: '-50%', left: '50%', transform: 'translateX(-50%)', width: '100vw', height: '100vw', background: 'radial-gradient(circle, rgba(212, 20, 121, 0.05) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
      
      <div className="container" style={{ maxWidth: '1300px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Image src="/assets/LogoNoBgTextBlack.png" alt="Tidy Mimo Logo" width={130} height={35} className="logo-light" style={{ objectFit: 'contain' }} priority />
          <Image src="/assets/LogoNoBgTextWhite.png" alt="Tidy Mimo Logo" width={130} height={35} className="logo-dark" style={{ objectFit: 'contain' }} priority />
          <p className="text-sub" style={{ fontSize: '0.95rem' }}>
            Your Active Cleaning Partner. Delivering powerful solutions for households, industries, and commercial spaces.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 600 }}>Quick Links</h4>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {['Home', 'About', 'Products', 'Contact'].map((link) => (
              <Link key={link} href={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="nav-link" style={{ width: 'fit-content' }}>
                {link === 'About' ? 'About Us' : link}
              </Link>
            ))}
          </nav>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 600 }}>Our Solutions</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-secondary)' }}>
            <li>Household Care</li>
            <li>Industrial Laundry</li>
            <li>Car Care</li>
            <li>Hospitality</li>
          </ul>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 600 }}>Contact</h4>
          <p className="text-sub" style={{ fontSize: '0.95rem' }}>
            Verdindies Biotech Industries<br />
            Kerala, India – PIN 676126
          </p>
          <a href="mailto:info@tidymimo.com" className="nav-link" style={{ color: 'var(--primary-pink)', fontWeight: 600 }}>
            info@tidymimo.com
          </a>
        </div>
      </div>

      <div className="container" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 1 }}>
        <p className="text-sub" style={{ fontSize: '0.85rem' }}>
          &copy; {new Date().getFullYear()} Tidy Mimo. All rights reserved.
        </p>
        <p className="text-sub" style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>
          Cleanliness is not just a routine.
        </p>
      </div>
    </footer>
  );
}
