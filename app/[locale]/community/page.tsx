import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, User } from 'lucide-react';
import {
  getAllVolunteerSlugs,
  getAllSpeakerSlugs,
  getAllOssContributorSlugs,
  getAllDonorSlugs,
  getPersonMeta,
  getVolunteerEvents,
  getSpeakerEventMetas,
  getDonorEventMetas,
  avatarUrl,
} from '@/lib/content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arabsinblockchain.com';
const PREVIEW = 8;

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'community' });
  return {
    title: t('people.title'),
    description: t('people.subtitle'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/community`,
      languages: {
        ar: `${SITE_URL}/ar/community`,
        en: `${SITE_URL}/en/community`,
      },
    },
    openGraph: { type: 'website', url: `${SITE_URL}/${locale}/community` },
  };
}

interface PersonPreview {
  slug: string;
  name: string;
  photo: string;
  count: number;
}

interface CategorySectionProps {
  locale: string;
  title: string;
  subtitle: string;
  accent: string;
  people: PersonPreview[];
  total: number;
  href: string;
  viewAllLabel: string;
  countLabel: string;
}

function CategorySection({
  locale,
  title,
  subtitle,
  accent,
  people,
  total,
  href,
  viewAllLabel,
  countLabel,
}: CategorySectionProps) {
  const preview = people.slice(0, PREVIEW);
  const extra = total - preview.length;

  return (
    <section
      className="rounded-card p-8"
      style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}
    >
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <div className="h-5 w-1 rounded-full" style={{ backgroundColor: accent }} aria-hidden />
            <h2 className="text-xl font-extrabold text-foreground">{title}</h2>
            <span
              className="rounded-badge px-2 py-0.5 text-xs font-bold"
              style={{
                backgroundColor: `color-mix(in srgb, ${accent} 15%, transparent)`,
                color: accent,
              }}
            >
              {total}
            </span>
          </div>
          <p className="ps-3 text-sm text-muted">{subtitle}</p>
        </div>
      </div>

      {/* Avatar grid */}
      <div className="mb-6 flex flex-wrap gap-5">
        {preview.map(({ slug, name, photo, count }) => (
          <Link
            key={slug}
            href={`/${locale}/community/members/${slug}`}
            className="group flex flex-col items-center gap-1.5"
            title={name}
          >
            <div
              className="rounded-full p-0.5 transition-transform duration-200 group-hover:scale-110"
              style={{ background: `linear-gradient(135deg, ${accent}, var(--color-brand-teal))` }}
            >
              <div
                className="relative h-14 w-14 overflow-hidden rounded-full"
                style={{ backgroundColor: 'var(--color-bg-dark)' }}
              >
                {photo ? (
                  <Image
                    src={avatarUrl(photo, 150)}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center"
                    style={{ background: 'var(--gradient-cta)' }}
                  >
                    <User size={22} className="text-white/60" aria-hidden />
                  </div>
                )}
              </div>
            </div>
            <span className="max-w-[72px] truncate text-center text-xs text-muted transition-colors group-hover:text-brand-teal">
              {name.split(' ')[0]}
            </span>
            {count > 0 && (
              <span
                className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
                style={{
                  backgroundColor: `color-mix(in srgb, ${accent} 15%, transparent)`,
                  color: accent,
                }}
              >
                {count}
              </span>
            )}
          </Link>
        ))}

        {extra > 0 && (
          <Link href={`/${locale}/community/${href}`} className="flex flex-col items-center gap-1.5">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold text-foreground transition-opacity hover:opacity-80"
              style={{ backgroundColor: 'var(--color-bg-dark)', border: '1px solid var(--color-card-border)' }}
            >
              +{extra}
            </div>
            <span className="text-xs text-muted">{countLabel}</span>
          </Link>
        )}
      </div>

      {/* View All */}
      <Link
        href={`/${locale}/community/${href}`}
        className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-brand-teal"
        style={{ color: accent }}
      >
        {viewAllLabel}
        <ArrowRight size={14} aria-hidden />
      </Link>
    </section>
  );
}

export default async function CommunityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tPeople] = await Promise.all([
    getTranslations({ locale, namespace: 'community' }),
    getTranslations({ locale, namespace: 'contributors' }),
  ]);

  function nameOf(slug: string) {
    try { return tPeople(`${slug}.name`); } catch { return slug; }
  }
  function photoOf(slug: string) {
    try { return getPersonMeta(slug).photo ?? ''; } catch { return ''; }
  }

  // Volunteers — sorted by total event count
  const volunteerSlugs = getAllVolunteerSlugs();
  const volunteers: PersonPreview[] = volunteerSlugs
    .map((slug) => ({
      slug,
      name: nameOf(slug),
      photo: photoOf(slug),
      count: getVolunteerEvents(slug).length,
    }))
    .sort((a, b) => b.count - a.count);

  // Speakers — sorted by talk count
  const speakerSlugs = getAllSpeakerSlugs();
  const speakers: PersonPreview[] = speakerSlugs
    .map((slug) => ({
      slug,
      name: nameOf(slug),
      photo: photoOf(slug),
      count: getSpeakerEventMetas(slug).length,
    }))
    .sort((a, b) => b.count - a.count);

  // OSS contributors — no event count
  const ossSlugs = getAllOssContributorSlugs();
  const ossContributors: PersonPreview[] = ossSlugs.map((slug) => ({
    slug,
    name: nameOf(slug),
    photo: photoOf(slug),
    count: 0,
  }));

  // Donors — sorted by events supported
  const donorSlugs = getAllDonorSlugs();
  const donors: PersonPreview[] = donorSlugs
    .map((slug) => ({
      slug,
      name: nameOf(slug),
      photo: photoOf(slug),
      count: getDonorEventMetas(slug).length,
    }))
    .sort((a, b) => b.count - a.count);

  const moreLabel = t('contributors.contributions');

  return (
    <main>
      {/* Hero */}
      <div
        className="theme-always-dark px-4 py-20 text-center"
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div className="mx-auto max-w-3xl md:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-teal">
            Arabs in Blockchain
          </p>
          <h1 className="mb-4 text-3xl font-extrabold text-foreground md:text-5xl">
            {t('people.title')}
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted">{t('people.subtitle')}</p>
        </div>
      </div>

      {/* Category sections */}
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-16 md:px-8">
        <CategorySection
          locale={locale}
          title={t('volunteers.title')}
          subtitle={t('volunteers.subtitle')}
          accent="var(--color-brand-teal)"
          people={volunteers}
          total={volunteerSlugs.length}
          href="volunteers"
          viewAllLabel={t('volunteers.backToAll')}
          countLabel={moreLabel}
        />
        <CategorySection
          locale={locale}
          title={t('speakers.title')}
          subtitle={t('speakers.subtitle')}
          accent="var(--color-brand-gold)"
          people={speakers}
          total={speakerSlugs.length}
          href="speakers"
          viewAllLabel={t('speakers.backToAll')}
          countLabel={moreLabel}
        />
        <CategorySection
          locale={locale}
          title={t('contributors.title')}
          subtitle={t('contributors.subtitle')}
          accent="#A78BFA"
          people={ossContributors}
          total={ossSlugs.length}
          href="contributors"
          viewAllLabel={t('contributors.backToAll')}
          countLabel={moreLabel}
        />
        <CategorySection
          locale={locale}
          title={t('donors.title')}
          subtitle={t('donors.subtitle')}
          accent="#F43F5E"
          people={donors}
          total={donorSlugs.length}
          href="donors"
          viewAllLabel={t('donors.backToAll')}
          countLabel={moreLabel}
        />
      </div>

      {/* How to Join */}
      <section
        className="theme-always-dark px-4 py-16"
        style={{ backgroundColor: 'color-mix(in srgb, var(--color-brand-violet) 15%, var(--color-bg-dark))' }}
      >
        <div className="mx-auto max-w-3xl text-center md:px-8">
          <h2 className="mb-10 text-2xl font-extrabold text-foreground">{t('howItWorks.title')}</h2>
          <div className="mb-10 grid gap-6 sm:grid-cols-3">
            {(['step1', 'step2', 'step3'] as const).map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-3 text-center">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-extrabold text-white"
                  style={{ background: 'var(--gradient-cta)' }}
                >
                  {i + 1}
                </div>
                <h3 className="font-semibold text-foreground">{t(`howItWorks.${step}.title`)}</h3>
                <p className="text-sm text-muted">{t(`howItWorks.${step}.description`)}</p>
              </div>
            ))}
          </div>
          <a
            href="https://t.me/ArabsInBlockchain"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-btn px-8 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--gradient-cta)' }}
          >
            {t('joinCta')}
          </a>
        </div>
      </section>
    </main>
  );
}
