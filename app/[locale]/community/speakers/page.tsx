import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getAllSpeakerSlugs, getPersonMeta, getSpeakerEventMetas, avatarUrl } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';
import { User, ArrowLeft } from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arabsinblockchain.com';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'community' });
  return {
    title: t('speakers.title'),
    description: t('speakers.subtitle'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/community/speakers`,
      languages: {
        ar: `${SITE_URL}/ar/community/speakers`,
        en: `${SITE_URL}/en/community/speakers`,
      },
    },
    openGraph: { type: 'website', url: `${SITE_URL}/${locale}/community/speakers` },
  };
}

export default async function SpeakersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tCommunity, tPeople] = await Promise.all([
    getTranslations({ locale, namespace: 'community' }),
    getTranslations({ locale, namespace: 'contributors' }),
  ]);

  const slugs = getAllSpeakerSlugs();
  const speakers = slugs
    .map((slug) => {
      let meta = null;
      try { meta = getPersonMeta(slug); } catch { /* person file may not exist */ }
      const events = getSpeakerEventMetas(slug);
      let name = slug;
      try { name = tPeople(`${slug}.name`); } catch { /* missing translation */ }
      let title = '';
      try { title = tPeople(`${slug}.title`); } catch { /* missing translation */ }
      return { slug, meta, name, title, events };
    })
    .sort((a, b) => b.events.length - a.events.length);

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
            {tCommunity('speakers.backToAll')}
          </Link>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-teal">
            Arabs in Blockchain
          </p>
          <h1 className="mb-4 text-3xl font-extrabold text-foreground md:text-5xl">
            {tCommunity('speakers.title')}
          </h1>
          <p className="mx-auto max-w-xl text-base text-muted">
            {tCommunity('speakers.subtitle')}
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        {speakers.length === 0 ? (
          <p className="text-center text-muted">{tCommunity('speakers.noMembers')}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {speakers.map(({ slug, meta, name, title, events }) => (
              <Link
                key={slug}
                href={`/${locale}/community/members/${slug}`}
                className="group flex flex-col items-center gap-4 rounded-card p-6 text-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-card-border)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div
                  className="rounded-full p-0.5"
                  style={{ background: 'linear-gradient(135deg, var(--color-brand-gold), var(--color-brand-teal))' }}
                >
                  <div
                    className="relative h-20 w-20 overflow-hidden rounded-full"
                    style={{ backgroundColor: 'var(--color-bg-dark)' }}
                  >
                    {meta?.photo ? (
                      <Image
                        src={avatarUrl(meta.photo, 200, meta?.photo_gravity)}
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

                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-bold text-foreground">{name}</h3>
                  {title && <p className="text-xs text-muted">{title}</p>}
                </div>

                <span
                  className="rounded-badge px-2.5 py-0.5 text-xs font-semibold"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-brand-gold) 15%, transparent)',
                    color: 'var(--color-brand-gold)',
                  }}
                >
                  {events.length} {events.length === 1 ? 'Event' : 'Events'}
                </span>

              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
