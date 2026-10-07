'use client';

import { RadioGroup } from 'radix-ui';
import { cn } from '@/lib/cn';

type TfngQuestionProps = { n: number; text: string; options: readonly string[]; defaultValue?: string; current?: boolean };

/** README AnswerOption: T/F/NG segment; current row = green-50 + 1.5px green ring. */
export function TfngQuestion({ n, text, options, defaultValue, current }: TfngQuestionProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-[28px_1fr] gap-[14px] py-[18px]',
        current ? '-mx-[14px] rounded-2xl bg-green-50 px-[14px] shadow-[inset_0_0_0_1.5px_var(--green-500)]' : 'shadow-[0_1px_0_var(--divider)]',
      )}
    >
      <span className={cn('pt-0.5 font-mono text-xs', current ? 'text-green-text' : 'text-ink-3')}>{n}</span>
      <div className="flex flex-col gap-3">
        <span id={`q${n}`} className="text-[15px] leading-[1.55]">{text}</span>
        <RadioGroup.Root aria-labelledby={`q${n}`} defaultValue={defaultValue} className="grid max-w-[360px] grid-cols-3 gap-1.5">
          {options.map((o) => (
            <RadioGroup.Item
              key={o}
              value={o}
              className="h-[38px] rounded-[11px] bg-surface text-[13px] text-ink-body shadow-inset transition-colors duration-(--t-fast) hover:bg-bg-app data-[state=checked]:bg-action data-[state=checked]:font-medium data-[state=checked]:text-white data-[state=checked]:shadow-none"
            >
              {o}
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
      </div>
    </div>
  );
}
