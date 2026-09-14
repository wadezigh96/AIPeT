# Contributing to AIPeT

Thanks for helping build a decentralized robot-pet agent.

## Project structure

```
AIPeT/
├── app/                    # Next.js App Router
│   ├── api/
│   │   ├── chat/           # Paid chat endpoint
│   │   ├── donate/         # Donation endpoint
│   │   ├── contribute/     # Contribution endpoint
│   │   ├── health/         # Health check
│   │   └── farcaster/      # Mini App webhook
│   ├── .well-known/        # Farcaster manifest
│   ├── layout.tsx
│   └── page.tsx            # Tabs: Chat / Donate / Contribute
├── components/             # Client UI
│   ├── Chat.tsx
│   ├── Donate.tsx
│   ├── Contribute.tsx
│   ├── Providers.tsx       # Privy provider
│   └── WalletButton.tsx
├── lib/
│   ├── ai.ts               # Agent system prompt + LLM
│   └── x402.ts             # Networks + pay-to addresses
├── docs/
│   ├── AGENT.md
│   └── MULTI_CHAIN.md
├── ROADMAP.md
└── README.md
```

## Stack

- **Frontend:** Next.js 15, React 19, Tailwind
- **Auth / wallets:** Privy
- **Payments:** x402 (USDC micropayments)
- **Chains:** Solana, Base, BNB Chain
- **AI:** OpenAI-compatible API (optional; mock fallback)
- **Social:** Farcaster Mini App scaffold

## How to run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Required for full auth: `NEXT_PUBLIC_PRIVY_APP_ID`, `PRIVY_APP_SECRET`.  
Optional: `OPENAI_API_KEY`, `ENABLE_X402_PAYWALL=true`.

## What we need most

1. **Solana x402 client path** — sign and settle payments to `PAY_TO_SOLANA`
2. **Production hardening** — paywall, rate limits, receipt logging
3. **Frontend polish** — mobile UX, Farcaster frame experience
4. **Agent tools** — useful actions beyond plain chat

See [ROADMAP.md](./ROADMAP.md) for phases.

## PR guidelines

- English for code comments, commits, and docs
- Small, focused PRs
- Do not commit secrets or `.env.local`
- Prefer TypeScript; keep API responses stable

## License

MIT
