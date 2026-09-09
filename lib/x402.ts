import { HTTPFacilitatorClient, x402ResourceServer } from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";
// Solana support
// import { ExactSvmScheme } from "@x402/svm/exact/server";

/** Creator / recipient (EVM) */
export const payToEvm = (process.env.PAY_TO_ADDRESS || "0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03") as `0x${string}`;

/** Solana recipient */
export const payToSolana = process.env.PAY_TO_SOLANA || "GN3GD3JGqE1B1H7SrA8ncu3YQgVgT8qRVYvKzE8pscvn";

const facilitatorUrl = process.env.X402_FACILITATOR_URL || "https://x402.org/facilitator";

const chatPrice = process.env.CHAT_PRICE_USD || "0.01";
const donatePrice = process.env.DONATE_PRICE_USD || "0.50";
const contributePrice = process.env.CONTRIBUTE_PRICE_USD || "0.25";

/** Supported networks */
export const NETWORKS = {
  baseSepolia: "eip155:84532",
  base: "eip155:8453",
  bnb: "eip155:56",
  bnbTestnet: "eip155:97",
  solana: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  solanaDevnet: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
} as const;

export const facilitatorClient = new HTTPFacilitatorClient({
  url: facilitatorUrl,
});

export const resourceServer = new x402ResourceServer(facilitatorClient)
  .register(NETWORKS.baseSepolia, new ExactEvmScheme())
  .register(NETWORKS.base, new ExactEvmScheme())
  .register(NETWORKS.bnb, new ExactEvmScheme())
  .register(NETWORKS.bnbTestnet, new ExactEvmScheme());
// .register(NETWORKS.solanaDevnet, new ExactSvmScheme())
// .register(NETWORKS.solana, new ExactSvmScheme())

function makeAccepts(price: string) {
  const accepts: any[] = [
    {
      scheme: "exact" as const,
      price: `$${price}`,
      network: NETWORKS.baseSepolia,
      payTo: payToEvm,
    },
    {
      scheme: "exact" as const,
      price: `$${price}`,
      network: NETWORKS.base,
      payTo: payToEvm,
    },
    {
      scheme: "exact" as const,
      price: `$${price}`,
      network: NETWORKS.bnb,
      payTo: payToEvm,
    },
    {
      scheme: "exact" as const,
      price: `$${price}`,
      network: NETWORKS.bnbTestnet,
      payTo: payToEvm,
    },
  ];

  if (payToSolana) {
    accepts.push(
      {
        scheme: "exact" as const,
        price: `$${price}`,
        network: NETWORKS.solanaDevnet,
        payTo: payToSolana,
      },
      {
        scheme: "exact" as const,
        price: `$${price}`,
        network: NETWORKS.solana,
        payTo: payToSolana,
      }
    );
  }

  return accepts;
}

export const chatRouteConfig = {
  accepts: makeAccepts(chatPrice),
  description: "Chat with AIPeT robot pet agent (Rubah) — help with anything",
  mimeType: "application/json",
};

export const donateRouteConfig = {
  accepts: makeAccepts(donatePrice),
  description: "Donate to AIPeT — support the decentralized pet community",
  mimeType: "application/json",
};

export const contributeRouteConfig = {
  accepts: makeAccepts(contributePrice),
  description: "Contribute to AIPeT development & community",
  mimeType: "application/json",
};

export { payToEvm as payTo, chatPrice, donatePrice, contributePrice };
