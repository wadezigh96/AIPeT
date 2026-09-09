# AIPeT 🐾

**Decentralized AI Pet Platform**  
*Socialism & Decentralization for pet and human in one place.*  
**Donate · Contribute · Talk about Pet**

AIPeT combines AI companion pets with on-chain micropayments using the **x402 protocol**, powered by **Privy** agentic wallets on EVM (Base).

## Features

| Feature | Description | Default Price |
|---------|-------------|---------------|
| 💬 **Talk about Pet** | Chat with AIPeT companion | $0.01 USDC |
| 💖 **Donate** | Support the community & creator | $0.50 USDC |
| 🚀 **Contribute** | Fund development / community / content | $0.25 USDC |

- 🔐 **Privy Integration**: Embedded wallets + Agent wallets with spending policies
- ⚡ **EVM Native**: Base Mainnet & Base Sepolia (testnet)
- 🤖 **Agent-ready**: Agents can pay & interact autonomously via x402

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
git clone https://github.com/wadezigh96/AIPeT.git
cd AIPeT
npm install
cp .env.example .env.local
# Fill PRIVY_APP_ID, PRIVY_APP_SECRET, etc.
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Payment Flow (x402)

1. User/Agent requests a paid resource (`/api/chat`, `/api/donate`, `/api/contribute`)
2. Server returns `402 Payment Required` + payment requirements
3. Client (Privy wallet) signs USDC authorization
4. Request is retried with payment proof
5. Server verifies & settles via facilitator → returns response

**Recipient / Creator**: `0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03`

## Project Structure

```
AIPeT/
├── app/
│   ├── api/
│   │   ├── chat/          # Talk about Pet (x402)
│   │   ├── donate/        # Donate (x402)
│   │   ├── contribute/    # Contribute (x402)
│   │   └── health/
│   ├── page.tsx         # Tabbed UI
│   └── layout.tsx
├── components/
│   ├── Chat.tsx
│   ├── Donate.tsx
│   ├── Contribute.tsx
│   └── WalletButton.tsx
├── lib/
│   ├── x402.ts
│   └── ai.ts
├── docs/AGENT.md
└── .env.example
```

## License

MIT

---

Built for the agentic economy 🚀
