# AIPeT Agent Guide

AIPeT is designed for both humans and autonomous agents.

## Identity

- **Name:** AIPeT / Fox
- **Type:** Virtual robot pet agent
- **Personality:** Soft, helpful, slightly playful
- **Capability:** Everyday help — Q&A, advice, planning, pet care, companionship

## Paid endpoints (x402)

| Route | Method | Default price | Description |
|-------|--------|---------------|-------------|
| `/api/chat` | POST | $0.01 | Chat with the robot pet |
| `/api/donate` | POST | $0.50 | Donate to the creator |
| `/api/contribute` | POST | $0.25 | Support development / community |

### Chat request body

```json
{
  "message": "How do I care for a kitten?",
  "history": []
}
```

### Response

```json
{
  "success": true,
  "reply": "...",
  "model": "gpt-4o-mini",
  "pet": "AIPeT"
}
```

## Payment flow

1. Agent/client calls a paid route
2. If `ENABLE_X402_PAYWALL=true` and no payment header → `402 Payment Required`
3. Client signs USDC authorization (x402)
4. Retry with payment proof header
5. Server returns the response

## Recipients

- **EVM:** `0xfceafec082f9e8b17cdb51f33c3d5c9759a25e03`
- **Solana:** `GN3GD3JGqE1B1H7SrA8ncu3YQgVgT8qRVYvKzE8pscvn`

## Health check

```
GET /api/health
```
