"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'About', 'Products', 'Contact'];

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="nav-container" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 5%', pointerEvents: 'none', transition: 'padding 0.3s ease' }}>
        <header 
          className="glass-nav"
          style={{ 
            marginTop: isScrolled ? '0.2rem' : '1.5rem',
            pointerEvents: 'auto',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: isScrolled ? '0.4rem 0.8rem 0.4rem 1.4rem' : '0.6rem 1rem 0.6rem 1.8rem',
            width: isScrolled ? '95%' : '100%',
            maxWidth: '1200px',
            marginLeft: 'auto',
            marginRight: 'auto',
            backdropFilter: isScrolled ? 'blur(16px)' : 'blur(10px)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: isScrolled ? '0 10px 40px -10px rgba(108, 42, 121, 0.08)' : 'none',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-surface)'
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', zIndex: 1, flex: 1 }}>
            <Link href="/" aria-label="Tidymimo Home">
              <div style={{ transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                <Image src="/assets/LogoNoBgTextBlack.png" alt="Tidy Mimo Logo" width={110} height={30} className="logo-light" style={{ objectFit: 'contain' }} priority />
                <Image src="/assets/LogoNoBgTextWhite.png" alt="Tidy Mimo Logo" width={110} height={30} className="logo-dark" style={{ objectFit: 'contain' }} priority />
              </div>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{ flex: 2, justifyContent: 'center' }}>
            {navLinks.map((item, i) => (
              <Link 
                key={i}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                className="nav-link"
              >
                {item === 'About' ? 'About Us' : item}
              </Link>
            ))}
          </nav>

          {/* Actions & Mobile Toggle */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', zIndex: 1, flex: 1, justifyContent: 'flex-end' }}>
            <ThemeToggle />
            <div className="desktop-nav">
              <Link href="/contact" className="btn btn-primary" style={{ padding: '0.6rem 1.4rem' }}>
                Get in Touch
              </Link>
            </div>
            
            <button 
              className="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={mobileMenuOpen}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '0.5rem' }}
            >
              <Menu size={28} />
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Menu Backdrop */}
      <div 
        style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9998,
          opacity: mobileMenuOpen ? 1 : 0, pointerEvents: mobileMenuOpen ? 'auto' : 'none', transition: 'opacity 0.3s ease'
        }}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />
      
      {/* Mobile Menu Drawer */}
      <div 
        className="glass-panel"
        style={{
          position: 'fixed', top: 0, right: 0, height: '100vh', width: '75vw', maxWidth: '300px',
          zIndex: 9999, borderTopRightRadius: 0, borderBottomRightRadius: 0,
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem', background: 'var(--bg-main)'
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/assets/LogoNoBgTextBlack.png" alt="Tidy Mimo Logo" width={100} height={26} className="logo-light" style={{ objectFit: 'contain' }} />
            <Image src="/assets/LogoNoBgTextWhite.png" alt="Tidy Mimo Logo" width={100} height={26} className="logo-dark" style={{ objectFit: 'contain' }} />
          </div>
          <button onClick={() => setMobileMenuOpen(false)} aria-label="Close Menu" style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '0.5rem' }}>
            <X size={28} />
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, paddingLeft: '0.5rem' }}>
          {navLinks.map((item, i) => (
            <Link 
              key={i}
              href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '1.4rem' }}
            >
              {item === 'About' ? 'About Us' : item}
            </Link>
          ))}
        </nav>
        
        <div style={{ paddingBottom: '2rem' }}>
          <Link href="/contact" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }} onClick={() => setMobileMenuOpen(false)}>
            Get in Touch
          </Link>
        </div>
      </div>
    </>
  );
}
