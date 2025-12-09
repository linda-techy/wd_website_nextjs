import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner Login | Walldot Builders',
  description: 'Login to your Walldot Builders partner dashboard. Track referrals, view commissions, and manage your partnership account.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PartnershipLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}

