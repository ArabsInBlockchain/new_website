import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Link from 'next/link';
import { Users, Mic2, GitMerge, Heart } from 'lucide-react';
import {
  getAllVolunteerSlugs,
  getAllSpeakerSlugs,
  getAllOssContributorSlugs,
  getAllDonorSlugs,
} from '@/lib/content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arabsinblockchain.com';

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

const sections = [
  {
    key: 'volunteers',
    href: 'volunteers',
    Icon: Users,
    color: 'var(--color-brand-teal)',
    bg: 'color-mix(in srgb, var(--color-brand-teal) 12%, transparent)',
  },
  {
    key: 'speakers',
    href: 'speakers',
    Icon: Mic2,
    color: 'var(--color-brand-gold)',
    bg: 'color-mix(in srgb, var(--color-brand-gold) 12%, transparent)',
  },
  {
    key: 'contributors',
    href: 'contributors',
    Icon: GitMerge,
    color: '#A78BFA',
    bg: 'color-mix(in srgb, #A78BFA 12%, transparent)',
  },
  {
    key: 'donors',
    href: 'donors',
    Icon: Heart,
    color: '#F43F5E',
    bg: 'color-mix(in srgb, #F43F5E 12%, transparent)',
  },
] as const;

export default async function CommunityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'community' });

  const counts = {
    volunteers: getAllVolunteerSlugs().length,
    speakers: getAllSpeakerSlugs().length,
    contributors: getAllOssContributorSlugs().length,
    donors: getAllDonorSlugs().length,
  };

  return (
    <main>
      {/* Hero */}
      <div
        className="theme-always-dark px-4 py-16 text-center"
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div className="mx-auto max-w-3xl md:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-teal">
            Arabs in Blockchain
          </p>
          <h1 className="mb-4 text-3xl font-extrabold text-foreground md:text-5xl">
            {t('people.title')}
          </h1>
          <p className="mx-auto max-w-xl text-base text-muted">{t('people.subtitle')}</p>
        </div>
      </div>

      {/* Section cards */}
      <section className="mx-auto max-w-5xl px-4 py-16 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {sections.map(({ key, href, Icon, color, bg }) => (
            <Link
              key={key}
              href={`/${locale}/community/${href}`}
              className="group flex items-center gap-5 rounded-card p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-card-border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: bg }}
              >
                <Icon size={26} style={{ color }} aria-hidden />
              </div>
              <div className="flex-1">
                <h2
                  className="mb-1 text-lg font-bold transition-colors group-hover:text-brand-teal"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {t(`${key}.title`)}
                </h2>
                <p className="text-sm text-muted">{t(`${key}.subtitle`)}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-2xl font-extrabold" style={{ color }}>
                  {counts[key as keyof typeof counts]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

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
