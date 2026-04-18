/**
 * Tests for the /api/partnerships/apply API route.
 *
 * The route proxies directly to PORTAL_API (no rate limiting on apply).
 */

import { NextRequest } from 'next/server';

function buildRequest(body: object): NextRequest {
  return new NextRequest('http://localhost/api/partnerships/apply', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
}

const VALID_PAYLOAD = {
  name: 'Jane Partner',
  email: 'jane@partner.com',
  phone: '9999988888',
  companyName: 'ABC Realty',
  city: 'Thrissur',
};

describe('POST /api/partnerships/apply', () => {
  let POST: (req: NextRequest) => Promise<Response>;

  beforeEach(() => {
    jest.resetModules();
    global.fetch = jest.fn();
    ({ POST } = require('@/app/api/partnerships/apply/route'));
  });

  test('returns 200 and success response for valid application', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true, partnerId: 42 }), { status: 200 })
    );

    const res = await POST(buildRequest(VALID_PAYLOAD));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  test('forwards portal 409 conflict response (duplicate application)', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ success: false, message: 'Application already exists' }), {
        status: 409,
      })
    );

    const res = await POST(buildRequest(VALID_PAYLOAD));
    expect(res.status).toBe(409);
  });

  test('returns 500 when portal fetch throws a network error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Connection refused'));

    const res = await POST(buildRequest(VALID_PAYLOAD));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.success).toBe(false);
  });

  test('proxies request body to portal API unchanged', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    );

    await POST(buildRequest(VALID_PAYLOAD));

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [, options] = (global.fetch as jest.Mock).mock.calls[0];
    const sentBody = JSON.parse(options.body);
    expect(sentBody.email).toBe(VALID_PAYLOAD.email);
    expect(sentBody.companyName).toBe(VALID_PAYLOAD.companyName);
  });
});
