"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { GENRES, mockStories } from "@/lib/mockData";
import styles from "../content.module.css";

export default function StoriesPage() {
  const { isLoggedIn, user } = useAuth();
  const [activeGenre, setActiveGenre] = useState("All");

  let filtered = activeGenre === "All"
    ? [...mockStories]
    : mockStories.filter((s) => s.genre === activeGenre);

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
              📖 Short Stories
            </h1>
            <p className={styles.pageSubtitle}>
              Discover bite-sized fiction and non-fiction from voices around the world
            </p>
          </motion.div>

          {/* Genre Filter */}
          <div className={styles.genreBar}>
            {GENRES.map((genre) => (
              <button
                key={genre}
                className={`chip ${activeGenre === genre ? "chip--active" : ""}`}
                onClick={() => setActiveGenre(genre)}
                id={`stories-genre-${genre.toLowerCase()}`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Stories Grid */}
          <div className={styles.contentGrid}>
            {filtered.map((story, i) => (
              <motion.div
                key={story.id}
                className={styles.storyCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <div className={styles.storyCover} style={{ background: story.coverGradient }}>
                  <svg className={styles.storyCoverIcon} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                  </svg>
                  <span className={`badge badge--violet ${styles.storyGenreBadge}`}>
                    {story.genre}
                  </span>
                </div>
                <div className={styles.storyBody}>
                  <h3 className={styles.storyTitle}>{story.title}</h3>
                  <p className={styles.storyExcerpt}>{story.excerpt}</p>
                  <div className={styles.storyMeta}>
                    <div className="avatar avatar--sm" style={{ background: story.coverGradient }}>
                      {story.author.avatar}
                    </div>
                    <div className={styles.storyAuthorInfo}>
                      <span className={styles.storyAuthorName}>
                        {story.author.name}
                        {story.author.verified && (
                          <svg className={styles.verifiedBadge} width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        )}
                      </span>
                      <span className={styles.storyTimestamp}>{story.timeAgo}</span>
                    </div>
                  </div>
                  <div className={styles.storyStats}>
                    <span className={styles.statItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                      </svg>
                      {story.likes.toLocaleString()}
                    </span>
                    <span className={styles.statItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                      </svg>
                      {story.comments}
                    </span>
                    <span className={styles.readTime}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      {story.readTime}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📚</div>
              <p>No stories found in this genre yet. Check back soon!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
