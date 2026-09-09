import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { chatWithPet } from "@/lib/ai";
import { resourceServer, chatRouteConfig, payTo } from "@/lib/x402";

async function handler(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
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

// Protect the route with x402 payment
export const POST = withX402(
  handler,
  payTo,
  chatRouteConfig,
  resourceServer
);
