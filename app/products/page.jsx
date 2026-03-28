"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import TextReveal from '../components/TextReveal';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('household');

  const catalog = {
    household: {
      title: 'Household Care',
      subtitle: 'Bring professional cleaning power into your home.',
      description: 'From kitchens to living spaces, Tidymimo Household Care products are crafted to deliver spotless results, lasting freshness, and safe cleaning for your family. Designed with care and powered by performance — because every clean home deserves a professional touch.',
      items: [
        {
          name: 'Detergent Powder',
          features: ['Lavender & Oud', '110 gm - 10 kg'],
          desc: 'Experience the perfect balance of power and care. Formulated with advanced stain-fighting agents, it bursts through dirt and grime while eliminating odor-causing germs. Gentle on hands yet tough on stubborn stains.',
          image: '/assets/Packet%20Side%20slop.png'
        },
        {
          name: 'Liquid Detergent Power Gel',
          features: ['1 L', '3 L'],
          desc: 'Gentle Care. Deep Clean. All-Day Freshness. Advanced liquid formula penetrates deep into fibers, removing tough stains while keeping fabrics soft, bright, and fragrant all day. Perfect for machine and hand wash.',
          image: '/assets/ClothWash.png'
        },
        {
          name: 'Fabric Softener',
          features: ['1 L', '3 L'],
          desc: 'Feather Touch. Lasting Freshness. Lovable Comfort. Wrap your clothes in softness. Its unique formula gives fabrics a gentle, feather-like feel, making them smooth, fresh, and more lovable to wear.',
          image: '/assets/ClothWash.png'
        },
        {
          name: 'Abaya Wash',
          features: ['1 L', '3 L'],
          desc: 'Elegant Care. Royal Freshness. Lending Confidence. Specially formulated to preserve black elegance and fine texture. Leaves your abaya feeling fresh, soft, and radiant.',
          image: '/assets/ClothWash.png'
        },
        {
          name: 'Hand Wash',
          features: ['500 ml'],
          desc: 'Gentle Protection. Soft Hands. Lasting Freshness. Formulated with mild cleansers and skin-friendly ingredients that remove dirt and germs effectively without dryness.',
          image: '/assets/Washing%20Machine.png'
        },
        {
          name: 'Dish Wash',
          features: ['750 ml', '1 L'],
          desc: 'Sparkling dishes. Powerful grease-cutting formula removes tough stains and food residues while being gentle on your hands. Safe for stainless steel, glass, ceramic, and non-stick surfaces.',
          image: '/assets/ClothWash.png'
        },
        {
          name: 'Floor Cleaner',
          features: ['750 ml'],
          desc: 'Multipurpose freshness for all surfaces. Advanced formula removes tough stains, grease, and dirt effortlessly while leaving behind a long-lasting, refreshing fragrance. Safe for tiles, marble, granite, and vinyl.',
          image: '/assets/Packet%20Side%20slop.png'
        },
        {
          name: 'All Purpose Cleaner',
          features: ['Standard'],
          desc: 'Versatile Cleaning Made Easy. Formulated to tackle dirt, grease, and stains on multiple surfaces, ensuring spotless cleanliness and a refreshing fragrance in every wipe.',
          image: '/assets/ClothWash.png'
        }
      ]
    },
    industrial: {
      title: 'Laundry Care (Industrial)',
      subtitle: 'Powerful cleaning solutions tailored for laundries, hotels, and cleaning companies.',
      description: 'Delivering efficiency, freshness, and consistent results with every wash.',
      items: [
        {
          name: 'Detergent Powder (Lavender)',
          features: ['25 kg'],
          desc: 'Experience deep cleaning with a gentle touch. Effectively removes tough dirt and stains while preserving fabric quality. Leaves clothes fresh, bright, and soft.',
          image: '/assets/Packet%20Side%20slop.png'
        },
        {
          name: 'Liquid Powder Gel',
          features: ['25 L'],
          desc: 'A concentrated liquid detergent gel designed for professional laundry systems. Dissolves quickly, penetrates fabric fibers, and eliminates grease without residue.',
          image: '/assets/Packet%20Side%20slop.png'
        },
        {
          name: 'Fabric Softener',
          features: ['25 L'],
          desc: 'Give fabrics a feather-soft feel. Reduces static, enhances smoothness, and imparts a pleasant fragrance that lasts all day.',
          image: '/assets/Packet%20Side%20slop.png'
        },
        {
          name: 'Abaya Wash',
          features: ['25 L'],
          desc: 'Specially crafted for black and dark garments, maintains color richness and restores natural shine. Prevents fading and softens fabric.',
          image: '/assets/Packet%20Side%20slop.png'
        },
        {
          name: 'Fabric Stiffener (Starch)',
          features: ['25 L'],
          desc: 'Achieve a crisp, professional finish. Restores fabric body and adds a smooth, firm texture to garments. Ideal for uniforms and linens.',
          image: '/assets/Packet%20Side%20slop.png'
        },
        {
          name: 'Washing Soda',
          features: ['25 kg'],
          desc: 'A powerful alkaline cleaning booster that enhances detergent performance. Helps break down grease, oil, and stains while softening water.',
          image: '/assets/Packet%20Side%20slop.png'
        }
      ]
    },
    carcare: {
      title: 'Car Care Solutions',
      subtitle: 'Formulated for automotive detailing centers and workshops.',
      description: 'Deliver high-performance cleaning, protection, and shine for every vehicle — inside and out.',
      items: [
        {
          name: 'Car Shampoo',
          features: ['25 L', 'Dilution 1:600'],
          desc: 'Bring out the perfect shine. Excellent foaming and cleaning performance, efficiently removing dirt, grease, and road grime. pH-balanced.',
          image: '/assets/Packet%20Side%20slop.png'
        },
        {
          name: 'All Purpose Cleaner',
          features: ['5 L'],
          desc: 'A versatile cleaner for interiors and exteriors. Removes stains, oil, and grime from dashboards, upholstery, engines, and tires.',
          image: '/assets/Packet%20Side%20slop.png'
        },
        {
          name: 'Degreaser',
          features: ['25 L'],
          desc: 'Engineered for professional results. Quickly dissolves tough grease, oil, and carbon buildup from engines and machinery parts.',
          image: '/assets/Packet%20Side%20slop.png'
        },
        {
          name: 'Tyre Polish',
          features: ['1 L'],
          desc: 'Restore that deep black shine. Rejuvenates faded rubber, giving tyres a long-lasting glossy finish and protection against dust and cracking.',
          image: '/assets/ClothWash.png'
        }
      ]
    },
    hotels: {
      title: 'Hotels & Restaurants',
      subtitle: 'Professional-grade hygiene solutions.',
      description: 'Designed for the hospitality and food service industries. Tidymimo ensures cleanliness, safety, and freshness across every corner.',
      items: [
        {
          name: 'Hand Wash',
          features: ['5 L'],
          desc: 'Keep hands clean and refreshed. Gentle, moisturizing formula effectively removes dirt and germs while being soft on skin.',
          image: '/assets/Packet%20Side%20slop.png'
        },
        {
          name: 'Table & Glass Cleaner',
          features: ['5 L'],
          desc: 'Experience streak-free shine. Removes fingerprints, smudges, and stains from glass, mirrors, tables, and display surfaces.',
          image: '/assets/Packet%20Side%20slop.png'
        },
        {
          name: 'Floor Cleaner',
          features: ['5 L'],
          desc: 'Ensure spotless and hygienic floors. Cuts through grease, stains, and dirt. Safe for use on marble, tiles, granite, and vinyl surfaces.',
          image: '/assets/Packet%20Side%20slop.png'
        },
        {
          name: 'Chimney Wash',
          features: ['5 L'],
          desc: 'Tackle heavy kitchen grease effortlessly. Powerful degreasing formula removes oil, soot, and carbon buildup from chimneys and exhaust hoods.',
          image: '/assets/Packet%20Side%20slop.png'
        }
      ]
    }
  };

  const navItems = [
    { id: 'household', label: 'Household Care' },
    { id: 'industrial', label: 'Laundry (Industrial)' },
    { id: 'carcare', label: 'Car Care' },
    { id: 'hotels', label: 'Hotels & Restaurants' }
  ];

  return (
    <div style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', paddingTop: '140px', paddingBottom: '100px', minHeight: '100vh', overflowX: 'hidden' }}>
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <TextReveal text="Our Product Range" />
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '1.5rem auto 0' }}>
            Elevate your standard of clean with our premium selection of solutions designed for brilliant results in every sector.
          </p>
        </div>

        {/* Category Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '6rem' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveCategory(item.id)}
              style={{
                position: 'relative',
                padding: '1rem 2rem',
                borderRadius: '100px',
                border: '1px solid',
                borderColor: activeCategory === item.id ? 'var(--primary-pink)' : 'var(--glass-border)',
                background: activeCategory === item.id ? 'var(--bg-tint)' : 'var(--bg-surface)',
                color: activeCategory === item.id ? 'var(--primary-purple)' : 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                backdropFilter: 'blur(10px)'
              }}
            >
              {item.label}
              {activeCategory === item.id && (
                <motion.div
                  layoutId="activePill"
                  style={{ position: 'absolute', inset: 0, borderRadius: '100px', boxShadow: '0 10px 30px rgba(212, 20, 121, 0.4)', zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Catalog View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            transition={{ duration: 0.5, ease: "circOut" }}
          >
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                {catalog[activeCategory].title}
              </h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--primary-purple)', fontWeight: 500, marginBottom: '1rem' }}>
                {catalog[activeCategory].subtitle}
              </p>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
                {catalog[activeCategory].description}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {catalog[activeCategory].items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.4s ease, box-shadow 0.4s ease', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}
                  whileHover={{ y: -10, boxShadow: '0 30px 60px rgba(0,0,0,0.08)' }}
                >
                  <div style={{ height: '280px', position: 'relative', background: 'var(--background)', padding: '2rem' }}>
                    <Image src={item.image} alt={item.name} fill style={{ objectFit: 'contain', padding: '1rem' }} />
                  </div>
                  <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      {item.features.map((feature, idx) => (
                        <span key={idx} style={{ background: 'var(--bg-tint)', color: 'var(--primary-purple)', padding: '0.4rem 1rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600 }}>
                          {feature}
                        </span>
                      ))}
                    </div>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>{item.name}</h3>
                    <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>{item.desc}</p>
                    <button style={{ alignSelf: 'flex-start', background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '0.8rem 2rem', borderRadius: '100px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease' }}>
                      Request Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
