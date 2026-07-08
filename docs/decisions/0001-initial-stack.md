# Decision: Initial stack for GOLS Connect

## Context

GOLS Connect is a customer-facing web portal requiring account sign-up, order visibility, and Stripe payments. We needed a stack that supports a branded UI, server-side API routes, PostgreSQL persistence, and TypeScript end-to-end.

## Decision

- **Next.js 15** (App Router) for frontend and API routes
- **TypeScript** throughout
- **PostgreSQL** with **Drizzle ORM**
- **Custom session auth** (credentials stored in Postgres)
- **Stripe** for payments
- **Vitest** for unit tests; **Playwright** reserved for future E2E
- **pnpm** for package management

## Reasoning

Next.js unifies the React customer UI and server routes (health, future auth, Stripe webhooks) in one deployable unit. TypeScript aligns with Stripe's SDK and React ecosystem. Drizzle offers lightweight, type-safe SQL for users and orders. Custom auth keeps customer data under our control without a third-party auth vendor for v1.

## Consequences

- Requires PostgreSQL locally or via a dev database service before auth/orders features ship
- Stripe and session secrets must be added to 1Password Environment as features are built
- Playwright E2E is documented but not wired into CI in bare-bones bootstrap
