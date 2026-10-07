import { useTranslations } from 'next-intl';
import { Logo } from '@/components/ui/logo';
import { LocaleSwitcher } from '@/components/layout/locale-switcher';
import { SOCIAL_LINKS } from './nav-links';

const LEGAL_LINKS = [
  { key: 'terms', href: '#' },
  { key: 'privacy', href: '#' },
] as const;

export function MarketingFooter() {
  const t = useTranslations('landing.footer');
  const linkClass = 'text-ink-2 hover:text-ink';

  return (
    <footer className="mx-auto flex max-w-page flex-col gap-[18px] px-5 pt-8 pb-12 text-[13px] text-ink-2 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-6 md:px-8 md:pt-10 md:pb-14 md:text-sm md:shadow-[0_-1px_0_var(--divider-page)]">
      <span className="flex items-center gap-2.5 font-medium text-ink max-md:text-sm">
        <Logo size="sm" className="gap-2.5 max-md:text-sm" />
        <span className="ml-1.5 font-normal text-ink-3">© 2026</span>
      </span>
      <div className="flex flex-wrap items-center gap-5 md:gap-7">
        {[...LEGAL_LINKS, ...SOCIAL_LINKS].map((l) => (
          <a key={l.key} href={l.href} className={linkClass}>{t(l.key)}</a>
        ))}
        <LocaleSwitcher />
      </div>
    </footer>
  );
}
