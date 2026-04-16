import { NextRequest, NextResponse } from 'next/server';

const PORTAL_API = process.env.PORTAL_API_URL || 'http://localhost:8080';

function getAuthHeaders(request: NextRequest): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = request.headers.get('Authorization');
  if (token) headers['Authorization'] = token;
  return headers;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch(`${PORTAL_API}/api/partnerships/referrals/lead`, {
      method: 'POST',
      headers: getAuthHeaders(request),
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again.' },
      { status: 500 }
    );
  }
}
