"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { setTimeout(() => setIsLoading(false), 1500) }, []);
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "var(--background)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <img src="/assets/LogoNoBg.png" alt="Loading" style={{ height: "40px" }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
