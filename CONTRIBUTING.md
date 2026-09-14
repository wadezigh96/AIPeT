# Contributing to AIPeT

Thank you for helping build a decentralized **robot pet agent** with micropayments, animal charity, and social activity features.

All contributions (code, issues, docs) should be in **English**.

For the full tree, feature matrix, API contracts, and gap list, read:

**→ [docs/STRUCTURE.md](./docs/STRUCTURE.md)** (authoritative structure document)

---

## What AIPeT is

AIPeT is a Next.js application where users can:

1. **Chat** with a fox robot-pet agent (optional paid messages via x402)
2. **Post daily activities** (walks, care, rescue stories) — Activity tab
3. **Donate to animal charity** causes (shelter, wildlife, stray, emergency vet)
4. **Donate / contribute** to the creator and development
5. Connect via **Privy** and (eventually) pay on **Solana**, **Base**, **BNB**, and **Robinhood Chain**
6. Surface as a **Farcaster Mini App** (manifest + webhook scaffold)

The repo is intentionally a **working scaffold**: UI and APIs exist; production settlement, global feed DB, and full Solana client signing are the main open engineering tracks.

---

## Quick map of the codebase

```
app/page.tsx              → Tab shell (Chat | Activity | Charity | Donate | Contribute)
components/Chat.tsx       → Agent UI
components/Feed.tsx       → Daily activity UI (localStorage MVP)
components/Charity.tsx    → Animal charity UI
components/Donate.tsx     → Creator tip UI
components/Contribute.tsx → Dev support UI
components/Providers.tsx  → Privy + chain list (incl. Robinhood 4663)
app/api/*/route.ts        → Backend handlers
lib/ai.ts                 → Agent persona + LLM/mock
lib/x402.ts               → Networks, recipients, payment accepts
docs/STRUCTURE.md         → Full detail
ROADMAP.md                → Phased plan
```

---

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 App Router, React 19, TypeScript |
| Styling | Tailwind CSS |
| Auth / wallets | Privy |
| Payments | x402-style HTTP 402 (optional via env) |
| Chains | Solana, Base, BNB Chain, Robinhood Chain |
| AI | OpenAI-compatible API (optional mock) |
| Social | Farcaster Mini App scaffold |
| Hosting target | Vercel |

---

## Local setup

```bash
git clone https://github.com/wadezigh96/AIPeT.git
cd AIPeT
npm install
cp .env.example .env.local
npm run dev
```

### Minimum env for a useful local run

```bash
NEXT_PUBLIC_PRIVY_APP_ID=
PRIVY_APP_SECRET=
PAY_TO_ADDRESS=0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03
PAY_TO_SOLANA=GN3GD3JGqE1B1H7SrA8ncu3YQgVgT8qRVYvKzE8pscvn
```

### Optional but important

```bash
OPENAI_API_KEY=                 # real chat; otherwise mock replies
ENABLE_X402_PAYWALL=false       # set true to test 402 flows
CHARITY_PAY_TO_ADDRESS=         # dedicated animal charity wallet
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Verify: `GET http://localhost:3000/api/health`

---

## Utilities and what is still missing

| Utility | Status | Highest-value next work |
|---------|--------|-------------------------|
| **Chat** | UI + API + mock/LLM | Client auto-pay on 402; tools; memory |
| **Activity feed** | UI + API echo + **localStorage only** | Shared DB for global feed; moderation |
| **Animal charity** | UI + API + causes | Partner list; receipts; transparency page |
| **Donate** | UI + API | Variable amounts; explorer links |
| **Contribute** | UI + API | Milestone board |
| **Privy** | Integrated | Solana wallet path; chain switch UX |
| **x402 multi-chain** | Config + optional 402 | E2E Base Sepolia; Solana SVM; Robinhood facilitator |
| **Farcaster** | Manifest + webhook | Domain association; icons; frames |
| **Ops** | Health endpoint | Deploy URL; logging; rate limits |

Details: [docs/STRUCTURE.md §6](./docs/STRUCTURE.md).

---

## Priority order for new contributors

1. **Production deploy** — Vercel + env + health green  
2. **One real payment** — Base Sepolia USDC with paywall on  
3. **Solana pay path** — sign and settle to `PAY_TO_SOLANA`  
4. **Global activity feed** — replace localStorage with KV/Postgres  
5. **Charity transparency** — log causes + public totals  
6. **Farcaster go-live** — assets + association  

Do not expand into large new product surfaces until 1–3 work.

---

## Roles we need

| Role | Focus areas |
|------|-------------|
| Frontend | Tabs UX, mobile, empty/error states, Farcaster frames |
| Backend | Paywall hardening, receipts, rate limits |
| Solana | `@x402/svm` (or equivalent), SPL USDC, devnet docs |
| EVM / Robinhood | Chain `4663` payments, USDG/USDC facilitator |
| AI | Tools, prompts, spend-aware agent loops |
| Data | Feed schema, migrations, moderation basics |

---

## Pull request guidelines

1. **English** only in code comments, commit messages, and docs.  
2. Prefer **small PRs** (one concern per PR).  
3. Never commit secrets, `.env.local`, or private keys.  
4. Keep TypeScript strict; avoid breaking public API JSON shapes without a note in the PR.  
5. Update `docs/STRUCTURE.md` or `ROADMAP.md` when you add a utility or close a gap.  
6. Reference related issues if any.

### Suggested branch names

`feat/solana-x402-client`, `feat/feed-kv`, `fix/charity-receipts`, `chore/deploy-docs`

---

## Testing checklist (before merge)

- [ ] `npm run build` succeeds  
- [ ] `/api/health` returns expected features/networks  
- [ ] Chat works with and without `OPENAI_API_KEY`  
- [ ] Activity post appears in UI after submit  
- [ ] Charity / donate / contribute return JSON success when paywall is off  
- [ ] With `ENABLE_X402_PAYWALL=true`, unpaid paid-routes return `402`  

---

## License

MIT — see repository license terms.

Questions? Open a GitHub issue with the `question` or `help wanted` context.
