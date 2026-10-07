import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/lib/constants';
import { Logo } from '@/components/ui/logo';
import { LocaleSwitcher } from '@/components/layout/locale-switcher';
import { Reveal } from '@/components/motion/reveal';
import { LANDING_NAV, LEGAL_LINKS, SOCIAL_LINKS } from './nav-links';

const linkClass = 'group/link relative w-fit text-ink-2 hover:text-ink';
const underline = 'absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-(--t-sheet) ease-out-expo group-hover/link:origin-left group-hover/link:scale-x-100';

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3.5">
      <span className="text-[13px] font-medium text-ink">{title}</span>
      {children}
    </div>
  );
}

export function MarketingFooter() {
  const t = useTranslations('landing');
  const tf = useTranslations('landing.footer');

  return (
    <footer className="relative overflow-hidden shadow-[0_-1px_0_var(--divider-page)]">
      <div className="mx-auto flex max-w-page flex-col gap-12 px-5 pt-14 pb-10 text-sm md:px-8 md:pt-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-4">
            <Link href={ROUTES.home} aria-label="CEFR Mock" className="w-fit"><Logo /></Link>
            <p className="m-0 max-w-[300px] leading-[1.6] text-ink-2">{tf('tagline')}</p>
            <span className="flex w-fit items-center gap-2 rounded-pill bg-surface px-3 py-1.5 text-xs text-ink-2 shadow-e0">
              <span className="relative grid size-2 place-items-center">
                <span className="absolute size-2 animate-ping-soft rounded-full bg-green" />
                <span className="size-2 rounded-full bg-green" />
              </span>
              {tf('status')}
            </span>
          </div>
          <Column title={tf('product')}>
            {LANDING_NAV.map((l) => (
              <a key={l.key} href={l.href} className={linkClass}>{t(`header.nav.${l.key}`)}<span className={underline} /></a>
            ))}
          </Column>
          <Column title={tf('resources')}>
            {SOCIAL_LINKS.map((l) => (
              <a key={l.key} href={l.href} className={linkClass}>{tf(l.key)}<span className={underline} /></a>
            ))}
            <a href="#faq" className={linkClass}>{tf('help')}<span className={underline} /></a>
          </Column>
          <Column title={tf('legal')}>
            {LEGAL_LINKS.map((l) => (
              <a key={l.key} href={l.href} className={linkClass}>{tf(l.key)}<span className={underline} /></a>
            ))}
          </Column>
        </div>
        <div className="flex flex-col-reverse gap-4 pt-6 text-[13px] text-ink-3 shadow-[0_-1px_0_var(--divider-page)] md:flex-row md:items-center md:justify-between">
          <span>© 2026 CEFR Mock. {tf('rights')}</span>
          <LocaleSwitcher side="top" />
        </div>
      </div>
      <Reveal y={40} aria-hidden className="pointer-events-none mx-auto -mb-[0.22em] max-w-page px-5 text-center text-[clamp(64px,17vw,220px)] leading-[0.8] font-medium tracking-[-0.07em] text-transparent select-none md:px-8">
        <span className="bg-[linear-gradient(180deg,rgba(20,22,30,.09),rgba(20,22,30,0)_85%)] bg-clip-text">CEFR Mock</span>
      </Reveal>
    </footer>
  );
}
