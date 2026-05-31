'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Hero() {
  const t = useTranslations('home.hero');
  const locale = useLocale();

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 text-center"
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Brand logo as hero headline — exact font, exact look */}
          <h1 className="sr-only">Arabs in Blockchain — العرب × بلوكتشين</h1>
          <Image
            src="/logo-light.png"
            alt="Arabs in Blockchain — العرب × بلوكتشين"
            width={480}
            height={160}
            priority
            className="mx-auto w-72 md:w-[420px] lg:w-[480px]"
            style={{ height: 'auto' }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base text-muted md:text-lg"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
