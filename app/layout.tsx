import type { Metadata } from "next";
import { PrivyProvider } from "@privy-io/react-auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIPeT — Decentralized AI Pet",
  description: "Chat with your AI pet companion using x402 micropayments on Base",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 text-gray-900">
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
          config={{
            loginMethods: ["email", "wallet", "google"],
            appearance: {
              theme: "light",
              accentColor: "#f97316",
            },
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
            },
            defaultChain: {
              id: 84532, // Base Sepolia
              name: "Base Sepolia",
              network: "base-sepolia",
              nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
              rpcUrls: {
                default: { http: ["https://sepolia.base.org"] },
              },
            },
          }}
        >
          {children}
        </PrivyProvider>
      </body>
    </html>
  );
}
