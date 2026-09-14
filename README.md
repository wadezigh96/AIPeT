# AIPeT 🦊

**Robot Pet Agent** — chat, **animal charity**, **daily activity** posts, and community tips.

**x402** micropayments · **Privy** auth · **Solana · Base · BNB · Robinhood Chain** · **Farcaster** scaffold.

This repository is an open **scaffold** for collaborators. It is suitable to share for team formation; production settlement and a global feed still need engineering work.

## Documentation (start here)

| Doc | Purpose |
|-----|---------|
| **[docs/STRUCTURE.md](./docs/STRUCTURE.md)** | Full tree, every utility, APIs, gap matrix |
| **[ROADMAP.md](./ROADMAP.md)** | Phased plan and priorities |
| **[CONTRIBUTING.md](./CONTRIBUTING.md)** | Setup, roles, PR rules |
| [docs/AGENT.md](./docs/AGENT.md) | Agent-oriented API notes |
| [docs/MULTI_CHAIN.md](./docs/MULTI_CHAIN.md) | Chain IDs and Farcaster |

## Features

| Utility | Description | Default price |
|---------|-------------|---------------|
| **Chat** | Fox robot-pet agent | $0.01 USDC |
| **Activity** | Daily pet-life posts (MVP: local device) | Free |
| **Charity** | Shelters, wildlife, strays, emergency vet | $1.00 USDC |
| **Donate** | Support creator / community | $0.50 USDC |
| **Contribute** | Fund development | $0.25 USDC |
| **Farcaster** | Mini App manifest + webhook | — |

## Networks

| Network | ID |
|---------|-----|
| Base / Base Sepolia | 8453 / 84532 |
| BNB Chain / Testnet | 56 / 97 |
| Robinhood Chain / Testnet | 4663 / 46630 |
| Solana / Devnet | mainnet / devnet |

## Recipients

| Purpose | Address / env |
|---------|----------------|
| EVM | `0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03` |
| Solana | `GN3GD3JGqE1B1H7SrA8ncu3YQgVgT8qRVYvKzE8pscvn` |
| Charity | `CHARITY_PAY_TO_ADDRESS` (optional override) |

## Quick start

```bash
git clone https://github.com/wadezigh96/AIPeT.git
cd AIPeT && npm install
cp .env.example .env.local
npm run dev
```

## Colosseum / collaborators

Suggested tags: **`ai`**, **`consumer`**, **`payments`**.

We are looking for frontend, backend, Solana, and EVM engineers. See [ROADMAP.md](./ROADMAP.md).

## License

MIT
