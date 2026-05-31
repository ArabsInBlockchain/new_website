import { useTranslations } from 'next-intl';
import { GraduationCap, Users, Globe } from 'lucide-react';
import Card from '@/components/ui/Card';
import SectionTitle from '@/components/shared/SectionTitle';

const CARDS = [
  { key: 'learn', icon: GraduationCap },
  { key: 'meet', icon: Users },
  { key: 'represent', icon: Globe },
] as const;

export default function WhatWeDo() {
  const t = useTranslations('home.whatWeDo');

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <SectionTitle title={t('title')} centered />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {CARDS.map(({ key, icon: Icon }) => (
          <Card
            key={key}
            hoverable
            className="border border-brand-violet/20 flex flex-col items-center text-center gap-4"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-violet/20">
              <Icon size={28} className="text-brand-teal" aria-hidden />
            </div>
            <h3 className="text-lg font-bold text-brand-gold">{t(`${key}.title`)}</h3>
            <p className="text-sm text-muted">{t(`${key}.description`)}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
