import { useTranslations } from 'next-intl';
import { Check, Undo2 } from 'lucide-react';
import { WRITING } from '@/lib/mock/test-content';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { AiTip } from '@/components/ui/ai-tip';
import { ProgressBar } from '@/components/ui/progress-bar';
import { MonoLabel } from '@/components/ui/typography';
import { SegmentedControl } from '@/components/ui/segmented-control';

export function WritingTask() {
  const t = useTranslations('test.writing');
  return (
    <div className="flex flex-col gap-4">
      <SegmentedControl
        size="lg"
        label={t('tasks')}
        defaultValue="task2"
        className="text-[13px]"
        options={[
          { value: 'task1', label: <>Task 1<span className="font-mono text-[11px] font-normal text-green-text">{WRITING.task1Words} ✓</span></> },
          { value: 'task2', label: t('task2') },
        ]}
      />
      <Card className="flex flex-col gap-[18px] p-6 shadow-[0_0_0_1px_rgba(20,22,30,.05)]">
        <MonoLabel>{t('task')}</MonoLabel>
        <p className="m-0 text-lg leading-[1.6] tracking-[-0.01em]">{WRITING.prompt}</p>
        <dl className="m-0 flex flex-col gap-2.5 pt-4 text-sm text-ink-body shadow-[0_-1px_0_var(--divider)]">
          {[
            [t('minWords'), t('words', { count: WRITING.minWords })],
            [t('suggestedTime'), t('minutes', { count: WRITING.minutes })],
            [t('grading'), t('gradingValue')],
          ].map(([k, v], i) => (
            <div key={k} className="flex justify-between">
              <dt>{k}</dt>
              <dd className={i < 2 ? 'm-0 font-mono' : 'm-0'}>{v}</dd>
            </div>
          ))}
        </dl>
      </Card>
      <AiTip className="rounded-card-sm px-4 py-[14px] leading-[1.55]">{t('tip')}</AiTip>
    </div>
  );
}

/** README Writing: 2s debounced autosave, "draft saved N seconds ago", live word count. */
export function WritingEditor() {
  const t = useTranslations('test.writing');
  return (
    <div className="flex min-h-0 flex-col rounded-card bg-surface shadow-focus">
      <div className="flex h-[52px] items-center gap-1 px-5 text-ink-2 shadow-[0_1px_0_var(--divider)]">
        <IconButton icon={Undo2} label={t('undo')} size="sm" className="size-[34px]" />
        <span className="ml-auto flex items-center gap-1.5 text-xs" aria-live="polite">
          <Icon as={Check} size={13} strokeWidth={2.2} className="text-success" />
          {t('saved', { seconds: WRITING.savedSecondsAgo })}
        </span>
      </div>
      <textarea
        aria-label={t('editor')}
        defaultValue={WRITING.draft.join('\n\n')}
        spellCheck={false}
        className="max-w-[820px] flex-1 resize-none bg-transparent px-9 py-7 text-[17px] leading-[1.85] text-ink caret-green outline-none"
      />
      <div className="flex h-[60px] items-center gap-4 px-6 shadow-[0_-1px_0_var(--divider)]">
        <ProgressBar value={WRITING.words} max={WRITING.minWords} className="w-[220px]" />
        <span className="font-mono text-[13px] text-ink-2"><span className="font-medium text-ink">{WRITING.words}</span> / {t('words', { count: WRITING.minWords })}</span>
        <span className="ml-auto text-xs text-ink-3">{t('paragraphs', { count: WRITING.paragraphs })}</span>
      </div>
    </div>
  );
}
