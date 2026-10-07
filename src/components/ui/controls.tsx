'use client';

import type { ReactNode } from 'react';
import { Checkbox as RCheckbox, RadioGroup, Switch as RSwitch } from 'radix-ui';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Icon } from './icon';

export function Switch({ defaultChecked, label }: { defaultChecked?: boolean; label: string }) {
  return (
    <RSwitch.Root
      defaultChecked={defaultChecked}
      aria-label={label}
      className="flex h-[26px] w-11 shrink-0 rounded-[13px] bg-line p-[3px] transition-colors duration-(--t-base) data-[state=checked]:bg-green"
    >
      <RSwitch.Thumb className="size-5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,.2)] transition-transform duration-(--t-base) ease-brand data-[state=checked]:translate-x-[18px]" />
    </RSwitch.Root>
  );
}

export function Checkbox({ defaultChecked, id, children }: { defaultChecked?: boolean; id: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 text-[13px] leading-normal text-ink-2">
      <RCheckbox.Root
        id={id}
        defaultChecked={defaultChecked}
        className="grid size-5 shrink-0 place-items-center rounded-md bg-surface text-white shadow-[inset_0_0_0_1.5px_var(--border-strong)] data-[state=checked]:bg-green data-[state=checked]:shadow-none"
      >
        <RCheckbox.Indicator>
          <Icon as={Check} size={12} strokeWidth={2.6} />
        </RCheckbox.Indicator>
      </RCheckbox.Root>
      <label htmlFor={id}>{children}</label>
    </div>
  );
}

/** Radio dot: unchecked = 1.5px ring, checked = thick green border with white centre. */
export function RadioDot({ size = 22, className }: { size?: 18 | 22; className?: string }) {
  return (
    <span
      className={cn(
        'shrink-0 rounded-full shadow-[inset_0_0_0_1.5px_var(--text-4)] group-data-[state=checked]:border-green group-data-[state=checked]:bg-white group-data-[state=checked]:shadow-none',
        size === 22 ? 'size-[22px] group-data-[state=checked]:border-[7px]' : 'size-[18px] group-data-[state=checked]:border-[5.5px]',
        className,
      )}
      aria-hidden
    />
  );
}

type RadioCardGroupProps<T extends { value: string }> = {
  items: readonly T[];
  defaultValue: string;
  label: string;
  className?: string;
  itemClassName?: string;
  renderItem: (item: T) => ReactNode;
};

/** Radix RadioGroup with card-like items; selection styling via `data-[state=checked]`. */
export function RadioCardGroup<T extends { value: string }>({ items, defaultValue, label, className, itemClassName, renderItem }: RadioCardGroupProps<T>) {
  return (
    <RadioGroup.Root defaultValue={defaultValue} aria-label={label} className={className}>
      {items.map((item) => (
        <RadioGroup.Item key={item.value} value={item.value} className={cn('group w-full text-left', itemClassName)}>
          {renderItem(item)}
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}
