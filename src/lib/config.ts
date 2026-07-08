import { z } from 'zod';

const configSchema = z.object({
  appEnv: z.enum(['development', 'test', 'production']).default('development'),
  appPort: z.coerce.number().int().positive().default(3000),
  databaseUrl: z.string().optional(),
  sessionSecret: z.string().min(32).optional(),
  stripeSecretKey: z.string().optional(),
  stripePublishableKey: z.string().optional(),
  stripeWebhookSecret: z.string().optional(),
});

export type AppConfig = z.infer<typeof configSchema>;

export function getConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return configSchema.parse({
    appEnv: env.APP_ENV ?? 'development',
    appPort: env.APP_PORT ?? '3000',
    databaseUrl: env.DATABASE_URL,
    sessionSecret: env.SESSION_SECRET,
    stripeSecretKey: env.STRIPE_SECRET_KEY,
    stripePublishableKey: env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
  });
}

export function getMissingSecrets(config: AppConfig): string[] {
  const missing: string[] = [];
  if (!config.databaseUrl) missing.push('DATABASE_URL');
  if (!config.sessionSecret) missing.push('SESSION_SECRET');
  if (!config.stripeSecretKey) missing.push('STRIPE_SECRET_KEY');
  if (!config.stripePublishableKey) missing.push('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
  return missing;
}
