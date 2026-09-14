import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "AIPeT",
    version: "0.4.0",
    agent: "Fox — Robot Pet Agent",
    payment: "x402",
    networks: [
      "base",
      "base-sepolia",
      "bnb",
      "bnb-testnet",
      "robinhood",
      "robinhood-testnet",
      "solana",
      "solana-devnet",
    ],
    recipient: {
      evm: process.env.PAY_TO_ADDRESS || "0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03",
      solana: process.env.PAY_TO_SOLANA || "GN3GD3JGqE1B1H7SrA8ncu3YQgVgT8qRVYvKzE8pscvn",
      charity:
        process.env.CHARITY_PAY_TO_ADDRESS ||
        process.env.PAY_TO_ADDRESS ||
        "0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03",
    },
    features: [
      "chat",
      "feed",
      "charity",
      "donate",
      "contribute",
      "farcaster-miniapp",
    ],
    paywallEnabled: process.env.ENABLE_X402_PAYWALL === "true",
  });
}
