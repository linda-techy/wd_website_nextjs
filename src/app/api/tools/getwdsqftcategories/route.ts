import { NextResponse } from 'next/server';

const PORTAL_API = process.env.PORTAL_API_URL || 'http://localhost:8080';

export async function GET() {
  try {
    const response = await fetch(`${PORTAL_API}/tools/getwdsqftcategories`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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
