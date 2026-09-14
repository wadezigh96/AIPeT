"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

const CAUSES = [
  {
    id: "shelter",
    label: "Local animal shelters",
    description: "Food, medicine, and care for rescued dogs & cats",
    icon: "🏠",
  },
  {
    id: "wildlife",
    label: "Wildlife rescue",
    description: "Rehab for injured wild animals and habitat support",
    icon: "🌿",
  },
  {
    id: "stray",
    label: "Stray & street pets",
    description: "Vaccines, sterilisation, and feeding programs",
    icon: "🐕",
  },
  {
    id: "emergency",
    label: "Emergency vet fund",
    description: "Urgent surgery and treatment for animals in crisis",
    icon: "🚑",
  },
];

export default function Charity() {
  const { ready, authenticated, login } = usePrivy();
  const [cause, setCause] = useState("shelter");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<string | null>(null);

  async function handleCharity() {
    if (!authenticated) {
      login();
      return;
    }

    setStatus("loading");
    setResult(null);

    try {
      const res = await fetch("/api/charity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cause,
          note: note || "Supporting animals through AIPeT",
        }),
      });

      if (res.status === 402) {
        setResult("x402 payment required ($1.00 USDC for charity). Fund your wallet and try again.");
        setStatus("error");
        return;
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      setResult(data.message);
      setStatus("success");
      setNote("");
    } catch (err: any) {
      setResult(err.message || "Charity donation failed");
      setStatus("error");
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-orange-100 p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">🐾</span>
        <div>
          <h2 className="font-bold text-lg text-orange-800">Animal charity</h2>
          <p className="text-sm text-gray-500">Donate to causes that help real animals</p>
        </div>
      </div>

      <p className="text-gray-600 mb-4 text-sm">
        Charity tips use <strong>x402</strong> (default <strong>$1.00 USDC</strong>). Funds are routed to the
        project charity wallet for partner shelters and rescue programs.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {CAUSES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCause(c.id)}
            className={`text-left px-4 py-3 rounded-xl border text-sm transition ${
              cause === c.id
                ? "bg-emerald-500 text-white border-emerald-500"
                : "bg-white border-orange-200 text-gray-700 hover:border-emerald-400"
            }`}
          >
            <span className="mr-1">{c.icon}</span>
            <span className="font-medium">{c.label}</span>
            <p className={`mt-1 text-xs ${cause === c.id ? "text-emerald-50" : "text-gray-500"}`}>
              {c.description}
            </p>
          </button>
        ))}
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Optional message (who or what you're supporting)..."
        className="w-full rounded-xl border border-orange-200 px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
        rows={2}
      />

      <button
        onClick={handleCharity}
        disabled={status === "loading" || !ready}
        className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-full py-3 font-medium transition"
      >
        {status === "loading"
          ? "Processing..."
          : authenticated
            ? "Donate $1.00 to animals"
            : "Connect & donate to animals"}
      </button>

      {result && (
        <div
          className={`mt-4 p-3 rounded-xl text-sm ${
            status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {result}
        </div>
      )}
    </div>
  );
}
