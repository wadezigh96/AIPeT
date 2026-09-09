import { NextRequest, NextResponse } from "next/server";

/**
 * Farcaster Mini App webhook
 * Receives events (frame added, notifications, etc.)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[farcaster webhook]", JSON.stringify(body).slice(0, 500));

    // TODO: handle notification tokens, frame added/removed events
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[farcaster webhook error]", err);
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }
}
