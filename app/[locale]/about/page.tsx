import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Users, BookOpen, Zap, Heart, Compass, ShieldCheck } from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arabsinblockchain.com';

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
    alternates: {
      canonical: `${SITE_URL}/${locale}/about`,
      languages: {
        ar: `${SITE_URL}/ar/about`,
        en: `${SITE_URL}/en/about`,
      },
    },
    openGraph: { type: 'website', url: `${SITE_URL}/${locale}/about` },
  };
}

const TIMELINE_YEARS = ['2020', '2021', '2022', '2024', '2026'] as const;

const VALUES = [
  { key: 'communityFirst',    Icon: Users },
  { key: 'collectiveLearning', Icon: BookOpen },
  { key: 'arabExcellence',    Icon: Zap },
  { key: 'trueInclusivity',   Icon: Heart },
  { key: 'opportunityDriven', Icon: Compass },
  { key: 'transparencyTrust', Icon: ShieldCheck },
] as const;

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <main className="pt-24 pb-20">

      {/* ── Mission ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-8" aria-labelledby="mission-heading">
        <h1
          id="mission-heading"
          className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl"
        >
          {t('mission.title')}
        </h1>
        <div
          className="rounded-card p-8 md:p-12"
          style={{ background: 'var(--gradient-card)', border: '1px solid var(--color-card-border)' }}
        >
          <p className="text-lg leading-[1.9] text-foreground">
            {t('mission.body')}
          </p>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{ background: 'var(--gradient-card)' }}
        aria-labelledby="timeline-heading"
      >
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
                  <div className="flex w-52 flex-col items-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-bold ${
                        isLast
                          ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                          : 'border-brand-teal bg-brand-teal/10 text-brand-teal'
                      }`}
                    >
                      {year}
                    </div>
                    <p className="mt-4 text-center text-sm leading-relaxed text-muted">
                      {t(`timeline.${year}`)}
                    </p>
                  </div>
                  {!isLast && (
                    <div className="mt-6 h-px w-8 shrink-0 bg-brand-teal/20" aria-hidden />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center md:px-8" aria-labelledby="values-heading">
        <h2
          id="values-heading"
          className="mb-8 text-2xl font-bold text-foreground md:text-3xl"
        >
          {t('values.title')}
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {VALUES.map(({ key, Icon }) => (
            <div
              key={key}
              className="flex items-center gap-2 rounded-full border border-brand-teal/30 px-4 py-2 transition-colors hover:border-brand-teal"
            >
              <Icon size={16} className="text-brand-teal" aria-hidden />
              <span className="text-sm font-medium text-foreground">{t(`values.${key}`)}</span>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
