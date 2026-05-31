import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Logo from '@/components/shared/Logo';

const QUICK_LINKS = ['about', 'events', 'community', 'partners', 'gallery', 'contact'] as const;

const SOCIAL_LINKS = [
  { label: 'Telegram', href: 'https://t.me/ArabsInBlockchain', icon: '/icons/telegram.svg' },
  { label: 'X / Twitter', href: 'https://x.com/ArabsInBC', icon: '/icons/x.svg' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/arabs-in-blockchain/', icon: '/icons/linkedin.svg' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UC_5orftfcZkLNn5LmIPodAA', icon: '/icons/youtube.svg' },
  { label: 'GitHub', href: 'https://github.com/ArabsInBlockchain', icon: '/icons/github.svg' },
] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-surface bg-footer mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Col 1 — Logo + taglines + social */}
          <div className="md:col-span-2">
            <Logo height={36} />
            <p className="mt-4 max-w-xs text-sm text-muted leading-relaxed">
              {t('tagline')}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-muted/30 transition-colors hover:border-brand-teal"
                >
                  <Image
                    src={icon}
                    alt={label}
                    width={18}
                    height={18}
                    className="opacity-60 transition-opacity hover:opacity-100 invert"
                  />
                </a>
              ))}
              {/* Lu.ma — events platform, no brand icon available */}
              <a
                href="https://luma.com/arabsInBlockchain"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Lu.ma events"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-muted/30 transition-colors hover:border-brand-teal"
              >
                <ExternalLink size={16} className="text-muted/60 hover:text-muted transition-colors" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Col 2 — Quick links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              {t('quickLinks')}
            </h3>
            <ul className="flex flex-col gap-2" role="list">
              {QUICK_LINKS.map((key) => (
                <li key={key}>
                  <Link
                    href={`/${locale}/${key}`}
                    className="text-sm text-muted transition-colors hover:text-brand-teal"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Community links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              {t('communityLinks')}
            </h3>
            <ul className="flex flex-col gap-2" role="list">
              <li>
                <a
                  href="https://t.me/ArabsInBlockchain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-brand-teal"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="https://luma.com/arabsInBlockchain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-brand-teal"
                >
                  Events (Lu.ma)
                </a>
              </li>
              <li>
                <Link
                  href={`/${locale}/privacy-policy`}
                  className="text-sm text-muted transition-colors hover:text-brand-teal"
                >
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/code-of-conduct`}
                  className="text-sm text-muted transition-colors hover:text-brand-teal"
                >
                  {t('codeOfConduct')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-surface/50 pt-6 md:flex-row">
          <p className="text-xs text-muted">
            © {year} {t('copyright')} ·{' '}
            <a
              href="https://github.com/ArabsInBlockchain"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-teal transition-colors"
            >
              {t('openSource')}
            </a>
          </p>
          <p className="text-xs text-muted">Built with ♥ by the community</p>
        </div>
      </div>
    </footer>
  );
}
