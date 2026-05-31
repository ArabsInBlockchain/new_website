import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface LogoProps {
  height?: number;
  className?: string;
  linkable?: boolean;
}

export default function Logo({ height = 40, className = '', linkable = true }: LogoProps) {
  const locale = useLocale();

  const content = (
    <span className={`inline-flex items-center ${className}`}>
      {/*
       * logo-light.png = white/light text → shown on dark backgrounds (default)
       * logo-dark.png  = dark text       → shown on light backgrounds
       * Toggle via .light-mode class on <html> added by the theme toggle.
       */}
      <Image
        src="/logo-light.png"
        alt="Arabs in Blockchain — العرب × بلوكتشين"
        height={height}
        width={height * 4}
        className="block [.light-mode_&]:hidden"
        priority
        style={{ height, width: 'auto' }}
      />
      <Image
        src="/logo-dark.png"
        alt="Arabs in Blockchain — العرب × بلوكتشين"
        height={height}
        width={height * 4}
        className="hidden [.light-mode_&]:block"
        priority
        style={{ height, width: 'auto' }}
      />
    </span>
  );

  if (!linkable) return content;

  return (
    <Link href={`/${locale}`} aria-label="Arabs in Blockchain — home">
      {content}
    </Link>
  );
}
