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
    <div ref={containerRef} className="relative">
      
      {/* 1. Cinematic Hero with Liquid Interactions */}
      <section 
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        className="h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div 
          className="relative mt-20 z-10 text-center max-w-[850px] transition-transform duration-100 ease-out"
          style={{ transform: 'translate3d(var(--hover-x, 0), var(--hover-y, 0), 0)' }}
        >
          <h1 className="heading-xl mb-6 px-4">
            Cleanliness is not just a <span className="text-gradient">routine.</span>
          </h1>

          <p className="text-text-secondary text-lg md:text-2xl max-w-2xl mx-auto mb-12 px-6">
            At Tidymimo, we believe cleanliness is a reflection of care, quality, and trust. Delivering powerful cleaning solutions for households, industries, hotels, and specialized sectors.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <Link href="/products" className="btn-primary btn flex items-center gap-2 group">
              Explore Products <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about" className="btn-glass px-10 py-4 font-bold border border-glass-border rounded-full hover:bg-bg-surface-hover transition-all">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* 1.5 The Tidymimo Difference (Hover Cards) */}
      <section className="py-24 md:py-36 px-[5%] reveal-section">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="heading-lg">Experience the <span className="text-gradient">Difference</span></h2>
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mt-6">Hover over the cards below to see how our premium formulations conquer everyday laundry and cleaning issues.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 stagger-grid">
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
      <section className="py-24 md:py-36 px-[5%] reveal-section bg-bg-tint border-y border-white/30">
        <div className="container mx-auto">
          <div className="mb-20 text-center">
            <h2 className="heading-lg">Why Choose <span className="text-gradient">Tidymimo</span></h2>
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mt-6">From everyday laundry to industrial degreasing, Tidymimo stands for brilliance, freshness, and reliability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 stagger-grid">
            {[
              { title: 'Powerful Performance', desc: 'Effective on stubborn grease, stains, and dirt across all environments.', icon: <Sparkles size={32} className="text-primary-pink" />, span: 'md:col-span-7' },
              { title: 'Pleasant Fragrances', desc: 'Engineered for freshness that is refreshing and lasts all day.', icon: <Droplets size={32} className="text-primary-purple" />, span: 'md:col-span-5' },
              { title: 'Safe & Eco-Conscious', desc: 'Sustainable formulations that prioritize safety and environmental care.', icon: <ShieldCheck size={32} className="text-primary-pink" />, span: 'md:col-span-5' },
              { title: 'Premium Value', desc: 'Affordable pricing without any compromise on elite cleaning quality.', icon: <Tag size={32} className="text-primary-purple" />, span: 'md:col-span-7' }
            ].map((feature, i) => (
              <div key={i} className={`glass-panel p-10 md:p-14 flex flex-col items-start min-h-[350px] ${feature.span}`}>
                <div className="w-16 h-16 rounded-2xl bg-bg-main border border-glass-border flex items-center justify-center mb-auto shadow-sm">
                  {feature.icon}
                </div>
                <div className="mt-10">
                  <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-text-secondary text-lg">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Feature Highlights */}
      <section className="py-24 md:py-36 px-[5%] reveal-section">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-5">
            <h2 className="heading-lg mb-6">Next-Gen Solutions for Every Space</h2>
            <p className="text-text-secondary text-lg mb-10 leading-relaxed">
              Whether you are maintaining a cozy home or managing an industrial facility, our liquid formulations adapt to your specific sanitation needs with zero compromise.
            </p>
            <ul className="flex flex-col gap-5 mb-12">
              {['Household Care & Detergents', 'Industrial Grade Degreasers', 'Hospitality Surface Cleaners'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-xl font-bold text-text-primary">
                  <CheckCircle2 className="text-primary-pink" /> {item}
                </li>
              ))}
            </ul>
            <Link href="/products" className="btn-glass px-8 py-4 rounded-xl border border-glass-border font-bold hover:border-primary-pink/50 transition-colors">View All Ranges</Link>
          </div>
          <div className="md:col-span-7 stagger-grid">
            <div className="glass-panel h-[450px] flex items-center justify-center bg-gradient-to-br from-bg-surface to-primary-pink/5">
              <div className="text-center">
                <Droplets size={80} className="text-primary-purple mx-auto mb-6 opacity-80" />
                <span className="text-gradient text-3xl font-black block tracking-tight">Liquid Flow Formulations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="py-24 md:py-36 px-[5%] reveal-section bg-bg-tint border-y border-white/30">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="heading-lg">Our Liquid <span className="text-gradient">Process</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 stagger-grid">
            {[
              { step: '01', title: 'Consultation', desc: 'We analyze your industrial or household cleaning requirements.' },
              { step: '02', title: 'Formulation', desc: 'Targeted chemistry engineered for your specific dirt profiling.' },
              { step: '03', title: 'Delivery & Results', desc: 'Fast deployment resulting in spotless, frictionless hygiene.' }
            ].map((step, i) => (
              <div key={i} className="glass-panel relative p-12 overflow-hidden group hover:bg-bg-surface-hover transition-all">
                <div className="text-9xl font-black opacity-[0.03] text-primary-purple absolute -top-4 -right-4 leading-none pointer-events-none group-hover:opacity-[0.06] transition-opacity">
                  {step.step}
                </div>
                <h3 className="text-3xl font-black mt-8 mb-4 relative z-10 tracking-tight">{step.title}</h3>
                <p className="text-text-secondary text-lg relative z-10 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Stats / Metrics */}
      <section className="py-24 md:py-36 px-[5%] reveal-section">
        <div className="container mx-auto stagger-grid">
          <div className="glass-panel p-12 md:p-20 flex flex-wrap justify-around gap-12 shadow-xl">
            {[
              { label: 'Happy Clients', value: '10k+', icon: <Users size={40} /> },
              { label: 'Products Tested', value: '150+', icon: <Factory size={40} /> },
              { label: 'Satisfaction Rate', value: '99%', icon: <TrendingUp size={40} /> }
            ].map((stat, i) => (
              <div key={i} className="text-center flex-1 min-w-[200px]">
                <div className="text-primary-pink mb-6 flex justify-center">{stat.icon}</div>
                <div className="text-5xl md:text-7xl font-black mb-2 tracking-tighter">{stat.value}</div>
                <div className="text-text-secondary text-xl font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="py-24 md:py-48 px-[5%] reveal-section">
        <div className="container mx-auto">
          <div className="glass-panel rounded-[4rem] px-8 py-24 md:py-36 text-center border-none bg-gradient-to-br from-sec-lavender via-sec-rose to-bg-tint bg-[length:200%_200%] animate-[gradientFlow_8s_ease_infinite]">
            <h2 className="heading-lg text-text-primary mb-6">Ready to Experience True Clean?</h2>
            <p className="text-text-primary/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 px-4 leading-relaxed font-medium">
              Upgrade your cleaning standards today with our premium formulations.
            </p>
            <Link href="/contact" className="btn-glass bg-white/40 text-text-primary border-white/60 font-black px-12 py-5 rounded-2xl inline-flex items-center gap-3 hover:bg-white/60 transition-all">
              Get in Touch Now <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
