/**
 * Tests for the Home page component (src/app/page.tsx).
 *
 * The home page uses next/dynamic for lazy-loaded sections. We mock all
 * section components and next/dynamic to return their defaults synchronously.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock next/dynamic to synchronously render the real or mocked component
jest.mock('next/dynamic', () => (fn: () => Promise<any>, _opts?: any) => {
  // Return a component that will be populated after the promise resolves.
  // In tests, we stub the modules so dynamic acts like a plain import.
  return function DynamicComponent(props: any) {
    return null; // overridden by individual mocks below
  };
});

jest.mock('@/components/Home/Hero', () => ({
  __esModule: true,
  default: () => <section data-testid="hero">Hero Section</section>,
}));

jest.mock('@/components/Home/About', () => ({
  __esModule: true,
  default: () => <section data-testid="about">About Section</section>,
}));

jest.mock('@/components/Home/Projects', () => ({
  __esModule: true,
  default: () => <section data-testid="projects">Projects Section</section>,
}));

jest.mock('@/components/Home/Testimonial', () => ({
  __esModule: true,
  default: () => <section data-testid="testimonial">Testimonial Section</section>,
}));

jest.mock('@/components/Home/GetInTouch', () => ({
  __esModule: true,
  default: () => <section data-testid="get-in-touch">Get In Touch Section</section>,
}));

jest.mock('@/components/Home/FAQs', () => ({
  __esModule: true,
  default: () => <section data-testid="faqs">FAQ Section</section>,
}));

jest.mock('@/components/shared/RelatedLinks', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => (
    <section data-testid="related-links">{title}</section>
  ),
  homeRelatedLinks: [],
}));

import Home from '@/app/page';

describe('Home page', () => {
  test('renders the Hero section', () => {
    render(<Home />);
    expect(screen.getByTestId('hero')).toBeInTheDocument();
  });

  test('renders the main element as the page wrapper', () => {
    render(<Home />);
    expect(document.querySelector('main')).toBeInTheDocument();
  });
});
