/**
 * Tests for the shared Breadcrumb component.
 *
 * Mocks: @iconify/react (Icon), next/link (Link).
 */

import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock Icon so we don't need the full icon registry in test environment
jest.mock('@iconify/react', () => ({
  Icon: ({ icon }: { icon: string }) => <span data-testid="icon" aria-label={icon} />,
}));

// Mock next/link so it renders a plain <a>
jest.mock('next/link', () => {
  const MockLink = ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

import Breadcrumb from '@/components/shared/Breadcrumb';

describe('Breadcrumb', () => {
  test('always renders a Home link', () => {
    render(<Breadcrumb items={[{ label: 'About Us' }]} />);
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });

  test('renders the provided item label as the current page (non-link)', () => {
    render(<Breadcrumb items={[{ label: 'Contact Us' }]} />);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  test('renders intermediate items as links when href is provided', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Properties', href: '/properties' },
          { label: 'Luxury Villa' },
        ]}
      />
    );
    expect(screen.getByRole('link', { name: /properties/i })).toHaveAttribute(
      'href',
      '/properties'
    );
    // Last item (current page) should not be a link
    expect(screen.getByText('Luxury Villa').tagName).not.toBe('A');
  });

  test('renders breadcrumb nav with aria-label', () => {
    render(<Breadcrumb items={[{ label: 'Blogs' }]} />);
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
  });
});
