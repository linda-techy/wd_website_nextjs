/**
 * Tests for the validateEmail utility.
 */

import { validateEmail } from '@/components/utils/validateEmail';

describe('validateEmail', () => {
  test('returns a match object for a valid email', () => {
    expect(validateEmail('test@example.com')).not.toBeNull();
  });

  test('returns a match for subdomain email', () => {
    expect(validateEmail('user@mail.domain.co.in')).not.toBeNull();
  });

  test('returns null for an email without @', () => {
    expect(validateEmail('invalidemail.com')).toBeNull();
  });

  test('returns null for an email without domain', () => {
    expect(validateEmail('user@')).toBeNull();
  });

  test('returns null for an empty string', () => {
    expect(validateEmail('')).toBeNull();
  });

  test('returns null for an email with spaces', () => {
    expect(validateEmail('user name@example.com')).toBeNull();
  });

  test('is case-insensitive (lowercases before matching)', () => {
    expect(validateEmail('USER@EXAMPLE.COM')).not.toBeNull();
  });
});
