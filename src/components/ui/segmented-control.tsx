'use client';

import type { ReactNode } from 'react';
import { ToggleGroup } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

const trackVariants = cva('flex bg-seg-track', {
  variants: {
    size: {
      md: 'h-[38px] rounded-[12px] p-[3px] text-[13px]',
      lg: 'h-11 rounded-[14px] p-1 text-sm',
    },
  },
  defaultVariants: { size: 'md' },
});

const itemVariants = cva(
  'flex flex-1 items-center justify-center gap-2 whitespace-nowrap px-[14px] text-ink-2 transition-colors duration-(--t-fast) data-[state=on]:bg-surface data-[state=on]:font-medium data-[state=on]:text-ink data-[state=on]:shadow-[0_1px_2px_rgba(20,22,30,.08)]',
  {
    variants: { size: { md: 'rounded-[9px]', lg: 'rounded-sm' } },
    defaultVariants: { size: 'md' },
  },
);

export type SegmentOption = { value: string; label: ReactNode };

type SegmentedControlProps = VariantProps<typeof trackVariants> & {
  options: readonly SegmentOption[];
  defaultValue: string;
  label: string;
  className?: string;
};

export function SegmentedControl({ options, defaultValue, label, size, className }: SegmentedControlProps) {
  return (
    <ToggleGroup.Root
      type="single"
      defaultValue={defaultValue}
      aria-label={label}
      className={cn(trackVariants({ size }), className)}
      onValueChange={() => undefined}
    >
      {options.map((o) => (
        <ToggleGroup.Item key={o.value} value={o.value} className={itemVariants({ size })}>
          {o.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
