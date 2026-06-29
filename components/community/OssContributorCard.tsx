import Image from 'next/image';
import { User, GitBranch, ExternalLink } from 'lucide-react';
import type { PersonMeta } from '@/lib/content';
import { avatarUrl } from '@/lib/content';

interface Props {
  meta: PersonMeta;
  name: string;
  title?: string;
}

export default function OssContributorCard({ meta, name, title }: Props) {
  const githubProfileUrl = meta.github ? `https://github.com/${meta.github}` : null;
  const contributionsUrl = meta.github
    ? `https://github.com/search?q=org%3AArabsInBlockchain+author%3A${meta.github}&type=pullrequests`
    : null;

  return (
    <div
      className="flex flex-col items-center gap-4 rounded-card p-6 text-center"
      style={{
        backgroundColor: 'var(--color-card-bg)',
        border: '1px solid var(--color-card-border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Avatar */}
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

      {/* Name + title */}
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-bold text-foreground">{name}</h3>
        {title && <p className="text-xs text-muted">{title}</p>}
      </div>

      {/* GitHub handle */}
      {meta.github && (
        <a
          href={githubProfileUrl!}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-badge px-3 py-1 text-xs font-semibold transition-opacity hover:opacity-80"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-brand-teal) 15%, transparent)',
            color: 'var(--color-brand-teal)',
          }}
          aria-label={`GitHub: ${meta.github}`}
        >
          <GitBranch size={11} aria-hidden />
          @{meta.github}
        </a>
      )}

      {/* Contributions link */}
      {contributionsUrl && (
        <a
          href={contributionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-muted transition-colors hover:text-brand-teal"
          aria-label="View contributions to ArabsInBlockchain"
        >
          View contributions
          <ExternalLink size={10} aria-hidden />
        </a>
      )}

      {/* Social links */}
      {(meta.twitter || meta.linkedin) && (
        <div className="flex gap-3 text-xs text-muted">
          {meta.twitter && (
            <a
              href={`https://x.com/${meta.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brand-teal"
              aria-label="X / Twitter"
            >
              X
            </a>
          )}
          {meta.linkedin && (
            <a
              href={`https://linkedin.com/in/${meta.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brand-teal"
              aria-label="LinkedIn"
            >
              in
            </a>
          )}
        </div>
      )}
    </div>
  );
}
