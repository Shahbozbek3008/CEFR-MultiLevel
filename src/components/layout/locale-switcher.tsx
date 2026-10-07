'use client';

import { useId, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import { ActivePill } from '@/components/motion/active-pill';

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const layoutId = useId();

  const change = (next: Locale) => startTransition(() => router.replace(pathname, { locale: next }));

  return (
    <div role="group" aria-label={t('language')} className={cn('flex h-[30px] items-center rounded-sm bg-seg-track p-[3px] text-xs transition-opacity', pending && 'opacity-70', className)}>
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={l === locale}
          onClick={() => change(l)}
          className={cn(
            'relative isolate h-full rounded-[7px] px-2 font-mono uppercase transition-colors duration-(--t-base)',
            l === locale ? 'font-medium text-ink' : 'text-ink-2 hover:text-ink',
          )}
        >
          {l === locale && <ActivePill layoutId={layoutId} className="rounded-[7px] bg-surface shadow-[0_1px_2px_rgba(20,22,30,.08)]" />}
          {l}
        </button>
      ))}
    </div>
  );
}
