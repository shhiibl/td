"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide Navbar on admin routes
  const isAdminPage = pathname?.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  if (isAdminPage) return null;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-[100] px-[5%] pointer-events-none transition-all duration-300 ${isScrolled ? 'pt-2' : 'pt-6'}`}>
        <header 
          className={`
            mx-auto max-w-[1200px] pointer-events-auto flex justify-between items-center transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
            border border-glass-border rounded-full bg-bg-surface backdrop-blur-glass
            ${isScrolled ? 'py-2 px-4 md:px-6 shadow-lg w-[95%]' : 'py-3 px-6 md:px-8 w-full'}
          `}
        >
          {/* Logo */}
          <div className="flex items-center z-10 flex-1">
            <Link href="/" aria-label="Tidymimo Home" className="transition-transform hover:scale-105 active:scale-95">
              <Image src="/assets/LogoNoBgTextBlack.png" alt="Tidy Mimo Logo" width={110} height={30} className="logo-light object-contain" priority />
              <Image src="/assets/LogoNoBgTextWhite.png" alt="Tidy Mimo Logo" width={110} height={30} className="logo-dark object-contain" priority />
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-[2] justify-center gap-10">
            {navLinks.map((item, i) => (
              <Link 
                key={i}
                href={item.path} 
                className={`text-sm font-semibold transition-colors hover:text-primary-pink ${pathname === item.path ? 'text-primary-pink' : 'text-text-primary'}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions & Mobile Toggle */}
          <div className="flex items-center gap-4 z-10 flex-1 justify-end">
            <ThemeToggle />
            <div className="hidden md:block">
              <Link href="/contact" className="btn-primary py-2 px-6 rounded-full text-sm font-bold flex items-center gap-2">
                Get in Touch
              </Link>
            </div>
            
            <button 
              className="md:hidden p-2 text-text-primary"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Menu Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      
      {/* Mobile Menu Drawer */}
      <div 
        className={`
          fixed top-0 right-0 h-screen w-[85vw] max-w-[320px] z-[9999] bg-bg-main
          border-l border-glass-border p-8 flex flex-col shadow-2xl transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
          ${mobileMenuOpen ? 'translate-x-0 visible' : 'translate-x-[105%] invisible'}
        `}
      >
        <div className="flex justify-between items-center mb-12">
          <Image src="/assets/LogoNoBgTextBlack.png" alt="Tidy Mimo Logo" width={100} height={26} className="logo-light object-contain" />
          <Image src="/assets/LogoNoBgTextWhite.png" alt="Tidy Mimo Logo" width={100} height={26} className="logo-dark object-contain" />
          <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-text-primary">
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-6 flex-1">
          {navLinks.map((item, i) => (
            <Link 
              key={i}
              href={item.path}
              className={`text-2xl font-bold transition-colors ${pathname === item.path ? 'text-primary-pink' : 'text-text-primary'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="mt-auto">
          <Link href="/contact" className="btn-primary w-full py-4 text-center rounded-2xl font-bold flex justify-center items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            Get in Touch <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </>
  );
}
