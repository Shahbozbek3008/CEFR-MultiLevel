import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

type ChipProps = ComponentProps<'button'> & { active?: boolean };

/** Filter chip: 34px pill, active = green-100 + green-text. */
export function Chip({ active, className, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        'flex h-[34px] items-center whitespace-nowrap rounded-pill px-[14px] text-[13px] transition-colors duration-(--t-fast)',
        active ? 'bg-green-100 font-medium text-green-text' : 'bg-surface text-ink-body shadow-inset hover:bg-bg-app',
        className,
      )}
      {...rest}
    />
  );
}
