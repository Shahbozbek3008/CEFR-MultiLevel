import { cn } from '@/lib/cn';

/** Countdown pill — warning tone when ≤ 5 min remain (README). */
export function TimerPill({ value, warning = false }: { value: string; warning?: boolean }) {
  return (
    <span
      role="timer"
      className={cn(
        'flex h-9 items-center gap-2 rounded-pill px-3 font-mono text-sm font-medium tabular-nums',
        warning ? 'bg-warning-50 text-warning-text shadow-[inset_0_0_0_1px_var(--warning-200)]' : 'bg-surface shadow-inset',
      )}
    >
      <span className={cn('size-1.5 rounded-full', warning ? 'bg-warning' : 'bg-blue')} />
      {value}
    </span>
  );
}
