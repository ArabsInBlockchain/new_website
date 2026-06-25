import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import type { ContributorEvent } from '@/lib/content';
import { formatDate } from '@/lib/utils';

interface Props {
  events: ContributorEvent[];
  eventTitles: Record<string, { title: string; location: string }>;
  locale: string;
  t: { organizer: string; volunteer: string; viewEvent: string };
}

export default function ContributionTimeline({ events, eventTitles, locale, t }: Props) {
  if (events.length === 0) return null;

  return (
    <ol className="space-y-4">
      {events.map((e) => {
        const data = eventTitles[e.eventMeta.slug] ?? { title: e.eventMeta.slug, location: '' };
        const link = e.eventMeta.registration_url || e.eventMeta.recap_url;
        const isOrganizer = e.role === 'organizer';

        return (
          <li
            key={e.eventMeta.slug}
            className="flex items-stretch gap-4 overflow-hidden rounded-card"
            style={{
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--color-card-border)',
            }}
          >
            {/* Role color accent bar */}
            <div
              className="w-1 shrink-0"
              style={{
                backgroundColor: isOrganizer
                  ? 'var(--color-brand-gold)'
                  : 'var(--color-brand-violet)',
              }}
              aria-hidden
            />

            <div className="flex flex-1 flex-col gap-2 py-4 pe-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h4 className="text-sm font-semibold text-foreground">{data.title}</h4>
                <span
                  className="shrink-0 rounded-badge px-2.5 py-0.5 text-xs font-semibold"
                  style={
                    isOrganizer
                      ? { backgroundColor: 'color-mix(in srgb, var(--color-brand-gold) 15%, transparent)', color: 'var(--color-brand-gold)' }
                      : { backgroundColor: 'var(--badge-volunteer-bg)', color: 'var(--badge-volunteer-color)' }
                  }
                >
                  {isOrganizer ? t.organizer : t.volunteer}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-foreground/60">
                <span className="flex items-center gap-1">
                  <Calendar size={11} aria-hidden />
                  {formatDate(e.eventMeta.date, locale)}
                </span>
                {data.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={11} aria-hidden />
                    {data.location}
                  </span>
                )}
              </div>
            </div>

            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center pe-4 text-muted transition-colors hover:text-brand-teal"
                aria-label={t.viewEvent}
              >
                <ExternalLink size={16} aria-hidden />
              </a>
            )}
          </li>
        );
      })}
    </ol>
  );
}
