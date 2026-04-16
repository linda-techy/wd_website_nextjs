import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

const PORTAL_API = process.env.PORTAL_API_URL || 'http://localhost:8080';

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);
  const { allowed, remaining } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { success: false, message: 'Too many submissions. Please try again later.' },
      { status: 429, headers: { 'X-RateLimit-Remaining': '0' } }
    );
  }

  try {
    const body = await request.json();
    const response = await fetch(`${PORTAL_API}/leads/calculator/home-cost`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data, {
      status: response.status,
      headers: { 'X-RateLimit-Remaining': String(remaining) },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again.' },
      { status: 500 }
    );
  }
}
