"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useX402Fetch } from "@privy-io/react-auth";

export default function Donate() {
  const { ready, authenticated, login } = usePrivy();
  const { wrapFetchWithPayment } = useX402Fetch();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<string | null>(null);

  async function handleDonate() {
    if (!authenticated) {
      login();
      return;
    }

    setStatus("loading");
    setResult(null);

    try {
      const paidFetch = wrapFetchWithPayment(fetch, {
        maxValue: BigInt(5_000_000), // max ~$5 USDC safety
      });

      const res = await paidFetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message || "Supporting AIPeT!" }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      setResult(data.message);
      setStatus("success");
      setMessage("");
    } catch (err: any) {
      setResult(err.message || "Donation failed");
      setStatus("error");
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-orange-100 p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">💖</span>
        <div>
          <h2 className="font-bold text-lg text-orange-800">Donate</h2>
          <p className="text-sm text-gray-500">Support the decentralized pet community</p>
        </div>
      </div>

      <p className="text-gray-600 mb-4 text-sm">
        Every donation goes directly to the creator via <strong>x402</strong> on Base.
        Default amount: <strong>$0.50 USDC</strong>.
      </p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Leave a short message (optional)..."
        className="w-full rounded-xl border border-orange-200 px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
        rows={3}
      />

      <button
        onClick={handleDonate}
        disabled={status === "loading" || !ready}
        className="w-full bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white rounded-full py-3 font-medium transition"
      >
        {status === "loading" ? "Processing..." : authenticated ? "Donate $0.50 USDC" : "Connect & Donate"}
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
