/**
 * Tests for HomeCostCalculator component.
 *
 * Heavy mocking required: GSAP, chart.js, react-chartjs-2, react-hot-toast, next/head.
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ── Mocks ────────────────────────────────────────────────────────────────────

jest.mock('gsap', () => ({
  fromTo: jest.fn(),
  registerPlugin: jest.fn(),
}));

jest.mock('@gsap/react', () => ({
  useGSAP: (_fn: () => void, _opts?: any) => {},
}));

jest.mock('chart.js', () => ({
  Chart: { register: jest.fn() },
  ArcElement: {},
  Tooltip: {},
  Legend: {},
  register: jest.fn(),
}));

jest.mock('chartjs-plugin-datalabels', () => ({}));

jest.mock('react-chartjs-2', () => ({
  Doughnut: () => <canvas data-testid="doughnut-chart" />,
}));

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
    success: jest.fn(),
  },
  Toaster: () => null,
}));

jest.mock('next/head', () => {
  const MockHead = ({ children }: { children: React.ReactNode }) => <>{children}</>;
  MockHead.displayName = 'MockHead';
  return MockHead;
});

// ── Import after mocks ────────────────────────────────────────────────────────

import HomeCostCalculator from '@/components/Tools/HomeCostCalculator';

// ── Helpers ───────────────────────────────────────────────────────────────────

const MOCK_RATES = [
  { category: 'basic', lowestSqft: 1800, highestSqft: 2200 },
  { category: 'premium', lowestSqft: 2500, highestSqft: 3500 },
  { category: 'luxury', lowestSqft: 4000, highestSqft: 6000 },
];

function mockFetchWithRates() {
  (global.fetch as jest.Mock).mockResolvedValue(
    new Response(JSON.stringify(MOCK_RATES), { status: 200 })
  );
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe('HomeCostCalculator', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the calculator form heading on initial load', async () => {
    mockFetchWithRates();
    render(<HomeCostCalculator />);
    expect(await screen.findByText(/Build Your Dream Home/i)).toBeInTheDocument();
  });

  test('renders district and construction area inputs', async () => {
    mockFetchWithRates();
    render(<HomeCostCalculator />);
    // District select
    expect(await screen.findByLabelText(/district/i)).toBeInTheDocument();
    // Area input
    expect(screen.getByLabelText(/total construction area/i)).toBeInTheDocument();
  });

  test('accepts numeric input for construction area', async () => {
    mockFetchWithRates();
    render(<HomeCostCalculator />);
    await screen.findByText(/Build Your Dream Home/i);

    const areaInput = screen.getByLabelText(/total construction area/i);
    await user.clear(areaInput);
    await user.type(areaInput, '1500');
    expect(areaInput).toHaveValue('1500');
  });

  test('renders unit toggle buttons (Sq. Feet and Sq. Meter)', async () => {
    mockFetchWithRates();
    render(<HomeCostCalculator />);
    await screen.findByText(/Build Your Dream Home/i);

    expect(screen.getByRole('button', { name: /sq\. feet/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sq\. meter/i })).toBeInTheDocument();
  });

  test('renders construction type buttons (Basic, Premium, Luxury)', async () => {
    mockFetchWithRates();
    render(<HomeCostCalculator />);
    await screen.findByText(/Build Your Dream Home/i);

    expect(screen.getByRole('button', { name: /basic/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /premium/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /luxury/i })).toBeInTheDocument();
  });

  test('clicking Calculate Cost advances to the WhatsApp capture step', async () => {
    mockFetchWithRates();
    render(<HomeCostCalculator />);
    await screen.findByText(/Build Your Dream Home/i);

    // Wait for rates to load
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const calcBtn = screen.getByRole('button', { name: /calculate cost/i });
    await user.click(calcBtn);

    expect(await screen.findByText(/One Last Step/i)).toBeInTheDocument();
  });

  test('WhatsApp step shows Get My Estimate button and phone input', async () => {
    mockFetchWithRates();
    render(<HomeCostCalculator />);
    await screen.findByText(/Build Your Dream Home/i);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    await user.click(screen.getByRole('button', { name: /calculate cost/i }));
    await screen.findByText(/One Last Step/i);

    expect(screen.getByRole('button', { name: /get my estimate/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/XXXXXXXXXX/i)).toBeInTheDocument();
  });

  test('shows estimation result after entering WhatsApp number and continuing', async () => {
    // Two fetch calls: one for rates, one for submitting estimate
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce(new Response(JSON.stringify(MOCK_RATES), { status: 200 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ success: true }), { status: 200 })
      );

    render(<HomeCostCalculator />);
    await screen.findByText(/Build Your Dream Home/i);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    await user.click(screen.getByRole('button', { name: /calculate cost/i }));
    await screen.findByText(/One Last Step/i);

    const phoneInput = screen.getByPlaceholderText(/XXXXXXXXXX/i);
    await user.type(phoneInput, '9876543210');
    await user.click(screen.getByRole('button', { name: /get my estimate/i }));

    expect(await screen.findByText(/Estimated Construction Cost/i)).toBeInTheDocument();
  });
});
