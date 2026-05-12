"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={`section ${styles.about}`} id="about" ref={ref}>
      <div className={`container ${styles.aboutInner}`}>
        <motion.div
          className={styles.aboutContent}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section__label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            About Us
          </div>
          <h2 className="section__title">
            Built by <span className={styles.highlight}>Penbound Partners</span>
          </h2>
          <p className="section__subtitle">
            Penbound Partners Private Limited is on a mission to democratize storytelling. 
            We believe every person has a story worth sharing, and every listener deserves 
            content that moves them.
          </p>
          <div className={styles.aboutPoints}>
            {[
              {
                icon: "🛡️",
                title: "Security First",
                desc: "End-to-end encrypted messaging and industry-leading data protection.",
              },
              {
                icon: "🌍",
                title: "Global Community",
                desc: "Creators from over 120 countries sharing stories in 40+ languages.",
              },
              {
                icon: "💡",
                title: "Creator-Centric",
                desc: "Tools and monetisation options designed to empower every creator.",
              },
            ].map((point, i) => (
              <motion.div
                key={point.title}
                className={styles.point}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
              >
                <span className={styles.pointIcon}>{point.icon}</span>
                <div>
                  <h4 className={styles.pointTitle}>{point.title}</h4>
                  <p className={styles.pointDesc}>{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.aboutVisual}
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.visualCard}>
            <div className={styles.cardGlow} />
            <div className={styles.brandMark}>
              <svg width="80" height="80" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" fill="url(#aboutGrad)" />
                <circle cx="12" cy="13" r="3" fill="white" opacity="0.9" />
                <circle cx="20" cy="13" r="3" fill="white" opacity="0.9" />
                <path d="M10 20 Q16 25 22 20" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" />
                <defs>
                  <linearGradient id="aboutGrad" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ff6b6b" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className={styles.cardLabel}>Penbound Partners Pvt. Ltd.</div>
            <div className={styles.cardTagline}>&ldquo;Stories that connect, voices that inspire.&rdquo;</div>
            <div className={styles.cardStats}>
              <div className={styles.cardStat}>
                <span className={styles.cardStatNum}>2024</span>
                <span className={styles.cardStatLabel}>Founded</span>
              </div>
              <div className={styles.cardStatDivider} />
              <div className={styles.cardStat}>
                <span className={styles.cardStatNum}>India</span>
                <span className={styles.cardStatLabel}>Headquarters</span>
              </div>
              <div className={styles.cardStatDivider} />
              <div className={styles.cardStat}>
                <span className={styles.cardStatNum}>50+</span>
                <span className={styles.cardStatLabel}>Team Size</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
