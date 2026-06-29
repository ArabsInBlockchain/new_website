import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import {
  getEventMeta,
  getAllEventSlugs,
  getPersonMeta,
  avatarUrl,
  type PersonMeta,
} from '@/lib/content';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Monitor,
  Calendar,
  BookOpen,
  ExternalLink,
  User,
} from 'lucide-react';
import EventBadge from '@/components/events/EventBadge';
import { formatDate } from '@/lib/utils';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arabsinblockchain.com';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const slugs = getAllEventSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const [tEvents, tData] = await Promise.all([
    getTranslations({ locale, namespace: 'events' }),
    getTranslations({ locale, namespace: 'events_data' }),
  ]);

  let title = slug;
  let description = '';
  let location = '';
  try { title = tData(`${slug}.title`); } catch { /* missing */ }
  try { description = tData(`${slug}.description`); } catch { /* missing */ }
  try { location = tData(`${slug}.location`); } catch { /* missing */ }

  let meta = null;
  try { meta = getEventMeta(slug); } catch { /* missing */ }

  return {
    title: `${title} — ${tEvents('upcoming.title')}`,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/events/${slug}`,
      languages: {
        ar: `${SITE_URL}/ar/events/${slug}`,
        en: `${SITE_URL}/en/events/${slug}`,
      },
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${locale}/events/${slug}`,
      title: `${title} — Arabs in Blockchain`,
      description,
      images: meta?.banner_image ? [{ url: meta.banner_image }] : [],
    },
  };
}

interface PersonCard {
  slug: string;
  personMeta: PersonMeta | null;
  name: string;
  subtitle?: string;
}

function loadPerson(
  slug: string,
  tPeople: Awaited<ReturnType<typeof getTranslations>>,
  subtitleKey?: string,
): PersonCard {
  let personMeta: PersonMeta | null = null;
  try { personMeta = getPersonMeta(slug); } catch { /* missing */ }
  let name = slug;
  let subtitle = '';
  try { name = tPeople(`${slug}.name`); } catch { /* missing */ }
  if (subtitleKey) {
    try { subtitle = tPeople(`${slug}.${subtitleKey}`); } catch { /* missing */ }
  }
  return { slug, personMeta, name, subtitle };
}

