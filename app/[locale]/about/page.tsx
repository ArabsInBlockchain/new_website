import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { MessageCircle, Users, MapPin, Unlock, BookOpen, Zap, Heart, Compass } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: { languages: { ar: '/ar/about', en: '/en/about' } },
    openGraph: { type: 'website' },
  };
}

const HEX_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='35' viewBox='0 0 60 52'%3E%3Cpolygon points='30,2 58,17 58,47 30,62 2,47 2,17' fill='none' stroke='%2300D4B4' stroke-width='1'/%3E%3C/svg%3E")`;

const TIMELINE_YEARS = ['2020', '2021', '2022', '2023', '2024'] as const;

const VALUES = [
  { key: 'openness',    Icon: Unlock },
  { key: 'education',   Icon: BookOpen },
  { key: 'empowerment', Icon: Zap },
  { key: 'community',   Icon: Users },
  { key: 'identity',    Icon: Heart },
  { key: 'borderless',  Icon: Compass },
] as const;

const WHO = [
  { key: 'speakers', Icon: MessageCircle },
  { key: 'origin',   Icon: Users },
  { key: 'living',   Icon: MapPin },
] as const;

const IMPACT = [
  { value: '1K+',  labelKey: 'members'   },
  { value: '50+',  labelKey: 'events'    },
  { value: '15+',  labelKey: 'countries' },
  { value: '2020', labelKey: 'since'     },
] as const;

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tAr, tEn, tHome] = await Promise.all([
    getTranslations({ locale,  namespace: 'about' }),
    getTranslations({ locale: 'ar', namespace: 'about' }),
    getTranslations({ locale: 'en', namespace: 'about' }),
    getTranslations({ locale,  namespace: 'home' }),
  ]);

  const timelineLabels: Record<string, string> = {
    '2020': t('timeline.2020'),
    '2021': t('timeline.2021'),
    '2022': t('timeline.2022'),
    '2023': t('timeline.2023'),
    '2024': t('timeline.2024'),
  };

  const valueLabels: Record<string, string> = {
    openness:    t('values.openness'),
    education:   t('values.education'),
    empowerment: t('values.empowerment'),
    community:   t('values.community'),
    identity:    t('values.identity'),
    borderless:  t('values.borderless'),
  };

  const whoLabels: Record<string, { title: string; description: string }> = {
    speakers: { title: t('whoWeWelcome.speakers.title'), description: t('whoWeWelcome.speakers.description') },
    origin:   { title: t('whoWeWelcome.origin.title'),   description: t('whoWeWelcome.origin.description')   },
    living:   { title: t('whoWeWelcome.living.title'),   description: t('whoWeWelcome.living.description')   },
  };

  const statsLabels: Record<string, string> = {
    members:   t('stats.members'),
    events:    t('stats.events'),
    countries: t('stats.countries'),
    since:     t('stats.since'),
  };

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div
        className="theme-always-dark relative overflow-hidden px-4 py-24 text-center"
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{ backgroundImage: HEX_BG, backgroundSize: '40px 35px' }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-teal">
            {t('subtitle')}
          </p>
          <h1 className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
        </div>
      </div>

      {/* ── Mission ───────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8" aria-labelledby="mission-heading">
        <h2
          id="mission-heading"
          className="mb-12 text-center text-2xl font-bold text-foreground md:text-3xl"
        >
          {t('mission.title')}
        </h2>
        <div
          className="rounded-card p-8 md:p-12"
          style={{ background: 'var(--gradient-card)', border: '1px solid var(--color-card-border)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr,1px,1fr]">
            {/* Arabic side — always RTL */}
            <div className="pb-8 md:pb-0 md:pe-10" dir="rtl">
              <p className="text-lg leading-[1.9] text-foreground">{tAr('mission.body')}</p>
            </div>
            {/* Vertical divider */}
            <div className="hidden bg-brand-teal/25 md:block" aria-hidden />
            {/* English side — always LTR */}
            <div
              className="border-t border-brand-teal/20 pt-8 md:border-t-0 md:ps-10 md:pt-0"
              dir="ltr"
            >
              <p className="text-lg leading-relaxed text-foreground">{tEn('mission.body')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────────── */}
      <section className="py-16" aria-labelledby="timeline-heading">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2
            id="timeline-heading"
            className="mb-12 text-center text-2xl font-bold text-foreground md:text-3xl"
          >
            {t('timeline.title')}
          </h2>
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="flex min-w-max items-start justify-center gap-0 px-8">
            {TIMELINE_YEARS.map((year, i) => {
              const isLast = i === TIMELINE_YEARS.length - 1;
              return (
                <div key={year} className="flex items-start">
                  <div className="flex w-44 flex-col items-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-bold ${
                        isLast
                          ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                          : 'border-brand-violet bg-brand-violet/10 text-brand-violet'
                      }`}
                    >
                      {year}
                    </div>
                    <p className="mt-4 text-center text-sm leading-relaxed text-muted">
                      {timelineLabels[year]}
                    </p>
                  </div>
                  {!isLast && (
                    <div className="mt-6 h-px w-8 shrink-0 bg-brand-violet/30" aria-hidden />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Who We Welcome ────────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{ background: 'var(--gradient-card)' }}
        aria-labelledby="welcome-heading"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2
            id="welcome-heading"
            className="mb-10 text-center text-2xl font-bold text-foreground md:text-3xl"
          >
            {t('whoWeWelcome.title')}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {WHO.map(({ key, Icon }) => (
              <div
                key={key}
                className="rounded-card p-8 text-center transition-all hover:-translate-y-1"
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-brand-violet)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal/10">
                  <Icon size={24} className="text-brand-teal" aria-hidden />
                </div>
                <h3 className="mb-2 text-lg font-bold text-brand-gold">
                  {whoLabels[key].title}
                </h3>
                <p className="text-sm text-muted">{whoLabels[key].description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8" aria-labelledby="values-heading">
        <h2
          id="values-heading"
          className="mb-10 text-center text-2xl font-bold text-foreground md:text-3xl"
        >
          {t('values.title')}
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {VALUES.map(({ key, Icon }) => (
            <div
              key={key}
              className="flex flex-col items-center gap-3 rounded-card p-6 text-center"
              style={{
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-card-border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal/10">
                <Icon size={20} className="text-brand-teal" aria-hidden />
              </div>
              <p className="text-sm font-semibold text-foreground">{valueLabels[key]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Impact Stats ──────────────────────────────────────────────── */}
      <section
        className="theme-always-dark py-20"
        style={{ background: 'linear-gradient(90deg, #3B1F8C, #2D1870)' }}
        aria-labelledby="stats-heading"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2
            id="stats-heading"
            className="mb-12 text-center text-2xl font-bold text-foreground md:text-3xl"
          >
            {t('stats.title')}
          </h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {IMPACT.map(({ value, labelKey }) => (
              <div key={labelKey} className="text-center">
                <p className="text-5xl font-bold text-brand-gold md:text-6xl">{value}</p>
                <p className="mt-2 text-sm font-medium text-foreground/70">
                  {statsLabels[labelKey]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join CTA ──────────────────────────────────────────────────── */}
      <section
        className="theme-always-dark py-20 text-center"
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            {tHome('join.title')}
          </h2>
          <p className="mt-4 text-base text-muted">{tHome('join.subtitle')}</p>
          <a
            href="https://t.me/ArabsInBlockchain"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-btn px-8 py-4 text-base font-semibold text-on-gold transition-all hover:opacity-90"
            style={{ background: 'var(--gradient-gold)' }}
          >
            {tHome('join.cta')}
          </a>
        </div>
      </section>
    </main>
  );
}
