import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "AIPeT",
    version: "0.1.0",
    payment: "x402",
    chain: process.env.X402_NETWORK || "eip155:84532",
    recipient: process.env.PAY_TO_ADDRESS || "0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03",
  });
}