function AvatarCard({
  person,
  profileHref,
}: {
  person: PersonCard;
  profileHref?: string;
}) {
  const avatar = (
    <div
      className="rounded-full p-0.5"
      style={{ background: 'linear-gradient(135deg, var(--color-brand-gold), var(--color-brand-teal))' }}
    >
      <div
        className="relative h-16 w-16 overflow-hidden rounded-full"
        style={{ backgroundColor: 'var(--color-bg-dark)' }}
      >
        {person.personMeta?.photo ? (
          <Image
            src={avatarUrl(person.personMeta.photo, 160)}
            alt={person.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: 'var(--gradient-cta)' }}
          >
            <User size={24} className="text-white/60" aria-hidden />
          </div>
        )}
      </div>
    </div>
  );

  const content = (
    <div className="flex flex-col items-center gap-3 rounded-card p-4 text-center transition-all duration-300"
      style={{
        backgroundColor: 'var(--color-card-bg)',
        border: '1px solid var(--color-card-border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {avatar}
      <div>
        <p className="text-sm font-semibold text-foreground leading-snug">{person.name}</p>
        {person.subtitle && (
          <p className="mt-0.5 text-xs text-muted">{person.subtitle}</p>
        )}
      </div>
    </div>
  );

  if (profileHref) {
    return (
      <Link
        href={profileHref}
        className="block hover:-translate-y-0.5 transition-transform duration-300"
      >
        {content}
      </Link>
    );
  }
  return content;
}

function PeopleSection({
  title,
  people,
  locale,
  profileBasePath,
}: {
  title: string;
  people: PersonCard[];
  locale: string;
  profileBasePath?: string;
}) {
  if (people.length === 0) return null;
  return (
    <section>
      <h2 className="mb-5 text-lg font-bold text-foreground">{title}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {people.map((p) => (
          <AvatarCard
            key={p.slug}
            person={p}
            profileHref={profileBasePath ? `/${locale}/community/${profileBasePath}/${p.slug}` : undefined}
          />
        ))}
      </div>
    </section>
  );
}

export default async function EventDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!getAllEventSlugs().includes(slug)) notFound();

  const meta = getEventMeta(slug);

  const [tEvents, tData, tPeople] = await Promise.all([
    getTranslations({ locale, namespace: 'events' }),
    getTranslations({ locale, namespace: 'events_data' }),
    getTranslations({ locale, namespace: 'contributors' }),
  ]);

  let title = meta.slug;
  let description = '';
  let location = meta.platform ?? '';
  try { title = tData(`${meta.slug}.title`); } catch { /* missing */ }
  try { description = tData(`${meta.slug}.description`); } catch { /* missing */ }
  try { location = tData(`${meta.slug}.location`); } catch { /* missing */ }

  const isUpcoming = meta.status === 'upcoming';
  const dateStr = formatDate(meta.date, locale);

  const typeBadgeLabel =
    meta.type === 'in-person'
      ? tEvents('types.inPerson')
      : meta.type === 'online'
        ? tEvents('types.online')
        : tEvents('types.sideEvent');

  const speakers = meta.speakers.map((s) => loadPerson(s, tPeople, 'title'));
  const organizers = meta.contributors
    .filter((c) => c.role_key === 'organizer')
    .map((c) => loadPerson(c.slug, tPeople));
  const volunteers = meta.contributors
    .filter((c) => c.role_key === 'volunteer')
    .map((c) => loadPerson(c.slug, tPeople));
  const donors = meta.donors.map((d) => loadPerson(d, tPeople));

  const hasPeople =
    speakers.length > 0 ||
    organizers.length > 0 ||
    volunteers.length > 0 ||
    donors.length > 0;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: title,
    description,
    startDate: meta.time ? `${meta.date}T${meta.time}` : meta.date,
    eventStatus: isUpcoming
      ? 'https://schema.org/EventScheduled'
      : 'https://schema.org/EventCompleted',
    eventAttendanceMode:
      meta.type === 'online'
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode',
    location:
      meta.type === 'online'
        ? { '@type': 'VirtualLocation', url: meta.registration_url || SITE_URL }
        : { '@type': 'Place', name: location },
    image: meta.banner_image || undefined,
    url: meta.registration_url || `${SITE_URL}/${locale}/events/${slug}`,
    organizer: {
      '@type': 'Organization',
      name: 'Arabs in Blockchain',
      url: SITE_URL,
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Banner image — visual only */}
      <div className="theme-always-dark relative h-64 w-full md:h-96 lg:h-[440px]">
        {meta.banner_image ? (
          <Image
            src={meta.banner_image}
            alt={title}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
        )}
        {/* Subtle bottom fade so the page background blends in */}
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg-dark))' }}
          aria-hidden
        />
        {/* Back link — overlaid top-start */}
        <div className="absolute start-4 top-4 md:start-8">
          <Link
            href={`/${locale}/events`}
            className="inline-flex items-center gap-2 rounded-btn border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm transition-colors hover:border-brand-teal hover:text-brand-teal"
          >
            <ArrowLeft size={14} aria-hidden />
            {tEvents('detail.backToEvents')}
          </Link>
        </div>
      </div>

      {/* Event info — separate readable section */}
      <div className="mx-auto max-w-4xl px-4 pb-10 pt-6 md:px-8">
        {/* Badges */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <EventBadge type={meta.type} label={typeBadgeLabel} />
          {isUpcoming && (
            <span className="rounded-badge bg-success/15 px-2.5 py-0.5 text-xs font-semibold text-success">
              Upcoming
            </span>
          )}
          {meta.conference && (
            <span
              className="rounded-badge border px-2.5 py-0.5 text-xs"
              style={{ borderColor: 'var(--color-card-border)', color: 'var(--color-text-muted)' }}
            >
              {meta.conference}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="mb-4 text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl leading-tight">
          {title}
        </h1>

        {/* Date + location */}
        <div className="mb-5 flex flex-wrap gap-5 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} aria-hidden />
            {dateStr}
            {meta.time && (
              <span className="ms-1 opacity-70">
                {meta.time} {meta.timezone.split('/')[1]?.replace('_', ' ')}
              </span>
            )}
          </span>
          {location && (
            <span className="flex items-center gap-1.5">
              {meta.type === 'online' ? (
                <Monitor size={14} aria-hidden />
              ) : (
                <MapPin size={14} aria-hidden />
              )}
              {location}
            </span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="mb-7 max-w-2xl text-base leading-relaxed text-muted">
            {description}
          </p>
        )}

        {/* CTAs */}
        <div className="mb-7 flex flex-wrap gap-3">
          {isUpcoming && meta.registration_url && (
            <a
              href={meta.registration_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-btn px-5 py-2.5 text-sm font-semibold text-on-gold transition-opacity hover:opacity-90"
              style={{ background: 'var(--gradient-gold)' }}
            >
              <Calendar size={15} aria-hidden />
              {tEvents('card.register')}
            </a>
          )}
          {isUpcoming && (
            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${meta.date.replace(/-/g, '')}/${meta.date.replace(/-/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-btn border border-foreground/20 px-4 py-2.5 text-sm text-muted transition-colors hover:border-brand-teal hover:text-brand-teal"
            >
              <ExternalLink size={14} aria-hidden />
              {tEvents('card.addToCalendar')}
            </a>
          )}
          {!isUpcoming && meta.recap_url && (
            <a
              href={meta.recap_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-btn border border-foreground/20 px-4 py-2.5 text-sm text-muted transition-colors hover:border-brand-teal hover:text-brand-teal"
            >
              <BookOpen size={14} aria-hidden />
              {tEvents('card.viewRecap')}
            </a>
          )}
        </div>

        {/* Tags */}
        {meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-badge border px-2.5 py-0.5 text-xs text-muted"
                style={{ borderColor: 'var(--color-card-border)' }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* People sections */}
      {hasPeople && (
        <div className="mx-auto max-w-4xl space-y-12 px-4 py-10 md:px-8">
          <PeopleSection
            title={tEvents('detail.speakers')}
            people={speakers}
            locale={locale}
          />
          <PeopleSection
            title={tEvents('detail.organizers')}
            people={organizers}
            locale={locale}
            profileBasePath="volunteers"
          />
          <PeopleSection
            title={tEvents('detail.volunteers')}
            people={volunteers}
            locale={locale}
            profileBasePath="volunteers"
          />
          <PeopleSection
            title={tEvents('detail.donors')}
            people={donors}
            locale={locale}
          />
        </div>
      )}
    </main>
  );
}
