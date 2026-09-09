# AIPeT 🐾

**Decentralized AI Pet Platform** — Socialism & Decentralization for pets and humans in one place.

AIPeT combines AI companion pets with on-chain micropayments using the **x402 protocol**, powered by **Privy** agentic wallets on EVM (Base).

## Features

- 🤖 **AI Agent Pet**: Chat with your AI companion (paid per message via x402)
- 💰 **x402 Payments**: Instant USDC micropayments over HTTP 402 (no accounts, no API keys)
- 🔐 **Privy Integration**: Embedded wallets + Agent wallets with spending policies
- ⚡ **EVM Native**: Base Mainnet & Base Sepolia (testnet)
- 🐶 **Pet Social**: Donate, contribute, and talk about pets in a decentralized way

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15 (App Router) + Tailwind |
| Auth & Wallets | Privy (embedded + agentic wallets) |
| Payments | x402 Protocol (`@x402/*`) |
| Chain | Base (eip155:8453) / Base Sepolia (eip155:84532) |
| Asset | USDC |
| AI | OpenAI-compatible / local agent |

## Quick Start

```bash
# 1. Clone
git clone https://github.com/wadezigh96/AIPeT.git
cd AIPeT

# 2. Install
npm install

# 3. Environment
cp .env.example .env.local
# Fill in PRIVY_APP_ID, PRIVY_APP_SECRET, etc.

# 4. Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Payment Flow (x402)

1. User/Agent requests a paid resource (e.g. `/api/chat`)
2. Server returns `402 Payment Required` + payment requirements
3. Client (Privy wallet) signs USDC authorization
4. Request is retried with payment proof
5. Server verifies & settles via facilitator → returns AI response

**Recipient address**: `0xB095274743941e953c746F9C228DA9c18Bb6ec29`

## Project Structure

```
AIPeT/
├── app/
│   ├── api/
│   │   ├── chat/          # Paid AI chat endpoint (x402)
│   │   ├── agent/         # Agent wallet management
│   │   └── health/
│   ├── page.tsx         # Main UI
│   └── layout.tsx
├── components/
│   ├── Chat.tsx
│   ├── WalletButton.tsx
│   └── AgentPanel.tsx
├── lib/
│   ├── x402.ts          # x402 server config
│   ├── privy.ts         # Privy client
│   └── ai.ts            # AI agent logic
├── proxy.ts             # x402 payment proxy (Next.js)
└── .env.example
```

## Environment Variables

See `.env.example`

## License

MIT

---

Built for the agentic economy 🚀
