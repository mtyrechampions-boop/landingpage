import PageShell from '@/components/layout/PageShell';
import CookiePolicyPage from '@/views/CookiePolicyPage';

export const metadata = {
  title: 'Cookie Policy | Mobile Tyre Champions',
  description: 'How Mobile Tyre Champions uses cookies and how to manage your preferences.',
};

export default function Page() {
  return (
    <PageShell>
      <CookiePolicyPage />
    </PageShell>
  );
}
