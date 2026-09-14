"use client";

import { useState } from "react";
import Chat from "@/components/Chat";
import Donate from "@/components/Donate";
import Contribute from "@/components/Contribute";
import Charity from "@/components/Charity";
import Feed from "@/components/Feed";
import WalletButton from "@/components/WalletButton";

type Tab = "talk" | "feed" | "charity" | "donate" | "contribute";

export default function Home() {
  const [tab, setTab] = useState<Tab>("talk");

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🦊</span>
            <div>
              <h1 className="text-2xl font-bold text-orange-800">AIPeT</h1>
              <p className="text-sm text-orange-600/80">
                Robot Pet Agent · help, charity & daily moments
              </p>
            </div>
          </div>
          <WalletButton />
        </header>

        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Your robot pet companion
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
            Chat with Fox, share daily pet life, support animal charity, and tip the community — via{" "}
            <strong>x402</strong> + <strong>Privy</strong> on Base, BNB, Robinhood Chain & Solana.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {(
            [
              { id: "talk" as Tab, label: "Chat", icon: "🦊" },
              { id: "feed" as Tab, label: "Activity", icon: "📝" },
              { id: "charity" as Tab, label: "Charity", icon: "🐾" },
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

        {tab === "talk" && <Chat />}
        {tab === "feed" && <Feed />}
        {tab === "charity" && <Charity />}
        {tab === "donate" && <Donate />}
        {tab === "contribute" && <Contribute />}

        <footer className="mt-10 text-center text-sm text-gray-500 space-y-1">
          <p>
            Payments:{" "}
            <code className="bg-orange-100 px-1 rounded text-xs">0xfcea...5e03</code> (EVM) /{" "}
            <code className="bg-orange-100 px-1 rounded text-xs">GN3G...scvn</code> (Solana)
          </p>
          <p>
            Optional charity wallet via <code className="text-xs">CHARITY_PAY_TO_ADDRESS</code>
          </p>
        </footer>
      </div>
    </main>
  );
}
