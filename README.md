# AIPeT 🦊

**Robot Pet Agent** — companion virtual rubah robot yang membantu user untuk segala keperluan.

*Socialism & Decentralization for pet and human in one place.*  
**Donate · Contribute · Chat with Rubah**

## Supported Networks (x402)

| Network | CAIP-2 | Status |
|---------|--------|--------|
| **Base** | `eip155:8453` | ✅ Mainnet |
| **Base Sepolia** | `eip155:84532` | ✅ Testnet |
| **BNB Chain** (Binance) | `eip155:56` | ✅ Mainnet |
| **BNB Testnet** | `eip155:97` | ✅ Testnet |
| **Solana** | `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp` | ✅ Ready (set `PAY_TO_SOLANA`) |
| **Solana Devnet** | `solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1` | ✅ Ready |

> Robinhood: currently no native x402 chain; users can bridge / on-ramp via supported wallets.

## Features

| Feature | Description | Default Price |
|---------|-------------|---------------|
| 🦊 **Chat dengan Rubah** | Robot pet agent untuk segala keperluan | $0.01 |
| 💖 **Donate** | Support community & creator | $0.50 |
| 🚀 **Contribute** | Fund development / community | $0.25 |
| 👥 **Farcaster Mini App** | Manifest + webhook ready | — |

- **Privy** embedded + agentic wallets
- **x402** multi-chain micropayments
- **Farcaster** Mini App support

## Quick Start

```bash
git clone https://github.com/wadezigh96/AIPeT.git
cd AIPeT
npm install
cp .env.example .env.local
# Isi PRIVY_*, PAY_TO_*, OPENAI_* dll
npm run dev
```

## Recipient

- **EVM** (Base + BNB): `0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03`
- **Solana**: set `PAY_TO_SOLANA` di `.env`

## Farcaster Mini App

Manifest tersedia di `/.well-known/farcaster.json`  
Webhook: `/api/farcaster/webhook`

Setelah deploy, verifikasi domain di Farcaster Developers dashboard.

## License

MIT
