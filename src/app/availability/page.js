import React, { Suspense } from 'react';
import PageShell from '@/components/layout/PageShell';
import AvailabilityView from '@/components/availability/AvailabilityView';

export const metadata = {
  title: 'Check Mobile Tyre Fitting Availability | Mobile Tyre Champions',
  description: 'Enter your postcode to check that you are inside our Surrey, Hampshire and Berkshire mobile tyre fitting service area.',
  robots: { index: false, follow: true },
};

export default function AvailabilityPage() {
  return (
    <PageShell>
      <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
        <AvailabilityView />
      </Suspense>
    </PageShell>
  );
}
