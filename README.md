# AIPeT 🦊

**Robot Pet Agent** — companion virtual rubah robot yang membantu user untuk segala keperluan.

**Donate · Contribute · Chat with Rubah**

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

## Deploy ke Vercel (1 klik)

1. Buka **https://vercel.com/new**
2. Import repo **`wadezigh96/AIPeT`**
3. Tambah Environment Variables:

```
NEXT_PUBLIC_PRIVY_APP_ID=xxx
PRIVY_APP_SECRET=xxx
PAY_TO_ADDRESS=0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03
PAY_TO_SOLANA=GN3GD3JGqE1B1H7SrA8ncu3YQgVgT8qRVYvKzE8pscvn
OPENAI_API_KEY=xxx          # opsional
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

4. Klik **Deploy**

### Via CLI

```bash
npm i -g vercel
vercel login
vercel link   # pilih / buat project aipet
vercel env add NEXT_PUBLIC_PRIVY_APP_ID
# ... tambah env lain
vercel --prod
```

## Local

```bash
git clone https://github.com/wadezigh96/AIPeT.git
cd AIPeT && npm install
cp .env.example .env.local
npm run dev
```

## License

MIT
