import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // Only find tests in our __tests__ folder (not node_modules)
  testMatch: ['<rootDir>/__tests__/**/*.test.{ts,tsx}'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  // pact-js (16.x) pulls in pure-ESM transitive deps that Jest's default
  // transformer skips; whitelist them so SWC transpiles them to CJS.
  transformIgnorePatterns: [
    '/node_modules/(?!(@pact-foundation|https-proxy-agent|agent-base|debug)/)',
    '/.next/',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/globals.css',
    '!src/types/**',
  ],
};

export default createJestConfig(config);
