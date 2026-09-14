# AIPeT 🦊

**Robot Pet Agent** — a virtual fox-robot companion that helps users with everyday needs.

**Donate · Contribute · Chat with Fox**

Built with **x402** micropayments + **Privy** wallets on **Base**, **BNB Chain**, and **Solana**.

## Features

| Feature | Description | Default price |
|---------|-------------|---------------|
| 🦊 **Chat** | Robot pet agent for questions, advice, planning | $0.01 USDC |
| 💖 **Donate** | Support the community & creator | $0.50 USDC |
| 🚀 **Contribute** | Fund development / community / content | $0.25 USDC |
| 👥 **Farcaster** | Mini App manifest + webhook ready | — |

## Networks (x402)

| Network | Status |
|---------|--------|
| Base + Base Sepolia | ✅ |
| BNB Chain (Binance) + Testnet | ✅ |
| Solana + Devnet | ✅ |

## Recipients

| Chain | Address |
|-------|---------|
| **EVM** (Base + BNB) | `0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03` |
| **Solana** | `GN3GD3JGqE1B1H7SrA8ncu3YQgVgT8qRVYvKzE8pscvn` |

## Quick start (local)

```bash
git clone https://github.com/wadezigh96/AIPeT.git
cd AIPeT
npm install
cp .env.example .env.local
# Fill in Privy + optional OpenAI keys
npm run dev
```

## Environment variables

```bash
NEXT_PUBLIC_PRIVY_APP_ID=
PRIVY_APP_SECRET=
PAY_TO_ADDRESS=0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03
PAY_TO_SOLANA=GN3GD3JGqE1B1H7SrA8ncu3YQgVgT8qRVYvKzE8pscvn
OPENAI_API_KEY=                 # optional — falls back to mock replies
NEXT_PUBLIC_APP_URL=http://localhost:3000
ENABLE_X402_PAYWALL=false       # set true to enforce 402 on paid routes
```

## Deploy to Vercel

1. Import `wadezigh96/AIPeT` at [vercel.com/new](https://vercel.com/new)
2. Add the environment variables above
3. Deploy

Or via CLI:

```bash
npm i -g vercel
vercel login
vercel link
vercel --prod
```

## Farcaster Mini App

- Manifest: `/.well-known/farcaster.json`
- Webhook: `/api/farcaster/webhook`

After deploy, set `NEXT_PUBLIC_APP_URL` to the production URL and complete domain verification in the Farcaster developer dashboard.

## License

MIT
