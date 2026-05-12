"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { mockChats } from "@/lib/mockData";
import styles from "../content.module.css";

interface Message {
  id: string;
  sender: "me" | "them";
  text: string;
  time: string;
}

// Bot replies bank
const botReplies = [
  "That's so interesting! Tell me more.",
  "I completely agree with you.",
  "Haha, nice one!",
  "I'm working on something new actually, stay tuned.",
  "Thanks for the support!",
  "Let me get back to you on that.",
  "Oh wow, I hadn't thought about it that way.",
];

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState(mockChats[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  
  // Store messages per chat ID
  const [chatHistories, setChatHistories] = useState<Record<string, Message[]>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load from session storage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("plop_chat_histories");
    if (stored) {
      setChatHistories(JSON.parse(stored));
    }
  }, []);

  // Save to session storage when histories change
  useEffect(() => {
    if (Object.keys(chatHistories).length > 0) {
      sessionStorage.setItem("plop_chat_histories", JSON.stringify(chatHistories));
    }
    // Scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistories, activeChat]);

  const filtered = searchQuery
    ? mockChats.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockChats;

  const currentMessages = chatHistories[activeChat.id] || (
    activeChat.lastMessage ? [{ id: 'init', sender: 'them', text: activeChat.lastMessage, time: activeChat.time }] : []
  );

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "me",
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistories(prev => ({
      ...prev,
      [activeChat.id]: [...currentMessages, newMessage]
    }));
    setInputMessage("");

    // Simulate bot reply
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "them",
        text: botReplies[Math.floor(Math.random() * botReplies.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistories(prev => {
        const existing = prev[activeChat.id] || (
          activeChat.lastMessage ? [{ id: 'init', sender: 'them' as const, text: activeChat.lastMessage, time: activeChat.time }] : []
        );
        return {
          ...prev,
          [activeChat.id]: [...existing, replyMessage]
        };
      });
    }, 1000 + Math.random() * 1500);
  };

  return (
    <>
      <Navbar />
      <main className={`${styles.contentPage}`} style={{ padding: "100px 0 0" }}>
        <div className="container">
          <motion.div
            className={styles.chatLayout}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Sidebar */}
            <div className={styles.chatSidebar}>
              <div className={styles.chatSidebarHeader}>
                <h2 className={styles.chatSidebarTitle}>💬 Chats</h2>
                <button className="btn btn--icon btn--ghost" aria-label="New chat">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
              <div className={styles.chatSearch}>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Search friends & authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  id="chat-search"
                />
              </div>
              <div className={styles.chatList}>
                {filtered.map((chat) => {
                  const hasHistory = chatHistories[chat.id] && chatHistories[chat.id].length > 0;
                  const lastMsg = hasHistory ? chatHistories[chat.id][chatHistories[chat.id].length - 1].text : chat.lastMessage;
                  
                  return (
                    <div
                      key={chat.id}
                      className={`${styles.chatItem} ${activeChat.id === chat.id ? styles.chatItemActive : ""}`}
                      onClick={() => setActiveChat(chat)}
                    >
                      <div className={styles.chatAvatar}>
                        <div className="avatar" style={{ background: chat.isAuthor ? "var(--accent-violet)" : "var(--accent-teal)" }}>
                          {chat.avatar}
                        </div>
                        {chat.online && <div className={styles.onlineDot} />}
                      </div>
                      <div className={styles.chatItemInfo}>
                        <span className={styles.chatItemName}>
                          {chat.name}
                          {chat.isAuthor && <span className={styles.authorTag}>Author</span>}
                        </span>
                        <span className={styles.chatItemMsg}>{lastMsg}</span>
                      </div>
                      <div className={styles.chatItemRight}>
                        <span className={styles.chatItemTime}>{chat.time}</span>
                        {chat.unread > 0 && !hasHistory && (
                          <span className={styles.unreadBadge}>{chat.unread}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main chat area */}
            <div className={styles.chatMain}>
              <div className={styles.chatMainHeader}>
                <div className={styles.chatAvatar}>
                  <div className="avatar" style={{ background: activeChat.isAuthor ? "var(--accent-violet)" : "var(--accent-teal)" }}>
                    {activeChat.avatar}
                  </div>
                  {activeChat.online && <div className={styles.onlineDot} />}
                </div>
                <div>
                  <div className={styles.chatMainName}>
                    {activeChat.name}
                    {activeChat.isAuthor && <span className={styles.authorTag} style={{ marginLeft: "8px" }}>Author</span>}
                  </div>
                  <div className={styles.chatMainStatus}>
                    {activeChat.online ? "Online" : "Offline"}
                  </div>
                </div>
                <div style={{ flex: 1 }} />
                <button className="btn btn--icon btn--ghost" aria-label="More options">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </button>
              </div>

              <div className={styles.chatMessages} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', overflowY: 'auto' }}>
                {currentMessages.length === 0 ? (
                  <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" style={{ margin: '0 auto 1rem' }}>
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                    <p>Start a conversation with <strong>{activeChat.name}</strong></p>
                    <p style={{ fontSize: "0.82rem" }}>
                      {activeChat.isAuthor
                        ? "Send a message to your favourite author"
                        : "Chat with your friend"
                      }
                    </p>
                  </div>
                ) : (
                  currentMessages.map(msg => (
                    <div 
                      key={msg.id} 
                      style={{ 
                        alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                        maxWidth: '70%',
                        background: msg.sender === 'me' ? 'var(--accent-violet)' : 'var(--bg-secondary)',
                        color: msg.sender === 'me' ? 'white' : 'var(--text-primary)',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-lg)',
                        borderBottomRightRadius: msg.sender === 'me' ? '4px' : 'var(--radius-lg)',
                        borderBottomLeftRadius: msg.sender === 'them' ? '4px' : 'var(--radius-lg)',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '0.95rem' }}>{msg.text}</p>
                      <span style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '4px', display: 'block', textAlign: msg.sender === 'me' ? 'right' : 'left' }}>
                        {msg.time}
                      </span>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <form className={styles.chatInputBar} onSubmit={handleSendMessage}>
                <button type="button" className="btn btn--icon btn--ghost" aria-label="Attach file">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  id="chat-message-input"
                />
                <button type="submit" className="btn btn--primary btn--icon" aria-label="Send message" id="chat-send">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
