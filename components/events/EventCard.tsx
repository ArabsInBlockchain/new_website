import { MapPin, Monitor, Calendar, ExternalLink, Image as ImageIcon, BookOpen, ChevronRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import EventBadge from './EventBadge';
import type { EventMeta } from '@/lib/content';

export interface EventDisplay extends EventMeta {
  title: string;
  description: string;
  location: string;
  typeBadgeLabel: string;
}

interface EventCardProps {
  event: EventDisplay;
  locale: string;
  t: {
    register: string;
    addToCalendar: string;
    viewRecap: string;
    photos: string;
    viewDetails: string;
  };
  compact?: boolean;
}

const TYPE_GRADIENTS: Record<EventDisplay['type'], string> = {
  'in-person': 'from-emerald-900/80 to-brand-violet/60',
  'online': 'from-blue-900/80 to-brand-violet/60',
  'side-event': 'from-purple-900/80 to-brand-violet/60',
};

export default function EventCard({ event, locale, t, compact = false }: EventCardProps) {
  const isUpcoming = event.status === 'upcoming';
  const dateStr = formatDate(event.date, locale);

  const header = (
    <div
      className={`relative flex ${compact ? 'h-36' : 'h-48'} items-end overflow-hidden rounded-t-card p-4`}
      style={{
        background: event.banner_image
          ? `linear-gradient(135deg, var(--color-brand-violet), var(--color-brand-teal-dark))`
          : `linear-gradient(135deg, var(--color-brand-violet), var(--color-brand-teal-dark))`,
        ...(event.banner_image && {
          backgroundImage: `url(${event.banner_image})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: 'var(--color-brand-teal-dark)',
        }),
      }}
    >
      {/* Hex pattern overlay — shown only when no banner image */}
      {!event.banner_image && (
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='35' viewBox='0 0 60 52'%3E%3Cpolygon points='30,2 58,17 58,47 30,62 2,47 2,17' fill='none' stroke='%2300D4B4' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 35px',
          }}
          aria-hidden
        />
      )}

      {/* Gradient overlay — always on top for readability */}
      <div className={`absolute inset-0 bg-gradient-to-br ${TYPE_GRADIENTS[event.type]} ${event.banner_image ? 'opacity-40' : 'opacity-60'}`} aria-hidden />

      {/* Date pill — top end */}
      <div className="absolute start-4 top-4 rounded-lg bg-black/40 px-3 py-1.5 backdrop-blur-sm">
        <p className="text-xs font-medium text-white/70">{dateStr}</p>
        {event.time && (
          <p className="text-xs text-white/50">{event.time} {event.timezone.split('/')[1]?.replace('_', ' ')}</p>
        )}
      </div>

      {/* conference data kept in JSON but not displayed — inconsistent across events */}
    </div>
  );

  const body = (
    <div className="flex flex-1 flex-col gap-3 p-5">
      <div className="flex items-start justify-between gap-2">
        <EventBadge type={event.type} label={event.typeBadgeLabel} />
        {isUpcoming && (
          <span className="shrink-0 rounded-badge bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
            Upcoming
          </span>
        )}
      </div>

      <h3 className={`font-bold text-foreground ${compact ? 'text-base' : 'text-lg'} leading-snug`}>
        {event.title}
      </h3>

      {!compact && (
        <p className="line-clamp-2 text-sm text-muted">{event.description}</p>
      )}

      <div className="flex items-center gap-1.5 text-xs text-muted">
        {event.type === 'online' ? (
          <Monitor size={13} className="shrink-0" aria-hidden />
        ) : (
          <MapPin size={13} className="shrink-0" aria-hidden />
        )}
        <span>{event.location}</span>
      </div>

      {/* tags hidden — not consistent across all events; data kept in JSON for search */}

      {/* CTAs */}
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
        <Link
          href={`/${locale}/events/${event.slug}`}
          className="inline-flex items-center gap-1 rounded-btn border border-brand-violet/40 px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-brand-teal hover:text-brand-teal"
        >
          {t.viewDetails}
          <ChevronRight size={12} aria-hidden />
        </Link>

        {isUpcoming && event.registration_url && (
          <a
            href={event.registration_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-btn px-4 py-2 text-xs font-semibold text-on-gold transition-opacity hover:opacity-90"
            style={{ background: 'var(--gradient-gold)' }}
          >
            <Calendar size={13} aria-hidden />
            {t.register}
          </a>
        )}

        {isUpcoming && (
          <a
            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.date.replace(/-/g, '')}/${event.date.replace(/-/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-btn border border-foreground/20 px-3 py-2 text-xs text-muted transition-colors hover:border-brand-teal hover:text-brand-teal"
          >
            <ExternalLink size={12} aria-hidden />
            {t.addToCalendar}
          </a>
        )}

        {!isUpcoming && event.recap_url && (
          <a
            href={event.recap_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-btn border border-foreground/20 px-3 py-2 text-xs text-muted transition-colors hover:border-brand-teal hover:text-brand-teal"
          >
            <BookOpen size={12} aria-hidden />
            {t.viewRecap}
          </a>
        )}

        {!isUpcoming && event.photos_count > 0 && (
          <a
            href={`https://t.me/ArabsInBlockchain`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-btn border border-foreground/20 px-3 py-2 text-xs text-muted transition-colors hover:border-brand-teal hover:text-brand-teal"
          >
            <ImageIcon size={12} aria-hidden />
            {t.photos} ({event.photos_count})
          </a>
        )}
      </div>
    </div>
  );

  return (
    <article
      className="flex flex-col overflow-hidden rounded-card transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: 'var(--color-card-bg)',
        border: '1px solid var(--color-card-border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {header}
      {body}
    </article>
  );
}
