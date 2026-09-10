"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { base, baseSepolia, bsc, bscTestnet } from "viem/chains";

export default function Providers({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "";

  if (!appId) {
    // Allow render without Privy during build / missing env
    return <>{children}</>;
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ["email", "wallet", "google"],
        appearance: {
          theme: "light",
          accentColor: "#f97316",
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        defaultChain: baseSepolia,
        supportedChains: [baseSepolia, base, bsc, bscTestnet],
      }}
    >
      {children}
    </PrivyProvider>
  );
}
