import PageShell from '@/components/layout/PageShell';
import PrivacyPolicyPage from '@/views/PrivacyPolicyPage';

export const metadata = {
  title: 'Privacy Policy | Mobile Tyre Champions',
  description: 'How Mobile Tyre Champions collects, uses and protects your personal information.',
};

export default function Page() {
  return (
    <PageShell>
      <PrivacyPolicyPage />
    </PageShell>
  );
}
