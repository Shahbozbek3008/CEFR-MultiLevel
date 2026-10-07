'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';

/** Compact UZ / RU / EN switch — keeps the current path. */
export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const change = (next: Locale) => startTransition(() => router.replace(pathname, { locale: next }));

  return (
    <div role="group" aria-label={t('language')} className={cn('flex h-[30px] items-center rounded-sm bg-seg-track p-[3px] text-xs', pending && 'opacity-70', className)}>
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={l === locale}
          onClick={() => change(l)}
          className={cn(
            'h-full rounded-[7px] px-2 font-mono uppercase transition-colors duration-(--t-fast)',
            l === locale ? 'bg-surface font-medium text-ink shadow-[0_1px_2px_rgba(20,22,30,.08)]' : 'text-ink-2 hover:text-ink',
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
