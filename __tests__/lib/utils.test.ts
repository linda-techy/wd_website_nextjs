/**
 * Tests for shared utility functions.
 */

import { cn } from '@/lib/utils';

describe('cn (classnames helper)', () => {
  test('returns a single class unchanged', () => {
    expect(cn('foo')).toBe('foo');
  });

  test('merges multiple classes into a space-separated string', () => {
    expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz');
  });

  test('deduplicates conflicting Tailwind classes (last wins)', () => {
    // tailwind-merge resolves conflicts: px-2 then px-4 → px-4
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  test('ignores falsy values', () => {
    expect(cn('foo', false && 'bar', undefined, null as any, 'baz')).toBe('foo baz');
  });

  test('supports conditional class objects', () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn({ 'text-primary': isActive, 'opacity-50': isDisabled })).toBe('text-primary');
  });
});
