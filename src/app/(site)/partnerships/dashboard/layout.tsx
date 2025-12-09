import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner Dashboard | Walldot Builders',
  description: 'Manage your partnership with Walldot Builders. View referral status, track commissions, and submit new referrals.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PartnershipDashboardLayout({
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

