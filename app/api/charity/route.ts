import { NextRequest, NextResponse } from "next/server";

const CAUSES = new Set(["shelter", "wildlife", "stray", "emergency"]);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const cause = typeof body.cause === "string" ? body.cause : "shelter";
    const note = typeof body.note === "string" ? body.note : "";

    if (!CAUSES.has(cause)) {
      return NextResponse.json({ error: "Invalid charity cause" }, { status: 400 });
    }

    // Prefer dedicated charity wallet; fall back to main EVM recipient
    const payTo =
      process.env.CHARITY_PAY_TO_ADDRESS ||
      process.env.PAY_TO_ADDRESS ||
      "0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03";

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
                maxAmountRequired: "1000000", // $1.00 USDC (6 decimals)
                payTo,
                description: `Animal charity: ${cause}`,
              },
            ],
          },
          { status: 402 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      type: "charity",
      cause,
      message:
        "Thank you! Your charity tip helps animals through AIPeT partner shelters and rescue funds. 🐾",
      note,
      recipient: payTo,
      amountUsd: "1.00",
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("[charity]", err);
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}
