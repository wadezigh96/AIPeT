"use client";

import { usePrivy } from "@privy-io/react-auth";

export default function WalletButton() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  if (!ready) {
    return (
      <button className="px-4 py-2 rounded-full bg-gray-200 text-gray-500 text-sm" disabled>
        Loading...
      </button>
    );
  }

  if (authenticated) {
    const address = user?.wallet?.address;
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm font-mono bg-white/70 px-3 py-1 rounded-full border border-orange-200">
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connected"}
        </span>
        <button
          onClick={logout}
          className="px-4 py-2 rounded-full bg-white border border-orange-300 text-orange-700 text-sm hover:bg-orange-50 transition"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={login}
      className="px-5 py-2 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 transition shadow-md"
    >
      Connect Wallet
    </button>
  );
}
