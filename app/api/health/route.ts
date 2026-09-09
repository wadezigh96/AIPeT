import { NextResponse } from "next/server";
import { payToEvm, payToSolana, NETWORKS } from "@/lib/x402";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "AIPeT",
    version: "0.2.0",
    agent: "Rubah — Robot Pet Agent",
    payment: "x402",
    networks: {
      base: NETWORKS.base,
      baseSepolia: NETWORKS.baseSepolia,
      bnb: NETWORKS.bnb,
      bnbTestnet: NETWORKS.bnbTestnet,
      solana: NETWORKS.solana,
      solanaDevnet: NETWORKS.solanaDevnet,
    },
    recipient: {
      evm: payToEvm,
      solana: payToSolana || null,
    },
    features: ["chat", "donate", "contribute", "farcaster-miniapp"],
  });
}
