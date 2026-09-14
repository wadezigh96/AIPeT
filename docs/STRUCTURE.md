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

## 7. Suggested ownership for collaborators

| Role | Own these paths | First deliverable |
|------|-----------------|-------------------|
| **Frontend** | `components/*`, `app/page.tsx`, styles | Mobile tab UX + empty/error states |
| **Backend** | `app/api/*`, paywall, receipts | E2E 402 + rate limit |
| **Solana** | SVM client, `PAY_TO_SOLANA` path | Devnet tip succeeds |
| **EVM / Robinhood** | Chain 4663 wallet + facilitator | Testnet charity tip |
| **AI** | `lib/ai.ts`, tools | One tool + safer prompts |
| **Data** | New `lib/db` + feed migration | Global activity feed |
| **DevOps** | Vercel, env, health checks | Public production URL |

---

## 8. Local development

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

## 9. Related docs

- [ROADMAP.md](../ROADMAP.md) — phases and priorities
- [CONTRIBUTING.md](../CONTRIBUTING.md) — PR workflow
- [AGENT.md](./AGENT.md) — agent-facing notes
- [MULTI_CHAIN.md](./MULTI_CHAIN.md) — chain parameters

---

*Last aligned with repo feature set: Chat, Activity, Charity, Donate, Contribute, multi-chain (Base, BNB, Robinhood, Solana), Privy, Farcaster scaffold.*
