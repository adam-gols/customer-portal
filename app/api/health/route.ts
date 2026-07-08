import { NextResponse } from 'next/server';
import { getConfig } from '@/lib/config';

export async function GET() {
  const config = getConfig();

  return NextResponse.json({
    status: 'ok',
    service: 'gols-connect',
    environment: config.appEnv,
    timestamp: new Date().toISOString(),
  });
}
