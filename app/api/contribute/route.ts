import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { resourceServer, contributeRouteConfig, payTo } from "@/lib/x402";

async function handler(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const contribution = body.contribution || "general support";

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

export const POST = withX402(handler, payTo, contributeRouteConfig, resourceServer);
