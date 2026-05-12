export const GENRES = [
  "All", "Thriller", "Romance", "Sci-Fi", "Fantasy", "Mystery", "Horror",
  "Comedy", "Drama", "Poetry", "Non-Fiction", "Adventure",
];

export interface Author {
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
}

export interface StoryItem {
  id: string;
  title: string;
  excerpt: string;
  author: Author;
  genre: string;
  readTime: string;
  likes: number;
  comments: number;
  timeAgo: string;
  coverGradient: string;
}

export interface VideoItem {
  id: string;
  title: string;
  author: Author;
  genre: string;
  duration: string;
  views: number;
  likes: number;
  timeAgo: string;
  thumbnailGradient: string;
}

export interface AudiobookItem {
  id: string;
  title: string;
  author: Author;
  genre: string;
  episodes: number;
  duration: string;
  listeners: number;
  coverGradient: string;
}

export interface ChatContact {
  id: string;
  name: string;
  username: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  isAuthor: boolean;
}

const authors: Author[] = [
  { name: "Amara Okafor", username: "amara.writes", avatar: "A", verified: true },
  { name: "Kai Nakamura", username: "kai.stories", avatar: "K", verified: true },
  { name: "Luna Rivera", username: "luna.ink", avatar: "L", verified: false },
  { name: "Dev Patel", username: "dev.creates", avatar: "D", verified: true },
  { name: "Mila Chen", username: "mila.reads", avatar: "M", verified: false },
  { name: "Ren Takahashi", username: "ren.voice", avatar: "R", verified: true },
  { name: "Zara Ahmed", username: "zara.tales", avatar: "Z", verified: true },
  { name: "Leo Martinez", username: "leo.pens", avatar: "LE", verified: false },
];

const gradients = [
  "linear-gradient(135deg, #667eea, #764ba2)",
  "linear-gradient(135deg, #f093fb, #f5576c)",
  "linear-gradient(135deg, #4facfe, #00f2fe)",
  "linear-gradient(135deg, #43e97b, #38f9d7)",
  "linear-gradient(135deg, #fa709a, #fee140)",
  "linear-gradient(135deg, #a18cd1, #fbc2eb)",
  "linear-gradient(135deg, #fccb90, #d57eeb)",
  "linear-gradient(135deg, #e0c3fc, #8ec5fc)",
];

export const mockStories: StoryItem[] = [
  { id: "s1", title: "The Last Lighthouse Keeper", excerpt: "The fog rolled in thick, swallowing the coastline like a hungry beast. Maria tightened her grip on the railing, the cold metal biting into her palms...", author: authors[0], genre: "Mystery", readTime: "5 min", likes: 2453, comments: 89, timeAgo: "2h ago", coverGradient: gradients[0] },
  { id: "s2", title: "Binary Hearts", excerpt: "In a world where love was calculated by algorithms, Yuki chose to feel. The AI counsellor flagged her as anomalous, but she didn't care...", author: authors[1], genre: "Sci-Fi", readTime: "8 min", likes: 1876, comments: 134, timeAgo: "4h ago", coverGradient: gradients[1] },
  { id: "s3", title: "Monsoon Letters", excerpt: "Each raindrop carried a word from her grandmother's diary. Luna sat on the verandah, collecting stories from the sky, one drop at a time...", author: authors[2], genre: "Drama", readTime: "6 min", likes: 3210, comments: 201, timeAgo: "6h ago", coverGradient: gradients[2] },
  { id: "s4", title: "The Chai Seller's Secret", excerpt: "Nobody knew that the old chai seller at Marine Drive had once been the most feared spy in South Asia. Until the day his past came knocking...", author: authors[3], genre: "Thriller", readTime: "12 min", likes: 4567, comments: 312, timeAgo: "1d ago", coverGradient: gradients[3] },
  { id: "s5", title: "Starlit Promises", excerpt: "They met under a canopy of fireflies, two strangers bound by a promise made in another life. The universe had conspired to bring them here...", author: authors[4], genre: "Romance", readTime: "7 min", likes: 5102, comments: 445, timeAgo: "1d ago", coverGradient: gradients[4] },
  { id: "s6", title: "The Forgotten Library", excerpt: "Hidden beneath the streets of Old Delhi lay a library that remembered every story ever whispered. And tonight, it was calling out to him...", author: authors[5], genre: "Fantasy", readTime: "10 min", likes: 2890, comments: 178, timeAgo: "2d ago", coverGradient: gradients[5] },
  { id: "s7", title: "Echoes in the Attic", excerpt: "The house had been abandoned for decades, but the laughter upstairs never stopped. When Priya moved in, she discovered why...", author: authors[6], genre: "Horror", readTime: "9 min", likes: 1543, comments: 98, timeAgo: "3d ago", coverGradient: gradients[6] },
  { id: "s8", title: "The Comedian's Diary", excerpt: "Day 47: Told a joke about existential dread. The audience laughed. I cried backstage. This is what they call 'making it', I suppose...", author: authors[7], genre: "Comedy", readTime: "4 min", likes: 3678, comments: 256, timeAgo: "3d ago", coverGradient: gradients[7] },
];

