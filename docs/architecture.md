# Architecture

## Overview

GOLS Connect is a Next.js customer portal where external GOLS customers sign up, view orders, and purchase products via Stripe. The app uses PostgreSQL (Drizzle ORM) for users and orders, custom session auth, and Stripe for payments.

## Diagram

```txt
[Browser] → [Next.js App Router]
                ├─ app/          (pages + API routes)
                ├─ src/lib/     (config, db, shared logic)
                └─ src/components/
                     ↓
              [PostgreSQL]    [Stripe API]
```

## Components

| Component | Location | Responsibility |
|-----------|----------|----------------|
| Home page | `app/page.tsx` | Branded landing; dev setup hints |
| Health API | `app/api/health/route.ts` | Liveness/readiness check |
| Config | `src/lib/config.ts` | Env var loading and validation |
| Database | `src/lib/db/` | Drizzle schema and client |
| Brand UI | `src/components/Logo.tsx`, `src/styles/brand.css` | GOLS brand kit |

## Key decisions

See [decisions/](./decisions/) for ADRs.
