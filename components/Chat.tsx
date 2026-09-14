"use client";

import { useState, useRef, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const { authenticated, login } = usePrivy();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "🦊 *ears soft-click* Hi! I'm **AIPeT** — your virtual fox robot pet.\n\nI'm here to help with **almost anything**: questions, advice, planning, ideas, pet tips, or just company.\n\nEach message uses x402 micropayments (USDC). Tell me what you need!",
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
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: messages.slice(-8),
        }),
      });

      if (res.status === 402) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "🦊 x402 payment required (USDC on Base / BNB / Solana). Connect a wallet with USDC and try again, or use an x402-compatible client.",
          },
        ]);
        return;
      }

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
          content: `🦊 *soft error beep* ${err.message || "Something went wrong. Please try again."}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[70vh] max-w-2xl mx-auto bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-orange-100 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400 text-white flex items-center gap-3">
        <div className="relative">
          <span className="text-4xl">🦊</span>
          <span className="absolute -bottom-1 -right-1 text-sm">🤖</span>
        </div>
        <div>
          <h2 className="font-bold text-lg">AIPeT · Fox</h2>
          <p className="text-xs opacity-90">Robot Pet Agent • ready to help with anything</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`pet-bubble ${m.role} whitespace-pre-wrap`}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="pet-bubble assistant animate-pulse">
              🦊 *processing...* one moment
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-orange-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={
            authenticated ? "Ask AIPeT anything..." : "Log in to chat with your robot pet"
          }
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
