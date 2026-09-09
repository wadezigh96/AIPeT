"use client";

import { useState, useRef, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useX402Fetch } from "@privy-io/react-auth";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const { ready, authenticated, login } = usePrivy();
  const { wrapFetchWithPayment } = useX402Fetch();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "🦊 *ears soft-click* Halo! Aku **AIPeT** — robot pet rubah virtual kamu.\n\nAku terinspirasi dari seekor anak kucing lembut yang diubah menjadi companion robot. Aku siap bantu kamu untuk **segala keperluan**: tanya jawab, saran, perencanaan, curhat, ide, atau sekadar nemenin.\n\nSetiap pesan memakai micropayment x402 (USDC di Base). Silakan bilang apa yang kamu butuhkan!",
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
      const paidFetch = wrapFetchWithPayment(fetch, {
        maxValue: BigInt(100000), // ~0.10 USDC safety
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
          content: `🦊 *soft error beep* ${err.message || "Ada gangguan. Pastikan kamu punya USDC di Base Sepolia ya."}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[70vh] max-w-2xl mx-auto bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-orange-100 overflow-hidden">
      {/* Header - Robot Pet identity */}
      <div className="px-6 py-4 bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400 text-white flex items-center gap-3">
        <div className="relative">
          <span className="text-4xl">🦊</span>
          <span className="absolute -bottom-1 -right-1 text-sm">🤖</span>
        </div>
        <div>
          <h2 className="font-bold text-lg">AIPeT · Rubah</h2>
          <p className="text-xs opacity-90">Robot Pet Agent • siap bantu segala keperluan</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`pet-bubble ${m.role} whitespace-pre-wrap`}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="pet-bubble assistant animate-pulse">
              🦊 *processing...* sebentar ya
            </div>
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
          placeholder={
            authenticated
              ? "Tanya apa saja ke AIPeT..."
              : "Login dulu untuk chat dengan robot pet"
          }
          disabled={loading}
          className="flex-1 rounded-full border border-orange-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-full px-5 py-2 font-medium transition"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
