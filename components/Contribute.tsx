"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

const CONTRIBUTION_TYPES = [
  { id: "development", label: "Development & Code" },
  { id: "community", label: "Community Building" },
  { id: "content", label: "Pet Content & Tips" },
  { id: "general", label: "General Support" },
];

export default function Contribute() {
  const { ready, authenticated, login } = usePrivy();
  const [type, setType] = useState("general");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<string | null>(null);

  async function handleContribute() {
    if (!authenticated) {
      login();
      return;
    }

    setStatus("loading");
    setResult(null);

    try {
      const res = await fetch("/api/contribute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contribution: type }),
      });

      if (res.status === 402) {
        setResult("Pembayaran x402 diperlukan ($0.25 USDC).");
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
    } catch (err: any) {
      setResult(err.message || "Contribution failed");
      setStatus("error");
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-orange-100 p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">🚀</span>
        <div>
          <h2 className="font-bold text-lg text-orange-800">Contribute</h2>
          <p className="text-sm text-gray-500">Help build AIPeT together</p>
        </div>
      </div>

      <p className="text-gray-600 mb-4 text-sm">
        Kontribusi via <strong>x402</strong>. Default: <strong>$0.25 USDC</strong>.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {CONTRIBUTION_TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => setType(t.id)}
            className={`px-4 py-2 rounded-xl border text-sm transition ${
              type === t.id
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white border-orange-200 text-gray-700 hover:border-orange-400"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleContribute}
        disabled={status === "loading" || !ready}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-full py-3 font-medium transition"
      >
        {status === "loading"
          ? "Processing..."
          : authenticated
          ? "Contribute $0.25 USDC"
          : "Connect & Contribute"}
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
