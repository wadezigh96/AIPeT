import { HTTPFacilitatorClient, x402ResourceServer } from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";

const payTo = (process.env.PAY_TO_ADDRESS || "0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03") as `0x${string}`;
const network = process.env.X402_NETWORK || "eip155:84532"; // Base Sepolia
const facilitatorUrl = process.env.X402_FACILITATOR_URL || "https://x402.org/facilitator";

const chatPrice = process.env.CHAT_PRICE_USD || "0.01";
const donatePrice = process.env.DONATE_PRICE_USD || "0.50";
const contributePrice = process.env.CONTRIBUTE_PRICE_USD || "0.25";

export const facilitatorClient = new HTTPFacilitatorClient({
  url: facilitatorUrl,
});

export const resourceServer = new x402ResourceServer(facilitatorClient).register(
  network,
  new ExactEvmScheme()
);

/** Chat with AI Pet — Talking about Pet */
export const chatRouteConfig = {
  accepts: [
    {
      scheme: "exact" as const,
      price: `$${chatPrice}`,
      network,
      payTo,
    },
  ],
  description: "Chat with your AI Pet companion (Talking about Pet)",
  mimeType: "application/json",
};

/** Donate to AIPeT / Creator */
export const donateRouteConfig = {
  accepts: [
    {
      scheme: "exact" as const,
      price: `$${donatePrice}`,
      network,
      payTo,
    },
  ],
  description: "Donate to AIPeT — support the decentralized pet community",
  mimeType: "application/json",
};

/** Contribute (tip / support development) */
export const contributeRouteConfig = {
  accepts: [
    {
      scheme: "exact" as const,
      price: `$${contributePrice}`,
      network,
      payTo,
    },
  ],
  description: "Contribute to AIPeT development & community",
  mimeType: "application/json",
};

export { payTo, network, chatPrice, donatePrice, contributePrice };
