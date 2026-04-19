/** Shared test configuration for E2E tests */
export const config = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  portalApiUrl: process.env.PORTAL_API_URL || 'http://localhost:8080',
  /** Timeout for page navigations */
  navigationTimeout: 30_000,
  /** Timeout for individual assertions */
  assertionTimeout: 10_000,
  /** Test partnership credentials */
  partnerCredentials: {
    email: 'partner@test.com',
    password: 'password123',
  },
};
