/**
 * Tests for the ContactUs form (src/app/(site)/contactus/page.tsx).
 *
 * The component is a "use client" component with GSAP animations. We mock:
 * - gsap / @gsap/react to no-ops
 * - next/image, next/link, @iconify/react
 * - @/components/animations/MagneticWrapper (just renders children)
 * - @/components/shared/RelatedLinks (empty)
 * - @/components/shared/Breadcrumb (empty)
 * - global.fetch
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ── Mocks ────────────────────────────────────────────────────────────────────

jest.mock('gsap', () => ({
  fromTo: jest.fn(),
  timeline: () => ({ fromTo: jest.fn() }),
  registerPlugin: jest.fn(),
}));

jest.mock('@gsap/react', () => ({
  useGSAP: (_fn: () => void) => {}, // no-op
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

jest.mock('@iconify/react', () => ({
  Icon: ({ icon }: { icon: string }) => <span data-icon={icon} />,
}));

jest.mock('@/components/animations/MagneticWrapper', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
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

// ── Import after mocks ────────────────────────────────────────────────────────

import ContactUs from '@/app/(site)/contactus/page';

// ── Tests ────────────────────────────────────────────────────────────────────

describe('ContactUs form', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the contact form', () => {
    render(<ContactUs />);
    // The form element does not have an aria-label so we query the DOM directly
    expect(document.querySelector('form')).toBeInTheDocument();
  });

  test('renders Name, Phone, Email, and Message fields', () => {
    render(<ContactUs />);
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/write here your message/i)).toBeInTheDocument();
  });

  test('renders submit button with "Send message" text', () => {
    render(<ContactUs />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  test('shows inline validation error on blur for invalid email', async () => {
    render(<ContactUs />);
    const emailInput = screen.getByPlaceholderText(/email address/i);
    await user.type(emailInput, 'notanemail');
    await user.tab(); // trigger onBlur
    expect(await screen.findByText(/enter a valid email address/i)).toBeInTheDocument();
  });

  test('shows inline validation error on blur for invalid phone', async () => {
    render(<ContactUs />);
    const phoneInput = screen.getByPlaceholderText(/phone number/i);
    await user.type(phoneInput, '123'); // too short
    await user.tab();
    expect(await screen.findByText(/enter a valid phone number/i)).toBeInTheDocument();
  });

  test('submit button is disabled and shows Submitting... during in-flight request', async () => {
    // Delay the fetch response so we can catch the submitting state
    (global.fetch as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(new Response(JSON.stringify({ success: true }), { status: 200 })), 500))
    );

    render(<ContactUs />);

    await user.type(screen.getByPlaceholderText(/name/i), 'Alice');
    await user.type(screen.getByPlaceholderText(/phone number/i), '9876543210');
    await user.type(screen.getByPlaceholderText(/email address/i), 'alice@test.com');
    await user.type(screen.getByPlaceholderText(/write here your message/i), 'Hello there');

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    await user.click(submitBtn);

    // Should show Submitting... while pending
    expect(screen.getByText(/submitting/i)).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });

  test('shows success message after successful submission', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    );

    render(<ContactUs />);

    await user.type(screen.getByPlaceholderText(/name/i), 'Bob');
    await user.type(screen.getByPlaceholderText(/phone number/i), '9876543210');
    await user.type(screen.getByPlaceholderText(/email address/i), 'bob@test.com');
    await user.type(screen.getByPlaceholderText(/write here your message/i), 'Test message');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(
      await screen.findByText(/thank you.*inquiry has been submitted/i)
    ).toBeInTheDocument();
  });

  test('shows error message when submission fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ success: false, message: 'Server error' }), { status: 500 })
    );

    render(<ContactUs />);

    await user.type(screen.getByPlaceholderText(/name/i), 'Charlie');
    await user.type(screen.getByPlaceholderText(/phone number/i), '9876543210');
    await user.type(screen.getByPlaceholderText(/email address/i), 'charlie@test.com');
    await user.type(screen.getByPlaceholderText(/write here your message/i), 'Message');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.queryByText(/submitting/i)).not.toBeInTheDocument();
    });
    // Error state should be shown
    expect(document.querySelector('[class*="red"]') || screen.queryByText(/failed/i)).toBeTruthy();
  });

  test('renders company contact information', () => {
    render(<ContactUs />);
    expect(screen.getByText(/West fort, Thrissur, Kerala/i)).toBeInTheDocument();
  });

  test('renders company email link', () => {
    render(<ContactUs />);
    expect(screen.getByText(/info@walldotbuilders\.com/i)).toBeInTheDocument();
  });
});
