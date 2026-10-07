'use client';

import { useId, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { IconButton } from '@/components/ui/icon-button';
import { ActivePill } from '@/components/motion/active-pill';

type ExamCalendarProps = { year: number; month: number; officialDays: readonly number[]; defaultSelected: number };

export function ExamCalendar({ year, month, officialDays, defaultSelected }: ExamCalendarProps) {
  const t = useTranslations('calendar');
  const [selected, setSelected] = useState(defaultSelected);
  const layoutId = useId();

  const offset = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells = Array.from({ length: Math.ceil((offset + days) / 7) * 7 }, (_, i) => i - offset + 1);
  const weekdays = t('weekdays').split(',');
  const monthName = t('months').split(',')[month];

  return (
    <div className="flex flex-col gap-5 rounded-card-lg bg-surface p-7 shadow-[0_0_0_1px_rgba(20,22,30,.06),0_30px_60px_-30px_rgba(20,22,30,.18)]">
      <div className="flex items-center justify-between">
        <span className="text-[17px] font-medium">{t('monthTitle', { month: monthName, year })}</span>
        <div className="flex gap-1.5">
          <IconButton icon={ChevronLeft} label={t('prev')} size="xs" iconSize={14} className="text-ink-2" />
          <IconButton icon={ChevronRight} label={t('next')} size="xs" iconSize={14} className="text-ink-2" />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center font-mono text-[11px] text-ink-3">
        {weekdays.map((d) => <span key={d}>{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((n, i) => {
          if (n < 1 || n > days) return <span key={i} className="h-12" />;
          const isSelected = n === selected;
          const official = officialDays.includes(n);
          return (
            <button
              key={i}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelected(n)}
              className={cn(
                'relative isolate grid h-12 place-items-center rounded-[14px] text-sm transition-[background-color,color,scale] duration-(--t-base) ease-out-expo active:scale-95',
                isSelected ? 'font-medium text-white' : official ? 'bg-blue-50 font-medium text-blue-text' : 'text-ink-body hover:bg-surface-sunken',
              )}
            >
              {isSelected && <ActivePill layoutId={layoutId} className="rounded-[14px] bg-action shadow-action-sm" />}
              {n}
            </button>
          );
        })}
      </div>
      <div className="flex gap-4 pt-[14px] text-xs text-ink-2 shadow-[0_-1px_0_var(--track)]">
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-blue" />{t('official')}</span>
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-green" />{t('selected')}</span>
      </div>
    </div>
  );
}
