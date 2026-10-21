import PageShell from '@/components/layout/PageShell';
import TermsAndConditionsPage from '@/views/TermsAndConditionsPage';

export const metadata = {
  title: 'Terms & Conditions | Mobile Tyre Champions',
  description: 'The terms and conditions for Mobile Tyre Champions mobile tyre fitting services.',
};

export default function Page() {
  return (
    <PageShell>
      <TermsAndConditionsPage />
    </PageShell>
  );
}
