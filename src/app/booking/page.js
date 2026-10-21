import React, { Suspense } from 'react';
import PageShell from '@/components/layout/PageShell';
import BookingView from '@/components/booking/BookingView';

export const metadata = {
  title: 'Book Mobile Tyre Fitting | Mobile Tyre Champions',
  description: 'Request mobile tyre fitting at your home, workplace or roadside in Surrey, Hampshire and Berkshire. We call you to confirm the tyre, price and arrival time.',
  robots: { index: false, follow: true },
};

export default function BookingPage() {
  return (
    <PageShell>
      <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
        <BookingView />
      </Suspense>
    </PageShell>
  );
}
