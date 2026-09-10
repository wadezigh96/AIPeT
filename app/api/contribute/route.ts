import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const contribution = body.contribution || "general support";
    const payTo = process.env.PAY_TO_ADDRESS || "0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03";

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
                maxAmountRequired: "250000",
                payTo,
                description: "Contribute to AIPeT",
              },
            ],
          },
          { status: 402 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      type: "contribution",
      message: "Contribution accepted! You help build a better place for pets & humans. 🚀",
      contribution,
      recipient: payTo,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("[contribute]", err);
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}
