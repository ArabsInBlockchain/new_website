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
  contributors: Array<{ slug: string; role_key: string }>;
}

export function getEventMeta(slug: string): EventMeta {
  return readJSON<EventMeta>(path.join(contentDir, 'events', `${slug}.json`));
}

export function getAllEventSlugs(): string[] {
  return listSlugs('events');
}

// ── Speakers ──────────────────────────────────────────────────────────────────

export interface SpeakerMeta {
  slug: string;
  photo: string;
  twitter: string;
  linkedin: string;
}

export function getSpeakerMeta(slug: string): SpeakerMeta {
  return { slug, ...readJSON<Omit<SpeakerMeta, 'slug'>>(path.join(contentDir, 'speakers', `${slug}.json`)) };
}

export function getAllSpeakerSlugs(): string[] {
  return listSlugs('speakers');
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

// ── Contributors ──────────────────────────────────────────────────────────────

export interface ContributorMeta {
  slug: string;
  photo: string;
  twitter: string;
  linkedin: string;
  github?: string;
}

export type ContributorRole = 'organizer' | 'volunteer';

export interface ContributorEvent {
  role: ContributorRole;
  eventMeta: EventMeta;
}

export function getContributorMeta(slug: string): ContributorMeta {
  return { slug, ...readJSON<Omit<ContributorMeta, 'slug'>>(path.join(contentDir, 'contributors', `${slug}.json`)) };
}

export function getAllContributorSlugs(): string[] {
  return listSlugs('contributors');
}

export function getContributorEvents(contributorSlug: string): ContributorEvent[] {
  const result: ContributorEvent[] = [];
  for (const slug of getAllEventSlugs()) {
    const meta = getEventMeta(slug);
    const contrib = meta.contributors.find((c) => c.slug === contributorSlug);
    if (contrib) {
      result.push({ role: contrib.role_key as ContributorRole, eventMeta: meta });
    }
  }
  return result.sort(
    (a, b) => new Date(b.eventMeta.date).getTime() - new Date(a.eventMeta.date).getTime(),
  );
}

// Transforms a Cloudinary URL to use face-detected square crop.
// Passes non-Cloudinary URLs through unchanged.
export function avatarUrl(photo: string, size = 400): string {
  if (!photo || !photo.includes('res.cloudinary.com')) return photo;
  return photo.replace('/image/upload/', `/image/upload/c_fill,g_face,w_${size},h_${size}/`);
}
