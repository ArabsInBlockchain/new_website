import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Button from '@/components/ui/Button';

const SOCIAL = [
  { label: 'X / Twitter', href: 'https://x.com/ArabsInBC', icon: '/icons/x.svg' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/arabs-in-blockchain/', icon: '/icons/linkedin.svg' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UC_5orftfcZkLNn5LmIPodAA', icon: '/icons/youtube.svg' },
  { label: 'GitHub', href: 'https://github.com/ArabsInBlockchain', icon: '/icons/github.svg' },
] as const;

export default function JoinCTA() {
  const t = useTranslations('home.join');

  return (
    <section
      className="px-4 py-20 text-center"
      style={{ background: 'var(--gradient-gold)' }}
      aria-label="Join the community"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold text-page md:text-4xl">{t('title')}</h2>
        <p className="mt-4 text-page/80">{t('subtitle')}</p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <a
            href="https://t.me/ArabsInBlockchain"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="primary"
              size="lg"
              className="bg-page text-brand-violet hover:bg-page/90 font-bold"
            >
              {t('cta')}
            </Button>
          </a>
          <div className="flex items-center gap-4 mt-2">
            {SOCIAL.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-page/20 hover:bg-page/30 transition-colors"
              >
                <Image src={icon} alt={label} width={18} height={18} className="opacity-80" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
