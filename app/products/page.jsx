"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import TextReveal from '../components/TextReveal';
import { ArrowRight, Sparkles } from 'lucide-react';

const CATEGORY_META = {
  household: {
    title: 'Household Care',
    subtitle: 'Bring professional cleaning power into your home.',
    description: 'From kitchens to living spaces, Tidymimo Household Care products are crafted to deliver spotless results, lasting freshness, and safe cleaning for your family. Designed with care and powered by performance — because every clean home deserves a professional touch.'
  },
  industrial: {
    title: 'Laundry Care (Industrial)',
    subtitle: 'Powerful cleaning solutions tailored for laundries, hotels, and cleaning companies.',
    description: 'Delivering efficiency, freshness, and consistent results with every wash.'
  },
  carcare: {
    title: 'Car Care Solutions',
    subtitle: 'Formulated for automotive detailing centers and workshops.',
    description: 'Deliver high-performance cleaning, protection, and shine for every vehicle — inside and out.'
  },
  hotels: {
    title: 'Hotels & Restaurants',
    subtitle: 'Professional-grade hygiene solutions.',
    description: 'Designed for the hospitality and food service industries. Tidymimo ensures cleanliness, safety, and freshness across every corner.'
  }
};

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all');

  const navItems = [
    { id: 'all', label: 'All Products' },
    { id: 'household', label: 'Household Care' },
    { id: 'industrial', label: 'Laundry (Industrial)' },
    { id: 'carcare', label: 'Car Care' },
    { id: 'hotels', label: 'Hotels & Restaurants' }
  ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => {
        setProducts(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load products', err);
        setLoading(false);
      });
  }, []);

  // Logic to get items based on category
  const getDisplayData = () => {
    const items = activeCategory === 'all' 
      ? products 
      : products.filter(p => p.category === activeCategory);

    if (activeCategory === 'all') {
      return {
        title: "All Solutions",
        subtitle: "The complete Tidymimo catalog",
        description: "Explore our full range of premium cleaning formulations across all sectors.",
        items
      };
    }
    
    return {
      ...CATEGORY_META[activeCategory],
      items
    };
  };

  const displayData = getDisplayData();

  return (
    <div className="bg-bg-main text-text-primary pt-32 pb-24 min-h-screen overflow-x-hidden">
      
      <div className="container mx-auto px-[5%] relative z-10">
        <div className="text-center mb-16">
          <TextReveal text="Our Product Range" />
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mt-6">
            Elevate your standard of clean with our premium selection of solutions designed for brilliant results in every sector.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center gap-3 md:gap-4 flex-wrap mb-20">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveCategory(item.id)}
              className={`
                relative px-6 py-3 rounded-full border text-sm md:text-base font-bold transition-all duration-400 backdrop-blur-glass
                ${activeCategory === item.id 
                  ? 'border-primary-pink bg-bg-tint text-primary-purple shadow-[0_10px_30px_rgba(212,20,121,0.2)]' 
                  : 'border-glass-border bg-bg-surface text-text-primary hover:border-primary-pink/50'}
              `}
            >
              {item.label}
              {activeCategory === item.id && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 rounded-full z-[-1]"
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
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black mb-4 text-text-primary tracking-tight">
                {displayData.title}
              </h2>
              <p className="text-lg md:text-xl text-primary-purple font-semibold mb-3">
                {displayData.subtitle}
              </p>
              <p className="text-base md:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
                {displayData.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {loading ? (
                <div className="col-span-full py-20 flex justify-center">
                  <div className="w-12 h-12 border-4 border-primary-pink/20 border-t-primary-pink rounded-full animate-spin"></div>
                </div>
              ) : displayData.items.length === 0 ? (
                <div className="col-span-full py-20 text-center text-text-secondary glass-panel rounded-[32px]">
                  <p className="text-xl font-medium">No products available in this category currently.</p>
                </div>
              ) : (
                displayData.items.map((item, i) => (
                  <motion.div
                    key={`${activeCategory}-${item.id || i}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="glass-panel group flex flex-col h-full rounded-[32px] overflow-hidden hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="h-64 w-full relative bg-gradient-to-b from-sec-lavender/10 to-transparent border-b border-glass-border overflow-hidden">
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center p-8"
                        whileHover={{ scale: 1.1, rotate: -3 }}
                      >
                        <Image 
                          src={item.imageUrl || item.image || '/placeholder.png'} 
                          alt={item.name} 
                          fill 
                          className="object-contain p-6 drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)] transition-all duration-500" 
                        />
                      </motion.div>
                      
                      {/* Decorative element */}
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <Sparkles size={16} className="text-primary-pink" />
                      </div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col bg-bg-surface/30 backdrop-blur-sm">
                      <div className="flex gap-2 flex-wrap mb-5">
                        {(item.features || []).map((feature, idx) => (
                          <span key={idx} className="bg-bg-tint text-primary-purple px-3 py-1 rounded-full text-[0.65rem] font-black tracking-wider uppercase border border-primary-purple/10">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-2xl font-black mb-3 text-text-primary tracking-tight leading-none group-hover:text-primary-pink transition-colors">
                        {item.name}
                      </h3>
                      
                      <p className="text-sm text-text-secondary leading-relaxed mb-8 flex-1">
                        {item.description || item.desc}
                      </p>

                      <Link 
                        href="/contact"
                        className="mt-auto w-full py-4 px-6 text-sm font-bold border border-primary-pink text-primary-pink rounded-2xl flex justify-between items-center group/btn hover:bg-primary-pink hover:text-white transition-all duration-300"
                      >
                        Request Details
                        <ArrowRight size={18} className="transform group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
