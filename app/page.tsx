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
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🦊</span>
            <div>
              <h1 className="text-2xl font-bold text-orange-800">AIPeT</h1>
              <p className="text-sm text-orange-600/80">
                Robot Pet Agent · here to help with anything
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
            A soft kitten-inspired character, reimagined as a friendly{" "}
            <strong>fox robot agent</strong> that helps with everyday needs.
            <br />
            <strong>Chat</strong> · <strong>Donate</strong> · <strong>Contribute</strong> — powered by
            x402 + Privy on Base, BNB & Solana
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {(
            [
              { id: "talk" as Tab, label: "Chat with Fox", icon: "🦊" },
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
        {tab === "donate" && <Donate />}
        {tab === "contribute" && <Contribute />}

        <footer className="mt-10 text-center text-sm text-gray-500 space-y-1">
          <p>
            Payments go to{" "}
            <code className="bg-orange-100 px-1 rounded text-xs">0xfcea...5e03</code> (EVM) /{" "}
            <code className="bg-orange-100 px-1 rounded text-xs">GN3G...scvn</code> (Solana)
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
