"use client";

import { motion } from "framer-motion";
import TextReveal from "../components/TextReveal";
import { MapPin, Mail, Globe } from "lucide-react";
import MagneticButton from "../components/MagneticButton";

export default function Contact() {
  return (
    <div style={{ paddingTop: '140px', paddingBottom: '100px', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <TextReveal text="Contact Us" />
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '4rem' }}>
          We’d love to hear from you! Whether you’re a distributor, retailer, or end user, Tidymimo is ready to serve your cleaning needs.
        </p>

        <div className="split-grid" style={{ gap: '4rem', marginTop: '2rem' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            
            <div style={{ background: 'var(--surface-1)', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid var(--glass-border)', height: '100%' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}><MapPin size={24} /> Manufactured for:</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                <strong>Verdindies Biotech Industries</strong><br />
                Kerala, India – PIN 676126
              </p>

              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}><Mail size={24} /> Email:</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                <a href="mailto:info@tidymimo.com" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>info@tidymimo.com</a>
              </p>

              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}><Globe size={24} /> Website:</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <a href="https://www.tidymimo.com" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>www.tidymimo.com</a>
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} style={{ background: 'var(--surface-1)', padding: '3rem', borderRadius: '2rem', border: '1px solid var(--glass-border)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>Send us a message</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <input type="text" placeholder="Name" style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-primary)' }} />
              <input type="email" placeholder="Email" style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-primary)' }} />
              <textarea placeholder="Message" rows={5} style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-primary)', resize: 'vertical' }} />
              <div style={{ marginTop: '0.5rem' }}>
                <MagneticButton>
                  <button type="button" style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '100px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', display: 'inline-block' }}>
                    Send Message
                  </button>
                </MagneticButton>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
