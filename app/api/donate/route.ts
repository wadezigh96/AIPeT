import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { resourceServer, donateRouteConfig, payTo } from "@/lib/x402";

async function handler(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const message = body.message || "Thank you for supporting AIPeT!";

    return NextResponse.json({
      success: true,
      type: "donation",
      message: "Donation received. Thank you for supporting the decentralized pet community! 🐾",
      note: message,
      recipient: payTo,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("[donate]", err);
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}

export const POST = withX402(handler, payTo, donateRouteConfig, resourceServer);
