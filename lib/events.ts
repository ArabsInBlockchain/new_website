import { getAllEventSlugs, getEventMeta, type EventMeta } from './content';

export function getUpcomingEvents(): EventMeta[] {
  return getAllEventSlugs()
    .map(getEventMeta)
    .filter((e) => e.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getPastEvents(): EventMeta[] {
  return getAllEventSlugs()
    .map(getEventMeta)
    .filter((e) => e.status === 'past')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getEventsByYear(year: number): EventMeta[] {
  return getPastEvents().filter(
    (e) => new Date(e.date).getFullYear() === year,
  );
}
