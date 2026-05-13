"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import styles from "./videos.module.css";

const videoList = [
  { id: 1, title: "Morning Sketching Routine", creator: "Aiko Tanaka", handle: "@aiko_draws", duration: "1:42", views: "24K", likes: 1830, category: "Art" },
  { id: 2, title: "Street Food Nairobi 🇰🇪", creator: "Mwangi Karanja", handle: "@mwangi_eats", duration: "2:58", views: "61K", likes: 4210, category: "Food" },
  { id: 3, title: "5 Tips for Flash Fiction", creator: "Emma Clarke", handle: "@emma_writes", duration: "2:11", views: "18K", likes: 990, category: "Writing" },
  { id: 4, title: "Coding a REST API in 60s", creator: "Dev Soni", handle: "@devsoni", duration: "1:05", views: "103K", likes: 8450, category: "Tech" },
  { id: 5, title: "Spoken Word: Diaspora", creator: "Chiamaka Eze", handle: "@chiam_speaks", duration: "2:33", views: "33K", likes: 2760, category: "Poetry" },
  { id: 6, title: "Minimalist Room Tour", creator: "Luisa Herrera", handle: "@luisah", duration: "2:47", views: "47K", likes: 3120, category: "Lifestyle" },
];

const categoryColors: Record<string, string> = {
  Art: "#7c3aed",
  Food: "#dc2626",
  Writing: "#0891b2",
  Tech: "#047857",
  Poetry: "#be185d",
  Lifestyle: "#d97706",
};

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState(videoList[0]);
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [progress, setProgress] = useState(34);

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.container}>

          <div className={styles.header}>
            <Link href="/" className={styles.back}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back
            </Link>
            <div>
              <h1 className={styles.title}>Short Videos</h1>
              <p className={styles.subtitle}>Watch and share vertical clips — all under 3 minutes.</p>
            </div>
          </div>

          <div className={styles.layout}>
            {/* Player */}
            <div className={styles.playerWrap}>
              <div className={styles.player}>
                {/* Placeholder video screen */}
                <div className={styles.videoScreen}>
                  <div className={styles.videoPlaceholder}>
                    <div className={styles.playRipple} />
                    <button
                      className={styles.bigPlay}
                      onClick={() => setPlaying(!playing)}
                      aria-label={playing ? "Pause" : "Play"}
                    >
                      {playing ? (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                          <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                      ) : (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      )}
                    </button>
                    <span className={styles.nowLabel}>{playing ? "Playing" : "Paused"}</span>
                  </div>

                  {/* Overlay info */}
                  <div className={styles.videoOverlay}>
                    <div className={styles.overlayTop}>
                      <span className={styles.catBadge} style={{ background: categoryColors[activeVideo.category] }}>
                        {activeVideo.category}
                      </span>
                      <span className={styles.duration}>{activeVideo.duration}</span>
                    </div>
                    <div className={styles.overlayBottom}>
                      <div className={styles.creatorRow}>
                        <div className={styles.creatorAvatar}>{activeVideo.creator[0]}</div>
                        <div>
                          <div className={styles.creatorName}>{activeVideo.creator}</div>
                          <div className={styles.creatorHandle}>{activeVideo.handle}</div>
                        </div>
                        <button className={styles.followBtn}>Follow</button>
                      </div>
                      <h2 className={styles.videoTitle}>{activeVideo.title}</h2>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className={styles.controls}>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={progress}
                      onChange={(e) => setProgress(Number(e.target.value))}
                      className={styles.progressInput}
                    />
                  </div>
                  <div className={styles.controlsRow}>
                    <button onClick={() => setPlaying(!playing)} className={styles.ctrlBtn}>
                      {playing ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      )}
                    </button>
                    <span className={styles.timeLabel}>{Math.floor(progress * 1.02)}s / {activeVideo.duration}</span>
                    <div className={styles.rightControls}>
                      <button
                        className={`${styles.ctrlBtn} ${liked.has(activeVideo.id) ? styles.ctrlBtnLiked : ""}`}
                        onClick={() => setLiked((prev) => { const n = new Set(prev); n.has(activeVideo.id) ? n.delete(activeVideo.id) : n.add(activeVideo.id); return n; })}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill={liked.has(activeVideo.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                        </svg>
                        {activeVideo.likes + (liked.has(activeVideo.id) ? 1 : 0)}
                      </button>
                      <button className={styles.ctrlBtn}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                        </svg>
                      </button>
                      <button className={styles.ctrlBtn}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                          <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className={styles.sidebar}>
              <h3 className={styles.sidebarTitle}>Up Next</h3>
              <div className={styles.videoList}>
                {videoList.map((v) => (
                  <button
                    key={v.id}
                    className={`${styles.videoItem} ${activeVideo.id === v.id ? styles.videoItemActive : ""}`}
                    onClick={() => { setActiveVideo(v); setPlaying(false); setProgress(0); }}
                  >
                    <div className={styles.thumb}>
                      <span className={styles.thumbPlay}>▶</span>
                      <span className={styles.thumbDur}>{v.duration}</span>
                    </div>
                    <div className={styles.videoMeta}>
                      <div className={styles.videoItemTitle}>{v.title}</div>
                      <div className={styles.videoItemCreator}>{v.creator}</div>
                      <div className={styles.videoItemStats}>
                        <span>{v.views} views</span>
                        <span style={{ color: categoryColors[v.category] }}>● {v.category}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
