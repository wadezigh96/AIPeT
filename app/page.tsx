"use client";

import { useState } from "react";
import Chat from "@/components/Chat";
import Donate from "@/components/Donate";
import Contribute from "@/components/Contribute";
import WalletButton from "@/components/WalletButton";

type Tab = "talk" | "donate" | "contribute";

export default function Home() {
  const [tab, setTab] = useState<Tab>("talk");

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🦊</span>
            <div>
              <h1 className="text-2xl font-bold text-orange-800">AIPeT</h1>
              <p className="text-sm text-orange-600/80">
                Robot Pet Agent · siap bantu segala keperluan
              </p>
            </div>
          </div>
          <WalletButton />
        </header>

        {/* Hero */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Teman robot pet kamu
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
            Dari foto anak kucing lembut → menjadi <strong>agent virtual rubah robot</strong> yang
            membantu sehari-hari.
            <br />
            <strong>Chat</strong> · <strong>Donate</strong> · <strong>Contribute</strong> — semua
            via x402 + Privy di Base
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {(
            [
              { id: "talk" as Tab, label: "Chat dengan Rubah", icon: "🦊" },
              { id: "donate" as Tab, label: "Donate", icon: "💖" },
              { id: "contribute" as Tab, label: "Contribute", icon: "🚀" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                tab === t.id
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-white/80 text-gray-700 border border-orange-200 hover:border-orange-400"
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === "talk" && <Chat />}
        {tab === "donate" && <Donate />}
        {tab === "contribute" && <Contribute />}

        {/* Footer */}
        <footer className="mt-10 text-center text-sm text-gray-500 space-y-1">
          <p>
            All payments go to{" "}
            <code className="bg-orange-100 px-1 rounded text-xs">0xfcea...5e03</code>{" "}
            (creator) via x402 on Base
          </p>
          <p>
            Get test USDC on Base Sepolia from{" "}
            <a
              href="https://faucet.circle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 underline"
            >
              Circle Faucet
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
