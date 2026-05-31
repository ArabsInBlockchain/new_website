import { useTranslations } from 'next-intl';
import { Calendar, Users, Globe, Handshake, Zap } from 'lucide-react';

const STATS = [
  { key: 'since', value: '2020', icon: Calendar },
  { key: 'members', value: null, icon: Users },
  { key: 'events', value: null, icon: Zap },
  { key: 'countries', value: null, icon: Globe },
  { key: 'partners', value: null, icon: Handshake },
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
          {STATS.map(({ key, value, icon: Icon }) => (
            <li key={key} className="flex items-center gap-3">
              <Icon size={20} className="text-brand-teal shrink-0" aria-hidden />
              <span className="text-sm font-medium text-foreground">
                {key === 'since' ? (
                  <>
                    <span className="text-muted">{t('since')} </span>
                    <span className="text-brand-teal font-bold">{value}</span>
                  </>
                ) : (
                  <span className="text-brand-teal font-bold">{t(key)}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
