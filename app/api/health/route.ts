import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "AIPeT",
    version: "0.2.1",
    agent: "Rubah — Robot Pet Agent",
    payment: "x402",
    networks: ["base", "base-sepolia", "bnb", "solana"],
    recipient: {
      evm: process.env.PAY_TO_ADDRESS || "0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03",
      solana: process.env.PAY_TO_SOLANA || "GN3GD3JGqE1B1H7SrA8ncu3YQgVgT8qRVYvKzE8pscvn",
    },
    features: ["chat", "donate", "contribute", "farcaster-miniapp"],
    paywallEnabled: process.env.ENABLE_X402_PAYWALL === "true",
  });
}
