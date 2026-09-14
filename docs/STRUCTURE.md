# AIPeT — Detailed Project Structure

This document describes the full repository layout, every product utility, how data and payments flow, what is implemented today, and what is still missing for production.

Language for all code, commits, and docs: **English**.

---

## 1. High-level architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser / Mini App                      │
│  Tabs: Chat · Activity · Charity · Donate · Contribute      │
│  Auth: Privy (email / wallet / Google + embedded wallet)    │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS
┌───────────────────────────▼─────────────────────────────────┐
│              Next.js 15 (App Router) on Vercel                │
│  app/page.tsx  ·  components/*  ·  app/api/*                 │
└───────┬─────────────────┬──────────────────┬────────────────┘
        │                 │                  │
        ▼                 ▼                  ▼
   lib/ai.ts         lib/x402.ts        External APIs
   (LLM agent)       (networks +         Privy · OpenAI
                     pay-to +            x402 facilitator
                     accepts[])          (when paywall on)
```

**Design principle:** keep the app deployable without every integration fully live. Optional paywall (`ENABLE_X402_PAYWALL`), optional OpenAI key (mock replies), optional charity wallet.

---

## 2. Repository tree (current)

```
AIPeT/
├── app/
│   ├── layout.tsx                 # Root layout; wraps children in Providers
│   ├── page.tsx                   # Main UI — tab shell for all product utilities
│   ├── globals.css                # Tailwind + chat bubble styles
│   ├── .well-known/
│   │   └── farcaster.json/
│   │       └── route.ts           # Farcaster Mini App manifest endpoint
│   └── api/
│       ├── health/route.ts        # Liveness + feature/network inventory
│       ├── chat/route.ts          # Agent chat (optional x402)
│       ├── donate/route.ts        # Creator/community tip (optional x402)
│       ├── contribute/route.ts    # Development support tip (optional x402)
│       ├── charity/route.ts       # Animal charity tip by cause (optional x402)
│       ├── feed/route.ts          # Activity post validate/echo (MVP)
│       └── farcaster/
│           └── webhook/route.ts   # Mini App webhook receiver
│
├── components/
│   ├── Providers.tsx              # PrivyProvider + supported chains (incl. Robinhood)
│   ├── WalletButton.tsx           # Connect / logout
│   ├── Chat.tsx                   # Robot pet chat UI
│   ├── Feed.tsx                   # Daily activity composer + local feed
│   ├── Charity.tsx                # Animal charity causes + pay CTA
│   ├── Donate.tsx                 # General donation UI
│   └── Contribute.tsx             # Contribution type picker + pay CTA
│
├── lib/
│   ├── ai.ts                      # System prompt ("Fox") + OpenAI / mock
│   └── x402.ts                    # CAIP networks, payTo, accepts builders, resource server
│
├── docs/
│   ├── STRUCTURE.md               # This file
│   ├── AGENT.md                   # Agent API contract for humans & bots
│   └── MULTI_CHAIN.md             # Chain IDs, RPCs, Farcaster go-live
│
├── ROADMAP.md                     # Phased plan and open work
├── CONTRIBUTING.md                # How to run, PR rules, role needs
├── README.md                      # Product summary
├── .env.example                   # All environment variables
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── vercel.json
```

**Not in repo yet (expected later):**

```
public/                  # icon.png, og.png, splash.png for Farcaster / SEO
lib/db.ts or lib/kv.ts   # Shared store for global activity feed
lib/receipts.ts          # Payment receipt logging
middleware.ts            # Optional global rate limit / geo
```

---

## 3. Product utilities (feature map)

### 3.1 Chat — robot pet agent

| Item | Detail |
|------|--------|
| **UI** | `components/Chat.tsx` |
| **API** | `POST /api/chat` |
| **Lib** | `lib/ai.ts` |
| **Default price** | `$0.01` USDC (when paywall enabled) |
| **Auth** | Privy login recommended before send |

**Behavior**

1. User sends a message and recent history.
2. If `ENABLE_X402_PAYWALL=true` and no payment header → `402` with accept metadata.
3. Otherwise `chatWithPet()` runs (OpenAI if `OPENAI_API_KEY` set, else mock).
4. Agent stays in character as **AIPeT / Fox** (kitten-inspired robot pet).

**Gaps**

- [ ] Client-side x402 auto-pay (Privy / wallet signer) on 402
- [ ] Tool calling (search, pet-care KB, calculators)
- [ ] Persistent session memory keyed by Privy DID
- [ ] Streaming responses

---

### 3.2 Activity feed — daily life posts

| Item | Detail |
|------|--------|
| **UI** | `components/Feed.tsx` |
| **API** | `GET/POST /api/feed` |
| **Price** | Free (MVP) |
| **Storage** | Browser `localStorage` + API echo |

**Behavior**

1. User picks a mood (happy, walk, care, rescue, chill).
2. Posts short text (max 500 chars) after login.
3. API validates payload and returns a normalized `post` object.
4. Client merges into a local list (seed posts + user posts).

**Gaps**

- [ ] Shared database (Vercel KV / Postgres / Supabase) for a **global** feed
- [ ] Moderation (report, block, basic profanity filter)
- [ ] Optional media uploads (pet photos)
- [ ] Like / comment / tip-a-post via x402
- [ ] Pagination and public profile pages

---

### 3.3 Animal charity

| Item | Detail |
|------|--------|
| **UI** | `components/Charity.tsx` |
| **API** | `POST /api/charity` |
| **Default price** | `$1.00` USDC |
| **Causes** | `shelter` · `wildlife` · `stray` · `emergency` |

**Behavior**

1. User selects a cause and optional note.
2. Pay-to address: `CHARITY_PAY_TO_ADDRESS` or fallback `PAY_TO_ADDRESS`.
3. Optional 402 when paywall is on.

**Gaps**

- [ ] Partner shelter registry (name, country, proof links)
- [ ] On-chain or off-chain receipt ledger by cause
- [ ] Public transparency page (totals per cause)
- [ ] Separate Solana charity recipient if needed
- [ ] Legal/compliance review for charity claims by jurisdiction

---

### 3.4 Donate — creator / community support

| Item | Detail |
|------|--------|
| **UI** | `components/Donate.tsx` |
| **API** | `POST /api/donate` |
| **Default price** | `$0.50` USDC |
| **Recipient** | `PAY_TO_ADDRESS` (EVM) / Solana when client pays on SVM |

**Gaps**

- [ ] Amount picker (not only fixed default)
- [ ] Receipt email / explorer link
- [ ] Distinguish donate vs charity in analytics

---

### 3.5 Contribute — development funding

| Item | Detail |
|------|--------|
| **UI** | `components/Contribute.tsx` |
| **API** | `POST /api/contribute` |
| **Default price** | `$0.25` USDC |
| **Types** | development · community · content · general |

**Gaps**

- [ ] Map contribution types to internal budget buckets
- [ ] Public “funded milestones” board

---

### 3.6 Auth & wallets (Privy)

| Item | Detail |
|------|--------|
| **UI** | `Providers.tsx`, `WalletButton.tsx` |
| **Env** | `NEXT_PUBLIC_PRIVY_APP_ID`, `PRIVY_APP_SECRET` |

**Supported chains in Privy config**

- Base, Base Sepolia
- BNB Smart Chain, BNB Testnet
- Robinhood Chain (`4663`), Robinhood Testnet (`46630`)

**Gaps**

- [ ] Solana wallets in Privy (or wallet-adapter) for SVM payments
- [ ] Default chain switch UX for Robinhood / BNB
- [ ] Session keys / spend limits for agentic payments

---

### 3.7 Multi-chain payments (x402)

| Item | Detail |
|------|--------|
| **Config** | `lib/x402.ts` |
| **Toggle** | `ENABLE_X402_PAYWALL=true` |

**Networks (CAIP-2)**

| Network | ID |
|---------|-----|
| Base | `eip155:8453` |
| Base Sepolia | `eip155:84532` |
| BNB | `eip155:56` |
| BNB Testnet | `eip155:97` |
| Robinhood Chain | `eip155:4663` |
| Robinhood Testnet | `eip155:46630` |
| Solana | `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp` |
| Solana Devnet | `solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1` |

**Recipients**

| Chain family | Env / default |
|--------------|----------------|
| EVM | `PAY_TO_ADDRESS` = `0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03` |
| Solana | `PAY_TO_SOLANA` = `GN3GD3JGqE1B1H7SrA8ncu3YQgVgT8qRVYvKzE8pscvn` |
| Charity | `CHARITY_PAY_TO_ADDRESS` (optional) |

**Gaps**

- [ ] End-to-end settle on Base Sepolia with real USDC
- [ ] Full Solana client path (`@x402/svm` + signer)
- [ ] Robinhood USDG/USDC + facilitator confirmation
- [ ] Unified receipt store (tx hash, chain, product, user)
- [ ] Rate limits per wallet / IP

See also [MULTI_CHAIN.md](./MULTI_CHAIN.md).

---

### 3.8 Farcaster Mini App

| Item | Detail |
|------|--------|
| **Manifest** | `GET /.well-known/farcaster.json` |
| **Webhook** | `POST /api/farcaster/webhook` |

**Gaps**

- [ ] Production `NEXT_PUBLIC_APP_URL`
- [ ] Account association / domain verification
- [ ] `public/icon.png`, `og.png`, `splash.png`
- [ ] Frame actions (open chat, tip charity)

---

### 3.9 Health & ops

| Endpoint | Purpose |
|----------|---------|
| `GET /api/health` | Version, networks, recipients, feature flags |

**Gaps**

- [ ] Structured logging / error tracking (e.g. Sentry)
- [ ] Uptime check on health after deploy
- [ ] Admin-only metrics dashboard

---

## 4. Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_PRIVY_APP_ID` | For auth UI | Privy app id |
| `PRIVY_APP_SECRET` | Server Privy | Server verification (if used) |
| `PAY_TO_ADDRESS` | Recommended | EVM recipient |
| `PAY_TO_SOLANA` | Recommended | Solana recipient |
| `CHARITY_PAY_TO_ADDRESS` | Optional | Animal charity wallet |
| `ENABLE_X402_PAYWALL` | Optional | Force HTTP 402 on paid routes |
| `X402_NETWORK` | Optional | Default network in 402 body |
| `X402_FACILITATOR_URL` | Optional | Facilitator base URL |
| `OPENAI_API_KEY` | Optional | Real LLM; else mock |
| `OPENAI_BASE_URL` | Optional | Compatible gateway |
| `OPENAI_MODEL` | Optional | Default `gpt-4o-mini` |
| `NEXT_PUBLIC_APP_URL` | For Farcaster | Canonical site URL |
| `CHAT_PRICE_USD` / `DONATE_*` / `CONTRIBUTE_*` / `CHARITY_*` | Optional | Price overrides |

Full template: [`.env.example`](../.env.example).

---

## 5. Request / response contracts (summary)

### Chat

```http
POST /api/chat
Content-Type: application/json

{ "message": "string", "history": [{ "role": "user|assistant", "content": "string" }] }
```

Success: `{ success, reply, model, pet }`  
Paywall: `402` + `accepts[]`

### Charity

```http
POST /api/charity
{ "cause": "shelter|wildlife|stray|emergency", "note": "string" }
```

### Feed

```http
POST /api/feed
{ "content": "string", "mood": "happy|walk|care|rescue|chill", "author": "string" }
```

Success: `{ success, post: { id, author, content, mood, createdAt } }`

### Donate / Contribute

```http
POST /api/donate    { "message": "string" }
POST /api/contribute { "contribution": "development|community|content|general" }
```

---

## 6. Implementation status matrix

| Utility | UI | API | Payments | Persistence | Production-ready |
|---------|----|-----|----------|-------------|------------------|
| Chat | Yes | Yes | Optional 402 | None (stateless) | Partial |
| Activity feed | Yes | Yes (echo) | N/A | Local only | MVP |
| Charity | Yes | Yes | Optional 402 | None | Partial |
| Donate | Yes | Yes | Optional 402 | None | Partial |
| Contribute | Yes | Yes | Optional 402 | None | Partial |
| Privy auth | Yes | — | — | Privy | Needs env |
| Multi-chain config | — | Config | Accepts listed | — | Config only |
| Solana settle | — | Config | **Missing client** | — | Open |
| Robinhood settle | — | Config | **Needs facilitator E2E** | — | Open |
| Farcaster | Manifest + webhook | Yes | — | — | Scaffold |
| Global social graph | — | — | — | **Missing DB** | Open |

---

## 7. Gap analysis

This section consolidates **what is missing**, **why it matters**, **severity/impact**, **effort**, **dependencies**, and **recommended order**. Use it for sprint planning and Colosseum / collaborator scoping.

### 7.1 Severity legend

| Severity | Meaning |
|----------|---------|
| **P0 — Blocker** | Blocks credible production demo or honest “live payments” claims |
| **P1 — High** | Core product promise incomplete (social, charity trust, multi-chain) |
| **P2 — Medium** | UX, depth, or distribution; improves conversion and retention |
| **P3 — Low** | Nice-to-have differentiation after P0–P2 |

| Effort | Rough guide |
|--------|-------------|
| **S** | Hours to ~2 days |
| **M** | ~3–7 days |
| **L** | Multi-week or specialist work |

---

### 7.2 Critical path gaps (P0)

| ID | Gap | Area | Why it matters | Effort | Depends on | Mitigation / next action |
|----|-----|------|----------------|--------|------------|--------------------------|
| G01 | No stable **production URL** | DevOps | Judges/partners cannot try the app; Farcaster cannot verify domain | S–M | Vercel project, env secrets | Deploy main → set `NEXT_PUBLIC_APP_URL` → monitor `/api/health` |
| G02 | **Paywall not proven E2E** | Payments | 402 bodies exist, but no verified USDC settlement on a public testnet | M | Facilitator, test USDC, wallet with funds | Turn on `ENABLE_X402_PAYWALL` on Base Sepolia; one recorded successful pay |
| G03 | **Client does not auto-pay** on 402 | Frontend + payments | Users see payment required but cannot complete flow in-app | M | G02, Privy embedded wallet / signer | Implement wrap-fetch or x402 client; retry request with payment header |
| G04 | **Privy env may be empty** in deploy | Auth | Login disabled; half of the product unreachable | S | Privy dashboard app + allowed domains | Document required env in deploy checklist; fail soft already in `Providers` |

Without G01–G03, the project remains a **UI scaffold**, not a monetized agent demo.

---

### 7.3 Product integrity gaps (P1)

| ID | Gap | Area | Why it matters | Effort | Depends on | Mitigation / next action |
|----|-----|------|----------------|--------|------------|--------------------------|
| G10 | Activity feed is **localStorage-only** | Social | Posts are not shared across users; “community” is an illusion | M | DB/KV choice | Add `lib/db` or Vercel KV; `Feed` reads server list |
| G11 | No **global moderation** | Social | Shared feed will attract spam/abuse | M | G10 | Report flag, rate limit, hide queue |
| G12 | **Solana pay path** is config-only | Solana | Colosseum / Solana narrative needs real SVM settlement | L | Signer, USDC mint, `@x402/svm` (or equiv.) | Devnet tip to `PAY_TO_SOLANA`; document faucet steps |
| G13 | **Robinhood** path unproven | EVM L2 | Chain IDs wired; facilitator/asset (USDC vs USDG) unclear | M–L | G02 patterns, chain 4663 RPC | Testnet tip; confirm asset decimals + facilitator support |
| G14 | Charity has **no ledger / partners** | Charity | Trust risk: users pay “for animals” without transparency | M | G02, optional `CHARITY_PAY_TO_ADDRESS` | Receipt log by `cause`; public totals page; partner list |
| G15 | No **payment receipts** store | Backend | Cannot debug, audit, or show explorer links | M | G02 | Persist `{ route, chain, amount, tx, user, ts }` |
| G16 | No **rate limits** | Backend | Paid and free routes are abuse-prone once public | S–M | Middleware or edge config | Per-IP and per-wallet limits on chat/feed/pay routes |

---

### 7.4 Experience & depth gaps (P2)

| ID | Gap | Area | Why it matters | Effort | Depends on | Mitigation / next action |
|----|-----|------|----------------|--------|------------|--------------------------|
| G20 | Chat has **no tools** | AI | Agent cannot act beyond text | M–L | OpenAI tools API | Start with one tool (e.g. pet-care FAQ search) |
| G21 | **No session memory** | AI | Every visit is stateless beyond client history slice | M | User id from Privy | Store last N turns server-side per DID |
| G22 | **No streaming** replies | AI / UX | Feels slower and less “alive” | S–M | Route handler streaming | SSE or readable stream from LLM |
| G23 | Fixed **donation amounts** only | Payments UX | Limits willingness to pay | S | UI + API body | Amount presets + custom |
| G24 | **Solana wallet** not in Privy config | Auth | Blocks G12 even if backend ready | M | Privy Solana or adapter | Enable Solana connector; test address display |
| G25 | Farcaster **not associated** | Distribution | Mini App cannot be installed | M | G01, image assets | Domain verify + `public/` icons |
| G26 | Weak **empty/error** states | Frontend | Mobile and failed pay flows feel broken | S | — | Copy + retry CTAs per tab |
| G27 | No **OPENAI_API_KEY** in prod | AI | Demo uses mock replies only | S | Billing key | Optional; document mock vs live clearly in UI |

---

### 7.5 Differentiation gaps (P3)

| ID | Gap | Area | Why it matters | Effort | Depends on | Notes |
|----|-----|------|----------------|--------|------------|-------|
| G30 | Tip-a-post / social graph | Social | Growth loops | L | G10, G02 | After global feed is stable |
| G31 | Image uploads on activity | Social | Richer pet moments | M | Storage bucket | Privacy + moderation cost |
| G32 | Agentic spend limits | Payments + AI | Safe autonomous pay | L | G03, session keys | Align with Privy policies |
| G33 | Subscription tier | Business | Predictable revenue | L | Billing design | After micropayments work |
| G34 | Multi-persona skins | Product | Brand expansion | M | Assets + prompts | After core loops work |
| G35 | Admin metrics dashboard | Ops | Operator visibility | M | G15 | Internal only |
| G36 | Compliance review pack | Legal | Charity + payments claims | M | Counsel | Jurisdiction-specific |

---

### 7.6 Cross-cutting risk register

| Risk | Impact | Likelihood | Response |
|------|--------|------------|----------|
| Claiming “multi-chain live” while only config exists | Reputation / judging penalty | High if messaging is loose | Marketing language: **scaffold + configured networks**; demo only proven chains |
| Charity payments to creator wallet without disclosure | Trust / legal | Medium | Prefer `CHARITY_PAY_TO_ADDRESS`; UI states funds go to charity wallet / partners |
| localStorage feed mistaken for network effect | Product confusion | High | UI already notes MVP storage; upgrade to G10 before growth push |
| Facilitator downtime or unsupported network | Payment failures | Medium | Fallback chain (Base Sepolia); health check includes paywall flag |
| LLM cost without paywall | Unexpected spend | Medium | Keep paywall off only in dev; cap `max_tokens`; monitor key usage |
| Secrets in client bundle | Security | Low if server-only secrets stay server-side | Never prefix secrets with `NEXT_PUBLIC_` except Privy app id |

---

### 7.7 Gap → roadmap phase mapping

| Phase (see ROADMAP.md) | Primary gap IDs |
|------------------------|-----------------|
| Phase 1 — Stabilize & ship | G01, G02, G03, G04, G26, G27 |
| Phase 2 — Real multi-chain settlement | G12, G13, G15, G16, G24 |
| Phase 3 — Social activity becomes real | G10, G11, G30, G31 |
| Phase 4 — Charity credibility | G14, G36 |
| Phase 5 — Agent depth | G20, G21, G22, G32 |
| Phase 6 — Distribution | G25 |
| Phase 7 — Product & business | G23, G33, G34, G35 |

---

### 7.8 Suggested 2-week collaborator split

| Track | Owner | Gap focus | Done when |
|-------|--------|-----------|-----------|
| A — Launch | DevOps + FE | G01, G04, G26 | Public URL; all tabs clickable with auth |
| B — Money path | Backend + FE | G02, G03, G15 | One testnet payment recorded end-to-end |
| C — Solana | Solana eng | G12, G24 | Devnet tip to `PAY_TO_SOLANA` |
| D — Feed | Data + FE | G10, G11 | Two users see the same post |

Parallelize A+B first; start C/D once A is unblocked.

---

### 7.9 Explicit non-gaps (out of scope for now)

These are **not** treated as defects of the current scaffold:

- Building a custom blockchain or L2
- Full Twitter-style social network (DMs, follow graph) before G10
- Mainnet revenue guarantees
- Native mobile apps (responsive web first)
- Replacing Privy with a custom auth stack

---

## 8. Suggested ownership for collaborators

| Role | Own these paths | First deliverable |
|------|-----------------|-------------------|
| **Frontend** | `components/*`, `app/page.tsx`, styles | Mobile tab UX + empty/error states (G26); pay retry UX (G03) |
| **Backend** | `app/api/*`, paywall, receipts | E2E 402 + rate limit (G02, G15, G16) |
| **Solana** | SVM client, `PAY_TO_SOLANA` path | Devnet tip succeeds (G12) |
| **EVM / Robinhood** | Chain 4663 wallet + facilitator | Testnet charity tip (G13) |
| **AI** | `lib/ai.ts`, tools | One tool + safer prompts (G20) |
| **Data** | New `lib/db` + feed migration | Global activity feed (G10) |
| **DevOps** | Vercel, env, health checks | Public production URL (G01) |

---

## 9. Local development

```bash
git clone https://github.com/wadezigh96/AIPeT.git
cd AIPeT
npm install
cp .env.example .env.local
# Fill Privy keys at minimum
npm run dev
```

Open `http://localhost:3000`.  
Check `GET http://localhost:3000/api/health`.

---

## 10. Related docs

- [ROADMAP.md](../ROADMAP.md) — phases and priorities (aligned with §7.7)
- [CONTRIBUTING.md](../CONTRIBUTING.md) — PR workflow
- [AGENT.md](./AGENT.md) — agent-facing notes
- [MULTI_CHAIN.md](./MULTI_CHAIN.md) — chain parameters

---

*Last aligned with repo feature set: Chat, Activity, Charity, Donate, Contribute, multi-chain (Base, BNB, Robinhood, Solana), Privy, Farcaster scaffold. Gap analysis IDs G01–G36.*
