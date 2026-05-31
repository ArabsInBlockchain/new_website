import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Button from '@/components/ui/Button';

const SOCIAL = [
  { label: 'Telegram', href: 'https://t.me/ArabsInBlockchain', icon: '/icons/telegram.svg', size: 22, primary: true },
  { label: 'X / Twitter', href: 'https://x.com/ArabsInBC', icon: '/icons/x.svg', size: 18, primary: false },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/arabs-in-blockchain/', icon: '/icons/linkedin.svg', size: 18, primary: false },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UC_5orftfcZkLNn5LmIPodAA', icon: '/icons/youtube.svg', size: 18, primary: false },
  { label: 'GitHub', href: 'https://github.com/ArabsInBlockchain', icon: '/icons/github.svg', size: 18, primary: false },
] as const;

export default function JoinCTA() {
  const t = useTranslations('home.join');

  return (
    <section
      className="px-4 py-20 text-center bg-page"
      aria-label="Join the community"
    >
      {/* Gold accent divider */}
      <div
        className="mx-auto mb-12"
        style={{ width: 80, height: 2, background: 'var(--gradient-gold)', borderRadius: 2 }}
        aria-hidden
      />

      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t('title')}</h2>
        <p className="mt-4 text-muted">{t('subtitle')}</p>

        <div className="mt-8 flex flex-col items-center gap-5">
          <a
            href="https://t.me/ArabsInBlockchain"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="gold" size="lg">
              {t('cta')}
            </Button>
          </a>

          {/* Social icon row — Telegram first + larger */}
          <div className="flex items-center gap-5 mt-1">
            {SOCIAL.map(({ label, href, icon, size, primary }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`transition-opacity ${primary ? 'opacity-70 hover:opacity-100' : 'opacity-40 hover:opacity-80'}`}
              >
                <Image
                  src={icon}
                  alt={label}
                  width={size}
                  height={size}
                  className="invert"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
