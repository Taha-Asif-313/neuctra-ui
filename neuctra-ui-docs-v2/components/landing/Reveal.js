"use client";

import { motion } from "framer-motion";

/** Fades content in once. `data-reveal` keeps it visible without JavaScript. */
export default function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
