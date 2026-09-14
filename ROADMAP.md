# AIPeT Roadmap

## Vision

A decentralized robot-pet agent that helps users with everyday needs, monetized via **x402 micropayments**, authenticated with **Privy**, and available as a **Farcaster Mini App** — with first-class support for **Solana**, **Base**, **BNB Chain**, and **Robinhood Chain**.

## Current status (v0.3.1)

| Area | Status |
|------|--------|
| Next.js app (Chat / Donate / Contribute) | Done |
| Privy login + embedded wallets | Done |
| x402 paywall hooks (optional via env) | Done |
| Multi-chain recipients (EVM + Solana) | Done |
| Robinhood Chain (`eip155:4663` / `46630`) | Done |
| Farcaster manifest + webhook scaffold | Done |
| OpenAI agent persona ("Fox" robot pet) | Done |
| Production deploy + live payments | In progress |
| Full Solana x402 client signing | Open |
| Robinhood USDG / facilitator live path | Open |
| Agent tools / on-chain actions | Open |

---

## Phase 1 — Stabilize & ship (now)

**Goal:** reliable production demo.

- [ ] Deploy to Vercel with Privy + env vars
- [ ] Verify `/api/health`, chat, donate, contribute
- [ ] Enable `ENABLE_X402_PAYWALL=true` on testnet
- [ ] End-to-end payment on Base Sepolia (USDC)
- [ ] Smoke-test Robinhood Chain wallet connect (chain 4663)
- [ ] Add public assets (`icon.png`, `og.png`, `splash.png`)
- [ ] Polish UI / loading / error states

**Owners:** frontend + devops

---

## Phase 2 — Solana + Robinhood payments

**Goal:** real settlement paths beyond config.

- [ ] Integrate `@x402/svm` + Solana signer (Privy Solana wallet or wallet-adapter)
- [ ] Pay USDC (or SPL) to `PAY_TO_SOLANA`
- [ ] Solana Devnet faucet flow documented
- [ ] Optional: on-chain memo/receipt for tips
- [ ] Robinhood Chain: confirm USDG/USDC + facilitator (e.g. hood402-style rail)
- [ ] E2E pay on Robinhood testnet (`46630`)

**Owners:** backend + Solana / EVM engineer

---

## Phase 3 — Agent capabilities

**Goal:** Fox becomes useful beyond chat.

- [ ] Tool calling (web search, calculators, pet-care knowledge)
- [ ] Session memory per user (Privy DID)
- [ ] Rate limits + spend caps per wallet
- [ ] Agentic payment flows (user approves budget; agent pays per request)

**Owners:** AI / backend

---

## Phase 4 — Social & distribution

**Goal:** growth loops.

- [ ] Complete Farcaster Mini App association + frames
- [ ] Shareable chat snippets
- [ ] Referral tips (small x402 rewards)
- [ ] Public agent API for other bots to call AIPeT (paid)

**Owners:** full-stack + growth

---

## Phase 5 — Product & business

**Goal:** sustainable product.

- [ ] Subscription tier (monthly USDC) vs pure micropayments
- [ ] Creator dashboard (revenue by chain, including Robinhood)
- [ ] Multi-pet skins / personalities
- [ ] Compliance review for payments jurisdictions

**Owners:** product + backend

---

## Looking for collaborators

| Role | Focus |
|------|--------|
| **Frontend** | Next.js UI, Privy UX, Farcaster Mini App polish |
| **Backend** | x402 routes, paywall hardening, receipts, rate limits |
| **Solana** | SVM payments, SPL USDC, optional on-chain memo/program |
| **EVM / Robinhood** | Chain 4663 payments, USDG facilitator path |
| **AI** | Tools, memory, safer system prompts |

Repo: https://github.com/wadezigh96/AIPeT  
Contact: open an issue or PR on GitHub.
