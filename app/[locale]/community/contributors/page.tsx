import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getAllOssContributorSlugs, getPersonMeta } from '@/lib/content';
import OssContributorCard from '@/components/community/OssContributorCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arabsinblockchain.com';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'community' });
  return {
    title: t('contributors.title'),
    description: t('contributors.subtitle'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/community/contributors`,
      languages: {
        ar: `${SITE_URL}/ar/community/contributors`,
        en: `${SITE_URL}/en/community/contributors`,
      },
    },
    openGraph: { type: 'website', url: `${SITE_URL}/${locale}/community/contributors` },
  };
}

export default async function ContributorsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tCommunity, tPeople] = await Promise.all([
    getTranslations({ locale, namespace: 'community' }),
    getTranslations({ locale, namespace: 'contributors' }),
  ]);

  const slugs = getAllOssContributorSlugs();
  const contributors = slugs.map((slug) => {
    const meta = getPersonMeta(slug);
    let name = slug;
    let title = '';
    try { name = tPeople(`${slug}.name`); } catch { /* missing translation */ }
    try { title = tPeople(`${slug}.title`); } catch { /* missing translation */ }
    return { meta, name, title };
  });

  return (
    <main>
      <div
        className="theme-always-dark px-4 py-16 text-center"
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div className="mx-auto max-w-7xl md:px-8">
          <Link
            href={`/${locale}/community`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-brand-teal"
          >
            <ArrowLeft size={16} aria-hidden />
            {tCommunity('contributors.backToAll')}
          </Link>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-teal">
            Arabs in Blockchain
          </p>
          <h1 className="mb-4 text-3xl font-extrabold text-foreground md:text-5xl">
            {tCommunity('contributors.title')}
          </h1>
          <p className="mx-auto max-w-xl text-base text-muted">
            {tCommunity('contributors.subtitle')}
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        {contributors.length === 0 ? (
          <p className="text-center text-muted">{tCommunity('contributors.noContributions')}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {contributors.map(({ meta, name, title }) => (
              <OssContributorCard
                key={meta.slug}
                meta={meta}
                name={name}
                title={title}
                locale={locale}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
