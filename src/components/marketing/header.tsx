import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/lib/constants';
import { Logo } from '@/components/ui/logo';
import { ButtonLink } from '@/components/ui/button';
import { LocaleSwitcher } from '@/components/layout/locale-switcher';
import { LANDING_NAV } from './nav-links';
import { MobileMenu } from './mobile-menu';

export function MarketingHeader() {
  const t = useTranslations('landing.header');

  return (
    <header className="sticky top-0 z-20 bg-[rgba(250,250,250,.78)] backdrop-blur-[20px] backdrop-saturate-150">
      <div className="mx-auto flex h-14 max-w-page items-center gap-12 px-5 md:h-(--header-h) md:px-8">
        <Link href={ROUTES.home} aria-label="CEFR Mock">
          <Logo size="lg" className="max-md:hidden" />
          <Logo size="md" className="md:hidden" />
        </Link>

        <nav className="flex flex-1 flex-wrap gap-1 text-sm max-lg:hidden" aria-label={t('navLabel')}>
          {LANDING_NAV.map((item) => (
            <a key={item.key} href={item.href} className="flex h-[34px] items-center rounded-sm px-3 text-ink-2 hover:bg-hover hover:text-ink">
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <LocaleSwitcher className="mr-2 max-md:hidden" />
          <ButtonLink href={ROUTES.login} variant="ghost" size="xs" className="h-9 rounded-sm px-3 md:h-[38px] md:rounded-[11px] md:px-[14px]">
            {t('login')}
          </ButtonLink>
          <ButtonLink href={ROUTES.start} size="xs" className="h-[38px] rounded-[11px] px-4 shadow-[inset_0_1px_0_rgba(255,255,255,.22),0_1px_2px_oklch(0.4_0.12_140/.3)] max-md:hidden">
            {t('start')}
          </ButtonLink>
          <MobileMenu />
        </div>
      </div>
      <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(20,22,30,.08)_20%,rgba(20,22,30,.08)_80%,transparent)]" />
    </header>
  );
}
