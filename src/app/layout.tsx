import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Plop — Share Stories, Videos & Voices",
  description:
    "Plop is a secure social media platform where authors share short stories, videos, and voice messages. Connect with creators, discover new content, and build your creative community.",
  keywords: [
    "plop",
    "social media",
    "short stories",
    "short videos",
    "audiobooks",
    "voice messages",
    "creative community",
  ],
  icons: {
    icon: "/plop_chat_stories_logo.jpeg",
    apple: "/plop_chat_stories_logo.jpeg",
  },
  openGraph: {
    title: "Plop — Share Stories, Videos & Voices",
    description:
      "Plop is a secure social media platform where authors share short stories, videos, and voice messages.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
