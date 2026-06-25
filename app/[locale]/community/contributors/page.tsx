import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getAllContributorSlugs, getContributorMeta, getContributorEvents } from '@/lib/content';
import ContributorCard from '@/components/community/ContributorCard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arabsinblockchain.netlify.app';

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

  const [tCommunity, tContribs] = await Promise.all([
    getTranslations({ locale, namespace: 'community' }),
    getTranslations({ locale, namespace: 'contributors' }),
  ]);

  const slugs = getAllContributorSlugs();
  const contributors = slugs.map((slug) => {
    const meta = getContributorMeta(slug);
    const events = getContributorEvents(slug);
    let name = slug;
    try { name = tContribs(`${slug}.name`); } catch { /* missing translation */ }
    return { meta, name, events };
  });

  const rolesT = {
    organizer: tCommunity('contributors.roles.organizer'),
    volunteer: tCommunity('contributors.roles.volunteer'),
  };

  return (
    <main>
      {/* Page header */}
      <div
        className="theme-always-dark px-4 py-16 text-center"
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div className="mx-auto max-w-7xl md:px-8">
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

      {/* Contributors grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        {contributors.length === 0 ? (
          <p className="text-center text-muted">{tCommunity('contributors.noContributions')}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {contributors.map(({ meta, name, events }) => (
              <ContributorCard
                key={meta.slug}
                meta={meta}
                name={name}
                events={events}
                locale={locale}
                t={rolesT}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
