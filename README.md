# GOLS Connect

Customer portal where GOLS customers sign up, view orders and items, pay via Stripe, and access partner integrations.

## First-time setup (new teammate)

**Cloning this repo for the first time?** Secrets are in **1Password**, not git.

1. Accept your **1Password Teams** invite
2. Install the **1Password Cursor plugin** (Cursor Settings → Plugins)
3. Clone and enter the repo:

```bash
git clone https://github.com/adam-gols/customer-portal
cd customer-portal
```

4. Open **`docs/project-context.md` → Secrets** for the Environment name
5. **Mount** that Environment → `.env` — see [docs/joining-a-project.md](./docs/joining-a-project.md)
6. Verify and run:

```bash
./scripts/setup-env
./scripts/dev
```

Or ask Cursor Agent: *"I just cloned this repo — help me mount 1Password .env"*

## Prerequisites

- Node 22+
- pnpm 9+
- 1Password Teams access

## Commands

| Command | Description |
|---------|-------------|
| `./scripts/setup-env` | Verify 1Password `.env` mount |
| `./scripts/dev` | Start local development (http://localhost:3000) |
| `./scripts/test` | Run tests |
| `./scripts/lint` | Lint, format check, and brand validation |

## Environment variables

Documented in `.env.example` (fake values). Real values: **1Password Environment** `customer-portal Development` → mounted `.env`.

| Variable | Required | Description |
|----------|----------|-------------|
| `APP_ENV` | yes | `development`, `test`, or `production` |
| `APP_PORT` | no | Dev server port (default `3000`) |
| `DATABASE_URL` | for DB features | PostgreSQL connection string |
| `SESSION_SECRET` | for auth | Min 32 characters for session signing |
| `STRIPE_SECRET_KEY` | for payments | Stripe secret API key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | for payments | Stripe publishable key (client) |
| `STRIPE_WEBHOOK_SECRET` | for webhooks | Stripe webhook signing secret |

Never commit real secrets.

## Project docs

- [Joining this project](./docs/joining-a-project.md) — first clone + 1Password mount
- [Setup guide](./docs/setup.md)
- [Project context](./docs/project-context.md)
- [Secrets policy](./docs/secrets.md)
- [Architecture](./docs/architecture.md)
- [Contributing](./CONTRIBUTING.md)
- [Agent instructions](./AGENTS.md)

## License

Proprietary — Game On Live Studio
