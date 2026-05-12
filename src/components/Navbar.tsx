"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import styles from "./Navbar.module.css";

const loggedOutLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Why Plop", href: "/#why-plop" },
];

const loggedInLinks = [
  { label: "Stories", href: "/stories" },
  { label: "Videos", href: "/videos" },
  { label: "Audiobooks", href: "/audiobooks" },
  { label: "Chat", href: "/chat" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isLoggedIn, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = isLoggedIn ? loggedInLinks : loggedOutLinks;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`container ${styles.navInner}`}>
        {/* Logo */}
        <Link href={isLoggedIn ? "/stories" : "/"} className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" fill="url(#logoGrad)" />
              <circle cx="12" cy="13" r="3" fill="white" opacity="0.9" />
              <circle cx="20" cy="13" r="3" fill="white" opacity="0.9" />
              <path
                d="M10 20 Q16 25 22 20"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
              />
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ff6b6b" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className={styles.logoText}>plop</span>
        </Link>

        {/* Desktop Links */}
        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${
                pathname === link.href ? styles.navLinkActive : ""
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <motion.div
                  className={styles.navLinkIndicator}
                  layoutId="navIndicator"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className={styles.navActions}>
          {isLoggedIn && user ? (
            <div className={styles.profileMenuWrap}>
              <button
                className={styles.profileBtn}
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="avatar avatar--sm">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    className={styles.profileDropdown}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className={styles.dropdownHeader}>
                      <p className={styles.dropdownName}>{user.firstName} {user.lastName}</p>
                      <p className={styles.dropdownUsername}>@{user.username}</p>
                    </div>
                    <div className={styles.dropdownLinks}>
                      <Link href="/profile" className={styles.dropdownLink} onClick={() => setProfileOpen(false)}>Profile</Link>
                      <button className={styles.dropdownLink} onClick={() => { logout(); setProfileOpen(false); }}>
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : null}
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          id="nav-hamburger"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  className={`${styles.mobileLink} ${
                    pathname === link.href ? styles.mobileLinkActive : ""
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            {isLoggedIn && (
              <div className={styles.mobileActions}>
                <Link href="/profile" className="btn btn--outline" style={{ width: "100%" }}>
                  Profile
                </Link>
                <button className="btn btn--primary" style={{ width: "100%" }} onClick={logout}>
                  Sign out
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
