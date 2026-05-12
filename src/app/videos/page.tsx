"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { GENRES, mockVideos } from "@/lib/mockData";
import styles from "../content.module.css";

export default function VideosPage() {
  const { isLoggedIn, user } = useAuth();
  const [activeGenre, setActiveGenre] = useState("All");

  let filtered = activeGenre === "All"
    ? [...mockVideos]
    : mockVideos.filter((v) => v.genre === activeGenre);

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
              🎬 Short Videos
            </h1>
            <p className={styles.pageSubtitle}>
              Watch and share creative clips — all under 3 minutes
            </p>
          </motion.div>

          {/* Genre Filter */}
          <div className={styles.genreBar}>
            {GENRES.map((genre) => (
              <button
                key={genre}
                className={`chip ${activeGenre === genre ? "chip--active" : ""}`}
                onClick={() => setActiveGenre(genre)}
                id={`videos-genre-${genre.toLowerCase()}`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Videos Grid */}
          <div className={styles.contentGrid}>
            {filtered.map((video, i) => (
              <motion.div
                key={video.id}
                className={styles.videoCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <div className={styles.videoThumbnail} style={{ background: video.thumbnailGradient }}>
                  <div className={styles.playButton}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <span className={styles.videoDuration}>{video.duration}</span>
                </div>
                <div className={styles.videoBody}>
                  <h3 className={styles.videoTitle}>{video.title}</h3>
                  <div className={styles.videoMeta}>
                    <div className="avatar avatar--sm" style={{ background: video.thumbnailGradient }}>
                      {video.author.avatar}
                    </div>
                    <div className={styles.storyAuthorInfo}>
                      <span className={styles.storyAuthorName}>
                        {video.author.name}
                        {video.author.verified && (
                          <svg className={styles.verifiedBadge} width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        )}
                      </span>
                      <span className={styles.videoStats}>
                        {video.views.toLocaleString()} views • {video.timeAgo}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🎬</div>
              <p>No videos found in this genre yet. Check back soon!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
