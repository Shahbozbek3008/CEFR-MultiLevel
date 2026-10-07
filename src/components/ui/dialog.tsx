'use client';

import type { ReactNode } from 'react';
import { Dialog as RDialog } from 'radix-ui';
import { X } from 'lucide-react';
import { IconButton } from './icon-button';

export const Dialog = RDialog.Root;
export const DialogTrigger = RDialog.Trigger;
export const DialogClose = RDialog.Close;

type DialogContentProps = { title: string; description: string; icon?: ReactNode; closeLabel: string; children: ReactNode };

/** Modal: backdrop `--backdrop`, 560px, radius 32, padding 36, `--e3`. ESC / outside click closes. */
export function DialogContent({ title, description, icon, closeLabel, children }: DialogContentProps) {
  return (
    <RDialog.Portal>
      <RDialog.Overlay className="fixed inset-0 z-50 bg-(--backdrop)" />
      <RDialog.Content className="fixed top-1/2 left-1/2 z-50 flex w-[min(560px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-hero bg-surface p-9 shadow-e3">
        <div className="flex items-start justify-between">
          {icon}
          <RDialog.Close asChild>
            <IconButton icon={X} label={closeLabel} size="sm" />
          </RDialog.Close>
        </div>
        <div className="flex flex-col gap-2">
          <RDialog.Title className="text-[28px] font-medium tracking-[-0.04em]">{title}</RDialog.Title>
          <RDialog.Description className="text-[15px] leading-[1.55] text-ink-2">{description}</RDialog.Description>
        </div>
        {children}
      </RDialog.Content>
    </RDialog.Portal>
  );
}
