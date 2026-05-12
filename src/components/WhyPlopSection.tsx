"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./WhyPlopSection.module.css";

const reasons = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Privacy by Design",
    desc: "Your data stays yours. We never sell personal information, and all messages are encrypted end-to-end.",
    color: "violet",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    title: "No Toxic Algorithms",
    desc: "Our feed prioritises quality over virality. Discover content that genuinely resonates, not just outrage-bait.",
    color: "coral",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Real Connections",
    desc: "Add friends, follow creators, and have meaningful conversations — not just hollow engagement metrics.",
    color: "teal",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Multi-Format",
    desc: "Stories, videos, audiobooks, voice messages — express yourself in any format that feels natural.",
    color: "amber",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Genre Discovery",
    desc: "Curated genre filters help you find exactly what you love — from thriller to romance to sci-fi and beyond.",
    color: "violet",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Lightning Fast",
    desc: "Optimised for speed on any device. Low data usage, offline reading, and instant loading — even on 3G.",
    color: "amber",
  },
];

export default function WhyPlopSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={`section ${styles.why}`} id="why-plop" ref={ref}>
      <div className="container">
        <motion.div
          className={styles.whyHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section__label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Why Plop?
          </div>
          <h2 className="section__title">
            Social Media,<br />
            <span className={styles.highlight}>Done Differently</span>
          </h2>
          <p className="section__subtitle" style={{ textAlign: "center" }}>
            We&apos;re not another doomscrolling app. Plop is built for meaningful creativity 
            and genuine human connection.
          </p>
        </motion.div>

        <div className={styles.whyGrid}>
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              className={`${styles.reasonCard} ${styles[`reason${reason.color}`]}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
            >
              <div className={`${styles.reasonIcon} ${styles[`reasonIcon${reason.color}`]}`}>
                {reason.icon}
              </div>
              <h4 className={styles.reasonTitle}>{reason.title}</h4>
              <p className={styles.reasonDesc}>{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
