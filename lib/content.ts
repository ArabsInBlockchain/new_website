import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');

function readJSON<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

function listSlugs(dir: string): string[] {
  const fullDir = path.join(contentDir, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''));
}

// ── Events ────────────────────────────────────────────────────────────────────

export interface EventMeta {
  slug: string;
  type: 'in-person' | 'online' | 'side-event';
  status: 'upcoming' | 'past';
  date: string;
  time: string;
  timezone: string;
  platform: string | null;
  conference: string | null;
  registration_url: string;
  recap_url: string | null;
  photos_count: number;
  banner_image: string;
  tags: string[];
  speakers: string[];
  mentors: string[];
  contributors: Array<{ slug: string; role_key: string }>;
  ctf_authors: Array<{ slug: string; track_key: string }>;
  donors: string[];
}

export function getEventMeta(slug: string): EventMeta {
  return readJSON<EventMeta>(path.join(contentDir, 'events', `${slug}.json`));
}

export function getAllEventSlugs(): string[] {
  return listSlugs('events');
}

// ── Partners ──────────────────────────────────────────────────────────────────

export interface PartnerMeta {
  slug: string;
  logo: string;
  website: string;
  type: 'technology' | 'event' | 'education' | 'sponsor';
  status: 'current' | 'past';
  since: string;
}

export function getPartnerMeta(slug: string): PartnerMeta {
  return { slug, ...readJSON<Omit<PartnerMeta, 'slug'>>(path.join(contentDir, 'partners', `${slug}.json`)) };
}

export function getAllPartnerSlugs(): string[] {
  return listSlugs('partners');
}

// ── Team ──────────────────────────────────────────────────────────────────────

export interface TeamMemberMeta {
  slug: string;
  photo: string;
  twitter: string;
  linkedin: string;
  type: 'core' | 'volunteer';
}

export function getTeamMemberMeta(slug: string): TeamMemberMeta {
  return { slug, ...readJSON<Omit<TeamMemberMeta, 'slug'>>(path.join(contentDir, 'team', `${slug}.json`)) };
}

export function getAllTeamSlugs(): string[] {
  return listSlugs('team');
}

// ── People (all community members) ───────────────────────────────────────────

export interface PersonMeta {
  slug: string;
  photo: string;
  photo_gravity?: string;
  twitter: string;
  linkedin: string;
  github?: string;
  is_oss_contributor: boolean;
  is_donor: boolean;
  donor_since?: string;
}

// Role a person held in a specific event (as a contributor/volunteer)
export type ContributorRole = 'organizer' | 'volunteer';

export interface ContributorEvent {
  role: ContributorRole;
  eventMeta: EventMeta;
}

export function getPersonMeta(slug: string): PersonMeta {
  return { slug, ...readJSON<Omit<PersonMeta, 'slug'>>(path.join(contentDir, 'people', `${slug}.json`)) };
}

export function getAllPeopleSlugs(): string[] {
  return listSlugs('people');
}

// Events where this person appears in event.contributors[] (organizer or volunteer)
export function getVolunteerEvents(personSlug: string): ContributorEvent[] {
  const result: ContributorEvent[] = [];
  for (const slug of getAllEventSlugs()) {
    const meta = getEventMeta(slug);
    const contrib = meta.contributors.find((c) => c.slug === personSlug);
    if (contrib) {
      result.push({ role: contrib.role_key as ContributorRole, eventMeta: meta });
    }
  }
  return result.sort(
    (a, b) => new Date(b.eventMeta.date).getTime() - new Date(a.eventMeta.date).getTime(),
  );
}

// Events where this person appears in event.speakers[]
export function getSpeakerEventMetas(personSlug: string): EventMeta[] {
  return getAllEventSlugs()
    .map(getEventMeta)
    .filter((meta) => meta.speakers.includes(personSlug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Events where this person appears in event.mentors[]
export function getMentorEventMetas(personSlug: string): EventMeta[] {
  return getAllEventSlugs()
    .map(getEventMeta)
    .filter((meta) => meta.mentors?.includes(personSlug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// All unique person slugs who appear in any event.mentors[]
export function getAllMentorSlugs(): string[] {
  const slugs = new Set<string>();
  for (const slug of getAllEventSlugs()) {
    getEventMeta(slug).mentors?.forEach((s) => slugs.add(s));
  }
  return [...slugs];
}

// Events where this person appears in event.ctf_authors[]
export function getCTFAuthorEventMetas(personSlug: string): EventMeta[] {
  return getAllEventSlugs()
    .map(getEventMeta)
    .filter((meta) => meta.ctf_authors?.some((a) => a.slug === personSlug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Events where this person appears in event.donors[]
export function getDonorEventMetas(personSlug: string): EventMeta[] {
  return getAllEventSlugs()
    .map(getEventMeta)
    .filter((meta) => meta.donors.includes(personSlug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// All unique person slugs who appear in any event.contributors[]
export function getAllVolunteerSlugs(): string[] {
  const slugs = new Set<string>();
  for (const slug of getAllEventSlugs()) {
    getEventMeta(slug).contributors.forEach((c) => slugs.add(c.slug));
  }
  return [...slugs];
}

// All unique person slugs who appear in any event.speakers[]
export function getAllSpeakerSlugs(): string[] {
  const slugs = new Set<string>();
  for (const slug of getAllEventSlugs()) {
    getEventMeta(slug).speakers.forEach((s) => slugs.add(s));
  }
  return [...slugs];
}

// All person slugs where is_donor: true
export function getAllDonorSlugs(): string[] {
  return getAllPeopleSlugs().filter((slug) => {
    try { return getPersonMeta(slug).is_donor; } catch { return false; }
  });
}

// All person slugs where is_oss_contributor: true
export function getAllOssContributorSlugs(): string[] {
  return getAllPeopleSlugs().filter((slug) => {
    try { return getPersonMeta(slug).is_oss_contributor; } catch { return false; }
  });
}

// Transforms a Cloudinary URL to use face-detected square crop.
// Passes non-Cloudinary URLs through unchanged.
export function avatarUrl(photo: string, size = 400, gravity = 'auto:face'): string {
  if (!photo || !photo.includes('res.cloudinary.com')) return photo;
  return photo.replace('/image/upload/', `/image/upload/c_fill,g_${gravity},w_${size},h_${size}/`);
}
