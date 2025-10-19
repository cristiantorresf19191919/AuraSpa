import { NextRequest } from 'next/server';
import { auth0 } from '@/app/lib/auth0';

// Handle all Auth0 API routes
export async function GET(request: NextRequest) {
  return await auth0.middleware(request);
}

export async function POST(request: NextRequest) {
  return await auth0.middleware(request);
}