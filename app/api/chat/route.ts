import { NextRequest, NextResponse } from "next/server";
import { chatWithPet } from "@/lib/ai";

/**
 * Chat endpoint.
 * x402 payment can be layered via middleware / withX402 once env is fully set.
 * For stable deploy, handler runs directly; return 402 if X-PAYMENT missing when PAYWALL=true.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }

    // Optional paywall: set ENABLE_X402_PAYWALL=true in Vercel to enforce 402
    if (process.env.ENABLE_X402_PAYWALL === "true") {
      const payment = req.headers.get("x-payment") || req.headers.get("PAYMENT-SIGNATURE");
      if (!payment) {
        return NextResponse.json(
          {
            x402Version: 1,
            error: "Payment required",
            accepts: [
              {
                scheme: "exact",
                network: process.env.X402_NETWORK || "eip155:84532",
                maxAmountRequired: "10000",
                payTo: process.env.PAY_TO_ADDRESS || "0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03",
                description: "Chat with AIPeT",
              },
            ],
          },
          { status: 402 }
        );
      }
    }

    const result = await chatWithPet(message, history);

    return NextResponse.json({
      success: true,
      reply: result.reply,
      model: result.model,
      pet: "AIPeT",
    });
  } catch (err: any) {
    console.error("[chat]", err);
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}
