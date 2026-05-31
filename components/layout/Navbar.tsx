'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Logo from '@/components/shared/Logo';

const NAV_LINKS = ['events'] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightMode, setLightMode] = useState(false);

  const otherLocale = locale === 'ar' ? 'en' : 'ar';
  const localizedPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', lightMode);
    document.documentElement.style.backgroundColor = lightMode ? '#F8F7FF' : '#0D0D1A';
  }, [lightMode]);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  function isActive(href: string) {
    return pathname.startsWith(href);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface/90 backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{ boxShadow: scrolled ? 'var(--shadow-nav)' : 'none' }}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Logo height={36} />

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6" role="list">
          {NAV_LINKS.map((key) => {
            const href = `/${locale}/${key}`;
            return (
              <li key={key}>
                <Link
                  href={href}
                  className={`text-sm font-medium transition-colors hover:text-brand-teal ${
                    isActive(href) ? 'text-foreground' : 'text-muted'
                  }`}
                >
                  {t(key)}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <Link
            href={localizedPath}
            className="rounded-full border border-muted px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-brand-teal hover:text-brand-teal"
            aria-label={t('toggleLanguage')}
          >
            {otherLocale === 'ar' ? 'ع' : 'EN'}
          </Link>

          {/* Theme toggle */}
          <button
            onClick={() => setLightMode(!lightMode)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-brand-teal focus-visible:outline-brand-teal"
            aria-label={t('toggleTheme')}
          >
            {lightMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Join CTA */}
          <a
            href="https://t.me/ArabsInBlockchain"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-btn px-4 py-2 text-sm font-semibold text-on-gold transition-all hover:opacity-90 focus-visible:outline-brand-gold"
            style={{ background: 'var(--gradient-gold)', boxShadow: 'var(--shadow-cta)' }}
          >
            {t('join')}
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-foreground focus-visible:outline-brand-teal md:hidden"
            aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-surface bg-surface/95 backdrop-blur-md md:hidden">
          <ul className="flex flex-col px-4 py-4 gap-1" role="list">
            {NAV_LINKS.map((key) => {
              const href = `/${locale}/${key}`;
              return (
                <li key={key}>
                  <Link
                    href={href}
                    className={`flex min-h-[44px] items-center rounded-lg px-4 text-sm font-medium transition-colors hover:bg-brand-violet/20 hover:text-foreground ${
                      isActive(href) ? 'bg-brand-violet/10 text-foreground' : 'text-muted'
                    }`}
                  >
                    {t(key)}
                  </Link>
                </li>
              );
            })}
            <li className="mt-3 pt-3 border-t border-surface">
              <a
                href="https://t.me/ArabsInBlockchain"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center justify-center rounded-btn px-4 text-sm font-semibold text-on-gold"
                style={{ background: 'var(--gradient-gold)' }}
              >
                {t('join')}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
