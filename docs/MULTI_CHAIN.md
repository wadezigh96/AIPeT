# Multi-chain & Farcaster

## Networks

AIPeT accepts x402-style payments on:

| Network | CAIP-2 / Chain ID | Role |
|---------|------------------|------|
| Base | `eip155:8453` | EVM production |
| Base Sepolia | `eip155:84532` | EVM testnet |
| BNB Smart Chain | `eip155:56` | EVM production |
| BNB Testnet | `eip155:97` | EVM testnet |
| **Robinhood Chain** | `eip155:4663` | EVM L2 (Arbitrum Orbit) |
| **Robinhood Testnet** | `eip155:46630` | EVM testnet |
| Solana | `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp` | SVM production |
| Solana Devnet | `solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1` | SVM testnet |

### Robinhood Chain

Ethereum L2 built on Arbitrum Orbit. Gas is **ETH**.

| | Mainnet | Testnet |
|--|---------|---------|
| Chain ID | `4663` | `46630` |
| RPC | `https://rpc.mainnet.chain.robinhood.com` | `https://rpc.testnet.chain.robinhood.com` |
| Explorer | [Blockscout](https://robinhoodchain.blockscout.com) | testnet explorer |

Payments use the same EVM recipient (`PAY_TO_ADDRESS`). Native micropayment asset may be USDC or **USDG** depending on facilitator support on that chain.

### Solana

```
PAY_TO_SOLANA=GN3GD3JGqE1B1H7SrA8ncu3YQgVgT8qRVYvKzE8pscvn
```

### BNB / Binance

EVM chain `eip155:56` — same EVM recipient address.

## Enforcing paywall

```
ENABLE_X402_PAYWALL=true
```

When enabled, `/api/chat`, `/api/donate`, and `/api/contribute` return HTTP 402 unless a valid payment header is present.

## Farcaster Mini App

- `app/.well-known/farcaster.json/route.ts` — Mini App manifest
- `app/api/farcaster/webhook/route.ts` — event webhook

### Go live

1. Deploy the app
2. Set `NEXT_PUBLIC_APP_URL` to the production URL
3. Complete account association in Farcaster developer tools
4. Add `icon.png`, `og.png`, `splash.png` under `/public`
5. Verify the domain
