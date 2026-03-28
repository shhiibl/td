"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ShieldCheck, Sparkles, Droplets, Tag, ArrowRight, CheckCircle2, Star, TrendingUp, Users, Factory } from 'lucide-react';
import HeroScene from './components/HeroScene';
import ProblemSolutionCard from './components/ProblemSolutionCard';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef();
  const heroRef = useRef(null);

  useGSAP(() => {
    // Elegant generic reveal for all sections
    const sections = gsap.utils.toArray('.reveal-section');
    sections.forEach(sec => {
      gsap.fromTo(sec, 
        { y: 80, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1.4, ease: "power3.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
          }
        }
      );
    });
    
    // Stagger glass panels universally
    const staggeredGrids = gsap.utils.toArray('.stagger-grid');
    staggeredGrids.forEach(grid => {
      const cards = grid.querySelectorAll('.glass-panel');
      if(cards.length > 0) {
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 80%"
            }
          }
        );
      }
    });

  }, { scope: containerRef });

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;
    const x = e.clientX - left - centerX;
    const y = e.clientY - top - centerY;
    
    // Parallax logic for text
    heroRef.current.style.setProperty('--hover-x', `${x * 0.05}px`);
    heroRef.current.style.setProperty('--hover-y', `${y * 0.05}px`);
    
    // Absolute cursor position for background glow mask
    heroRef.current.style.setProperty('--glow-x', `${e.clientX - left}px`);
    heroRef.current.style.setProperty('--glow-y', `${e.clientY - top}px`);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      
      {/* Liquid Background Assets Removed */}
      {/* 1. Cinematic Hero with Liquid Interactions */}
      <section 
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}
      >
        {/* Background Visuals Removed per feedback */}
        

        <div style={{ 
          position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '850px', margin: '0 auto', padding: '0 5%',
          transform: 'translate3d(var(--hover-x, 0), var(--hover-y, 0), 0)',
          transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{ padding: '0.6rem 1.5rem', borderRadius: '100px', display: 'inline-block', marginBottom: '2rem', border: '1px solid var(--glass-border)', background: 'var(--bg-surface)', backdropFilter: 'blur(10px)', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
            Your Active Cleaning Partner
          </div>
          
          <h1 className="heading-xl">
            Cleanliness is not just a <span className="text-gradient">routine.</span>
          </h1>

          <p className="text-sub" style={{ margin: '2rem auto', maxWidth: '600px', fontSize: '1.25rem' }}>
            At Tidymimo, we believe cleanliness is a reflection of care, quality, and trust. Delivering powerful cleaning solutions for households, industries, hotels, and specialized sectors.
          </p>
          
          <div className="flex-center" style={{ gap: '1rem', flexWrap: 'wrap', marginTop: '3rem' }}>
            <Link href="/products" className="btn btn-primary">
              Explore Products <ArrowRight size={20} />
            </Link>
            <Link href="/about" className="btn btn-glass">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* 1.5 The Tidymimo Difference (Hover Cards) */}
      <section className="section-spacing reveal-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="heading-lg">Experience the <span className="text-gradient">Difference</span></h2>
            <p className="text-sub" style={{ maxWidth: '600px', margin: '1rem auto 0' }}>Hover over the cards below to see how our premium formulations conquer everyday laundry and cleaning issues.</p>
          </div>
          <div className="grid-auto stagger-grid">
            <ProblemSolutionCard 
              index="01"
              problemText="Stubborn stains that never fully vanish"
              problemDesc="Repeated washing leaves fabrics damaged while grime stays locked deep in the fibers."
              solutionText="Advanced stain-lift formula removes the toughest marks"
              solutionDesc="Deep penetration enzymes lift dirt effortlessly without compromising fabric strength."
            />
            <ProblemSolutionCard 
              index="02"
              problemText="Clothes losing their original vibrancy"
              problemDesc="Bright colors fade into dullness, making garments look old prematurely."
              solutionText="Active color protection lock technology"
              solutionDesc="Polymers safeguard dye integrity, keeping your clothes vividly bright wash after wash."
            />
            <ProblemSolutionCard 
              index="03"
              problemText="Musty odors lingering after a wash"
              problemDesc="Invisible bacteria trapped in weaves causes unpleasant smells to persist."
              solutionText="Long-lasting encapsulated freshness"
              solutionDesc="Micro-fragrance pearls burst during wear, offering premium freshness all day long."
            />
          </div>
        </div>
      </section>

      {/* 2. Why Choose Tidymimo (Tinted Alternate Background) */}
      <section className="section-spacing reveal-section bg-tint">
        <div className="container">
          <div style={{ marginBottom: '5rem', textAlign: 'center' }}>
            <h2 className="heading-lg">Why Choose <span className="text-gradient">Tidymimo</span></h2>
            <p className="text-sub" style={{ maxWidth: '600px', margin: '1rem auto 0' }}>From everyday laundry to industrial degreasing, Tidymimo stands for brilliance, freshness, and reliability.</p>
          </div>

          <div className="grid-cols-12 stagger-grid">
            {[
              { title: 'Powerful Performance', desc: 'Effective on stubborn grease, stains, and dirt across all environments.', icon: <Sparkles size={32} color="var(--primary-pink)" />, span: 'col-span-7' },
              { title: 'Pleasant Fragrances', desc: 'Engineered for freshness that is refreshing and lasts all day.', icon: <Droplets size={32} color="var(--primary-purple)" />, span: 'col-span-5' },
              { title: 'Safe & Eco-Conscious', desc: 'Sustainable formulations that prioritize safety and environmental care.', icon: <ShieldCheck size={32} color="var(--primary-pink)" />, span: 'col-span-5' },
              { title: 'Premium Value', desc: 'Affordable pricing without any compromise on elite cleaning quality.', icon: <Tag size={32} color="var(--primary-purple)" />, span: 'col-span-7' }
            ].map((feature, i) => (
              <div key={i} className={`glass-panel ${feature.span}`} style={{ padding: '3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: '350px' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '16px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'auto' }}>
                  {feature.icon}
                </div>
                <div style={{ marginTop: '2.5rem' }}>
                  <h3 className="heading-md" style={{ marginBottom: '1rem' }}>{feature.title}</h3>
                  <p className="text-sub">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Feature Highlights (Light Background) */}
      <section className="section-spacing reveal-section">
        <div className="container grid-cols-12" style={{ alignItems: 'center' }}>
          <div className="col-span-5">
            <h2 className="heading-lg" style={{ marginBottom: '1.5rem' }}>Next-Gen Solutions for Every Space</h2>
            <p className="text-sub" style={{ marginBottom: '2.5rem' }}>
              Whether you are maintaining a cozy home or managing an industrial facility, our liquid formulations adapt to your specific sanitation needs with zero compromise.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {['Household Care & Detergents', 'Industrial Grade Degreasers', 'Hospitality Surface Cleaners'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                  <CheckCircle2 color="var(--primary-pink)" /> {item}
                </li>
              ))}
            </ul>
            <Link href="/products" className="btn btn-glass">View All Ranges</Link>
          </div>
          <div className="col-span-7 stagger-grid">
            <div className="glass-panel" style={{ height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--bg-surface), rgba(212, 20, 121, 0.03))' }}>
              <div style={{ textAlign: 'center' }}>
                <Droplets size={64} color="var(--primary-purple)" style={{ margin: '0 auto 1.5rem', opacity: 0.8 }} />
                <span className="text-gradient heading-md" style={{ display: 'block' }}>Liquid Flow Formulations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works (Tinted Alternate Background) */}
      <section className="section-spacing reveal-section bg-tint">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="heading-lg">Our Liquid <span className="text-gradient">Process</span></h2>
          </div>
          <div className="grid-auto stagger-grid">
            {[
              { step: '01', title: 'Consultation', desc: 'We analyze your industrial or household cleaning requirements.' },
              { step: '02', title: 'Formulation', desc: 'Targeted chemistry engineered for your specific dirt profiling.' },
              { step: '03', title: 'Delivery & Results', desc: 'Fast deployment resulting in spotless, frictionless hygiene.' }
            ].map((step, i) => (
              <div key={i} className="glass-panel" style={{ position: 'relative', padding: '3rem 2.5rem', overflow: 'hidden' }}>
                <div style={{ fontSize: '6rem', fontWeight: 700, opacity: 0.03, color: 'var(--primary-purple)', position: 'absolute', top: '-1rem', right: '1rem', lineHeight: 1 }}>
                  {step.step}
                </div>
                <h3 className="heading-md" style={{ marginTop: '2rem', marginBottom: '1rem', position: 'relative' }}>{step.title}</h3>
                <p className="text-sub" style={{ position: 'relative' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Stats / Metrics (Light Background) */}
      <section className="section-spacing reveal-section">
        <div className="container stagger-grid">
          <div className="glass-panel" style={{ padding: '4rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '3rem' }}>
            {[
              { label: 'Happy Clients', value: '10k+', icon: <Users size={32} /> },
              { label: 'Products Tested', value: '150+', icon: <Factory size={32} /> },
              { label: 'Satisfaction Rate', value: '99%', icon: <TrendingUp size={32} /> }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center', flex: '1 1 200px' }}>
                <div style={{ color: 'var(--primary-pink)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
                <div className="heading-lg" style={{ marginBottom: '0.5rem', fontWeight: 600 }}>{stat.value}</div>
                <div className="text-sub">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials (Tinted Alternate Background) */}
      <section className="section-spacing reveal-section bg-tint">
        <div className="container">
          <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: '5rem' }}>Trusted by <span className="text-gradient">Thousands</span></h2>
          <div className="grid-auto stagger-grid">
             {[
               { name: 'Sarah Jenkins', role: 'Operations Manager', quote: "Tidymimo's industrial degreasers completely transformed our factory's maintenance routine. Smooth, efficient, and smells great!" },
               { name: 'David Lee', role: 'Facility Director', quote: "The most reliable cleaning partner we've ever worked with. The aesthetic of the brand matches the premium quality of the liquids." },
               { name: 'Priya Sharma', role: 'Homeowner', quote: "Finally, a household cleaner that is tough on stains but completely gentle and safe for my family. Highly recommended." }
             ].map((t, i) => (
               <div key={i} className="glass-panel testimonial-card" style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column' }}>
                 <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '2rem', color: 'var(--sec-rose)' }}>
                   <Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/>
                 </div>
                 <p className="text-sub" style={{ fontStyle: 'italic', marginBottom: '2.5rem', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                   "{t.quote}"
                 </p>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
                   <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--sec-lavender), var(--sec-rose))' }}></div>
                   <div>
                     <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.name}</div>
                     <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t.role}</div>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 7. NEW: CTA with Animated Background (Light Background) */}
      <section className="section-spacing reveal-section" style={{ paddingBottom: '10rem' }}>
        <div className="container">
          <div className="glass-panel" style={{ 
            padding: '7rem 3rem', textAlign: 'center', border: 'none',
            background: 'linear-gradient(225deg, var(--sec-lavender), var(--sec-rose), var(--bg-tint))',
            backgroundSize: '200% 200%',
            animation: 'gradientFlow 8s ease infinite'
          }}>
            <h2 className="heading-lg" style={{ color: '#1A0A1D', marginBottom: '1.5rem' }}>Ready to Experience True Clean?</h2>
            <p className="text-sub" style={{ color: 'rgba(26, 10, 29, 0.8)', maxWidth: '600px', margin: '0 auto 3rem' }}>
              Upgrade your cleaning standards today with our premium formulations.
            </p>
            <Link href="/contact" className="btn btn-glass" style={{ background: 'rgba(255,255,255,0.4)', color: '#1A0A1D', borderColor: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
              Get in Touch Now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
