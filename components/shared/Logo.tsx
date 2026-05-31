import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface LogoProps {
  height?: number;
  width?: number;
  className?: string;
  linkable?: boolean;
  /** Always render the light (white-text) logo regardless of theme — use on always-dark surfaces like the footer */
  forceLight?: boolean;
}

export default function Logo({ height = 40, width: widthProp, className = '', linkable = true, forceLight = false }: LogoProps) {
  const locale = useLocale();

  const imgStyle = widthProp
    ? { width: widthProp, height: 'auto' as const }
    : { height, width: 'auto' as const };

  const h = height ?? 40;
  const w = widthProp ?? h * 4;

  const content = forceLight ? (
    /* Always-dark surface: only ever show the white-text logo */
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src="/logo-light.png"
        alt="Arabs in Blockchain — العرب × بلوكتشين"
        height={h}
        width={w}
        priority
        style={imgStyle}
      />
    </span>
  ) : (
    <span className={`inline-flex items-center ${className}`}>
      {/*
       * logo-light.png = white/light text → shown on dark backgrounds (default)
       * logo-dark.png  = dark text       → shown on light backgrounds
       * Toggle via .light-mode class on <html> added by the theme toggle.
       */}
      <Image
        src="/logo-light.png"
        alt="Arabs in Blockchain — العرب × بلوكتشين"
        height={h}
        width={w}
        className="block [.light-mode_&]:hidden"
        priority
        style={imgStyle}
      />
      <Image
        src="/logo-dark.png"
        alt="Arabs in Blockchain — العرب × بلوكتشين"
        height={h}
        width={w}
        className="hidden [.light-mode_&]:block"
        priority
        style={imgStyle}
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
