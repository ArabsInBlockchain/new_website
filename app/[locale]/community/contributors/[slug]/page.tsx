import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import {
  getAllContributorSlugs,
  getContributorMeta,
  getContributorEvents,
} from '@/lib/content';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { User, ArrowLeft } from 'lucide-react';
import ContributionTimeline from '@/components/community/ContributionTimeline';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arabsinblockchain.netlify.app';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const slugs = getAllContributorSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const [tCommunity, tContribs] = await Promise.all([
    getTranslations({ locale, namespace: 'community' }),
    getTranslations({ locale, namespace: 'contributors' }),
  ]);

  let name = slug;
  try { name = tContribs(`${slug}.name`); } catch { /* missing translation */ }

  const events = getContributorEvents(slug);
  const roles = [...new Set(events.map((e) => e.role))];
  const roleLabels = roles
    .map((r) =>
      r === 'organizer'
        ? tCommunity('contributors.roles.organizer')
        : tCommunity('contributors.roles.volunteer'),
    )
    .join(' · ');
  const description = `${name} — ${roleLabels} · ${events.length} ${events.length === 1 ? 'event' : 'events'} with Arabs in Blockchain`;

  return {
    title: `${name} — ${tCommunity('contributors.title')}`,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/community/contributors/${slug}`,
      languages: {
        ar: `${SITE_URL}/ar/community/contributors/${slug}`,
        en: `${SITE_URL}/en/community/contributors/${slug}`,
      },
    },
    openGraph: {
      type: 'profile',
      url: `${SITE_URL}/${locale}/community/contributors/${slug}`,
      title: `${name} — Arabs in Blockchain`,
      description,
    },
  };
}

export default async function ContributorProfilePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!getAllContributorSlugs().includes(slug)) notFound();

  const [tCommunity, tContribs, tEventData] = await Promise.all([
    getTranslations({ locale, namespace: 'community' }),
    getTranslations({ locale, namespace: 'contributors' }),
    getTranslations({ locale, namespace: 'events_data' }),
  ]);

  const meta = getContributorMeta(slug);
  const events = getContributorEvents(slug);

  let name = slug;
  let bio = '';
  try { name = tContribs(`${slug}.name`); } catch { /* missing translation */ }
  try { bio = tContribs(`${slug}.bio`); } catch { /* missing translation */ }

  // Build a lookup of event translated titles/locations for the timeline
  const eventTitles: Record<string, { title: string; location: string }> = {};
  for (const { eventMeta } of events) {
    let title = eventMeta.slug;
    let location = '';
    try { title = tEventData(`${eventMeta.slug}.title`); } catch { /* missing */ }
    try { location = tEventData(`${eventMeta.slug}.location`); } catch { /* missing */ }
    eventTitles[eventMeta.slug] = { title, location };
  }

  const roles = [...new Set(events.map((e) => e.role))];
  const activeSince =
    events.length > 0
      ? Math.min(...events.map((e) => new Date(e.eventMeta.date).getFullYear()))
      : null;

  const timelineT = {
    organizer: tCommunity('contributors.roles.organizer'),
    volunteer: tCommunity('contributors.roles.volunteer'),
    viewEvent: tCommunity('contributors.viewEvent'),
  };

  return (
    <main>
      {/* Hero */}
      <div className="theme-always-dark" style={{ background: 'var(--gradient-hero)' }}>
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-8">
          {/* Back link */}
          <Link
            href={`/${locale}/community/contributors`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-brand-teal"
          >
            <ArrowLeft size={16} aria-hidden />
            {tCommunity('contributors.backToContributors')}
          </Link>

          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-start">
            {/* Avatar with gradient ring */}
            <div
              className="shrink-0 rounded-full p-0.5"
              style={{
                background:
                  'linear-gradient(135deg, var(--color-brand-gold), var(--color-brand-teal))',
              }}
            >
              <div
                className="relative h-28 w-28 overflow-hidden rounded-full"
                style={{ backgroundColor: 'var(--color-bg-dark)' }}
              >
                {meta.photo ? (
                  <Image
                    src={meta.photo}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="112px"
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
              <h1
                className="text-3xl font-extrabold"
                style={{ color: 'var(--color-brand-gold)' }}
              >
                {name}
              </h1>
              {bio && (
                <p className="max-w-xl text-sm leading-relaxed text-muted">{bio}</p>
              )}

              {/* Social links */}
              <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                {meta.twitter && (
                  <a
                    href={`https://x.com/${meta.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter / X"
                    className="opacity-60 transition-opacity hover:opacity-100"
                  >
                    <Image src="/icons/x.svg" alt="X / Twitter" width={18} height={18} />
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
                    <Image src="/icons/linkedin.svg" alt="LinkedIn" width={18} height={18} />
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
                    <Image src="/icons/github.svg" alt="GitHub" width={18} height={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div
        className="theme-always-dark px-4 py-5"
        style={{ backgroundColor: 'var(--color-brand-violet)' }}
      >
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-10 md:px-8">
          <div className="text-center">
            <p
              className="text-2xl font-extrabold"
              style={{ color: 'var(--color-brand-teal)' }}
            >
              {events.length}
            </p>
            <p className="text-xs text-white/70">{tCommunity('contributors.contributions')}</p>
          </div>

          {roles.map((role) => (
            <div key={role} className="text-center">
              <p
                className="text-2xl font-extrabold"
                style={{
                  color:
                    role === 'organizer'
                      ? 'var(--color-brand-gold)'
                      : 'var(--color-brand-teal)',
                }}
              >
                {role === 'organizer' ? '★' : '◆'}
              </p>
              <p className="text-xs text-white/70">
                {role === 'organizer'
                  ? tCommunity('contributors.roles.organizer')
                  : tCommunity('contributors.roles.volunteer')}
              </p>
            </div>
          ))}

          {activeSince && (
            <div className="text-center">
              <p
                className="text-2xl font-extrabold"
                style={{ color: 'var(--color-brand-gold)' }}
              >
                {activeSince}
              </p>
              <p className="text-xs text-white/70">
                {tCommunity('contributors.activeSince')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Contribution timeline */}
      <section className="mx-auto max-w-4xl px-4 py-12 md:px-8">
        <h2 className="mb-8 text-xl font-bold text-foreground">
          {tCommunity('contributors.contributions')}
        </h2>
        <ContributionTimeline
          events={events}
          eventTitles={eventTitles}
          locale={locale}
          t={timelineT}
        />
      </section>
    </main>
  );
}
