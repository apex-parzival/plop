"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { GENRES, mockAudiobooks } from "@/lib/mockData";
import styles from "../content.module.css";

export default function AudiobooksPage() {
  const { isLoggedIn, user } = useAuth();
  const [activeGenre, setActiveGenre] = useState("All");

  let filtered = activeGenre === "All"
    ? [...mockAudiobooks]
    : mockAudiobooks.filter((s) => s.genre === activeGenre);

  // Prioritize user's genres if logged in and looking at 'All'
  if (isLoggedIn && user && activeGenre === "All") {
    filtered.sort((a, b) => {
      const aPref = user.genres.includes(a.genre);
      const bPref = user.genres.includes(b.genre);
      if (aPref && !bPref) return -1;
      if (!aPref && bPref) return 1;
      return 0;
    });
  }

  return (
    <>
      <Navbar />
      <main className={`${styles.contentPage} section`}>
        <div className="container">
          <motion.div
            className={styles.pageHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={styles.pageTitle}>
              🎧 Audio Books
            </h1>
            <p className={styles.pageSubtitle}>
              Serialised audiobooks and spoken-word pieces narrated by the authors themselves
            </p>
          </motion.div>

          {/* Genre Filter */}
          <div className={styles.genreBar}>
            {GENRES.map((genre) => (
              <button
                key={genre}
                className={`chip ${activeGenre === genre ? "chip--active" : ""}`}
                onClick={() => setActiveGenre(genre)}
                id={`audiobooks-genre-${genre.toLowerCase()}`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Audiobooks Grid */}
          <div className={styles.audiobookGrid}>
            {filtered.map((book, i) => (
              <motion.div
                key={book.id}
                className={styles.audiobookCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <div className={styles.audiobookCover} style={{ background: book.coverGradient }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4">
                    <path d="M3 18v-6a9 9 0 0118 0v6" />
                    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
                  </svg>
                </div>
                <div className={styles.audiobookInfo}>
                  <h3 className={styles.audiobookTitle}>{book.title}</h3>
                  <span className={styles.audiobookAuthor}>
                    by {book.author.name}
                    {book.author.verified && (
                      <svg className={styles.verifiedBadge} width="12" height="12" viewBox="0 0 24 24" fill="var(--accent-violet-glow)" style={{ display: "inline", marginLeft: "4px", verticalAlign: "middle" }}>
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    )}
                  </span>
                  <span className={`badge badge--teal`} style={{ width: "fit-content", marginTop: "4px" }}>
                    {book.genre}
                  </span>
                  <div className={styles.audiobookDetails}>
                    <span className={styles.audiobookDetail}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                      </svg>
                      {book.episodes} episodes
                    </span>
                    <span className={styles.audiobookDetail}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      {book.duration}
                    </span>
                    <span className={styles.audiobookDetail}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                      </svg>
                      {book.listeners.toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🎧</div>
              <p>No audiobooks found in this genre yet. Check back soon!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
