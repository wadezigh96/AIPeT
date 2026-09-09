import { NextResponse } from "next/server";

/**
 * Farcaster Mini App manifest
 * https://miniapps.farcaster.xyz/
 */
export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aipet.vercel.app";

  const manifest = {
    accountAssociation: {
      // Fill after verifying domain with Farcaster
      header: "",
      payload: "",
      signature: "",
    },
    frame: {
      version: "1",
      name: "AIPeT",
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/og.png`,
      buttonTitle: "Chat with Rubah",
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#fff7ed",
      webhookUrl: `${appUrl}/api/farcaster/webhook`,
    },
  };

  return NextResponse.json(manifest);
}
