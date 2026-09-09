"use client";

import { useState, useRef, useEffect } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useX402Fetch } from "@privy-io/react-auth"; // Privy x402 helper

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const { ready, authenticated, login } = usePrivy();
  const { wallets } = useWallets();
  const { wrapFetchWithPayment } = useX402Fetch();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm AIPeT 🐶 Your decentralized AI companion. Chat with me — each message costs a tiny USDC payment via x402!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    if (!authenticated) {
      login();
      return;
    }

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      // Wrap fetch so Privy automatically handles 402 + payment signing
      const paidFetch = wrapFetchWithPayment(fetch, {
        maxValue: BigInt(100000), // max ~0.10 USDC (6 decimals) safety
      });

      const res = await paidFetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: messages.filter((m) => m.role !== "assistant" || messages.indexOf(m) > 0),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Oops! 🐕 ${err.message || "Something went wrong. Make sure you have USDC on Base Sepolia."}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[70vh] max-w-2xl mx-auto bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-orange-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-orange-400 to-rose-400 text-white flex items-center gap-3">
        <span className="text-3xl">🐶</span>
        <div>
          <h2 className="font-bold text-lg">AIPeT</h2>
          <p className="text-xs opacity-90">x402 paid chat • Base</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`pet-bubble ${m.role}`}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="pet-bubble assistant animate-pulse">Thinking... 🦉</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-orange-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={authenticated ? "Say something to AIPeT..." : "Login to chat"}
          disabled={loading}
          className="flex-1 rounded-full border border-orange-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-full px-5 py-2 font-medium transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
