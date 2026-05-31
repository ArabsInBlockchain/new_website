import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Ticket, BookOpen, Coins, Briefcase } from 'lucide-react';
import Card from '@/components/ui/Card';
import SectionTitle from '@/components/shared/SectionTitle';
import Button from '@/components/ui/Button';

const ITEMS = [
  { key: 'tickets', icon: Ticket },
  { key: 'scholarships', icon: BookOpen },
  { key: 'grants', icon: Coins },
  { key: 'jobs', icon: Briefcase },
] as const;

const STRIP_KEYS = ['item1', 'item2', 'item3', 'item4'] as const;

export default function OpportunitiesTeaser() {
  const t = useTranslations('home.opportunities');
  const locale = useLocale();

  return (
    <section className="px-4 py-20" style={{ background: 'var(--opportunities-bg)' }}>
      <div className="mx-auto max-w-7xl md:px-8">
        <SectionTitle title={t('title')} centered />
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-muted leading-relaxed">
          {t('intro')}
        </p>

        {/* Proof strip */}
        <div className="mb-12 mx-auto max-w-xl rounded-2xl border border-brand-violet/20 bg-brand-violet/10 px-6 py-5">
          <ul className="flex flex-col gap-2">
            {STRIP_KEYS.map((key) => (
              <li key={key} className="text-sm text-foreground">
                {t(`strip.${key}`)}
              </li>
            ))}
          </ul>
          <p className="mt-4 pt-4 border-t border-brand-violet/20 text-xs text-center text-muted italic">
            {t('strip.note')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ key, icon: Icon }) => (
            <Card key={key} className="flex flex-col items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-violet/20">
                <Icon size={24} className="text-brand-gold" aria-hidden />
              </div>
              <h3 className="font-bold text-foreground">{t(`${key}.title`)}</h3>
              <p className="text-sm text-muted">{t(`${key}.description`)}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href={`/${locale}/community`}>
            <Button variant="outline" size="lg">{t('cta')}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
