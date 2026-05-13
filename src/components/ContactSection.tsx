"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./ContactSection.module.css";

const emptyForm = { name: "", email: "", subject: "", message: "" };

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm(emptyForm);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className={`section ${styles.contact}`} id="contact" ref={ref}>
      <div className="container">
        <div className={styles.contactInner}>
          {/* Left */}
          <motion.div
            className={styles.contactInfo}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section__label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Get in Touch
            </div>
            <h2 className="section__title">
              Let&apos;s Start a<br />
              <span className={styles.highlight}>Conversation</span>
            </h2>
            <p className="section__subtitle">
              Have questions, feedback, or partnership ideas? We&apos;d love to hear from you. 
              Our team typically responds within 24 hours.
            </p>

            <div className={styles.contactDetails}>
              <div className={styles.detail}>
                <div className={styles.detailIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className={styles.detailLabel}>Email</p>
                  <p className={styles.detailValue}>support@plop.live</p>
                </div>
              </div>
              <div className={styles.detail}>
                <div className={styles.detailIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className={styles.detailLabel}>Location</p>
                  <p className={styles.detailValue}>Bangalore, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            className={styles.contactForm}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Name</label>
                  <input className="form-input" type="text" id="contact-name" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email</label>
                  <input className="form-input" type="email" id="contact-email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Subject</label>
                <input className="form-input" type="text" id="contact-subject" name="subject" placeholder="What's this about?" value={form.subject} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea
                  className="form-input"
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell us more..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  style={{ resize: "vertical" }}
                />
              </div>
              <button type="submit" className="btn btn--primary btn--lg" style={{ width: "100%" }} id="contact-submit">
                {submitted ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Sent Successfully!
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
