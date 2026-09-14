# AIPeT Roadmap

Long-form plan for collaborators. Structure and gap details: **[docs/STRUCTURE.md](./docs/STRUCTURE.md)**.

## Vision

A decentralized **robot-pet agent** that helps with everyday needs, supports **animal charity**, lets users share **daily pet activities**, and settles small payments via **x402** across **Solana**, **Base**, **BNB Chain**, and **Robinhood Chain**, with **Privy** auth and a **Farcaster** distribution path.

---

## Current status (v0.4)

| Area | Status | Notes |
|------|--------|--------|
| Chat / agent persona (Fox) | Done (scaffold) | Mock or OpenAI; tools missing |
| Activity feed | Done (MVP) | **Local device only** — not global |
| Animal charity | Done (scaffold) | Causes + API; partner ledger missing |
| Donate / Contribute | Done (scaffold) | Fixed default prices |
| Privy login + embedded wallets | Done | Needs production env |
| x402 optional paywall | Done | Not enforced until env flag |
| Multi-chain accept config | Done | Base, BNB, Robinhood, Solana listed |
| Solana client settlement | **Open** | Address configured only |
| Robinhood live facilitator path | **Open** | Chain IDs wired; E2E unproven |
| Farcaster Mini App | Scaffold | Manifest + webhook |
| Production deploy | **In progress** | Depends on team Vercel/Privy setup |
| Shared DB / receipts / rate limits | **Open** | |

---

## Phase 1 — Stabilize and ship (highest priority)

**Goal:** A public URL where every tab works and one payment path is proven.

- [ ] Deploy to Vercel with Privy + payment env vars
- [ ] Green `GET /api/health` in production
- [ ] Manual QA: Chat, Activity, Charity, Donate, Contribute
- [ ] Enable `ENABLE_X402_PAYWALL=true` on testnet
- [ ] Complete **one** Base Sepolia USDC payment end-to-end
- [ ] Add `public/` assets (icon, og, splash)
- [ ] Harden empty, loading, and error UI states

**Owners:** frontend + devops + backend  
**Exit criteria:** Live app link + short demo video (chat + charity + activity)

---

## Phase 2 — Real multi-chain settlement

**Goal:** Configured networks can actually pay.

### Solana

- [ ] Integrate SVM x402 client (`@x402/svm` or equivalent)
- [ ] Privy Solana wallet or wallet-adapter signing
- [ ] Settle to `PAY_TO_SOLANA`
- [ ] Document devnet faucet / USDC mint steps
- [ ] Optional on-chain memo for tips

### Robinhood Chain

- [ ] Confirm USDC or USDG asset + decimals on `4663` / `46630`
- [ ] Facilitator or self-hosted rail that accepts `eip155:4663`
- [ ] E2E charity or donate on testnet

### Shared payment platform

- [ ] Receipt log (user, route, chain, amount, tx ref)
- [ ] Rate limits per wallet and IP
- [ ] Variable amount support for donate/charity

**Owners:** Solana engineer, EVM engineer, backend  
**Exit criteria:** At least Solana **or** Robinhood testnet tip succeeds in a recorded demo

---

## Phase 3 — Social activity becomes real

**Goal:** Activity tab is a shared community feed, not per-browser storage.

- [ ] Introduce DB/KV schema for posts (`id`, `author`, `did`, `content`, `mood`, `createdAt`)
- [ ] Migrate `Feed.tsx` off localStorage as source of truth
- [ ] List/pagination API
- [ ] Basic moderation (report flag, hide, rate limit posts)
- [ ] Optional: tip a post via x402
- [ ] Optional: image upload for pet moments

**Owners:** data + frontend + backend  
**Exit criteria:** Two different browsers/users see the same new post

---

## Phase 4 — Charity credibility

**Goal:** Animal charity is transparent and partner-ready.

- [ ] `CHARITY_PAY_TO_ADDRESS` in production
- [ ] Partner shelter table (name, region, links, verification status)
- [ ] Aggregate totals by cause (public page)
- [ ] Receipt export for auditors / partners
- [ ] Clear UI copy: what is on-chain tip vs off-chain disbursement

**Owners:** backend + product  
**Exit criteria:** Public charity page + at least one documented partner flow

---

## Phase 5 — Agent depth

**Goal:** Fox is more than a single-turn chatbot.

- [ ] Tool calling (search, pet-care knowledge, unit converters)
- [ ] Memory per Privy user
- [ ] Spend caps / budget approval for agentic payments
- [ ] Streaming replies
- [ ] Safer refusal and jailbreak resistance

**Owners:** AI + backend  
**Exit criteria:** One tool demo in production chat

---

## Phase 6 — Distribution

**Goal:** Growth loops outside the main site.

- [ ] Farcaster domain association and Mini App review assets
- [ ] Frame actions (open chat, charity tip)
- [ ] Public paid agent API for third-party bots
- [ ] Referral micro-tips

**Owners:** full-stack + growth  
**Exit criteria:** Installable Mini App or working frame

---

## Phase 7 — Product and business

**Goal:** Sustainable operations.

- [ ] Optional subscription tier vs pure micropayments
- [ ] Creator dashboard (revenue by chain and product)
- [ ] Multi-persona / skins
- [ ] Compliance review for payments and charity claims

**Owners:** product + backend  
**Exit criteria:** Written business rules + dashboard MVP

---

## Explicit non-goals (near term)

- Building a custom L1/L2
- Full social network clone (DMs, follows graph) before global feed exists
- Heavy DeFi (leverage, perps) inside the pet agent
- Guaranteeing mainnet volume before E2E testnet payments work

---

## Looking for collaborators

| Role | First job |
|------|-----------|
| Frontend | Production UX + feed UI for shared DB |
| Backend | Paywall E2E + receipts + rate limits |
| Solana | SVM payment client |
| EVM / Robinhood | Chain 4663 payment path |
| AI | Tools + memory |
| Data | Feed schema + moderation |

Repo: https://github.com/wadezigh96/AIPeT  
Start here: [docs/STRUCTURE.md](./docs/STRUCTURE.md) · [CONTRIBUTING.md](./CONTRIBUTING.md)
