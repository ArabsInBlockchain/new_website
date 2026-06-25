import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import StatsBar from '@/components/home/StatsBar';
import WhatWeDo from '@/components/home/WhatWeDo';
import OpportunitiesTeaser from '@/components/home/OpportunitiesTeaser';
import PartnersBar from '@/components/home/PartnersBar';
import JoinCTA from '@/components/home/JoinCTA';
import ContributorsTeaser from '@/components/home/ContributorsTeaser';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arabsinblockchain.com';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('siteName'),
    description: t('siteDescription'),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ar: `${SITE_URL}/ar`,
        en: `${SITE_URL}/en`,
      },
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${locale}`,
    },
  };
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Arabs in Blockchain',
  alternateName: 'العرب × بلوكتشين',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-dark.png`,
  foundingDate: '2020',
  description: 'An open, borderless community empowering Arabs in blockchain technology since 2020.',
  sameAs: [
    'https://t.me/ArabsInBlockchain',
    'https://x.com/ArabsInBC',
    'https://www.linkedin.com/company/arabs-in-blockchain/',
    'https://www.youtube.com/channel/UC_5orftfcZkLNn5LmIPodAA',
    'https://github.com/ArabsInBlockchain',
    'https://luma.com/arabsInBlockchain',
  ],
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <StatsBar />
      <WhatWeDo />
      <OpportunitiesTeaser />
      <ContributorsTeaser locale={locale} />
      <PartnersBar />
      <JoinCTA />
    </>
  );
}
