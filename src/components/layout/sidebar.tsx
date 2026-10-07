'use client';

import { useId } from 'react';
import { useTranslations } from 'next-intl';
import { ChartLine, House, Layers, Sparkles, UserRound, type LucideIcon } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { ROUTES } from '@/lib/constants';
import { MOCK_USER } from '@/lib/mock/user';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui/icon';
import { Logo } from '@/components/ui/logo';
import { ButtonLink } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ActivePill } from '@/components/motion/active-pill';

type NavItem = { key: 'home' | 'tests' | 'progress' | 'profile'; href: string; icon: LucideIcon; match: (p: string) => boolean };

const NAV: readonly NavItem[] = [
  { key: 'home', href: ROUTES.dashboard, icon: House, match: (p) => p === ROUTES.dashboard },
  { key: 'tests', href: ROUTES.catalog, icon: Layers, match: (p) => p.startsWith(ROUTES.catalog) || p.startsWith('/app/results') },
  { key: 'progress', href: ROUTES.progress, icon: ChartLine, match: (p) => p.startsWith(ROUTES.progress) },
  { key: 'profile', href: ROUTES.settings, icon: UserRound, match: (p) => p.startsWith(ROUTES.settings) || p.startsWith(ROUTES.billing) },
];

function UpsellCard() {
  const t = useTranslations('app.upsell');
  return (
    <div className="border-beam relative mt-auto flex animate-fade-up flex-col gap-2.5 overflow-hidden rounded-card-sm bg-surface p-4 shadow-e0 [--beam-duration:7s] [animation-delay:300ms]">
      <span className="pointer-events-none absolute -top-10 -right-10 size-28 rounded-full bg-[radial-gradient(closest-side,var(--green-100),transparent)]" />
      <span className="relative grid size-8 place-items-center rounded-[10px] bg-green-100 text-green-text">
        <Icon as={Sparkles} size={15} />
      </span>
      <span className="relative text-sm font-medium">{t('title')}</span>
      <span className="relative text-xs leading-normal text-ink-2">{t('text')}</span>
      <ButtonLink href={ROUTES.billing} size="xs" className="relative h-9 rounded-[11px] px-3 text-[13px] shadow-[inset_0_1px_0_rgba(255,255,255,.22)]">
        {t('cta')}
      </ButtonLink>
    </div>
  );
}

export function Sidebar() {
  const t = useTranslations('app');
  const pathname = usePathname();
  const plan = MOCK_USER.planByRoute(pathname);
  const layoutId = useId();

  return (
    <aside className="sticky top-0 flex h-dvh w-(--sidebar-w) shrink-0 flex-col gap-7 bg-bg-sidebar px-4 py-6 shadow-[1px_0_0_rgba(20,22,30,.06)]">
      <Link href={ROUTES.dashboard} className="px-2 transition-opacity hover:opacity-80"><Logo /></Link>
      <nav className="flex flex-col gap-0.5" aria-label={t('nav.label')}>
        {NAV.map((item) => {
          const active = item.match(pathname);
          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'group relative isolate flex h-10 items-center gap-3 rounded-[12px] px-3 text-sm transition-colors duration-(--t-base)',
                active ? 'font-medium text-ink hover:text-ink' : 'text-ink-2 hover:bg-hover hover:text-ink',
              )}
            >
              {active && <ActivePill layoutId={layoutId} className="rounded-[12px] bg-surface shadow-[0_0_0_1px_rgba(20,22,30,.06),0_1px_2px_rgba(20,22,30,.04),0_8px_16px_-12px_rgba(20,22,30,.2)]" />}
              <Icon as={item.icon} className={cn('transition-[color,scale] duration-(--t-sheet) ease-spring group-hover:scale-110', active && 'text-green-text')} />
              {t(`nav.${item.key}`)}
            </Link>
          );
        })}
      </nav>

      {plan === 'free' && <UpsellCard />}

      <div className={cn('flex items-center gap-2.5 rounded-[12px] px-2 py-1.5 transition-colors hover:bg-hover', plan === 'pro' && 'mt-auto')}>
        <Avatar initial={MOCK_USER.initial} size={32} />
        <div className="flex flex-col leading-[1.3]">
          <span className="text-[13px] font-medium">{MOCK_USER.firstName} {MOCK_USER.lastName}</span>
          <span className="text-[11px] text-ink-3">{t(`plan.${plan}`)}</span>
        </div>
      </div>
    </aside>
  );
}
