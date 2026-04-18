/**
 * Tests for the About Us page component.
 *
 * Mocks all child components to isolate page-level structure tests.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock heavy/SSR-dependent child components
jest.mock('@/components/shared/HeroSub', () => ({
  __esModule: true,
  default: ({ title, description, badge }: { title: string; description: string; badge: string }) => (
    <div data-testid="hero-sub">
      <h1>{title}</h1>
      <p>{description}</p>
      <span>{badge}</span>
    </div>
  ),
}));

jest.mock('@/components/Aboutus', () => ({
  __esModule: true,
  default: () => <div data-testid="aboutus-content">About Us Content</div>,
}));

jest.mock('@/components/shared/Breadcrumb', () => ({
  __esModule: true,
  default: ({ items }: { items: Array<{ label: string }> }) => (
    <nav aria-label="Breadcrumb">
      <span>{items.map((i) => i.label).join(' / ')}</span>
    </nav>
  ),
}));

jest.mock('@/components/shared/RelatedLinks', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <section>{title}</section>,
  servicesRelatedLinks: [],
}));

import AboutPage from '@/app/(site)/aboutus/page';

describe('About Us page', () => {
  test('renders the HeroSub with correct title', () => {
    render(<AboutPage />);
    expect(screen.getByText(/Welcome to Walldot Builders/i)).toBeInTheDocument();
  });

  test('renders the About Us badge', () => {
    render(<AboutPage />);
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
  });

  test('renders the breadcrumb navigation', () => {
    render(<AboutPage />);
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
  });

  test('renders the main AboutUs content section', () => {
    render(<AboutPage />);
    expect(screen.getByTestId('aboutus-content')).toBeInTheDocument();
  });

  test('renders related links section', () => {
    render(<AboutPage />);
    expect(screen.getByText(/Our Construction Services/i)).toBeInTheDocument();
  });
});
