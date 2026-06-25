import Link from 'next/link';
import Image from 'next/image';
import { User } from 'lucide-react';
import type { ContributorMeta, ContributorEvent } from '@/lib/content';
import { avatarUrl } from '@/lib/content';

interface Props {
  meta: ContributorMeta;
  name: string;
  events: ContributorEvent[];
  locale: string;
  t: { organizer: string; volunteer: string };
}

const MAX_DOTS = 12;

export default function ContributorCard({ meta, name, events, locale, t }: Props) {
  const roles = [...new Set(events.map((e) => e.role))];
  const visibleDots = events.slice(0, MAX_DOTS);
  const extra = events.length - MAX_DOTS;

  return (
    <Link
      href={`/${locale}/community/contributors/${meta.slug}`}
      className="group flex flex-col items-center gap-4 rounded-card p-6 text-center transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: 'var(--color-card-bg)',
        border: '1px solid var(--color-card-border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Avatar with gradient ring */}
      <div
        className="rounded-full p-0.5"
        style={{ background: 'linear-gradient(135deg, var(--color-brand-gold), var(--color-brand-teal))' }}
      >
        <div
          className="relative h-20 w-20 overflow-hidden rounded-full"
          style={{ backgroundColor: 'var(--color-bg-dark)' }}
        >
          {meta.photo ? (
            <Image src={avatarUrl(meta.photo, 200)} alt={name} fill className="object-cover" sizes="80px" />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ background: 'var(--gradient-cta)' }}
            >
              <User size={32} className="text-white/60" aria-hidden />
            </div>
          )}
        </div>
      </div>

      {/* Name */}
      <h3 className="text-base font-bold text-foreground transition-colors group-hover:text-brand-teal">
        {name}
      </h3>

      {/* Role badges */}
      <div className="flex flex-wrap justify-center gap-2">
        {roles.map((role) => (
          <span
            key={role}
            className="rounded-badge px-2.5 py-0.5 text-xs font-semibold"
            style={
              role === 'organizer'
                ? { backgroundColor: 'color-mix(in srgb, var(--color-brand-gold) 15%, transparent)', color: 'var(--color-brand-gold)' }
                : { backgroundColor: 'color-mix(in srgb, var(--color-brand-teal) 15%, transparent)', color: 'var(--color-brand-teal)' }
            }
          >
            {role === 'organizer' ? t.organizer : t.volunteer}
          </span>
        ))}
      </div>

      {/* Activity dots — one per event, gold=organizer teal=volunteer */}
      {events.length > 0 && (
        <div
          className="flex flex-wrap justify-center gap-1.5"
          role="img"
          aria-label={`${events.length} events`}
        >
          {visibleDots.map((e, i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor:
                  e.role === 'organizer' ? 'var(--color-brand-gold)' : 'var(--color-brand-teal)',
              }}
            />
          ))}
          {extra > 0 && <span className="text-xs text-muted">+{extra}</span>}
        </div>
      )}

      {/* Event count */}
      <p className="text-xs text-muted">
        {events.length} {events.length === 1 ? 'Event' : 'Events'}
      </p>
    </Link>
  );
}
