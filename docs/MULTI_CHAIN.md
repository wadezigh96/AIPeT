# Multi-chain & Farcaster

## Networks

AIPeT is configured for x402-style payments on:

- **Base** & Base Sepolia (EVM)
- **BNB Smart Chain** (Binance) & testnet
- **Solana** mainnet & devnet

### Solana

Set the recipient in `.env`:

```
PAY_TO_SOLANA=GN3GD3JGqE1B1H7SrA8ncu3YQgVgT8qRVYvKzE8pscvn
```

### BNB / Binance

Treated as EVM chain `eip155:56`. Payments use the same EVM recipient address.

### Robinhood

No native x402 chain from Robinhood yet. Users can bridge USDC to Base, Solana, or BNB and pay from a supported wallet.

## Enforcing paywall

```
ENABLE_X402_PAYWALL=true
```

When enabled, `/api/chat`, `/api/donate`, and `/api/contribute` return HTTP 402 unless a valid payment header is present.

## Farcaster Mini App

Files:

- `app/.well-known/farcaster.json/route.ts` — Mini App manifest
- `app/api/farcaster/webhook/route.ts` — event webhook

### Go live

1. Deploy the app
2. Set `NEXT_PUBLIC_APP_URL` to the production URL
3. Complete account association in the Farcaster developer tools
4. Add `icon.png`, `og.png`, `splash.png` under `/public`
5. Verify the domain
