/**
 * Tests for the Hero component.
 *
 * Mocks: gsap, @gsap/react, next/image, next/link, animation hooks/components.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('gsap', () => ({
  fromTo: jest.fn(),
  timeline: () => ({ fromTo: jest.fn(), defaults: jest.fn() }),
  registerPlugin: jest.fn(),
}));

jest.mock('@gsap/react', () => ({
  useGSAP: (_fn: () => void, _opts?: any) => {},
}));

jest.mock('@/components/animations/hooks/useParallax', () => ({
  useParallax: jest.fn(),
}));

jest.mock('@/components/animations/MagneticWrapper', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('next/image', () => {
  const MockImage = ({ src, alt, ...rest }: any) => <img src={src} alt={alt} {...rest} />;
  MockImage.displayName = 'MockImage';
  return MockImage;
});

jest.mock('next/link', () => {
  const MockLink = ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

import Hero from '@/components/Home/Hero';

describe('Hero component', () => {
  test('renders the main heading with Kerala reference', () => {
    render(<Hero />);
    expect(
      screen.getByRole('heading', { level: 1, name: /premium custom home builders in kerala/i })
    ).toBeInTheDocument();
  });

  test('renders the "Get in touch" CTA link', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /get in touch/i })).toHaveAttribute(
      'href',
      '/contactus'
    );
  });

  test('renders the "Brochure" CTA link', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /brochure/i })).toHaveAttribute('href', '/brochure');
  });

  test('renders Plan Your Dream feature card', () => {
    render(<Hero />);
    expect(screen.getByText(/Plan Your Dream/i)).toBeInTheDocument();
  });

  test('renders Build on Strength feature card', () => {
    render(<Hero />);
    expect(screen.getByText(/Build on Strength/i)).toBeInTheDocument();
  });
});
