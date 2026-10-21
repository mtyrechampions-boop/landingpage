import React from 'react';
import PageShell from '@/components/layout/PageShell';
import ThankYouView from '@/components/thank-you/ThankYouView';

export const metadata = {
  title: 'Booking Request Received | Mobile Tyre Champions',
  description: 'Your mobile tyre fitting request has been received. Our team will call you to confirm availability, price and arrival time.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <PageShell>
      <ThankYouView />
    </PageShell>
  );
}
