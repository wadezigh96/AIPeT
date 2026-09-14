import { NextRequest, NextResponse } from "next/server";

const MOODS = new Set(["happy", "walk", "care", "rescue", "chill"]);

/**
 * Activity feed API.
 * MVP: validates and echoes posts. Clients also persist locally.
 * Next: plug in a shared store (Postgres / KV) for a global feed.
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    storage: "client-local-mvp",
    hint: "POST a post body; shared DB can replace localStorage later",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const content = typeof body.content === "string" ? body.content.trim() : "";
    const mood = typeof body.mood === "string" ? body.mood : "happy";
    const author =
      typeof body.author === "string" && body.author.trim()
        ? body.author.trim().slice(0, 64)
        : "Pet friend";

    if (!content || content.length > 500) {
      return NextResponse.json(
        { error: "content required (max 500 characters)" },
        { status: 400 }
      );
    }

    if (!MOODS.has(mood)) {
      return NextResponse.json({ error: "Invalid mood" }, { status: 400 });
    }

    const post = {
      id: `post-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      author,
      content,
      mood,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, post });
  } catch (err: any) {
    console.error("[feed]", err);
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}
