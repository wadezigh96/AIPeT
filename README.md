# AIPeT 🦊

**Robot Pet Agent** — companion virtual rubah robot yang membantu user untuk segala keperluan.

*Socialism & Decentralization for pet and human in one place.*  
**Donate · Contribute · Chat with Rubah**

## Supported Networks (x402)

| Network | CAIP-2 | Status |
|---------|--------|--------|
| **Base** | `eip155:8453` | ✅ |
| **Base Sepolia** | `eip155:84532` | ✅ |
| **BNB Chain** (Binance) | `eip155:56` | ✅ |
| **BNB Testnet** | `eip155:97` | ✅ |
| **Solana** | `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp` | ✅ |
| **Solana Devnet** | `solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1` | ✅ |

## Recipients

| Chain | Address |
|-------|---------|
| **EVM** (Base + BNB) | `0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03` |
| **Solana** | `GN3GD3JGqE1B1H7SrA8ncu3YQgVgT8qRVYvKzE8pscvn` |

## Features

| Feature | Description | Default Price |
|---------|-------------|---------------|
| 🦊 **Chat dengan Rubah** | Robot pet agent | $0.01 |
| 💖 **Donate** | Support community & creator | $0.50 |
| 🚀 **Contribute** | Fund development | $0.25 |
| 👥 **Farcaster Mini App** | Manifest + webhook | — |

## Deploy to Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login & link
vercel login
vercel link

# 3. Set environment variables in Vercel Dashboard
#    NEXT_PUBLIC_PRIVY_APP_ID, PRIVY_APP_SECRET,
#    PAY_TO_ADDRESS, PAY_TO_SOLANA, OPENAI_API_KEY, etc.

# 4. Deploy
vercel --prod
```

Atau hubungkan repo `wadezigh96/AIPeT` langsung di [vercel.com/new](https://vercel.com/new).

## Quick Start (local)

```bash
git clone https://github.com/wadezigh96/AIPeT.git
cd AIPeT
npm install
cp .env.example .env.local
npm run dev
```

## License

MIT
