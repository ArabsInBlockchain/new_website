import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getUpcomingEvents, getPastEvents } from '@/lib/events';
import EventsClient from '@/components/events/EventsClient';
import type { EventDisplay } from '@/components/events/EventCard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arabsinblockchain.com';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'events' });

  return {
    title: t('upcoming.title'),
    description: t('upcoming.subtitle'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/events`,
      languages: {
        ar: `${SITE_URL}/ar/events`,
        en: `${SITE_URL}/en/events`,
      },
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${locale}/events`,
    },
  };
}

function badgeLabel(type: EventDisplay['type'], t: Awaited<ReturnType<typeof getTranslations>>) {
  if (type === 'in-person') return t('types.inPerson');
  if (type === 'online') return t('types.online');
  return t('types.sideEvent');
}

function buildEventsJsonLd(upcoming: EventDisplay[], siteUrl: string) {
  if (upcoming.length === 0) return null;
  return upcoming.map((event) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.time ? `${event.date}T${event.time}` : event.date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode:
      event.type === 'online'
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode',
    location:
      event.type === 'online'
        ? { '@type': 'VirtualLocation', url: event.registration_url || siteUrl }
        : { '@type': 'Place', name: event.location },
    image: event.banner_image || undefined,
    url: event.registration_url || `${siteUrl}/en/events`,
    organizer: {
      '@type': 'Organization',
      name: 'Arabs in Blockchain',
      url: siteUrl,
    },
  }));
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tEvents, tData] = await Promise.all([
    getTranslations({ locale, namespace: 'events' }),
    getTranslations({ locale, namespace: 'events_data' }),
  ]);

  function toDisplay(slugs: ReturnType<typeof getUpcomingEvents>): EventDisplay[] {
    return slugs.map((meta) => {
      let title = meta.slug;
      let description = '';
      let location = meta.platform ?? '';
      try {
        title = tData(`${meta.slug}.title`);
        description = tData(`${meta.slug}.description`);
        location = tData(`${meta.slug}.location`);
      } catch { /* missing translation — keep defaults */ }

      return {
        ...meta,
        title,
        description,
        location,
        typeBadgeLabel: badgeLabel(meta.type, tEvents),
      };
    });
  }

  const upcoming = toDisplay(getUpcomingEvents());
  const past = toDisplay(getPastEvents());
  const eventsJsonLd = buildEventsJsonLd(upcoming, SITE_URL);

  return (
    <main>
      {eventsJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
        />
      )}

      {/* Page header */}
      <div
        className="theme-always-dark px-4 py-16 text-center"
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div className="mx-auto max-w-7xl md:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-teal">
            {upcoming.length > 0
              ? `${upcoming.length} ${tEvents('upcoming.title').toLowerCase()}`
              : tEvents('past.subtitle')}
          </p>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            {tEvents('upcoming.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted">
            {tEvents('upcoming.subtitle')}
          </p>
        </div>
      </div>

      <EventsClient upcoming={upcoming} past={past} locale={locale} />
    </main>
  );
}
