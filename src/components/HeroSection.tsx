"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className={styles.hero} ref={ref}>
      {/* Animated background orbs */}
      <div className={styles.bgOrbs}>
        <div className={`${styles.orb} ${styles.orbViolet}`} />
        <div className={`${styles.orb} ${styles.orbCoral}`} />
        <div className={`${styles.orb} ${styles.orbTeal}`} />
      </div>

      {/* Grid pattern overlay */}
      <div className={styles.gridPattern} />

      <div className={`container ${styles.heroInner}`}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <motion.div
            className={styles.heroBadge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className={styles.badgeDot} />
            Now in early access — Join the community
          </motion.div>

          {/* Headline */}
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine}>Where Every Voice</span>
            <span className={styles.titleGradient}>Finds Its Stage</span>
          </h1>

          {/* Subtitle */}
          <p className={styles.heroSubtitle}>
            Share short stories, captivating videos, and heartfelt voice messages. 
            Connect with creators you love, build friendships, and discover content 
            that speaks to your soul.
          </p>

          {/* CTAs */}
          <div className={styles.heroCtas}>
            <Link href="/#services" className="btn btn--outline btn--lg">
              Explore Features
            </Link>
          </div>

          {/* Stats */}
          <motion.div
            className={styles.heroStats}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {[
              { value: "50K+", label: "Active Creators" },
              { value: "1M+", label: "Stories Shared" },
              { value: "4.9", label: "App Rating" },
            ].map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          className={styles.heroVisual}
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.mockupContainer}>
            {/* Phone mockup */}
            <div className={styles.phoneMockup}>
              <div className={styles.phoneNotch} />
              <div className={styles.phoneScreen}>
                {/* Feed simulation */}
                <div className={styles.feedHeader}>
                  <div className={styles.feedLogo}>plop</div>
                  <div className={styles.feedIcons}>
                    <div className={styles.feedIconDot} />
                    <div className={styles.feedIconDot} />
                  </div>
                </div>
                {/* Story card */}
                <div className={styles.storyCard}>
                  <div className={styles.storyAvatar}>
                    <span>A</span>
                  </div>
                  <div className={styles.storyMeta}>
                    <span className={styles.storyAuthor}>amara.writes</span>
                    <span className={styles.storyTime}>2h ago</span>
                  </div>
                </div>
                <div className={styles.storyContent}>
                  <div className={styles.storyImagePlaceholder}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5">
                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className={styles.storyText}>
                    &ldquo;The rain whispered secrets to the old oak tree, each drop a letter 
                    in nature&apos;s longest love poem...&rdquo;
                  </p>
                </div>
                <div className={styles.storyActions}>
                  <div className={styles.actionBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                    <span>2.4k</span>
                  </div>
                  <div className={styles.actionBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                    <span>89</span>
                  </div>
                  <div className={styles.actionBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
                    <span>Share</span>
                  </div>
                </div>

                {/* Second card peek */}
                <div className={styles.storyCard} style={{ opacity: 0.5, marginTop: '8px' }}>
                  <div className={styles.storyAvatar} style={{ background: 'linear-gradient(135deg, #14b8a6, #2dd4bf)' }}>
                    <span>K</span>
                  </div>
                  <div className={styles.storyMeta}>
                    <span className={styles.storyAuthor}>kai.stories</span>
                    <span className={styles.storyTime}>4h ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              className={`${styles.floatingCard} ${styles.floatingCard1}`}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/></svg>
              <span>Voice message</span>
            </motion.div>

            <motion.div
              className={`${styles.floatingCard} ${styles.floatingCard2}`}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              <span>+2.4k likes</span>
            </motion.div>

            <motion.div
              className={`${styles.floatingCard} ${styles.floatingCard3}`}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              <span>New friend request</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className={styles.heroFade} />
    </section>
  );
}
