"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Target, Eye } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef();

  useGSAP(() => {
    // Reveal main heading
    gsap.fromTo(".about-heading", 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    // Stagger text blocks
    gsap.fromTo(".fade-up",
      { y: 30, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: ".story-section",
          start: "top 95%"
        }
      }
    );

    // Bento panels
    gsap.fromTo(".bento-panel",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: ".mission-vision",
          start: "top 95%"
        }
      }
    );

    // Brand Values
    gsap.fromTo(".value-panel",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: ".values-section",
          start: "top 95%"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', overflowX: 'hidden' }}>
      
      {/* Hero Section with Minimal Accents */}
      <section style={{ position: 'relative', height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        
        {/* Simple Design Accent: Ambient Glowing Orb */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--brand-light-pink) 0%, transparent 60%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />
        
        {/* Simple Design Accent: Floating Pill */}
        <div className="about-heading" style={{ position: 'absolute', top: '15%', right: '15%', padding: '0.8rem 1.5rem', background: 'var(--surface-1)', border: '1px solid var(--glass-border)', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 500, backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }}></span>
          Trusted Partner
        </div>

        {/* Simple Design Accent: Abstract Ring */}
        <div className="about-heading" style={{ position: 'absolute', bottom: '15%', left: '10%', width: '120px', height: '120px', borderRadius: '50%', border: '1px dashed var(--brand-purple)', opacity: 0.3 }} />

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 5%' }}>
          <h1 className="about-heading" style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.04em', lineHeight: 1 }}>
            Who We Are
          </h1>
          <p className="about-heading" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginTop: '1.5rem', maxWidth: '600px', margin: '1.5rem auto 0' }}>
            Conceptualized as “Tidymimo – Your Active Cleaning Partner,” our brand embodies efficiency, innovation, and care.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="story-section" style={{ padding: '8rem 5%', maxWidth: '1300px', margin: '0 auto' }}>
        <div className="split-grid" style={{ gap: '6rem', alignItems: 'center' }}>
          <div className="fade-up" style={{ position: 'relative', height: '480px', width: '100%', maxWidth: '420px', marginRight: 'auto', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
            <Image src="/assets/Woman.png" alt="Tidy Mimo Story" fill style={{ objectFit: 'cover' }} />
          </div>
          <div>
            <h2 className="fade-up" style={{ fontSize: '3.5rem', color: 'var(--text-primary)', marginBottom: '2.5rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Driven by Excellence</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p className="fade-up" style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Tidymimo is a trusted brand specializing in detergents and surfactants for both domestic and industrial use. We deliver powerful cleaning performance combined with refreshing fragrances to ensure spotless results.
              </p>
              <p className="fade-up" style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                At the heart of our brand is <strong>Mimo</strong>, a friendly rabbit — a universal symbol of cleanliness, purity, and gentleness. Just like Mimo, our products are designed to be active, fresh, and reliable, ensuring results every time.
              </p>
              <p className="fade-up" style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                We are committed to providing premium-quality cleaning products at reasonable prices, combining advanced formulations, pleasant fragrances, and superior performance to make every cleaning experience effortless and satisfying.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Bento */}
      <section className="mission-vision" style={{ padding: '5rem 5%', maxWidth: '1300px', margin: '0 auto', position: 'relative' }}>
        {/* Simple Design Accent */}
        <div style={{ position: 'absolute', top: 0, right: '5%', width: '300px', height: '300px', background: 'var(--brand-pink)', filter: 'blur(120px)', opacity: 0.2, zIndex: 0 }} />
        
        <div className="split-grid" style={{ gap: '3rem', position: 'relative', zIndex: 1 }}>
          <div className="bento-panel glass-panel" style={{ padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'var(--primary-transparent)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}><Target size={36} /></div>
            <h3 style={{ fontSize: '3rem', color: 'var(--text-primary)', marginBottom: '1.5rem', letterSpacing: '-1px' }}>Our Mission</h3>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              To make quality cleaning accessible for homes and businesses through effective products that deliver reliable results without compromise.
            </p>
          </div>
          <div className="bento-panel glass-panel" style={{ padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(108, 42, 121, 0.1)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}><Eye size={36} /></div>
            <h3 style={{ fontSize: '3rem', color: 'var(--text-primary)', marginBottom: '1.5rem', letterSpacing: '-1px' }}>Our Vision</h3>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              To become a trusted and recognized name in the cleaning and hygiene industry known for innovation, quality, and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="values-section" style={{ padding: '10rem 5% 12rem', maxWidth: '1300px', margin: '0 auto', position: 'relative' }}>
        {/* Simple Design Accent */}
        <div style={{ position: 'absolute', bottom: '10%', left: '0', width: '400px', height: '400px', background: 'var(--brand-light-purple)', filter: 'blur(150px)', opacity: 0.2, zIndex: 0 }} />
        
        <div className="value-panel" style={{ textAlign: 'center', marginBottom: '6rem', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '3.5rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Core Principles</h2>
          <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginTop: '1.5rem' }}>Tidymimo is built on four core principles driving every drop we bottle.</p>
        </div>
        <div className="split-grid" style={{ gap: '2rem', position: 'relative', zIndex: 1 }}>
          {[
            { title: 'Performance', desc: 'Products deliver incredibly strong and consistently effective cleaning results.' },
            { title: 'Freshness', desc: 'Long-lasting fragrances create a deeply refreshing cleaning experience.' },
            { title: 'Reliability', desc: 'Customers can definitively trust consistent volume, quality, and performance.' },
            { title: 'Accessibility', desc: 'Premium-quality cleaning solutions deliberately priced at reasonable, accessible rates.' }
          ].map((val, i) => (
            <div key={i} className="value-panel glass-panel" style={{ padding: '4rem 3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-1)', color: 'var(--primary)', fontWeight: 600, fontSize: '1.2rem', marginBottom: '2rem' }}>
                0{i + 1}
              </div>
              <h4 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>{val.title}</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.1rem' }}>{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
