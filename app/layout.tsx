import type { Metadata } from "next";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIPeT — Robot Pet Agent",
  description:
    "Chat with Rubah, your decentralized robot pet companion. Powered by x402 micropayments on Base, BNB & Solana.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 text-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
