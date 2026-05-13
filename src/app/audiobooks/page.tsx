"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import styles from "./audiobooks.module.css";

const books = [
  { id: 1, title: "Echoes of the Savannah", author: "Amara Osei", episodes: 12, currentEp: 4, duration: "6h 20m", genre: "Adventure", color: "#7c3aed", progress: 33 },
  { id: 2, title: "Letters Never Sent", author: "Priya Nair", episodes: 8, currentEp: 8, duration: "3h 45m", genre: "Memoir", color: "#0891b2", progress: 100 },
  { id: 3, title: "The Glass Algorithm", author: "Dev Soni", episodes: 20, currentEp: 7, duration: "9h 10m", genre: "Sci-Fi", color: "#047857", progress: 35 },
  { id: 4, title: "Saltwater & Honey", author: "Chiamaka Eze", episodes: 5, currentEp: 2, duration: "2h 30m", genre: "Poetry", color: "#be185d", progress: 40 },
  { id: 5, title: "The Last Quarter", author: "James Okafor", episodes: 15, currentEp: 1, duration: "7h 00m", genre: "Mystery", color: "#1d4ed8", progress: 7 },
  { id: 6, title: "Mañana", author: "Sofia Ruiz", episodes: 10, currentEp: 10, duration: "4h 15m", genre: "Romance", color: "#dc2626", progress: 100 },
];

const episodes = [
  { num: 1, title: "The Beginning", duration: "28:04" },
  { num: 2, title: "Crossing the Border", duration: "31:22" },
  { num: 3, title: "A Familiar Stranger", duration: "24:48" },
  { num: 4, title: "The Weight of Rain", duration: "35:10" },
  { num: 5, title: "What We Carry", duration: "29:55" },
];

export default function AudiobooksPage() {
  const [activeBook, setActiveBook] = useState(books[0]);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(55);
  const [activeEp, setActiveEp] = useState(4);

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
              <h1 className={styles.title}>Audio Books</h1>
              <p className={styles.subtitle}>Listen to serialised audiobooks narrated by the authors themselves.</p>
            </div>
          </div>

          <div className={styles.layout}>
            {/* Library grid */}
            <div className={styles.library}>
              <h3 className={styles.sectionLabel}>Your Library</h3>
              <div className={styles.bookGrid}>
                {books.map((book) => (
                  <button
                    key={book.id}
                    className={`${styles.bookCard} ${activeBook.id === book.id ? styles.bookCardActive : ""}`}
                    onClick={() => { setActiveBook(book); setProgress(book.progress); setPlaying(false); }}
                  >
                    <div className={styles.bookCover} style={{ background: `${book.color}22`, borderColor: `${book.color}44` }}>
                      <div className={styles.bookSpine} style={{ background: book.color }} />
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={book.color} strokeWidth="1.5" strokeLinecap="round">
                        <path d="M3 18v-6a9 9 0 0118 0v6" />
                        <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
                      </svg>
                    </div>
                    <div className={styles.bookInfo}>
                      <div className={styles.bookTitle}>{book.title}</div>
                      <div className={styles.bookAuthor}>{book.author}</div>
                      <div className={styles.bookProgress}>
                        <div className={styles.progressBar}>
                          <div className={styles.progressFill} style={{ width: `${book.progress}%`, background: book.color }} />
                        </div>
                        <span className={styles.progressLabel}>{book.progress === 100 ? "Done" : `Ep ${book.currentEp}/${book.episodes}`}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Detail + Player */}
            <div className={styles.detail}>
              {/* Book detail */}
              <div className={styles.bookDetail}>
                <div className={styles.bookCoverLg} style={{ background: `${activeBook.color}22`, borderColor: `${activeBook.color}44` }}>
                  <div className={styles.bookSpineLg} style={{ background: activeBook.color }} />
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={activeBook.color} strokeWidth="1.2" strokeLinecap="round">
                    <path d="M3 18v-6a9 9 0 0118 0v6" />
                    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
                  </svg>
                </div>
                <div>
                  <span className={styles.genreBadge} style={{ color: activeBook.color, background: activeBook.color + "22" }}>{activeBook.genre}</span>
                  <h2 className={styles.bookDetailTitle}>{activeBook.title}</h2>
                  <p className={styles.bookDetailAuthor}>by {activeBook.author}</p>
                  <p className={styles.bookDetailMeta}>{activeBook.episodes} episodes · {activeBook.duration}</p>
                </div>
              </div>

              {/* Episode list */}
              <div className={styles.episodeList}>
                <h4 className={styles.episodeLabel}>Episodes</h4>
                {episodes.map((ep) => (
                  <button
                    key={ep.num}
                    className={`${styles.episodeItem} ${activeEp === ep.num ? styles.episodeItemActive : ""} ${ep.num < activeBook.currentEp ? styles.episodeDone : ""}`}
                    onClick={() => { setActiveEp(ep.num); setPlaying(false); setProgress(0); }}
                    style={activeEp === ep.num ? { borderColor: activeBook.color, background: activeBook.color + "11" } : {}}
                  >
                    <div className={styles.epNum} style={activeEp === ep.num ? { background: activeBook.color, color: "white" } : {}}>
                      {ep.num < activeBook.currentEp ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="3" fill="none" /></svg>
                      ) : ep.num}
                    </div>
                    <div className={styles.epTitle}>{ep.title}</div>
                    <div className={styles.epDuration}>{ep.duration}</div>
                  </button>
                ))}
              </div>

              {/* Player */}
              <div className={styles.player}>
                <div className={styles.playerInfo}>
                  <div className={styles.playerTitle}>Ep {activeEp} — {episodes.find(e => e.num === activeEp)?.title}</div>
                  <div className={styles.playerBook}>{activeBook.title}</div>
                </div>
                <div className={styles.progressWrap}>
                  <span className={styles.timeLbl}>{Math.floor(progress * 0.21)}:{String(Math.floor((progress * 0.21 % 1) * 60)).padStart(2, "0")}</span>
                  <div className={styles.progressTrack}>
                    <div className={styles.progressFill2} style={{ width: `${progress}%`, background: activeBook.color }} />
                    <input type="range" min={0} max={100} value={progress} onChange={(e) => setProgress(Number(e.target.value))} className={styles.progressInput} />
                  </div>
                  <span className={styles.timeLbl}>{episodes.find(e => e.num === activeEp)?.duration}</span>
                </div>
                <div className={styles.playerControls}>
                  <button className={styles.pBtn} onClick={() => setActiveEp(Math.max(1, activeEp - 1))}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2"/></svg>
                  </button>
                  <button className={styles.pBtn} onClick={() => setProgress(Math.max(0, progress - 10))}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 101.85-4.7L1 13"/></svg>
                  </button>
                  <button
                    className={styles.playBtn}
                    onClick={() => setPlaying(!playing)}
                    style={{ background: activeBook.color }}
                  >
                    {playing ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                    ) : (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    )}
                  </button>
                  <button className={styles.pBtn} onClick={() => setProgress(Math.min(100, progress + 10))}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
                  </button>
                  <button className={styles.pBtn} onClick={() => setActiveEp(Math.min(episodes.length, activeEp + 1))}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
