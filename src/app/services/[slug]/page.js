import { notFound } from 'next/navigation';
import PageShell from '@/components/layout/PageShell';
import ServicePageView from '@/components/services/ServicePageView';
import { SERVICE_PAGES, getServicePage } from '@/data/servicePages';

// Only the five known services exist; anything else is a 404.
export const dynamicParams = false;

export const generateStaticParams = () => SERVICE_PAGES.map((page) => ({ slug: page.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    // Held back from search until it is decided how these pages relate to the main site's own
    // /services pages, so the two sites do not compete for the same queries.
    robots: { index: false, follow: true },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  return (
    <PageShell>
      <ServicePageView page={page} />
    </PageShell>
  );
}
