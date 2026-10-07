import { useTranslations } from 'next-intl';
import { ChevronsRight, RotateCcw } from 'lucide-react';
import { SPEAKING_TASK } from '@/lib/mock/test-content';
import { cn } from '@/lib/cn';
import { Card } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import { IconButton } from '@/components/ui/icon-button';
import { Waveform } from '@/components/ui/waveform';
import { MonoLabel } from '@/components/ui/typography';

export function SpeakingSteps() {
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${SPEAKING_TASK.steps}, 1fr)` }} aria-hidden>
      {Array.from({ length: SPEAKING_TASK.steps }, (_, i) => (
        <span key={i} className={cn('h-1 origin-left animate-fade-in rounded-[2px]', i < SPEAKING_TASK.done ? 'bg-green' : i === SPEAKING_TASK.done ? 'animate-pulse bg-green-300' : 'bg-line')} style={{ animationDelay: `${i * 60}ms` }} />
      ))}
    </div>
  );
}

export function SpeakingPrompt() {
  const t = useTranslations('test.speaking');
  const s = SPEAKING_TASK;
  return (
    <div className="grid min-h-0 flex-1 gap-5 lg:grid-cols-2">
      <div className="grid min-h-60 place-items-center rounded-card bg-[repeating-linear-gradient(135deg,#f1f1f3_0_12px,#ebebee_12px_24px)] font-mono text-xs text-ink-3 shadow-[0_0_0_1px_rgba(20,22,30,.05)]">
        {t('imagePlaceholder')}
      </div>
      <div className="flex flex-col justify-center gap-5 px-3">
        <MonoLabel>{t('part', { part: s.part })}</MonoLabel>
        <p className="m-0 text-[30px] leading-[1.3] tracking-[-0.03em] text-balance">{s.question}</p>
        <div className="flex gap-2">
          <Tag tone="sunken" size="lg">{t('prep', { seconds: s.prepSeconds })} ✓</Tag>
          <Tag tone="sunken" size="lg">{t('answer', { seconds: s.answerSeconds })}</Tag>
        </div>
      </div>
    </div>
  );
}

export function Recorder() {
  const t = useTranslations('test.speaking');
  return (
    <Card elevation="e1" className="flex items-center gap-6 px-6 py-[18px]">
      <span className="flex w-[130px] items-center gap-2 text-sm font-medium text-error-text" aria-live="polite">
        <span className="relative grid size-[9px] place-items-center">
          <span className="absolute size-[9px] animate-ping-soft rounded-full bg-error" />
          <span className="size-[9px] rounded-full bg-error shadow-[0_0_0_5px_oklch(0.6_0.17_28/.15)]" />
        </span>
        {t('recording')}
      </span>
      <Waveform bars={48} played={30} gap={3} live className="h-14" />
      <span className="font-mono text-sm text-ink-2">{SPEAKING_TASK.elapsed} / {SPEAKING_TASK.limit}</span>
      <div className="flex items-center gap-2.5">
        <IconButton icon={RotateCcw} label={t('restart')} size="lg" />
        <button type="button" aria-label={t('stop')} className="group grid size-16 place-items-center rounded-full bg-surface shadow-[inset_0_0_0_1px_var(--border),0_14px_28px_-12px_oklch(0.6_0.17_28/.5)] transition-[scale,box-shadow] duration-(--t-sheet) ease-spring hover:scale-105 active:scale-95">
          <span className="size-[22px] rounded-[7px] bg-error transition-[border-radius,scale] duration-(--t-sheet) ease-spring group-hover:scale-90 group-hover:rounded-[11px]" />
        </button>
        <IconButton icon={ChevronsRight} label={t('next')} size="lg" />
      </div>
    </Card>
  );
}
