import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

export default async function NotFound() {
  let locale = 'en';
  let title = 'Page Not Found';
  let subtitle = "The page you're looking for doesn't exist";
  let backHome = 'Back to Home';
  let joinTelegram = 'Join our Telegram';

  try {
    locale = await getLocale();
    const t = await getTranslations({ locale, namespace: 'notFound' });
    title = t('title');
    subtitle = t('subtitle');
    backHome = t('backHome');
    joinTelegram = t('joinTelegram');
  } catch {
    // Static generation boundary — use English fallback text
  }

  return (
    <main className="flex min-h-[calc(100vh-72px)] flex-col">
      <div
        className="theme-always-dark relative flex flex-1 flex-col items-center justify-center px-4 py-24 text-center"
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='35' viewBox='0 0 60 52'%3E%3Cpolygon points='30,2 58,17 58,47 30,62 2,47 2,17' fill='none' stroke='%2300D4B4' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 35px',
          }}
          aria-hidden
        />

        {/* Logo */}
        <div className="relative mb-6">
          <Image
            src="/logo-dark.png"
            alt="Arabs in Blockchain"
            width={192}
            height={80}
            className="mx-auto opacity-60"
          />
        </div>

        <p className="relative font-mono text-8xl font-bold text-brand-teal opacity-20 md:text-[10rem]">
          404
        </p>

        <div className="relative -mt-8 md:-mt-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-teal">
            {subtitle}
          </p>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            {title}
          </h1>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 rounded-btn px-6 py-3 text-sm font-semibold text-on-gold transition-opacity hover:opacity-90"
              style={{ background: 'var(--gradient-gold)' }}
            >
              {backHome}
            </Link>
            <a
              href="https://t.me/ArabsInBlockchain"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-btn border border-brand-teal px-6 py-3 text-sm font-semibold text-brand-teal transition-colors hover:bg-brand-teal hover:text-page"
            >
              {joinTelegram}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
