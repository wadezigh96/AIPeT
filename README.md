# AIPeT 🦊

**Robot Pet Agent** — a virtual fox-robot companion that helps users with everyday needs.

Monetized with **x402** micropayments · Auth via **Privy** · Chains: **Solana**, Base, BNB · **Farcaster** Mini App ready.

Looking for frontend, backend, and Solana collaborators — see [ROADMAP.md](./ROADMAP.md) and [CONTRIBUTING.md](./CONTRIBUTING.md).

## Features

| Feature | Description | Default price |
|---------|-------------|---------------|
| Chat | Robot pet agent (Q&A, advice, planning) | $0.01 USDC |
| Donate | Support creator & community | $0.50 USDC |
| Contribute | Fund development / community / content | $0.25 USDC |
| Farcaster | Mini App manifest + webhook | — |

## Recipients

| Chain | Address |
|-------|---------|
| EVM (Base + BNB) | `0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03` |
| Solana | `GN3GD3JGqE1B1H7SrA8ncu3YQgVgT8qRVYvKzE8pscvn` |

## Quick start

```bash
git clone https://github.com/wadezigh96/AIPeT.git
cd AIPeT && npm install
cp .env.example .env.local
npm run dev
```

## Env (minimum)

```bash
NEXT_PUBLIC_PRIVY_APP_ID=
PRIVY_APP_SECRET=
PAY_TO_ADDRESS=0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03
PAY_TO_SOLANA=GN3GD3JGqE1B1H7SrA8ncu3YQgVgT8qRVYvKzE8pscvn
OPENAI_API_KEY=              # optional
ENABLE_X402_PAYWALL=false
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Docs

- [ROADMAP.md](./ROADMAP.md) — phases & open work
- [CONTRIBUTING.md](./CONTRIBUTING.md) — structure & how to help
- [docs/AGENT.md](./docs/AGENT.md) — agent API notes
- [docs/MULTI_CHAIN.md](./docs/MULTI_CHAIN.md) — chains & Farcaster

## License

MIT