export const mockVideos: VideoItem[] = [
  { id: "v1", title: "A Minute of Calm — ASMR City Rain", author: authors[0], genre: "Non-Fiction", duration: "1:47", views: 45200, likes: 3200, timeAgo: "5h ago", thumbnailGradient: gradients[0] },
  { id: "v2", title: "How I Write a Short Story in 1 Hour", author: authors[1], genre: "Non-Fiction", duration: "2:58", views: 89100, likes: 7800, timeAgo: "1d ago", thumbnailGradient: gradients[1] },
  { id: "v3", title: "The Art of World-Building", author: authors[5], genre: "Fantasy", duration: "2:30", views: 34500, likes: 2900, timeAgo: "2d ago", thumbnailGradient: gradients[2] },
  { id: "v4", title: "Stand-Up: Life as a Writer", author: authors[7], genre: "Comedy", duration: "2:45", views: 67800, likes: 5400, timeAgo: "3d ago", thumbnailGradient: gradients[3] },
  { id: "v5", title: "Book Review: Midnight's Children", author: authors[4], genre: "Drama", duration: "1:55", views: 23400, likes: 1800, timeAgo: "4d ago", thumbnailGradient: gradients[4] },
  { id: "v6", title: "Plot Twist Writing Techniques", author: authors[6], genre: "Thriller", duration: "2:12", views: 56700, likes: 4100, timeAgo: "5d ago", thumbnailGradient: gradients[5] },
];

export const mockAudiobooks: AudiobookItem[] = [
  { id: "a1", title: "Whispers of the Ganges", author: authors[0], genre: "Drama", episodes: 12, duration: "4h 30m", listeners: 12400, coverGradient: gradients[0] },
  { id: "a2", title: "Neon Dreams", author: authors[1], genre: "Sci-Fi", episodes: 8, duration: "3h 15m", listeners: 8900, coverGradient: gradients[1] },
  { id: "a3", title: "The Spice Trail", author: authors[3], genre: "Adventure", episodes: 15, duration: "6h 45m", listeners: 15600, coverGradient: gradients[2] },
  { id: "a4", title: "Love in the Time of WiFi", author: authors[4], genre: "Romance", episodes: 6, duration: "2h 20m", listeners: 21300, coverGradient: gradients[3] },
  { id: "a5", title: "Shadow Craft", author: authors[6], genre: "Thriller", episodes: 10, duration: "5h 10m", listeners: 9700, coverGradient: gradients[4] },
  { id: "a6", title: "Myth & Mountain", author: authors[5], genre: "Fantasy", episodes: 20, duration: "9h 00m", listeners: 18200, coverGradient: gradients[5] },
];

export const mockChats: ChatContact[] = [
  { id: "c1", name: "Amara Okafor", username: "amara.writes", avatar: "A", lastMessage: "Thanks for the kind words on my story! 💜", time: "2m ago", unread: 2, online: true, isAuthor: true },
  { id: "c2", name: "Kai Nakamura", username: "kai.stories", avatar: "K", lastMessage: "Check out my new sci-fi piece when you get a chance", time: "15m ago", unread: 0, online: true, isAuthor: true },
  { id: "c3", name: "Priya Sharma", username: "priya.vibes", avatar: "P", lastMessage: "Movie tonight? 🎬", time: "1h ago", unread: 1, online: false, isAuthor: false },
  { id: "c4", name: "Dev Patel", username: "dev.creates", avatar: "D", lastMessage: "Working on the collab piece now", time: "3h ago", unread: 0, online: true, isAuthor: true },
  { id: "c5", name: "Anika Roy", username: "anika.reads", avatar: "AN", lastMessage: "That book recommendation was 🔥", time: "5h ago", unread: 0, online: false, isAuthor: false },
  { id: "c6", name: "Zara Ahmed", username: "zara.tales", avatar: "Z", lastMessage: "New chapter dropping tonight!", time: "1d ago", unread: 3, online: false, isAuthor: true },
];
