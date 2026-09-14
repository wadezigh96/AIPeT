"use client";

import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

type ActivityPost = {
  id: string;
  author: string;
  content: string;
  mood: string;
  createdAt: string;
};

const MOODS = [
  { id: "happy", label: "Happy", icon: "😊" },
  { id: "walk", label: "Walk / play", icon: "🦮" },
  { id: "care", label: "Pet care", icon: "💊" },
  { id: "rescue", label: "Rescue story", icon: "💪" },
  { id: "chill", label: "Chill", icon: "😴" },
];

const SEED: ActivityPost[] = [
  {
    id: "seed-1",
    author: "Fox · AIPeT",
    content: "Morning stretch complete. Ready to help humans and pets today.",
    mood: "happy",
    createdAt: new Date(Date.now() - 3600_000).toISOString(),
  },
  {
    id: "seed-2",
    author: "Community",
    content: "Took my rescue cat for a window-sun session. Small joys matter.",
    mood: "care",
    createdAt: new Date(Date.now() - 7200_000).toISOString(),
  },
];

const STORAGE_KEY = "aipet_activity_feed_v1";

function loadPosts(): ActivityPost[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED;
    const parsed = JSON.parse(raw) as ActivityPost[];
    return [...parsed, ...SEED].slice(0, 50);
  } catch {
    return SEED;
  }
}

function saveUserPosts(posts: ActivityPost[]) {
  if (typeof window === "undefined") return;
  const userOnly = posts.filter((p) => !p.id.startsWith("seed-"));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userOnly.slice(0, 40)));
}

export default function Feed() {
  const { ready, authenticated, login, user } = usePrivy();
  const [posts, setPosts] = useState<ActivityPost[]>(SEED);
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("happy");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    setPosts(loadPosts());
  }, []);

  async function publish() {
    if (!content.trim()) return;
    if (!authenticated) {
      login();
      return;
    }

    setPosting(true);
    try {
      const author =
        user?.wallet?.address
          ? `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}`
          : user?.email?.address || "Pet friend";

      const res = await fetch("/api/feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim(), mood, author }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);

      const post: ActivityPost = data.post || {
        id: `local-${Date.now()}`,
        author,
        content: content.trim(),
        mood,
        createdAt: new Date().toISOString(),
      };

      setPosts((prev) => {
        const next = [post, ...prev];
        saveUserPosts(next);
        return next;
      });
      setContent("");
    } catch (err: any) {
      alert(err.message || "Could not post");
    } finally {
      setPosting(false);
    }
  }

  const moodMeta = (id: string) => MOODS.find((m) => m.id === id) || MOODS[0];

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-orange-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">📝</span>
          <div>
            <h2 className="font-bold text-lg text-orange-800">Daily activity</h2>
            <p className="text-sm text-gray-500">Share walks, care moments, and rescue wins</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {MOODS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMood(m.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                mood === m.id
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white border-orange-200 text-gray-700"
              }`}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={
            authenticated
              ? "What did you and your pet do today?"
              : "Log in to share your daily pet activity"
          }
          className="w-full rounded-xl border border-orange-200 px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          rows={3}
          maxLength={500}
        />

        <button
          onClick={publish}
          disabled={posting || !ready || !content.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-full py-3 font-medium transition"
        >
          {posting ? "Posting..." : authenticated ? "Post activity" : "Connect & post"}
        </button>

        <p className="mt-2 text-xs text-gray-400">
          Posts are stored on this device for the MVP. A shared database can be added next for a global
          feed.
        </p>
      </div>

      <div className="space-y-3">
        {posts.map((p) => {
          const m = moodMeta(p.mood);
          return (
            <article
              key={p.id}
              className="bg-white/90 rounded-2xl border border-orange-100 p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-sm font-medium text-orange-800">{p.author}</span>
                <span className="text-xs text-gray-400">
                  {m.icon} {m.label} · {new Date(p.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700 text-sm whitespace-pre-wrap">{p.content}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
