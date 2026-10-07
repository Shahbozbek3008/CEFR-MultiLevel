'use client';

import { useTranslations } from 'next-intl';
import { ChevronRight, Flag } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { FINISH_SUMMARY } from '@/lib/mock/test-content';
import { LATEST_RESULT } from '@/lib/mock/results';
import { Icon } from '@/components/ui/icon';
import { Button, ButtonLink } from '@/components/ui/button';
import { StatGrid } from '@/components/ui/stat-grid';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const chip = 'flex h-[34px] items-center gap-2 rounded-[11px] px-3 text-[13px]';

/** W11 — "Finish the test?" confirmation (Radix Dialog; ESC / outside click close). */
export function FinishDialog() {
  const t = useTranslations('test.finish');
  const ts = useTranslations('skills');
  const s = FINISH_SUMMARY;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="xs" className="rounded-[13px] px-4 text-[13px]">{t('trigger')}</Button>
      </DialogTrigger>
      <DialogContent
        title={t('title')}
        description={t('text')}
        closeLabel={t('back')}
        icon={<span className="grid size-[52px] place-items-center rounded-2xl bg-warning-50 text-warning-text"><Icon as={Flag} size={22} /></span>}
      >
        <StatGrid
          size="lg"
          stats={[
            { value: s.answered, label: t('answered') },
            { value: s.flagged, label: t('flagged'), tone: 'warning' },
            { value: s.unanswered, label: t('unanswered'), tone: 'error' },
          ]}
        />
        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] font-medium">{t('unansweredList')}</span>
          <div className="flex flex-wrap gap-1.5">
            {s.unansweredChips.map((c) => (
              <DialogClose key={c.n} className={`${chip} shadow-inset hover:bg-bg-app`}>
                {ts(c.skill)} · {c.n}
                <Icon as={ChevronRight} size={13} strokeWidth={1.8} />
              </DialogClose>
            ))}
            <DialogClose className={`${chip} bg-warning-50 text-warning-text`}>
              <span className="size-1.5 rounded-full bg-warning" />
              {ts(s.flaggedChip.skill)} · {s.flaggedChip.items}
            </DialogClose>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <DialogClose asChild>
            <Button variant="secondary">{t('back')}</Button>
          </DialogClose>
          <ButtonLink href={ROUTES.result(LATEST_RESULT.attemptId)} arrow className="px-[18px] shadow-action-sm">{t('confirm')}</ButtonLink>
        </div>
      </DialogContent>
    </Dialog>
  );
}
