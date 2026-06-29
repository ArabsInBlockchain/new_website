import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getAllVolunteerSlugs, getPersonMeta, getVolunteerEvents } from '@/lib/content';
import ContributorCard from '@/components/community/ContributorCard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arabsinblockchain.com';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'community' });
  return {
    title: t('volunteers.title'),
    description: t('volunteers.subtitle'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/community/volunteers`,
      languages: {
        ar: `${SITE_URL}/ar/community/volunteers`,
        en: `${SITE_URL}/en/community/volunteers`,
      },
    },
    openGraph: { type: 'website', url: `${SITE_URL}/${locale}/community/volunteers` },
  };
}

export default async function VolunteersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tCommunity, tPeople] = await Promise.all([
    getTranslations({ locale, namespace: 'community' }),
    getTranslations({ locale, namespace: 'contributors' }),
  ]);

  const slugs = getAllVolunteerSlugs();
  const volunteers = slugs
    .map((slug) => {
      const meta = getPersonMeta(slug);
      const events = getVolunteerEvents(slug);
      let name = slug;
      try { name = tPeople(`${slug}.name`); } catch { /* missing translation */ }
      return { meta, name, events };
    })
    .sort((a, b) => b.events.length - a.events.length);

  const rolesT = {
    organizer: tCommunity('contributors.roles.organizer'),
    volunteer: tCommunity('contributors.roles.volunteer'),
  };

  return (
    <main>
      <div
        className="theme-always-dark px-4 py-16 text-center"
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div className="mx-auto max-w-7xl md:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-teal">
            Arabs in Blockchain
          </p>
          <h1 className="mb-4 text-3xl font-extrabold text-foreground md:text-5xl">
            {tCommunity('volunteers.title')}
          </h1>
          <p className="mx-auto max-w-xl text-base text-muted">
            {tCommunity('volunteers.subtitle')}
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        {volunteers.length === 0 ? (
          <p className="text-center text-muted">{tCommunity('volunteers.noMembers')}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {volunteers.map(({ meta, name, events }) => (
              <ContributorCard
                key={meta.slug}
                meta={meta}
                name={name}
                events={events}
                locale={locale}
                profileBasePath="volunteers"
                t={rolesT}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
