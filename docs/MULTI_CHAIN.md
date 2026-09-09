# Multi-chain & Farcaster

## Networks

AIPeT accepts x402 payments on:

- **Base** & Base Sepolia (EVM)
- **BNB Smart Chain** (Binance) & testnet
- **Solana** mainnet + devnet (enable by setting `PAY_TO_SOLANA`)

### Enabling Solana

1. Install is already in `package.json` (`@x402/svm`)
2. Uncomment the Solana scheme registration in `lib/x402.ts`
3. Set a Solana address in `.env`:
   ```
   PAY_TO_SOLANA=YourSolanaAddressHere
   ```

### BNB / Binance

Already registered as EVM chain `eip155:56`.  
Binance also runs its own x402 facilitator (B402) — you can point `X402_FACILITATOR_URL` to it if desired.

### Robinhood

Robinhood does not currently expose a public x402-compatible chain.  
Users can still pay from Robinhood wallet by bridging USDC to Base / Solana / BNB.

## Farcaster Mini App

Files added:

- `app/.well-known/farcaster.json/route.ts` — Mini App manifest
- `app/api/farcaster/webhook/route.ts` — event webhook

### Next steps to go live on Farcaster

1. Deploy the app (Vercel recommended)
2. Set `NEXT_PUBLIC_APP_URL` to the production URL
3. Generate account association signature via Farcaster Developers tools
4. Add `icon.png`, `og.png`, `splash.png` to `/public`
5. Submit / verify domain

Users can then open AIPeT directly inside Warpcast / Farcaster clients and pay with their connected wallet via x402.
