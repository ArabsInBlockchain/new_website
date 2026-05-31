import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import StatsBar from '@/components/home/StatsBar';
import WhatWeDo from '@/components/home/WhatWeDo';
import OpportunitiesTeaser from '@/components/home/OpportunitiesTeaser';
import JoinCTA from '@/components/home/JoinCTA';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('siteName'),
    description: t('siteDescription'),
    openGraph: {
      type: 'website',
      images: [{ url: '/og-home.png', width: 1200, height: 630 }],
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <StatsBar />
      <WhatWeDo />
      <OpportunitiesTeaser />
      <JoinCTA />
    </>
  );
}
