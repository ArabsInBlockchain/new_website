'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Search, LayoutGrid, List } from 'lucide-react';
import Fuse from 'fuse.js';
import EventCard, { type EventDisplay } from './EventCard';

type FilterType = 'all' | 'in-person' | 'online' | 'side-event';

interface EventsClientProps {
  upcoming: EventDisplay[];
  past: EventDisplay[];
  locale: string;
}

export default function EventsClient({ upcoming, past, locale }: EventsClientProps) {
  const t = useTranslations('events');
  const [filter, setFilter] = useState<FilterType>('all');
  const [query, setQuery] = useState('');
  const [gridView, setGridView] = useState(true);

  const cardT = {
    register: t('card.register'),
    addToCalendar: t('card.addToCalendar'),
    viewRecap: t('card.viewRecap'),
    photos: t('card.photos'),
    viewDetails: t('detail.viewDetails'),
  };

  const FILTERS: { key: FilterType; label: string }[] = [
    { key: 'all', label: t('types.all') },
    { key: 'in-person', label: t('types.inPerson') },
    { key: 'online', label: t('types.online') },
    { key: 'side-event', label: t('types.sideEvent') },
  ];

  const allEvents = useMemo(() => [...upcoming, ...past], [upcoming, past]);

  // Fuse.js instance — recreated only when events change
  const fuse = useMemo(
    () =>
      new Fuse(allEvents, {
        keys: ['title', 'description', 'location', 'tags', 'conference'],
        threshold: 0.35,
        includeScore: true,
      }),
    [allEvents],
  );

  const filtered = useMemo(() => {
    let pool = query.trim()
      ? fuse.search(query.trim()).map((r) => r.item)
      : allEvents;

    if (filter !== 'all') {
      pool = pool.filter((e) => e.type === filter);
    }
    return pool;
  }, [query, filter, fuse, allEvents]);

  const filteredUpcoming = filtered.filter((e) => e.status === 'upcoming');
  const filteredPast = filtered.filter((e) => e.status === 'past');

  // Group past by year descending
  const pastByYear = useMemo(() => {
    const map = new Map<number, EventDisplay[]>();
    filteredPast.forEach((e) => {
      const y = new Date(e.date).getFullYear();
      if (!map.has(y)) map.set(y, []);
      map.get(y)!.push(e);
    });
    return Array.from(map.entries()).sort(([a], [b]) => b - a);
  }, [filteredPast]);

  const isEmpty = filteredUpcoming.length === 0 && filteredPast.length === 0;

  return (
    <>
      {/* Filter + Search bar */}
      <div className="sticky top-[72px] z-30 border-b border-muted/20 bg-page/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Type filter chips */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
              {FILTERS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`rounded-badge px-3 py-1.5 text-xs font-semibold transition-all ${
                    filter === key
                      ? 'bg-brand-violet text-white shadow-md'
                      : 'border border-brand-violet/25 text-foreground hover:border-brand-teal hover:text-brand-teal'
                  }`}
                  aria-pressed={filter === key}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Search + view toggle */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search
                  size={14}
                  className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-muted"
                  aria-hidden
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('search')}
                  className="h-9 w-48 rounded-input border border-brand-violet/25 bg-surface [.light-mode_&]:bg-white ps-8 pe-3 text-xs text-foreground placeholder:text-muted/60 focus:border-brand-teal focus:outline-none sm:w-56"
                  aria-label={t('search')}
                />
              </div>

              {/* Grid / List toggle */}
              <div className="flex overflow-hidden rounded-input border border-brand-violet/25">
                <button
                  onClick={() => setGridView(true)}
                  className={`flex h-9 w-9 items-center justify-center transition-colors ${
                    gridView ? 'bg-brand-violet text-white' : 'text-muted hover:bg-brand-violet/10 hover:text-brand-violet'
                  }`}
                  aria-label={t('gridView')}
                  aria-pressed={gridView}
                >
                  <LayoutGrid size={15} aria-hidden />
                </button>
                <button
                  onClick={() => setGridView(false)}
                  className={`flex h-9 w-9 items-center justify-center transition-colors ${
                    !gridView ? 'bg-brand-violet text-white' : 'text-muted hover:bg-brand-violet/10 hover:text-brand-violet'
                  }`}
                  aria-label={t('listView')}
                  aria-pressed={!gridView}
                >
                  <List size={15} aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-4xl">🔍</p>
            <p className="mt-4 text-lg font-semibold text-foreground">{t('noResults')}</p>
          </div>
        ) : (
          <>
            {/* Upcoming */}
            {filteredUpcoming.length > 0 && (
              <section className="mb-14" aria-labelledby="upcoming-heading">
                <h2 id="upcoming-heading" className="mb-6 text-xl font-bold text-foreground md:text-2xl">
                  {t('upcoming.title')}
                </h2>
                <div
                  className={
                    gridView
                      ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
                      : 'flex flex-col gap-4'
                  }
                >
                  {filteredUpcoming.map((event) => (
                    <EventCard
                      key={event.slug}
                      event={event}
                      locale={locale}
                      t={cardT}
                      compact={!gridView}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Past — grouped by year */}
            {pastByYear.length > 0 && (
              <section aria-labelledby="past-heading">
                <h2 id="past-heading" className="mb-8 text-xl font-bold text-foreground md:text-2xl">
                  {t('past.title')}
                </h2>
                <div className="flex flex-col gap-12">
                  {pastByYear.map(([year, events]) => (
                    <div key={year}>
                      {/* Year divider */}
                      <div className="mb-6 flex items-center gap-4">
                        <span className="text-2xl font-bold text-card-title">{year}</span>
                        <div className="h-px flex-1 bg-brand-violet/20" />
                      </div>
                      <div
                        className={
                          gridView
                            ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
                            : 'flex flex-col gap-4'
                        }
                      >
                        {events.map((event) => (
                          <EventCard
                            key={event.slug}
                            event={event}
                            locale={locale}
                            t={cardT}
                            compact={!gridView}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* Host CTA */}
        <div className="mt-16 rounded-card border border-brand-violet/20 p-8 text-center"
          style={{ background: 'var(--gradient-card)' }}>
          <p className="text-lg font-semibold text-foreground">{t('host.title')}</p>
          <a
            href={`https://t.me/ArabsInBlockchain`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-btn border border-brand-teal px-5 py-2.5 text-sm font-semibold text-brand-teal transition-colors hover:bg-brand-teal hover:text-page"
          >
            {t('host.cta')}
          </a>
        </div>
      </div>
    </>
  );
}
