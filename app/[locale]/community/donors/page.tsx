import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getAllDonorSlugs, getPersonMeta, getDonorEventMetas, avatarUrl } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';

import { Heart, User, ArrowLeft } from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arabsinblockchain.com';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'community' });
  return {
    title: t('donors.title'),
    description: t('donors.subtitle'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/community/donors`,
      languages: {
        ar: `${SITE_URL}/ar/community/donors`,
        en: `${SITE_URL}/en/community/donors`,
      },
    },
    openGraph: { type: 'website', url: `${SITE_URL}/${locale}/community/donors` },
  };
}

export default async function DonorsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tCommunity, tPeople] = await Promise.all([
    getTranslations({ locale, namespace: 'community' }),
    getTranslations({ locale, namespace: 'contributors' }),
  ]);

  const slugs = getAllDonorSlugs();
  const donors = slugs.map((slug) => {
    const meta = getPersonMeta(slug);
    const events = getDonorEventMetas(slug);
    let name = slug;
    try { name = tPeople(`${slug}.name`); } catch { /* missing translation */ }
    return { meta, name, events };
  });

  return (
    <main>
      <div
        className="theme-always-dark px-4 py-16 text-center"
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div className="mx-auto max-w-7xl md:px-8">
          <Link
            href={`/${locale}/community`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-brand-teal"
          >
            <ArrowLeft size={16} aria-hidden />
            {tCommunity('donors.backToAll')}
          </Link>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: '#F43F5E' }}>
            Arabs in Blockchain
          </p>
          <h1 className="mb-4 text-3xl font-extrabold text-foreground md:text-5xl">
            {tCommunity('donors.title')}
          </h1>
          <p className="mx-auto max-w-xl text-base text-muted">
            {tCommunity('donors.subtitle')}
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-8">
        {donors.length === 0 ? (
          <p className="text-center text-muted">{tCommunity('donors.noMembers')}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {donors.map(({ meta, name, events }) => (
              <Link
                key={meta.slug}
                href={`/${locale}/community/members/${meta.slug}`}
                className="group flex flex-col items-center gap-4 rounded-card p-6 text-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid color-mix(in srgb, #F43F5E 30%, var(--color-card-border))',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                {/* Avatar */}
                <div
                  className="rounded-full p-0.5"
                  style={{ background: 'linear-gradient(135deg, #F43F5E, var(--color-brand-gold))' }}
                >
                  <div
                    className="relative h-20 w-20 overflow-hidden rounded-full"
                    style={{ backgroundColor: 'var(--color-bg-dark)' }}
                  >
                    {meta.photo ? (
                      <Image
                        src={avatarUrl(meta.photo, 200)}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center"
                        style={{ background: 'var(--gradient-cta)' }}
                      >
                        <User size={32} className="text-white/60" aria-hidden />
                      </div>
                    )}
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-base font-bold text-foreground">{name}</h3>

                {/* Community Pillar badge */}
                <span
                  className="flex items-center gap-1.5 rounded-badge px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: 'color-mix(in srgb, #F43F5E 15%, transparent)',
                    color: '#F43F5E',
                  }}
                >
                  <Heart size={11} aria-hidden />
                  {tCommunity('donors.badge')}
                </span>

                {/* Events count */}
                {events.length > 0 && (
                  <p className="text-xs text-muted">
                    {events.length} {tCommunity('donors.eventsSupported')}
                  </p>
                )}

              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
