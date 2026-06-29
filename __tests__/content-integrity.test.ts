import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');

function listSlugs(dir: string): string[] {
  const fullDir = path.join(contentDir, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs.readdirSync(fullDir).filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', ''));
}

function readJSON<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
}

interface EventFile {
  slug: string;
  type: string;
  status: string;
  date: string;
  speakers: string[];
  contributors: Array<{ slug: string; role_key: string }>;
  donors: string[];
}

const peopleSlugs = new Set(listSlugs('people'));
const eventSlugs = listSlugs('events');
const events: EventFile[] = eventSlugs.map((slug) =>
  readJSON(path.join(contentDir, 'events', `${slug}.json`))
);

describe('People files', () => {
  it('every person file is valid JSON with required fields', () => {
    for (const slug of peopleSlugs) {
      const person = readJSON<Record<string, unknown>>(
        path.join(contentDir, 'people', `${slug}.json`)
      );
      expect(person, `${slug}: missing is_oss_contributor`).toHaveProperty('is_oss_contributor');
      expect(person, `${slug}: missing is_donor`).toHaveProperty('is_donor');
    }
  });
});

describe('Event files', () => {
  it('every event contributor slug has a person file', () => {
    const missing: string[] = [];
    for (const event of events) {
      for (const c of event.contributors ?? []) {
        if (!peopleSlugs.has(c.slug)) {
          missing.push(`${event.slug} → contributor "${c.slug}"`);
        }
      }
    }
    expect(missing, `Missing person files:\n${missing.join('\n')}`).toHaveLength(0);
  });

  it('every event speaker slug has a person file', () => {
    const missing: string[] = [];
    for (const event of events) {
      for (const s of event.speakers ?? []) {
        if (!peopleSlugs.has(s)) {
          missing.push(`${event.slug} → speaker "${s}"`);
        }
      }
    }
    expect(missing, `Missing person files:\n${missing.join('\n')}`).toHaveLength(0);
  });

  it('every event donor slug has a person file', () => {
    const missing: string[] = [];
    for (const event of events) {
      for (const d of event.donors ?? []) {
        if (!peopleSlugs.has(d)) {
          missing.push(`${event.slug} → donor "${d}"`);
        }
      }
    }
    expect(missing, `Missing person files:\n${missing.join('\n')}`).toHaveLength(0);
  });

  it('every event file has required fields', () => {
    const required = ['slug', 'type', 'status', 'date', 'speakers', 'contributors', 'donors'];
    for (const event of events) {
      for (const field of required) {
        expect(event, `${event.slug}: missing field "${field}"`).toHaveProperty(field);
      }
    }
  });

  it('event dates are valid ISO date strings', () => {
    for (const event of events) {
      expect(
        new Date(event.date).toString(),
        `${event.slug}: invalid date "${event.date}"`
      ).not.toBe('Invalid Date');
    }
  });
});

describe('i18n messages', () => {
  const enMessages = readJSON<Record<string, unknown>>(
    path.join(process.cwd(), 'messages', 'en.json')
  );
  const arMessages = readJSON<Record<string, unknown>>(
    path.join(process.cwd(), 'messages', 'ar.json')
  );

  it('messages/en.json is valid JSON', () => {
    expect(enMessages).toBeTruthy();
  });

  it('messages/ar.json is valid JSON', () => {
    expect(arMessages).toBeTruthy();
  });

  it('ar.json has the same top-level keys as en.json', () => {
    const enKeys = Object.keys(enMessages).sort();
    const arKeys = Object.keys(arMessages).sort();
    expect(arKeys).toEqual(enKeys);
  });
});
