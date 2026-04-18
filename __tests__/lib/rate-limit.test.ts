/**
 * Tests for the in-memory rate limiter utility.
 * Covers: allow under limit, block over limit, reset after window, IP tracking.
 */

// We import via a local copy to reset state between tests via jest module isolation.
// The module uses a module-level Map; we reset it by re-importing with jest.resetModules().

describe('checkRateLimit', () => {
  let checkRateLimit: (ip: string) => { allowed: boolean; remaining: number };

  beforeEach(() => {
    jest.resetModules();
    // Re-import so the module-level Map is fresh for each test
    ({ checkRateLimit } = require('@/lib/rate-limit'));
  });

  test('allows first request and returns remaining count', () => {
    const result = checkRateLimit('1.2.3.4');
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4); // MAX_REQUESTS(5) - 1
  });

  test('allows requests up to MAX_REQUESTS limit', () => {
    const ip = '10.0.0.1';
    for (let i = 0; i < 5; i++) {
      const result = checkRateLimit(ip);
      expect(result.allowed).toBe(true);
    }
  });

  test('blocks the 6th request from the same IP within the window', () => {
    const ip = '10.0.0.2';
    for (let i = 0; i < 5; i++) {
      checkRateLimit(ip);
    }
    const blocked = checkRateLimit(ip);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  test('tracks different IPs independently', () => {
    const ip1 = '192.168.1.1';
    const ip2 = '192.168.1.2';

    // Exhaust ip1
    for (let i = 0; i < 5; i++) checkRateLimit(ip1);
    expect(checkRateLimit(ip1).allowed).toBe(false);

    // ip2 should still be allowed
    expect(checkRateLimit(ip2).allowed).toBe(true);
  });

  test('resets count after window expires', () => {
    const ip = '172.16.0.1';
    jest.useFakeTimers();

    for (let i = 0; i < 5; i++) checkRateLimit(ip);
    expect(checkRateLimit(ip).allowed).toBe(false);

    // Advance time past the 15-minute window
    jest.advanceTimersByTime(15 * 60 * 1000 + 1);

    // Fresh window — should be allowed again
    const result = checkRateLimit(ip);
    expect(result.allowed).toBe(true);

    jest.useRealTimers();
  });
});

describe('getClientIp', () => {
  let getClientIp: (headers: Headers) => string;

  beforeEach(() => {
    jest.resetModules();
    ({ getClientIp } = require('@/lib/rate-limit'));
  });

  test('extracts IP from x-forwarded-for header', () => {
    const headers = new Headers({ 'x-forwarded-for': '1.2.3.4, 5.6.7.8' });
    expect(getClientIp(headers)).toBe('1.2.3.4');
  });

  test('falls back to x-real-ip header', () => {
    const headers = new Headers({ 'x-real-ip': '9.10.11.12' });
    expect(getClientIp(headers)).toBe('9.10.11.12');
  });

  test('returns "unknown" when no IP headers are present', () => {
    const headers = new Headers();
    expect(getClientIp(headers)).toBe('unknown');
  });
});
