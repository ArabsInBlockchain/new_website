import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Calendar } from 'lucide-react';

const PLATFORM_STATS = [
  { key: 'telegram', icon: '/icons/telegram.svg', href: 'https://t.me/ArabsInBlockchain' },
  { key: 'twitter', icon: '/icons/x.svg', href: 'https://x.com/ArabsInBC' },
  { key: 'linkedin', icon: '/icons/linkedin.svg', href: 'https://www.linkedin.com/company/arabs-in-blockchain/' },
  { key: 'luma', icon: '/icons/luma.svg', href: 'https://luma.com/arabsInBlockchain' },
] as const;

export default function StatsBar() {
  const t = useTranslations('home.stats');

  return (
    <section
      className="py-8"
      style={{ background: 'var(--gradient-stats)' }}
      aria-label="Community stats"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <ul
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          role="list"
        >
          {/* Since year */}
          <li className="flex items-center gap-3">
            <Calendar size={20} className="text-brand-teal shrink-0" aria-hidden />
            <span className="text-sm font-medium text-foreground">
              <span className="text-muted">{t('since')} </span>
              <span className="text-brand-teal font-bold">2020</span>
            </span>
          </li>

          {/* Platform stats */}
          {PLATFORM_STATS.map(({ key, icon, href }) => (
            <li key={key}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group"
              >
                <Image
                  src={icon}
                  alt={key}
                  width={18}
                  height={18}
                  className="opacity-70 group-hover:opacity-100 transition-opacity invert"
                />
                <span className="text-brand-teal font-bold text-sm group-hover:underline">
                  {t(key)}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
