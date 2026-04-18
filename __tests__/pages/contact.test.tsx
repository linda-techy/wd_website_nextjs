/**
 * Tests for the Contact Us page (form-level).
 * Re-uses the same mocks as the contact-form component test.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('gsap', () => ({ fromTo: jest.fn(), timeline: () => ({ fromTo: jest.fn() }), registerPlugin: jest.fn() }));
jest.mock('@gsap/react', () => ({ useGSAP: () => {} }));
jest.mock('next/image', () => {
  const M = ({ src, alt, ...rest }: any) => <img src={src} alt={alt} {...rest} />;
  M.displayName = 'MockImage';
  return M;
});
jest.mock('next/link', () => {
  const M = ({ href, children, ...rest }: any) => <a href={href} {...rest}>{children}</a>;
  M.displayName = 'MockLink';
  return M;
});
jest.mock('@iconify/react', () => ({ Icon: ({ icon }: any) => <span data-icon={icon} /> }));
jest.mock('@/components/animations/MagneticWrapper', () => ({
  __esModule: true,
  default: ({ children }: any) => <>{children}</>,
}));
jest.mock('@/components/shared/RelatedLinks', () => ({
  __esModule: true,
  default: () => null,
  toolsRelatedLinks: [],
}));
jest.mock('@/components/shared/Breadcrumb', () => ({
  __esModule: true,
  default: () => null,
}));

import ContactPage from '@/app/(site)/contactus/page';

describe('Contact page', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test('renders contact form element', () => {
    render(<ContactPage />);
    expect(document.querySelector('form')).toBeInTheDocument();
  });

  test('contact form has name field', () => {
    render(<ContactPage />);
    expect(screen.getByPlaceholderText(/name\*/i)).toBeInTheDocument();
  });

  test('contact form has email field', () => {
    render(<ContactPage />);
    expect(screen.getByPlaceholderText(/email address\*/i)).toBeInTheDocument();
  });

  test('contact form has phone field', () => {
    render(<ContactPage />);
    expect(screen.getByPlaceholderText(/phone number\*/i)).toBeInTheDocument();
  });

  test('contact form has message textarea', () => {
    render(<ContactPage />);
    expect(screen.getByPlaceholderText(/write here your message/i)).toBeInTheDocument();
  });

  test('submit button is present', () => {
    render(<ContactPage />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  test('displays heading "Have questions? Ready to help!"', () => {
    render(<ContactPage />);
    expect(screen.getByText(/have questions\? ready to help!/i)).toBeInTheDocument();
  });

  test('displays company address', () => {
    render(<ContactPage />);
    expect(screen.getByText(/West fort, Thrissur, Kerala/i)).toBeInTheDocument();
  });
});
