"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import styles from "./stories.module.css";

const genres = ["All", "Fiction", "Non-fiction", "Memoir", "Poetry", "Mystery", "Romance"];

const featured = {
  title: "The Last Train to Nakuru",
  author: "Amara Osei",
  handle: "@amara_writes",
  genre: "Fiction",
  readTime: "6 min read",
  excerpt:
    "She had fourteen minutes before the train left forever. Fourteen minutes to decide whether home was a place you left or a place that left you first.",
  likes: 2841,
  saves: 412,
};

const stories = [
  { id: 1, title: "Midnight in Nairobi", author: "Kemi Adeyemi", handle: "@kemi_a", genre: "Fiction", readTime: "4 min", likes: 1203, saves: 87 },
  { id: 2, title: "My Father's Hands", author: "Priya Nair", handle: "@priya_stories", genre: "Memoir", readTime: "7 min", likes: 934, saves: 201 },
  { id: 3, title: "The Cartographer's Son", author: "Léa Moreau", handle: "@lea_m", genre: "Mystery", readTime: "9 min", likes: 772, saves: 143 },
  { id: 4, title: "Saltwater", author: "James Okafor", handle: "@james_ok", genre: "Poetry", readTime: "2 min", likes: 2100, saves: 390 },
  { id: 5, title: "One Thousand Sundays", author: "Sofia Ruiz", handle: "@sofiar", genre: "Romance", readTime: "5 min", likes: 1560, saves: 267 },
  { id: 6, title: "Equations of Loss", author: "Lin Wei", handle: "@linwei_w", genre: "Non-fiction", readTime: "8 min", likes: 644, saves: 99 },
];

const colorMap: Record<string, string> = {
  Fiction: "#7c3aed",
  Memoir: "#0891b2",
  Mystery: "#1d4ed8",
  Poetry: "#be185d",
  Romance: "#dc2626",
  "Non-fiction": "#047857",
};

export default function StoriesPage() {
  const [activeGenre, setActiveGenre] = useState("All");
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [saved, setSaved] = useState<Set<number>>(new Set());

  const filtered = stories.filter((s) => {
    const matchGenre = activeGenre === "All" || s.genre === activeGenre;
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.author.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchSearch;
  });

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.container}>

          {/* Header */}
          <div className={styles.header}>
            <Link href="/" className={styles.back}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back
            </Link>
            <div className={styles.headerText}>
              <h1 className={styles.title}>Short Stories</h1>
              <p className={styles.subtitle}>Discover bite-sized fiction, memoirs, and more from creators worldwide.</p>
            </div>
            <div className={styles.searchWrap}>
              <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                className={styles.search}
                placeholder="Search stories or authors…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Genre chips */}
          <div className={styles.chips}>
            {genres.map((g) => (
              <button
                key={g}
                className={`${styles.chip} ${activeGenre === g ? styles.chipActive : ""}`}
                onClick={() => setActiveGenre(g)}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Featured */}
          <div className={styles.featured}>
            <div className={styles.featuredBadge}>Featured</div>
            <h2 className={styles.featuredTitle}>{featured.title}</h2>
            <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
            <div className={styles.featuredMeta}>
              <div className={styles.avatar}>{featured.author[0]}</div>
              <div>
                <div className={styles.authorName}>{featured.author}</div>
                <div className={styles.authorHandle}>{featured.handle} · {featured.readTime}</div>
              </div>
              <span className={styles.genreTag} style={{ background: colorMap[featured.genre] + "22", color: colorMap[featured.genre] }}>
                {featured.genre}
              </span>
            </div>
            <div className={styles.featuredActions}>
              <button className={styles.readBtn}>Read Story</button>
              <button className={styles.iconBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
                {featured.likes.toLocaleString()}
              </button>
              <button className={styles.iconBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                </svg>
                {featured.saves}
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className={styles.grid}>
            {filtered.map((story) => (
              <div key={story.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.genreTag} style={{ background: colorMap[story.genre] + "22", color: colorMap[story.genre] }}>
                    {story.genre}
                  </span>
                  <span className={styles.readTime}>{story.readTime}</span>
                </div>
                <h3 className={styles.cardTitle}>{story.title}</h3>
                <div className={styles.cardAuthor}>
                  <div className={styles.avatar}>{story.author[0]}</div>
                  <div>
                    <div className={styles.authorName}>{story.author}</div>
                    <div className={styles.authorHandle}>{story.handle}</div>
                  </div>
                </div>
                <div className={styles.cardActions}>
                  <button
                    className={`${styles.actionBtn} ${liked.has(story.id) ? styles.actionBtnActive : ""}`}
                    onClick={() => setLiked((prev) => { const n = new Set(prev); n.has(story.id) ? n.delete(story.id) : n.add(story.id); return n; })}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill={liked.has(story.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                    {story.likes + (liked.has(story.id) ? 1 : 0)}
                  </button>
                  <button
                    className={`${styles.actionBtn} ${saved.has(story.id) ? styles.actionBtnActive : ""}`}
                    onClick={() => setSaved((prev) => { const n = new Set(prev); n.has(story.id) ? n.delete(story.id) : n.add(story.id); return n; })}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill={saved.has(story.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                    </svg>
                    {story.saves + (saved.has(story.id) ? 1 : 0)}
                  </button>
                  <button className={styles.readBtnSm}>Read</button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className={styles.empty}>No stories match your search.</div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
