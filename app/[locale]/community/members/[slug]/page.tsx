import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import {
  getAllPeopleSlugs,
  getPersonMeta,
  getSpeakerEventMetas,
  getVolunteerEvents,
  getDonorEventMetas,
  avatarUrl,
  type EventMeta,
} from '@/lib/content';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, ExternalLink, User, GitBranch } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arabsinblockchain.com';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const slugs = getAllPeopleSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const [tProfile, tPeople] = await Promise.all([
    getTranslations({ locale, namespace: 'community' }),
    getTranslations({ locale, namespace: 'contributors' }),
  ]);

  let name = slug;
  let title = '';
  try { name = tPeople(`${slug}.name`); } catch { /* missing */ }
  try { title = tPeople(`${slug}.title`); } catch { /* missing */ }

  const description = title
    ? `${name} — ${title} · Arabs in Blockchain`
    : `${name} · Arabs in Blockchain`;

  return {
    title: `${name} — ${tProfile('people.title')}`,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/community/members/${slug}`,
      languages: {
        ar: `${SITE_URL}/ar/community/members/${slug}`,
        en: `${SITE_URL}/en/community/members/${slug}`,
      },
    },
    openGraph: {
      type: 'profile',
      url: `${SITE_URL}/${locale}/community/members/${slug}`,
      title: `${name} — Arabs in Blockchain`,
      description,
    },
  };
}

interface EventRowProps {
  event: EventMeta;
  badge: string;
  accentColor: string;
  locale: string;
  eventTitle: string;
  eventLocation: string;
  viewEventLabel: string;
}

function EventRow({ event, badge, accentColor, locale, eventTitle, eventLocation, viewEventLabel }: EventRowProps) {
  return (
    <li
      className="flex items-stretch gap-4 overflow-hidden rounded-card"
      style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}
    >
      <div className="w-1 shrink-0" style={{ backgroundColor: accentColor }} aria-hidden />
      <div className="flex flex-1 flex-col gap-1.5 py-3 pe-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <p className="text-sm font-semibold text-foreground leading-snug">{eventTitle}</p>
          <span
            className="shrink-0 rounded-badge px-2.5 py-0.5 text-xs font-semibold"
            style={{
              backgroundColor: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
              color: accentColor,
            }}
          >
            {badge}
          </span>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Calendar size={11} aria-hidden />
            {formatDate(event.date, locale)}
          </span>
          {eventLocation && (
            <span className="flex items-center gap-1">
              <MapPin size={11} aria-hidden />
              {eventLocation}
            </span>
          )}
        </div>
      </div>
      <Link
        href={`/${locale}/events/${event.slug}`}
        className="flex shrink-0 items-center pe-4 text-muted transition-colors hover:text-brand-teal"
        aria-label={viewEventLabel}
      >
        <ExternalLink size={15} aria-hidden />
      </Link>
    </li>
  );
}

function ActivitySection({
  title,
  subtitle,
  accentColor,
  children,
}: {
  title: string;
  subtitle: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-5 flex items-start gap-3">
        <div className="mt-1 h-8 w-1 shrink-0 rounded-full" style={{ backgroundColor: accentColor }} aria-hidden />
        <div>
          <h2 className="text-xl font-extrabold text-foreground">{title}</h2>
          <p className="mt-0.5 text-sm text-muted">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

export default async function MemberProfilePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!getAllPeopleSlugs().includes(slug)) notFound();

  const [tProfile, tPeople, tEventData] = await Promise.all([
    getTranslations({ locale, namespace: 'community' }),
    getTranslations({ locale, namespace: 'contributors' }),
    getTranslations({ locale, namespace: 'events_data' }),
  ]);

  const meta = getPersonMeta(slug);

  let name = slug;
  let title = '';
  let bio = '';
  try { name = tPeople(`${slug}.name`); } catch { /* missing */ }
  try { title = tPeople(`${slug}.title`); } catch { /* missing */ }
  try { bio = tPeople(`${slug}.bio`); } catch { /* missing */ }

  const speaking = getSpeakerEventMetas(slug);
  const contributions = getVolunteerEvents(slug);
  const organizing = contributions.filter((c) => c.role === 'organizer').map((c) => c.eventMeta);
  const volunteering = contributions.filter((c) => c.role === 'volunteer').map((c) => c.eventMeta);
  const donations = getDonorEventMetas(slug);

  function eventInfo(event: EventMeta) {
    let eventTitle = event.slug;
    let eventLocation = '';
    try { eventTitle = tEventData(`${event.slug}.title`); } catch { /* missing */ }
    try { eventLocation = tEventData(`${event.slug}.location`); } catch { /* missing */ }
    return { eventTitle, eventLocation };
  }

  const viewEventLabel = tProfile('profile.viewEvent');
  const hasSections =
    speaking.length > 0 ||
    organizing.length > 0 ||
    volunteering.length > 0 ||
    meta.is_oss_contributor ||
    donations.length > 0;

  const totalEvents = new Set([
    ...speaking.map((e) => e.slug),
    ...organizing.map((e) => e.slug),
    ...volunteering.map((e) => e.slug),
  ]).size;

  return (
    <main>
      {/* Hero */}
      <div className="theme-always-dark" style={{ background: 'var(--gradient-hero)' }}>
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-8">
          <Link
            href={`/${locale}/community`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-brand-teal"
          >
            <ArrowLeft size={16} aria-hidden />
            {tProfile('profile.backToAll')}
          </Link>

          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-start">
            {/* Avatar */}
            <div
              className="shrink-0 rounded-full p-0.5"
              style={{ background: 'linear-gradient(135deg, var(--color-brand-gold), var(--color-brand-teal))' }}
            >
              <div
                className="relative h-28 w-28 overflow-hidden rounded-full"
                style={{ backgroundColor: 'var(--color-bg-dark)' }}
              >
                {meta.photo ? (
                  <Image
                    src={avatarUrl(meta.photo, 400)}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="112px"
                    priority
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center"
                    style={{ background: 'var(--gradient-cta)' }}
                  >
                    <User size={40} className="text-white/60" aria-hidden />
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-extrabold" style={{ color: 'var(--color-brand-gold)' }}>
                {name}
              </h1>
              {title && (
                <p className="text-sm font-medium" style={{ color: 'var(--color-brand-teal)' }}>
                  {title}
                </p>
              )}
              {bio && (
                <p className="max-w-xl text-sm leading-relaxed text-muted">{bio}</p>
              )}

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                {meta.is_oss_contributor && (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-badge px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--color-brand-teal) 15%, transparent)',
                      color: 'var(--color-brand-teal)',
                    }}
                  >
                    <GitBranch size={11} aria-hidden />
                    {tProfile('profile.openSource')}
                  </span>
                )}
                {meta.is_donor && (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-badge px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: 'color-mix(in srgb, #F43F5E 15%, transparent)',
                      color: '#F43F5E',
                    }}
                  >
                    ♥ {tProfile('donors.badge')}
                  </span>
                )}
              </div>

              {/* Social links */}
              <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                {meta.twitter && (
                  <a
                    href={`https://x.com/${meta.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X / Twitter"
                    className="opacity-60 transition-opacity hover:opacity-100"
                  >
                    <Image src="/icons/x.svg" alt="X / Twitter" width={18} height={18} className="invert" />
                  </a>
                )}
                {meta.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${meta.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="opacity-60 transition-opacity hover:opacity-100"
                  >
                    <Image src="/icons/linkedin.svg" alt="LinkedIn" width={18} height={18} className="invert" />
                  </a>
                )}
                {meta.github && (
                  <a
                    href={`https://github.com/${meta.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="opacity-60 transition-opacity hover:opacity-100"
                  >
                    <Image src="/icons/github.svg" alt="GitHub" width={18} height={18} className="invert" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      {(totalEvents > 0 || meta.is_oss_contributor) && (
        <div className="theme-always-dark px-4 py-5" style={{ backgroundColor: 'var(--color-brand-violet)' }}>
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-10 md:px-8">
            {speaking.length > 0 && (
              <div className="text-center">
                <p className="text-2xl font-extrabold" style={{ color: 'var(--color-brand-gold)' }}>
                  {speaking.length}
                </p>
                <p className="text-xs text-white/80">
                  {speaking.length === 1 ? tProfile('profile.talk') : tProfile('profile.talks')}
                </p>
              </div>
            )}
            {organizing.length > 0 && (
              <div className="text-center">
                <p className="text-2xl font-extrabold" style={{ color: 'var(--color-brand-gold)' }}>
                  {organizing.length}
                </p>
                <p className="text-xs text-white/80">{tProfile('profile.organized')}</p>
              </div>
            )}
            {volunteering.length > 0 && (
              <div className="text-center">
                <p className="text-2xl font-extrabold" style={{ color: 'var(--color-brand-gold)' }}>
                  {volunteering.length}
                </p>
                <p className="text-xs text-white/80">{tProfile('profile.volunteered')}</p>
              </div>
            )}
            {donations.length > 0 && (
              <div className="text-center">
                <p className="text-2xl font-extrabold" style={{ color: 'var(--color-brand-gold)' }}>
                  {donations.length}
                </p>
                <p className="text-xs text-white/80">{tProfile('profile.supported')}</p>
              </div>
            )}
            {meta.is_oss_contributor && (
              <div className="text-center">
                <p className="text-2xl font-extrabold" style={{ color: 'var(--color-brand-teal)' }}>
                  <GitBranch size={28} className="mx-auto" aria-hidden />
                </p>
                <p className="text-xs text-white/80">{tProfile('profile.openSource')}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Activity sections */}
      {hasSections && (
        <div className="mx-auto max-w-4xl space-y-14 px-4 py-14 md:px-8">
          {/* Speaking */}
          {speaking.length > 0 && (
            <ActivitySection
              title={tProfile('profile.speaking')}
              subtitle={tProfile('profile.speakingSubtitle')}
              accentColor="var(--color-brand-teal)"
            >
              <ol className="space-y-3">
                {speaking.map((event) => {
                  const { eventTitle, eventLocation } = eventInfo(event);
                  return (
                    <EventRow
                      key={event.slug}
                      event={event}
                      badge={tProfile('profile.speaking')}
                      accentColor="var(--color-brand-teal)"
                      locale={locale}
                      eventTitle={eventTitle}
                      eventLocation={eventLocation}
                      viewEventLabel={viewEventLabel}
                    />
                  );
                })}
              </ol>
            </ActivitySection>
          )}

          {/* Organizing */}
          {organizing.length > 0 && (
            <ActivitySection
              title={tProfile('profile.organizing')}
              subtitle={tProfile('profile.organizingSubtitle')}
              accentColor="var(--color-brand-gold)"
            >
              <ol className="space-y-3">
                {organizing.map((event) => {
                  const { eventTitle, eventLocation } = eventInfo(event);
                  return (
                    <EventRow
                      key={event.slug}
                      event={event}
                      badge={tProfile('contributors.roles.organizer')}
                      accentColor="var(--color-brand-gold)"
                      locale={locale}
                      eventTitle={eventTitle}
                      eventLocation={eventLocation}
                      viewEventLabel={viewEventLabel}
                    />
                  );
                })}
              </ol>
            </ActivitySection>
          )}

          {/* Volunteering */}
          {volunteering.length > 0 && (
            <ActivitySection
              title={tProfile('profile.volunteering')}
              subtitle={tProfile('profile.volunteeringSubtitle')}
              accentColor="var(--color-brand-violet)"
            >
              <ol className="space-y-3">
                {volunteering.map((event) => {
                  const { eventTitle, eventLocation } = eventInfo(event);
                  return (
                    <EventRow
                      key={event.slug}
                      event={event}
                      badge={tProfile('contributors.roles.volunteer')}
                      accentColor="var(--color-brand-violet)"
                      locale={locale}
                      eventTitle={eventTitle}
                      eventLocation={eventLocation}
                      viewEventLabel={viewEventLabel}
                    />
                  );
                })}
              </ol>
            </ActivitySection>
          )}

          {/* Open Source */}
          {meta.is_oss_contributor && (
            <ActivitySection
              title={tProfile('profile.openSource')}
              subtitle={tProfile('profile.openSourceSubtitle')}
              accentColor="var(--color-brand-teal)"
            >
              {meta.github && (
                <a
                  href={`https://github.com/search?q=org%3AArabsInBlockchain+author%3A${meta.github}&type=pullrequests`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-btn border border-brand-teal/40 px-4 py-2.5 text-sm text-brand-teal transition-colors hover:bg-brand-teal/10"
                >
                  <GitBranch size={15} aria-hidden />
                  {tProfile('profile.openSourceCta')}
                  <ExternalLink size={13} aria-hidden />
                </a>
              )}
            </ActivitySection>
          )}

          {/* Supporting */}
          {donations.length > 0 && (
            <ActivitySection
              title={tProfile('profile.supporting')}
              subtitle={tProfile('profile.supportingSubtitle')}
              accentColor="#F43F5E"
            >
              <ol className="space-y-3">
                {donations.map((event) => {
                  const { eventTitle, eventLocation } = eventInfo(event);
                  return (
                    <EventRow
                      key={event.slug}
                      event={event}
                      badge={tProfile('donors.badge')}
                      accentColor="#F43F5E"
                      locale={locale}
                      eventTitle={eventTitle}
                      eventLocation={eventLocation}
                      viewEventLabel={viewEventLabel}
                    />
                  );
                })}
              </ol>
            </ActivitySection>
          )}
        </div>
      )}
    </main>
  );
}
