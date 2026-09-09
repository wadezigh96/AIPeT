# AIPeT Agent Integration

## Overview

AIPeT is designed for both human users and autonomous AI agents.

Agents can:
1. Hold their own Privy agentic wallet
2. Pay for chat / services using x402 automatically
3. Operate under spending policies (max per tx, allowlists, etc.)

## Using Privy Agentic Wallets

### 1. Create an agent wallet (server-side)

```ts
import { PrivyClient } from "@privy-io/node";

const privy = new PrivyClient({
  appId: process.env.PRIVY_APP_ID!,
  appSecret: process.env.PRIVY_APP_SECRET!,
});

// Create a wallet for the agent
const wallet = await privy.walletApi.create({
  chainType: "ethereum",
});
```

### 2. Fund the wallet with USDC (Base Sepolia)

Use Circle faucet or transfer test USDC to the agent address.

### 3. Make paid requests with x402

```ts
import { createX402Client } from "@privy-io/node"; // or @x402/fetch + signer

const client = createX402Client({
  // Privy wallet signer
  maxValue: "0.05", // safety limit in USD
});

const res = await client.fetch("https://your-aipet.app/api/chat", {
  method: "POST",
  body: JSON.stringify({ message: "Hello AIPeT from agent!" }),
});
```

## Recommended Policies

- Max spend per transaction: $0.05 – $0.10
- Daily spend limit
- Only allow payments to the official AIPeT recipient: `0xB095274743941e953c746F9C228DA9c18Bb6ec29`
- Restrict to Base / Base Sepolia

## MCP / Tool Calling

You can expose the paid chat endpoint as an MCP tool so other agents can call it and pay automatically via x402.

See the official x402 MCP examples and Privy agent docs for full patterns.
