# Setup

## Prerequisites

- **Node 22+**
- **pnpm 9+** — `corepack enable && corepack prepare pnpm@9.15.9 --activate`
- **1Password Teams** access (invite from admin)
- **1Password for Mac or Linux** (for mounted `.env`; Windows: see [secrets.md](./secrets.md#windows-and-op-run-fallback))
- **1Password Cursor plugin** (Cursor Settings → Plugins)

## First-time setup (new teammate)

**Just cloned this repo?** Start with [joining-a-project.md](./joining-a-project.md) for the full checklist.

```bash
git clone https://github.com/adam-gols/customer-portal
cd customer-portal
pnpm install
```

Then mount secrets **before** running the app (see next section).

## Mount 1Password Environment

Environment name: **`customer-portal Development`** (see `docs/project-context.md` → Secrets).

### Steps (Mac / Linux)

1. Open **1Password** → **Environments** → `customer-portal Development`
2. **Destinations** → **Local `.env` file**
3. **Choose file path:** `/Users/you/Documents/customer-portal/.env` (absolute path to this repo)
4. **Mount .env file**
5. Verify:

```bash
./scripts/setup-env
cat .env    # approve 1Password prompt — you should see variables
```

Do **not** copy `.env.example` to `.env` — that conflicts with the 1Password mount.

### After mount

```bash
./scripts/dev     # http://localhost:3000
./scripts/test    # runs Vitest
./scripts/lint    # ESLint + Prettier + brand validation
```

## Environment variables

See `.env.example` for variable names and descriptions (fake values only). Real values live in the **1Password Environment**.

The bare-bones app starts with only `APP_ENV` set. Add `DATABASE_URL`, `SESSION_SECRET`, and Stripe keys to the Environment as you build out auth, orders, and payments.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Scripts not executable | `chmod +x scripts/*` |
| Missing `.env` | [joining-a-project.md](./joining-a-project.md) — mount Environment first |
| Mount fails | Delete any existing plaintext `.env`; remount |
| `pnpm: command not found` | Enable corepack or install pnpm globally |
| Cursor shows `.env` as unknown file | Normal for 1Password mounts — `.env` is a named pipe, not a text file. Edit variables in 1Password Environments |
