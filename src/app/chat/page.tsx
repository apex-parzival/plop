"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import styles from "./chat.module.css";

const contacts = [
  { id: 1, name: "Amara Osei", handle: "@amara_writes", status: "online", lastMsg: "I just published a new chapter!", time: "2m", unread: 2, color: "#7c3aed" },
  { id: 2, name: "Kemi Adeyemi", handle: "@kemi_a", status: "online", lastMsg: "Thanks for the feedback!", time: "14m", unread: 0, color: "#dc2626" },
  { id: 3, name: "Dev Soni", handle: "@devsoni", status: "away", lastMsg: "Have you tried the new feature?", time: "1h", unread: 0, color: "#047857" },
  { id: 4, name: "Sofia Ruiz", handle: "@sofiar", status: "offline", lastMsg: "Let's collab on something!", time: "3h", unread: 1, color: "#d97706" },
  { id: 5, name: "James Okafor", handle: "@james_ok", status: "offline", lastMsg: "Loved your latest story.", time: "1d", unread: 0, color: "#0891b2" },
];

type Message = { id: number; from: "me" | "them"; text: string; time: string };

const initialMessages: Record<number, Message[]> = {
  1: [
    { id: 1, from: "them", text: "Hey! Did you read my latest story?", time: "10:01 AM" },
    { id: 2, from: "me", text: "Yes! The opening line gave me chills 🔥", time: "10:03 AM" },
    { id: 3, from: "them", text: "That means so much, thank you!", time: "10:04 AM" },
    { id: 4, from: "them", text: "I just published a new chapter!", time: "10:12 AM" },
  ],
  2: [
    { id: 1, from: "me", text: "Your poem was beautiful, Kemi!", time: "9:30 AM" },
    { id: 2, from: "them", text: "Thanks for the feedback!", time: "9:45 AM" },
  ],
  3: [
    { id: 1, from: "them", text: "Have you tried the new feature?", time: "Yesterday" },
  ],
  4: [
    { id: 1, from: "them", text: "Let's collab on something!", time: "3h ago" },
  ],
  5: [
    { id: 1, from: "them", text: "Loved your latest story.", time: "Yesterday" },
  ],
};

const statusColors: Record<string, string> = {
  online: "#22c55e",
  away: "#f59e0b",
  offline: "#94a3b8",
};

export default function ChatPage() {
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.handle.toLowerCase().includes(search.toLowerCase())
  );

  const send = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;
    setMessages((prev) => ({
      ...prev,
      [activeContact.id]: [
        ...(prev[activeContact.id] || []),
        { id: Date.now(), from: "me", text: input.trim(), time },
      ],
    }));
    setInput("");

    // Simulate reply after 1s
    setTimeout(() => {
      const replies = [
        "That's great to hear! 😊",
        "I totally agree with that!",
        "Thanks for sharing!",
        "Wow, really?",
        "Can't wait to see what you come up with next!",
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      const replyTime = `${now.getHours()}:${String(now.getMinutes() + 1).padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;
      setMessages((prev) => ({
        ...prev,
        [activeContact.id]: [
          ...(prev[activeContact.id] || []),
          { id: Date.now() + 1, from: "them", text: reply, time: replyTime },
        ],
      }));
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeContact]);

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
              <h1 className={styles.title}>Chat & Connect</h1>
              <p className={styles.subtitle}>Message authors, share ideas, and build your creative circle.</p>
            </div>
          </div>

          <div className={styles.chatLayout}>
            {/* Contacts panel */}
            <div className={styles.contacts}>
              <div className={styles.searchWrap}>
                <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  className={styles.searchInput}
                  placeholder="Search messages…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className={styles.contactList}>
                {filteredContacts.map((c) => (
                  <button
                    key={c.id}
                    className={`${styles.contactItem} ${activeContact.id === c.id ? styles.contactItemActive : ""}`}
                    onClick={() => setActiveContact(c)}
                  >
                    <div className={styles.avatarWrap}>
                      <div className={styles.avatar} style={{ background: c.color }}>
                        {c.name[0]}
                      </div>
                      <span className={styles.statusDot} style={{ background: statusColors[c.status] }} />
                    </div>
                    <div className={styles.contactInfo}>
                      <div className={styles.contactTop}>
                        <span className={styles.contactName}>{c.name}</span>
                        <span className={styles.contactTime}>{c.time}</span>
                      </div>
                      <div className={styles.contactBottom}>
                        <span className={styles.contactLastMsg}>{c.lastMsg}</span>
                        {c.unread > 0 && <span className={styles.unreadBadge}>{c.unread}</span>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat window */}
            <div className={styles.chatWindow}>
              {/* Chat header */}
              <div className={styles.chatHeader}>
                <div className={styles.avatarWrap}>
                  <div className={styles.avatarLg} style={{ background: activeContact.color }}>
                    {activeContact.name[0]}
                  </div>
                  <span className={styles.statusDot} style={{ background: statusColors[activeContact.status] }} />
                </div>
                <div>
                  <div className={styles.chatHeaderName}>{activeContact.name}</div>
                  <div className={styles.chatHeaderStatus} style={{ color: statusColors[activeContact.status] }}>
                    {activeContact.status} · {activeContact.handle}
                  </div>
                </div>
                <div className={styles.chatHeaderActions}>
                  <button className={styles.hdrBtn} title="Voice call">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.1 11.5 19.79 19.79 0 01.05 3.15 2 2 0 012.06 1h3a2 2 0 012 1.72c.127.96.36 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </button>
                  <button className={styles.hdrBtn} title="Video call">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
                    </svg>
                  </button>
                  <button className={styles.hdrBtn} title="Info">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className={styles.messages}>
                {(messages[activeContact.id] || []).map((msg) => (
                  <div key={msg.id} className={`${styles.msgRow} ${msg.from === "me" ? styles.msgRowMe : ""}`}>
                    {msg.from === "them" && (
                      <div className={styles.msgAvatar} style={{ background: activeContact.color }}>
                        {activeContact.name[0]}
                      </div>
                    )}
                    <div className={`${styles.bubble} ${msg.from === "me" ? styles.bubbleMe : styles.bubbleThem}`}>
                      <span>{msg.text}</span>
                      <span className={styles.msgTime}>{msg.time}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className={styles.inputRow}>
                <button className={styles.inputBtn} title="Attach">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>
                <input
                  className={styles.messageInput}
                  placeholder={`Message ${activeContact.name}…`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
                />
                <button className={styles.inputBtn} title="Emoji">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" /><path d="M8 13s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                </button>
                <button
                  className={styles.sendBtn}
                  onClick={send}
                  disabled={!input.trim()}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
