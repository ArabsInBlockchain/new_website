'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Hero() {
  const t = useTranslations('home.hero');
  const locale = useLocale();

  return (
    <section
      className="theme-always-dark relative flex min-h-screen items-center justify-center overflow-hidden px-4 text-center"
      style={{ background: 'var(--gradient-hero)' }}
      aria-label="Hero"
    >
      {/* Subtle hexagon mesh background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='52' viewBox='0 0 60 52'%3E%3Cpolygon points='30,2 58,17 58,47 30,62 2,47 2,17' fill='none' stroke='%2300D4B4' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 52px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="hero-item-1">
          {/* Brand logo as hero headline — exact font, exact look */}
          <h1 className="sr-only">Arabs in Blockchain — العرب × بلوكتشين</h1>
          <Image
            src="/logo-light.png"
            alt="Arabs in Blockchain — العرب × بلوكتشين"
            width={714}
            height={297}
            sizes="(max-width: 768px) 288px, (max-width: 1024px) 420px, 480px"
            priority
            className="mx-auto h-auto w-72 md:w-[420px] lg:w-[480px]"
          />
        </div>

        <p className="hero-item-2 mx-auto mt-6 max-w-2xl text-base text-muted md:text-lg">
          {t('subtitle')}
        </p>

        <div className="hero-item-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            variant="gold"
            size="lg"
            onClick={() => window.open('https://t.me/ArabsInBlockchain', '_blank')}
          >
            {t('joinCta')}
          </Button>

          <Link href={`/${locale}/events`}>
            <Button variant="outline" size="lg">
              {t('eventsCta')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
