# Project Context

> Agents: treat this file as authoritative product and stack facts.

## Product

| Field | Value |
|-------|-------|
| Name | GOLS Connect |
| One-line summary | Customer portal where GOLS customers sign up, view orders and items, pay via Stripe, and access partner integrations. |
| Problem | Customers lack a single place to view their orders and reach customer service — GOLS Connect is the one-stop shop for order visibility and support. |
| Primary users | GOLS customers (external) — end users who purchase products and need order visibility and support |

### Core workflows

1. Sign up / log in to access the portal
2. View orders and order details
3. Purchase products and pay via Stripe

### Business rules

- Customers must sign in to view their own orders
- Payments processed exclusively through Stripe

### Out of scope (for now)

- Mobile app (native iOS/Android)

## Tech stack

| Layer | Choice | Version | Notes |
|-------|--------|---------|-------|
| Runtime | Node | 22 | |
| Frontend | Next.js (App Router) | | React-based customer portal UI |
| Backend | Next.js API routes / server actions | | Auth, orders, Stripe webhooks |
| Database | PostgreSQL | | Users, orders, sessions |
| Auth | Custom JWT/session | | Customer sign-up and login |
| Package manager | pnpm | | |
| Test runner | Vitest (+ Playwright E2E) | | |

## Repository map

| Path | Purpose |
|------|---------|
| `app/` | Next.js App Router pages and API routes |
| `src/` | Components, lib, styles, co-located tests |
| `scripts/` | dev, test, lint entrypoints |
| `docs/` | Project documentation |
| `brand/` | GOLS org brand kit |

## Commands

| Command | Purpose |
|---------|---------|
| `./scripts/dev` | Start Next.js dev server on port 3000 |
| `./scripts/test` | Run Vitest unit tests |
| `./scripts/lint` | ESLint, Prettier, and brand validation |

## Repository

| Field | Value |
|-------|-------|
| Project slug | `customer-portal` |
| Local path | `~/Documents/customer-portal` |
| Git initialized | `yes` |
| GitHub remote | `yes` (always) |
| Remote URL | `https://github.com/adam-gols/customer-portal` |
| Default branch | `main` |
| Visibility | `public` |

## Git workflow

| Rule | Value |
|------|-------|
| Default branch | `main` |
| Day-to-day work | Feature branches (`feature/`, `fix/`, `chore/`, `docs/`) |
| Updates to `main` | Pull requests only |
| Direct push to `main` | Bootstrap initial commit only |
| Docs | [CONTRIBUTING.md](../CONTRIBUTING.md), [git-workflow.md](./git-workflow.md) |

## Secrets (1Password)

| Field | Value |
|-------|-------|
| Team secrets source | `1Password Environment: customer-portal Development` |
| .env mount path | `.env` (project root) |
| Cursor plugin | 1Password (Cursor Marketplace) |
| 1Password setup complete | partial (Environment ready; `.env` mount after bootstrap) |
| Local setup | Mount Environment → `.env`; run `./scripts/setup-env` to verify |
| First clone guide | [joining-a-project.md](./joining-a-project.md) |
| CI secrets | `[GitHub Actions — when CI exists]` |
| Policy | Real values never in git — see [secrets.md](./secrets.md) |

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `APP_ENV` | yes | Application environment |
| `APP_PORT` | no | Dev server port (default 3000) |
| `DATABASE_URL` | for DB | PostgreSQL connection string |
| `SESSION_SECRET` | for auth | Session signing secret (min 32 chars) |
| `STRIPE_SECRET_KEY` | for payments | Stripe secret API key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | for payments | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | for webhooks | Stripe webhook signing secret |

See `.env.example` for fake values.

## Integrations

| Service | Purpose | Env vars | Docs |
|---------|---------|----------|------|
| Stripe | Payments | `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` | https://stripe.com/docs |

## Data model (high level)

| Entity | Description |
|--------|-------------|
| User | Customer account (email, password hash) |
| Order | Customer order linked to user; Stripe payment intent reference |

## Users and permissions

Primary user groups (pick one or more during onboarding):

- SCOR
- On-Site Streamers
- CEO
- Marketing
- Operations

| Role / group | Capabilities |
|------|--------------|
| GOLS customers | Sign up, view orders and items, pay via Stripe, access partner integrations, contact customer service |

## Deployment

| Environment | URL / target | Notes |
|-------------|--------------|-------|
| Local | `localhost:3000` | Next.js dev server |
| Production | `[TBD]` | |

## Priorities

1. Auth sign-up and login
2. Order list and detail views
3. Stripe checkout integration

## Known issues

- `[None yet]`

## Dependencies policy

New packages require:

1. Justification in PR or ADR
2. Fit with stack table above
3. Active maintenance
