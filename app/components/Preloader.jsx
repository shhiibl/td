"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-bg-main flex flex-col items-center justify-center gap-10"
        >
          {/* Logo pulse */}
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-6"
          >
            <img src="/assets/LogoNoBg.png" alt="Tidy Mimo" className="h-16 object-contain" />
            <div className="text-[0.7rem] font-bold tracking-[0.3em] text-text-secondary uppercase">
              Elevating Cleanliness
            </div>
          </motion.div>

          {/* Progress bar container */}
          <div className="w-48 relative">
            <div className="h-[2px] w-full bg-sec-lavender/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-purple to-primary-pink rounded-full"
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'easeOut', duration: 0.5 }}
              />
            </div>
          </div>

          {/* Floating comfort blobs */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                x: [0, 50, -30, 0], 
                y: [0, -50, 40, 0],
                rotate: [0, 90, 180, 270, 360] 
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] bg-primary-pink/5 blur-[100px] rounded-full"
            />
            <motion.div 
              animate={{ 
                x: [0, -40, 60, 0], 
                y: [0, 60, -50, 0],
                rotate: [360, 270, 180, 90, 0] 
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-primary-purple/5 blur-[100px] rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
