"use client";
import { motion } from "framer-motion";

export default function Marquee({ text }) {
  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", width: "100%", padding: "1rem 0", background: "var(--primary-transparent)", borderTop: "1px solid var(--glass-border)", borderBottom: "1px solid var(--glass-border)", display: "flex" }}>
      <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 20, ease: "linear", repeat: Infinity }} style={{ display: "flex", whiteSpace: "nowrap" }}>
        <h3 style={{ fontSize: "2rem", margin: "0 2rem", fontWeight: "300", color: "var(--text-primary)", letterSpacing: "2px" }}>{text}</h3>
        <h3 style={{ fontSize: "2rem", margin: "0 2rem", fontWeight: "300", color: "var(--text-primary)", letterSpacing: "2px" }}>{text}</h3>
      </motion.div>
    </div>
  );
}