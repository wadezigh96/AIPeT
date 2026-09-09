import { HTTPFacilitatorClient, x402ResourceServer } from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";

const payTo = (process.env.PAY_TO_ADDRESS || "0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03") as `0x${string}`;
const network = process.env.X402_NETWORK || "eip155:84532"; // Base Sepolia
const facilitatorUrl = process.env.X402_FACILITATOR_URL || "https://x402.org/facilitator";
const chatPrice = process.env.CHAT_PRICE_USD || "0.01";

export const facilitatorClient = new HTTPFacilitatorClient({
  url: facilitatorUrl,
});

export const resourceServer = new x402ResourceServer(facilitatorClient).register(
  network,
  new ExactEvmScheme()
);

export const chatRouteConfig = {
  accepts: [
    {
      scheme: "exact" as const,
      price: `$${chatPrice}`,
      network,
      payTo,
    },
  ],
  description: "Chat with your AI Pet companion",
  mimeType: "application/json",
};

export { payTo, network, chatPrice };
