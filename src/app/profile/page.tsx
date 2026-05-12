"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import styles from "./profile.module.css";

const GENRES = [
  "Thriller", "Romance", "Sci-Fi", "Fantasy", "Mystery", "Horror",
  "Comedy", "Drama", "Poetry", "Non-Fiction", "Adventure", "Biography",
];

const userPosts = [
  { id: 1, type: "story", title: "The Last Lighthouse Keeper", genre: "Mystery", likes: 2453, gradient: "linear-gradient(135deg, #667eea, #764ba2)" },
  { id: 2, type: "video", title: "How I Write a Story", genre: "Non-Fiction", likes: 7800, gradient: "linear-gradient(135deg, #f093fb, #f5576c)" },
  { id: 3, type: "story", title: "Binary Hearts", genre: "Sci-Fi", likes: 1876, gradient: "linear-gradient(135deg, #4facfe, #00f2fe)" },
  { id: 4, type: "audio", title: "Whispers of the Ganges", genre: "Drama", likes: 3400, gradient: "linear-gradient(135deg, #43e97b, #38f9d7)" },
  { id: 5, type: "story", title: "Monsoon Letters", genre: "Drama", likes: 3210, gradient: "linear-gradient(135deg, #fa709a, #fee140)" },
  { id: 6, type: "video", title: "Plot Twist Techniques", genre: "Thriller", likes: 4100, gradient: "linear-gradient(135deg, #a18cd1, #fbc2eb)" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts" | "saved" | "about">("posts");
  const [profile, setProfile] = useState({
    firstName: "Amara", lastName: "Okafor", username: "amara.writes",
    email: "amara@example.com",
    bio: "Storyteller • Dreamer • Night owl 🌙\nSharing tales that linger long after the last word.",
    location: "Mumbai, India", website: "amara.ink",
    genres: ["Mystery", "Sci-Fi", "Drama", "Thriller"],
  });
  const [editForm, setEditForm] = useState({ ...profile });

  const handleSave = () => { setProfile({ ...editForm }); setEditing(false); };

  const toggleGenre = (genre: string) => {
    setEditForm((p) => ({
      ...p, genres: p.genres.includes(genre) ? p.genres.filter((g) => g !== genre) : [...p.genres, genre],
    }));
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      logout();
      router.push("/");
    }
  };

  return (
    <>
      <Navbar />
      <main className={`${styles.profilePage} section`}>
        <div className="container">
          <motion.div className={styles.profileHeader}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className={styles.coverImage}><div className={styles.coverGradient} /></div>
            <div className={styles.profileMain}>
              <div className={styles.avatarSection}>
                <div className={`avatar avatar--2xl ${styles.profileAvatar}`}>A</div>
                {editing && <button className={`btn btn--sm btn--ghost ${styles.changePhotoBtn}`}>📷 Change</button>}
              </div>
              <div className={styles.profileInfo}>
                <div className={styles.nameRow}>
                  <h1 className={styles.profileName}>{profile.firstName} {profile.lastName}</h1>
                  <svg className={styles.verifiedBadge} width="20" height="20" viewBox="0 0 24 24" fill="var(--accent-violet-glow)">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </div>
                <p className={styles.profileUsername}>@{profile.username}</p>
                <p className={styles.profileBio}>{profile.bio}</p>
                <div className={styles.profileMeta}>
                  <span className={styles.metaItem}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    {profile.location}
                  </span>
                  <span className={styles.metaItem}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                    </svg>
                    {profile.website}
                  </span>
                </div>
                <div className={styles.genreTags}>
                  {profile.genres.map((g) => <span key={g} className="badge badge--violet">{g}</span>)}
                </div>
              </div>
              <div className={styles.profileActions}>
                <div className={styles.profileStats}>
                  {[{ n: "42", l: "Posts" }, { n: "12.5K", l: "Followers" }, { n: "489", l: "Following" }, { n: "156", l: "Friends" }].map((s) => (
                    <div key={s.l} className={styles.profileStat}>
                      <span className={styles.statNum}>{s.n}</span>
                      <span className={styles.statLbl}>{s.l}</span>
                    </div>
                  ))}
                </div>
                <button className={`btn ${editing ? "btn--coral" : "btn--outline"}`}
                  onClick={() => editing ? handleSave() : setEditing(true)} id="profile-edit-btn">
                  {editing ? "Save Changes" : "Edit Profile"}
                </button>
              </div>
            </div>
          </motion.div>

          {editing && (
            <motion.div className={styles.editSection}
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.3 }}>
              <h3 className={styles.editTitle}>Edit Profile</h3>
              <div className={styles.editGrid}>
                <div className="form-group">
                  <label className="form-label" htmlFor="edit-fn">First Name</label>
                  <input className="form-input" id="edit-fn" value={editForm.firstName} onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="edit-ln">Last Name</label>
                  <input className="form-input" id="edit-ln" value={editForm.lastName} onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="edit-un">Username</label>
                  <input className="form-input" id="edit-un" value={editForm.username} onChange={(e) => setEditForm({ ...editForm, username: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="edit-em">Email</label>
                  <input className="form-input" type="email" id="edit-em" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                </div>
                <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="form-label" htmlFor="edit-bio">Bio</label>
                  <textarea className="form-input" id="edit-bio" rows={3} value={editForm.bio} onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })} style={{ resize: "vertical" }} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="edit-loc">Location</label>
                  <input className="form-input" id="edit-loc" value={editForm.location} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="edit-web">Website</label>
                  <input className="form-input" id="edit-web" value={editForm.website} onChange={(e) => setEditForm({ ...editForm, website: e.target.value })} />
                </div>
                <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="form-label">Genre Preferences</label>
                  <div className={styles.editGenres}>
                    {GENRES.map((g) => (
                      <button key={g} type="button" className={`chip ${editForm.genres.includes(g) ? "chip--active" : ""}`} onClick={() => toggleGenre(g)}>{g}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.editActions} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button 
                  className="btn btn--ghost" 
                  style={{ color: 'var(--accent-coral)' }} 
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </button>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn--ghost" onClick={() => { setEditForm({ ...profile }); setEditing(false); }}>Cancel</button>
                  <button className="btn btn--primary" onClick={handleSave} id="profile-save-btn">Save Changes</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tabs */}
          <div className={styles.tabs}>
            {(["posts", "saved", "about"] as const).map((tab) => (
              <button key={tab} className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(tab)} id={`profile-tab-${tab}`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "posts" && (
            <div className={styles.postsGrid}>
              {userPosts.map((post, i) => (
                <motion.div key={post.id} className={styles.postCard}
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05, duration: 0.3 }}>
                  <div className={styles.postCover} style={{ background: post.gradient }}>
                    <span className={styles.postType}>{post.type === "story" ? "📖" : post.type === "video" ? "🎬" : "🎧"}</span>
                  </div>
                  <div className={styles.postInfo}>
                    <h4 className={styles.postTitle}>{post.title}</h4>
                    <div className={styles.postMeta}>
                      <span className="badge badge--violet">{post.genre}</span>
                      <span className={styles.postLikes}>❤️ {post.likes.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "saved" && (
            <div className={styles.emptyTab}>
              <p style={{ opacity: 0.4, fontSize: "2rem" }}>🔖</p>
              <p>Your saved stories, videos, and audiobooks will appear here</p>
            </div>
          )}

          {activeTab === "about" && (
            <div className={styles.aboutTab}>
              <div className={styles.aboutCard}><h4>Bio</h4><p>{profile.bio}</p></div>
              <div className={styles.aboutCard}>
                <h4>Interests</h4>
                <div className={styles.editGenres}>{profile.genres.map((g) => <span key={g} className="badge badge--violet">{g}</span>)}</div>
              </div>
              <div className={styles.aboutCard}><h4>Joined</h4><p>January 2024</p></div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
