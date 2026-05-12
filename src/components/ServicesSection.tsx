"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import styles from "./ServicesSection.module.css";

const services = [
  {
    id: "stories",
    title: "Short Stories",
    desc: "Dive into bite-sized fiction, memoirs, and creative non-fiction from emerging voices around the world.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        <path d="M8 7h8M8 11h6" />
      </svg>
    ),
    href: "/stories",
    color: "violet",
    badge: "Popular",
  },
  {
    id: "videos",
    title: "Short Videos",
    desc: "Watch and share vertical clips — tutorials, vlogs, sketches, and more — all under 3 minutes.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    href: "/videos",
    color: "coral",
    badge: "New",
  },
  {
    id: "audiobooks",
    title: "Audio Books",
    desc: "Listen to serialised audiobooks and spoken-word pieces narrated by the authors themselves.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0118 0v6" />
        <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
      </svg>
    ),
    href: "/audiobooks",
    color: "teal",
    badge: "Beta",
  },
  {
    id: "chat",
    title: "Chat & Connect",
    desc: "Message your favourite authors, add friends, and build your creative circle — just like Instagram.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" />
      </svg>
    ),
    href: "/chat",
    color: "amber",
    badge: "",
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={`section ${styles.services}`} id="services" ref={ref}>
      <div className="container">
        <motion.div
          className={styles.servicesHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section__label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Our Services
          </div>
          <h2 className="section__title">
            Everything You Need,<br />All in One Place
          </h2>
          <p className="section__subtitle">
            From written tales to visual stories and voice narratives — Plop has a space 
            for every form of creative expression.
          </p>
        </motion.div>

        <div className={styles.servicesGrid}>
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
            >
              <Link href={service.href} className={`${styles.serviceCard} ${styles[`card${service.color}`]}`} id={`service-${service.id}`}>
                <div className={styles.cardTop}>
                  <div className={`${styles.cardIcon} ${styles[`icon${service.color}`]}`}>
                    {service.icon}
                  </div>
                  {service.badge && (
                    <span className={`badge badge--${service.color}`}>{service.badge}</span>
                  )}
                </div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.desc}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.cardLink}>
                    Explore
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
                <div className={styles.cardShine} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
