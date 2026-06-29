import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, User } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import {
  getAllVolunteerSlugs,
  getAllSpeakerSlugs,
  getPersonMeta,
  getVolunteerEvents,
  getSpeakerEventMetas,
  avatarUrl,
} from '@/lib/content';

const PREVIEW_COUNT = 8;

interface Props {
  locale: string;
}

export default async function ContributorsTeaser({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'home.contributors' });
  const tContribs = await getTranslations({ locale, namespace: 'contributors' });

  // Union of all volunteers and speakers
  const allSlugs = [...new Set([...getAllVolunteerSlugs(), ...getAllSpeakerSlugs()])];

  // Total activity count across all roles
  const ranked = allSlugs
    .map((slug) => {
      const volunteerCount = getVolunteerEvents(slug).length;
      const speakingCount = getSpeakerEventMetas(slug).length;
      return { slug, count: volunteerCount + speakingCount };
    })
    .sort((a, b) => b.count - a.count);

  const preview = ranked.slice(0, PREVIEW_COUNT);
  const extra = allSlugs.length - PREVIEW_COUNT;

  return (
    <section className="px-4 py-16" style={{ background: 'var(--gradient-card)' }}>
      <div className="mx-auto max-w-7xl md:px-8">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-teal">
            Arabs in Blockchain
          </p>
          <h2 className="mb-3 text-2xl font-extrabold text-foreground md:text-3xl">
            {t('title')}
          </h2>
          <p className="text-sm text-muted">{t('subtitle')}</p>
        </div>

        {/* Avatar grid */}
        <div className="mb-8 flex flex-wrap justify-center gap-6">
          {preview.map(({ slug }) => {
            const meta = getPersonMeta(slug);
            let name = slug;
            try { name = tContribs(`${slug}.name`); } catch { /* missing */ }

            return (
              <Link
                key={slug}
                href={`/${locale}/community/members/${slug}`}
                className="group flex flex-col items-center gap-2"
                title={name}
              >
                <div
                  className="rounded-full p-0.5 transition-transform duration-200 group-hover:scale-110"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--color-brand-gold), var(--color-brand-teal))',
                  }}
                >
                  <div
                    className="relative h-14 w-14 overflow-hidden rounded-full"
                    style={{ backgroundColor: 'var(--color-bg-dark)' }}
                  >
                    {meta.photo ? (
                      <Image
                        src={avatarUrl(meta.photo, 150)}
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
              </Link>
            );
          })}

          {extra > 0 && (
            <Link
              href={`/${locale}/community`}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold text-foreground transition-opacity hover:opacity-80"
                style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}
              >
                +{extra}
              </div>
              <span className="text-xs text-muted">more</span>
            </Link>
          )}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link
            href={`/${locale}/community`}
            className="inline-flex items-center gap-2 rounded-btn border px-6 py-2.5 text-sm font-semibold transition-colors hover:border-brand-teal hover:text-brand-teal"
            style={{ borderColor: 'var(--color-card-border)', color: 'var(--color-text-muted)' }}
          >
            {t('viewAll')}
            <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
