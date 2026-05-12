"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import styles from "./register.module.css";

const GENRES = [
  "Thriller", "Romance", "Sci-Fi", "Fantasy", "Mystery", "Horror",
  "Comedy", "Drama", "Poetry", "Non-Fiction", "Adventure", "Biography",
  "Self-Help", "True Crime", "Historical", "Satire",
];

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [usernameChecking, setUsernameChecking] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    username: "",
    password: "",
    confirmPassword: "",
    genres: [] as string[],
  });

  const update = (key: string, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const toggleGenre = (genre: string) => {
    setForm((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const checkUsername = (username: string) => {
    update("username", username);
    if (username.length < 3) {
      setUsernameAvailable(null);
      return;
    }
    setUsernameChecking(true);
    // Simulate DB check
    setTimeout(() => {
      const taken = ["admin", "plop", "test", "user", "author"];
      setUsernameAvailable(!taken.includes(username.toLowerCase()));
      setUsernameChecking(false);
    }, 800);
  };

  const canProceed = () => {
    if (step === 1) return form.firstName && form.lastName && form.email && form.dob;
    if (step === 2) return form.username.length >= 3 && usernameAvailable && form.password.length >= 8 && form.password === form.confirmPassword;
    if (step === 3) return form.genres.length >= 3;
    return false;
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
        avatar: "",
        genres: form.genres
      });
      router.push("/stories");
    }, 2000);
  };

  const stepVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.bgGlow} />
      <div className={styles.gridPattern} />

      <motion.div
        className={styles.registerCard}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" fill="url(#regGrad)" />
            <circle cx="12" cy="13" r="3" fill="white" opacity="0.9" />
            <circle cx="20" cy="13" r="3" fill="white" opacity="0.9" />
            <path d="M10 20 Q16 25 22 20" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" />
            <defs>
              <linearGradient id="regGrad" x1="0" y1="0" x2="32" y2="32">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ff6b6b" />
              </linearGradient>
            </defs>
          </svg>
          <span className={styles.logoText}>plop</span>
        </Link>

        {/* Step indicator */}
        <div className={styles.stepIndicator}>
          {[1, 2, 3].map((s) => (
            <div key={s} className={styles.stepItem}>
              <div className={`${styles.stepDot} ${step >= s ? styles.stepDotActive : ""} ${step === s ? styles.stepDotCurrent : ""}`}>
                {step > s ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  s
                )}
              </div>
              <span className={`${styles.stepLabel} ${step >= s ? styles.stepLabelActive : ""}`}>
                {s === 1 ? "Personal" : s === 2 ? "Account" : "Preferences"}
              </span>
              {s < 3 && <div className={`${styles.stepConnector} ${step > s ? styles.stepConnectorActive : ""}`} />}
            </div>
          ))}
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className={styles.stepContent}
            >
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>Personal Details</h2>
                <p className={styles.stepSubtitle}>Tell us a bit about yourself</p>
              </div>
              <div className={styles.formFields}>
                <div className={styles.formRow}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-firstname">First Name</label>
                    <input className="form-input" type="text" id="reg-firstname" placeholder="John" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-lastname">Last Name</label>
                    <input className="form-input" type="text" id="reg-lastname" placeholder="Doe" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-email">Email</label>
                  <input className="form-input" type="email" id="reg-email" placeholder="you@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-dob">Date of Birth</label>
                  <input className="form-input" type="date" id="reg-dob" value={form.dob} onChange={(e) => update("dob", e.target.value)} required />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className={styles.stepContent}
            >
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>Create Your Account</h2>
                <p className={styles.stepSubtitle}>Choose a unique username and set your password</p>
              </div>
              <div className={styles.formFields}>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-username">Username</label>
                  <div className={styles.usernameWrap}>
                    <span className={styles.usernamePrefix}>@</span>
                    <input
                      className={`form-input ${styles.usernameInput} ${usernameAvailable === false ? "form-input--error" : ""}`}
                      type="text"
                      id="reg-username"
                      placeholder="your.username"
                      value={form.username}
                      onChange={(e) => checkUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._]/g, ""))}
                      required
                    />
                    {usernameChecking && <span className={styles.usernameSpinner} />}
                    {!usernameChecking && usernameAvailable === true && (
                      <svg className={styles.usernameCheck} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                    {!usernameChecking && usernameAvailable === false && (
                      <svg className={styles.usernameCheck} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    )}
                  </div>
                  {usernameAvailable === false && (
                    <span className="form-error">This username is already taken</span>
                  )}
                  {usernameAvailable === true && (
                    <span className="form-hint" style={{ color: "var(--accent-teal)" }}>Username is available!</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-password">Password</label>
                  <input className="form-input" type="password" id="reg-password" placeholder="Min. 8 characters" value={form.password} onChange={(e) => update("password", e.target.value)} required />
                  <div className={styles.strengthBar}>
                    <div
                      className={styles.strengthFill}
                      style={{
                        width: form.password.length === 0 ? "0%" : form.password.length < 6 ? "25%" : form.password.length < 10 ? "60%" : "100%",
                        background: form.password.length < 6 ? "var(--accent-coral)" : form.password.length < 10 ? "var(--accent-amber)" : "var(--accent-teal)",
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-confirm">Confirm Password</label>
                  <input
                    className={`form-input ${form.confirmPassword && form.password !== form.confirmPassword ? "form-input--error" : ""}`}
                    type="password"
                    id="reg-confirm"
                    placeholder="Re-enter password"
                    value={form.confirmPassword}
                    onChange={(e) => update("confirmPassword", e.target.value)}
                    required
                  />
                  {form.confirmPassword && form.password !== form.confirmPassword && (
                    <span className="form-error">Passwords don&apos;t match</span>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className={styles.stepContent}
            >
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>Pick Your Genres</h2>
                <p className={styles.stepSubtitle}>Select at least 3 genres you enjoy (you can change these later)</p>
              </div>
              <div className={styles.genreGrid}>
                {GENRES.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    className={`chip ${form.genres.includes(genre) ? "chip--active" : ""}`}
                    onClick={() => toggleGenre(genre)}
                    id={`genre-${genre.toLowerCase()}`}
                  >
                    {form.genres.includes(genre) && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                    {genre}
                  </button>
                ))}
              </div>
              <p className={styles.genreCount}>
                {form.genres.length} of 3 minimum selected
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className={styles.navButtons}>
          {step > 1 && (
            <button className="btn btn--outline" onClick={() => setStep(step - 1)} type="button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}
          <div style={{ flex: 1 }} />
          {step < 3 ? (
            <button className="btn btn--primary" onClick={() => setStep(step + 1)} disabled={!canProceed()} type="button" id="reg-next">
              Continue
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button className="btn btn--primary btn--lg" onClick={handleSubmit} disabled={!canProceed() || loading} type="button" id="reg-submit">
              {loading ? <span className={styles.spinner} /> : "Create Account"}
            </button>
          )}
        </div>

        <p className={styles.footerText}>
          Already have an account?{" "}
          <Link href="/login" className={styles.footerLink}>Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
