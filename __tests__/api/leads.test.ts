/**
 * Tests for the /api/leads/contact API route.
 *
 * The route: reads the body, applies rate limiting, proxies to PORTAL_API.
 * We mock global.fetch to avoid real network calls.
 */

import { NextRequest } from 'next/server';

// Helper to build a NextRequest for the route
function buildRequest(body: object, ip = '1.2.3.4'): NextRequest {
  return new NextRequest('http://localhost/api/leads/contact', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': ip,
    },
  });
}

describe('POST /api/leads/contact', () => {
  let POST: (req: NextRequest) => Promise<Response>;

  beforeEach(() => {
    jest.resetModules();
    // Reset fetch mock
    global.fetch = jest.fn();
    ({ POST } = require('@/app/api/leads/contact/route'));
  });

  test('returns 200 and proxies successful response for valid data', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true, id: 1 }), { status: 200 })
    );

    const req = buildRequest({
      name: 'Test User',
      email: 'test@example.com',
      phone: '9876543210',
      message: 'I want to build a home',
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  test('forwards non-2xx status from portal API (e.g. 400)', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ success: false, message: 'Bad request' }), { status: 400 })
    );

    const req = buildRequest({ name: '', email: 'bad', phone: '', message: '' });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  test('returns 500 when portal API fetch throws a network error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const req = buildRequest({
      name: 'Test',
      email: 'test@example.com',
      phone: '9876543210',
      message: 'Hello',
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.success).toBe(false);
  });

  test('returns 429 after exceeding rate limit (6th request from same IP)', async () => {
    (global.fetch as jest.Mock).mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    );

    const ip = '99.99.99.99';
    // MAX_REQUESTS is 5; exhaust them
    for (let i = 0; i < 5; i++) {
      await POST(buildRequest({ name: 'T', email: 't@t.com', phone: '1234567890', message: 'm' }, ip));
    }

    const res = await POST(
      buildRequest({ name: 'T', email: 't@t.com', phone: '1234567890', message: 'm' }, ip)
    );
    expect(res.status).toBe(429);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(res.headers.get('X-RateLimit-Remaining')).toBe('0');
  });

  test('includes X-RateLimit-Remaining header on allowed requests', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    );

    const req = buildRequest(
      { name: 'T', email: 't@t.com', phone: '1234567890', message: 'm' },
      '55.55.55.55'
    );
    const res = await POST(req);
    const remaining = res.headers.get('X-RateLimit-Remaining');
    expect(remaining).not.toBeNull();
    expect(Number(remaining)).toBeGreaterThanOrEqual(0);
  });
});
