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
  try { title = tData(`${slug}.title`); } catch { /* missing */ }
  try { description = tData(`${slug}.description`); } catch { /* missing */ }

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
            src={avatarUrl(person.personMeta.photo, 160, person.personMeta.photo_gravity)}
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
    <div className="flex h-full flex-col items-center gap-3 rounded-card p-4 text-center transition-all duration-300"
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
          <p className="mt-0.5 text-xs text-foreground/65">{person.subtitle}</p>
        )}
      </div>
    </div>
  );

  if (profileHref) {
    return (
      <Link
        href={profileHref}
        className="block h-full hover:-translate-y-0.5 transition-transform duration-300"
      >
        {content}
      </Link>
    );
  }
  return content;
}

function CtfAuthorsSection({
  title,
  subtitle,
  groups,
  locale,
}: {
  title: string;
  subtitle: string;
  groups: Array<{ trackLabel: string; people: PersonCard[] }>;
  locale: string;
}) {
  if (groups.length === 0) return null;

  const [centerGroup, ...sideGroups] = groups;
  const n = centerGroup.people.length;

  // Center hex: cx=400 cy=250 R=165  (sin60·R=142.9  R/2=82.5)
  const CH = { cx: 400, cy: 250, R: 165, s60: 142.9, h: 82.5 };
  // Side hexes: cx=205/595  cy=520  R=100  (sin60·R=86.6  R/2=50)
  const SH = { R: 100, s60: 86.6, h: 50 };
  const sideHex = [
    { cx: 205, cy: 520 },
    { cx: 595, cy: 520 },
  ] as const;

  // Spread avatars inside center hex (flat zone: y 167.5–332.5, width 285.8px)
  const avatarGap = n > 1 ? Math.min(60, 240 / (n - 1)) : 0;
  const avatarXs = centerGroup.people.map((_, i) =>
    n === 1 ? CH.cx : CH.cx - ((n - 1) / 2) * avatarGap + i * avatarGap,
  );
  const CA_R = 22;   // center-hex avatar radius
  const CA_Y = 265;  // avatar y-centre inside center hex

  const SIDE_R = 28; // side-hex avatar radius
  const SIDE_AY = 505; // side avatar y-centre

  const centerWords = centerGroup.trackLabel.toUpperCase().split(' ');

  return (
    <section>
      <div className="mb-6 flex items-start gap-3">
        <div
          className="mt-1 h-8 w-1 shrink-0 rounded-full"
          style={{ backgroundColor: 'var(--color-cat-ctf)' }}
          aria-hidden
        />
        <div>
          <h2 className="text-xl font-extrabold text-foreground">{title}</h2>
          {/* +15% brightness vs text-foreground/80 */}
          <p className="mt-0.5 text-sm text-foreground/90">{subtitle}</p>
        </div>
      </div>

      {/* Panel */}
      <div
        className="relative overflow-hidden rounded-card px-2 pb-8 pt-4"
        style={{
          background:
            'linear-gradient(148deg, rgba(139,92,246,0.13) 0%, rgba(18,10,45,0.90) 65%, rgba(10,6,28,1) 100%)',
          border: '1px solid rgba(139,92,246,0.24)',
        }}
      >
        {/* Subtle tech grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: [
              'linear-gradient(rgba(139,92,246,.05) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(139,92,246,.05) 1px, transparent 1px)',
            ].join(','),
            backgroundSize: '60px 60px',
          }}
          aria-hidden
        />
        {/* Sparkle */}
        <svg
          className="absolute bottom-4 end-5 opacity-50"
          width="18" height="18" viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M12 0L13.8 10.2L24 12L13.8 13.8L12 24L10.2 13.8L0 12L10.2 10.2Z" fill="#8B5CF6" />
        </svg>

        {/* ── HONEYCOMB SVG ── */}
        {/* viewBox: x 90–720 (630px), y 60–645 (585px) */}
        <svg
          viewBox="90 60 630 585"
          className="relative mx-auto block w-full"
          style={{ maxWidth: 720 }}
          xmlns="http://www.w3.org/2000/svg"
          aria-label={title}
        >
          <defs>
            <filter id="ctf-pg" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="ctf-ag" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="ctf-lg" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <linearGradient id="ctf-tr" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D4B4" />
              <stop offset="100%" stopColor="#4FC3F7" />
            </linearGradient>
            <radialGradient id="ctf-cg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(139,92,246,0.22)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0)" />
            </radialGradient>
            {/* Clip paths: avatars inside center hex */}
            {centerGroup.people.map((_, i) => (
              <clipPath key={i} id={`ctf-ca-${i}`}>
                <circle cx={avatarXs[i]} cy={CA_Y} r={CA_R} />
              </clipPath>
            ))}
            {/* Clip paths: avatars inside side hexes */}
            {sideGroups.slice(0, 2).map((_, i) => (
              <clipPath key={i} id={`ctf-cs-${i}`}>
                <circle cx={sideHex[i].cx} cy={SIDE_AY} r={SIDE_R} />
              </clipPath>
            ))}
          </defs>

          {/* Radial glow behind centre hex */}
          <ellipse cx={CH.cx} cy={CH.cy} rx="200" ry="165" fill="url(#ctf-cg)" />

          {/* ── CLEAN CONNECTOR LINES (hex-to-hex, no dashes) ── */}
          {sideGroups.slice(0, 2).map((_, i) => {
            const sh = sideHex[i];
            // from center hex lower-left/right vertex to side hex top vertex
            const fromX = i === 0 ? CH.cx - CH.s60 : CH.cx + CH.s60;
            const fromY = CH.cy + CH.h;   // 332.5
            const toX   = sh.cx;
            const toY   = sh.cy - SH.R;  // 420
            return (
              <line
                key={i}
                x1={fromX} y1={fromY} x2={toX} y2={toY}
                stroke="#8B5CF6"
                strokeWidth="1.8"
                strokeOpacity="0.65"
                filter="url(#ctf-lg)"
              />
            );
          })}

          {/* ── CENTER HEX  cx=400 cy=250 R=165 ── */}
          {/* points: 400,85  542.9,167.5  542.9,332.5  400,415  257.1,332.5  257.1,167.5 */}
          <polygon
            points={`${CH.cx},${CH.cy - CH.R} ${CH.cx + CH.s60},${CH.cy - CH.h} ${CH.cx + CH.s60},${CH.cy + CH.h} ${CH.cx},${CH.cy + CH.R} ${CH.cx - CH.s60},${CH.cy + CH.h} ${CH.cx - CH.s60},${CH.cy - CH.h}`}
            fill="rgba(22,10,60,0.82)"
            stroke="#8B5CF6"
            strokeWidth="2.5"
            filter="url(#ctf-pg)"
          />
          {/* inner accent ring */}
          <polygon
            points={`${CH.cx},${CH.cy - CH.R + 14} ${CH.cx + CH.s60 - 8},${CH.cy - CH.h + 8} ${CH.cx + CH.s60 - 8},${CH.cy + CH.h - 8} ${CH.cx},${CH.cy + CH.R - 14} ${CH.cx - CH.s60 + 8},${CH.cy + CH.h - 8} ${CH.cx - CH.s60 + 8},${CH.cy - CH.h + 8}`}
            fill="none"
            stroke="rgba(139,92,246,0.15)"
            strokeWidth="1"
          />
          {/* Track label inside, at the top area of center hex */}
          {centerWords.map((word, i) => (
            <text
              key={i}
              x={CH.cx}
              y={192 + i * 24}
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
              fontSize="13"
              fontWeight="700"
              fill="#FFFFFF"
              letterSpacing="3"
            >
              {word}
            </text>
          ))}

          {/* 4 avatars inside center hex */}
          {centerGroup.people.map((p, i) => {
            const x = avatarXs[i];
            const photoUrl = p.personMeta?.photo
              ? avatarUrl(p.personMeta.photo, 96, p.personMeta.photo_gravity)
              : null;
            return (
              <a key={p.slug} href={`/${locale}/community/members/${p.slug}`} style={{ cursor: 'pointer' }}>
                <circle cx={x} cy={CA_Y} r={CA_R + 3} fill="none" stroke="url(#ctf-tr)" strokeWidth="2" filter="url(#ctf-ag)" />
                {photoUrl ? (
                  <image
                    href={photoUrl}
                    x={x - CA_R} y={CA_Y - CA_R}
                    width={CA_R * 2} height={CA_R * 2}
                    clipPath={`url(#ctf-ca-${i})`}
                    preserveAspectRatio="xMidYMid slice"
                  />
                ) : (
                  <circle cx={x} cy={CA_Y} r={CA_R} fill="rgba(139,92,246,0.3)" />
                )}
                {p.name.split(' ').slice(0, 2).map((part, j) => (
                  <text
                    key={j}
                    x={x} y={CA_Y + CA_R + 14 + j * 13}
                    textAnchor="middle"
                    fontFamily="system-ui, sans-serif"
                    fontSize="10"
                    fontWeight="600"
                    fill="#D8D6E8"
                  >
                    {part}
                  </text>
                ))}
              </a>
            );
          })}

          {/* ── SIDE HEXES ── */}
          {sideGroups.slice(0, 2).map((group, i) => {
            const sh = sideHex[i];
            const { cx, cy } = sh;
            const r = SH.R, s = SH.s60, h = SH.h;
            const pts = `${cx},${cy - r} ${cx + s},${cy - h} ${cx + s},${cy + h} ${cx},${cy + r} ${cx - s},${cy + h} ${cx - s},${cy - h}`;
            const p0 = group.people[0];
            const photoUrl = p0?.personMeta?.photo
              ? avatarUrl(p0.personMeta.photo, 96, p0.personMeta.photo_gravity)
              : null;
            return (
              <g key={i}>
                <polygon
                  points={pts}
                  fill="rgba(22,10,60,0.78)"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  filter="url(#ctf-pg)"
                />
                {/* Track label inside hex, near top */}
                <text
                  x={cx} y={cy - r + 36}
                  textAnchor="middle"
                  fontFamily="system-ui, sans-serif"
                  fontSize="11"
                  fontWeight="700"
                  fill="#8B5CF6"
                  letterSpacing="3"
                >
                  {group.trackLabel.toUpperCase()}
                </text>
                {/* Avatar inside the hex */}
                {p0 && (
                  <a href={`/${locale}/community/members/${p0.slug}`} style={{ cursor: 'pointer' }}>
                    <circle cx={cx} cy={SIDE_AY} r={SIDE_R + 3} fill="none" stroke="url(#ctf-tr)" strokeWidth="2" filter="url(#ctf-ag)" />
                    {photoUrl ? (
                      <image
                        href={photoUrl}
                        x={cx - SIDE_R} y={SIDE_AY - SIDE_R}
                        width={SIDE_R * 2} height={SIDE_R * 2}
                        clipPath={`url(#ctf-cs-${i})`}
                        preserveAspectRatio="xMidYMid slice"
                      />
                    ) : (
                      <circle cx={cx} cy={SIDE_AY} r={SIDE_R} fill="rgba(139,92,246,0.3)" />
                    )}
                    {p0.name.split(' ').slice(0, 2).map((part, j) => (
                      <text
                        key={j}
                        x={cx} y={SIDE_AY + SIDE_R + 15 + j * 13}
                        textAnchor="middle"
                        fontFamily="system-ui, sans-serif"
                        fontSize="11"
                        fontWeight="600"
                        fill="#D8D6E8"
                      >
                        {part}
                      </text>
                    ))}
                  </a>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}

function PeopleSection({
  title,
  subtitle,
  accent,
  people,
  locale,
  profileBasePath,
}: {
  title: string;
  subtitle: string;
  accent: string;
  people: PersonCard[];
  locale: string;
  profileBasePath?: string;
}) {
  if (people.length === 0) return null;
  return (
    <section>
      <div className="mb-6 flex items-start gap-3">
        <div className="mt-1 h-8 w-1 shrink-0 rounded-full" style={{ backgroundColor: accent }} aria-hidden />
        <div>
          <h2 className="text-xl font-extrabold text-foreground">{title}</h2>
          <p className="mt-0.5 text-sm text-foreground/80">{subtitle}</p>
        </div>
      </div>
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
  const mentors = (meta.mentors ?? []).map((s) => loadPerson(s, tPeople, 'title'));
  const donors = meta.donors.map((d) => loadPerson(d, tPeople));

  const ctfAuthorGroups = (() => {
    if (!meta.ctf_authors?.length) return [];
    const byTrack = new Map<string, PersonCard[]>();
    for (const { slug, track_key } of meta.ctf_authors) {
      if (!byTrack.has(track_key)) byTrack.set(track_key, []);
      byTrack.get(track_key)!.push(loadPerson(slug, tPeople, 'title'));
    }
    return [...byTrack.entries()].map(([track_key, people]) => {
      let trackLabel = track_key;
      try { trackLabel = tEvents(`detail.tracks.${track_key}`); } catch { /* missing */ }
      return { trackLabel, people };
    });
  })();

  const hasPeople =
    speakers.length > 0 ||
    organizers.length > 0 ||
    volunteers.length > 0 ||
    mentors.length > 0 ||
    ctfAuthorGroups.length > 0 ||
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
              {tEvents('card.eventPage')}
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
        <div className="mx-auto max-w-4xl space-y-16 px-4 py-10 md:px-8">
          <PeopleSection
            title={tEvents('detail.speakers')}
            subtitle={tEvents('detail.speakersSubtitle')}
            accent="var(--color-cat-speaking)"
            people={speakers}
            locale={locale}
            profileBasePath="members"
          />
          <PeopleSection
            title={tEvents('detail.organizers')}
            subtitle={tEvents('detail.organizersSubtitle')}
            accent="var(--color-cat-organizing)"
            people={organizers}
            locale={locale}
            profileBasePath="members"
          />
          <CtfAuthorsSection
            title={tEvents('detail.ctfAuthors')}
            subtitle={tEvents('detail.ctfAuthorsSubtitle')}
            groups={ctfAuthorGroups}
            locale={locale}
          />
          <PeopleSection
            title={tEvents('detail.mentors')}
            subtitle={tEvents('detail.mentorsSubtitle')}
            accent="var(--color-cat-opensource)"
            people={mentors}
            locale={locale}
            profileBasePath="members"
          />
          <PeopleSection
            title={tEvents('detail.volunteers')}
            subtitle={tEvents('detail.volunteersSubtitle')}
            accent="var(--color-cat-volunteering)"
            people={volunteers}
            locale={locale}
            profileBasePath="members"
          />
          <PeopleSection
            title={tEvents('detail.donors')}
            subtitle={tEvents('detail.donorsSubtitle')}
            accent="var(--color-cat-donor)"
            people={donors}
            locale={locale}
          />
        </div>
      )}
    </main>
  );
}
