import { useTranslations } from 'next-intl';
import { Check, Lock, Volume1 } from 'lucide-react';
import { LISTENING } from '@/lib/mock/test-content';
import { cn } from '@/lib/cn';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Tag } from '@/components/ui/tag';
import { MonoLabel } from '@/components/ui/typography';
import { GapInput } from './gap-input';

/** README AudioBar — real mode: progress + lock only, no seeking. */
export function AudioBar() {
  const t = useTranslations('test');
  const a = LISTENING.audio;
  return (
    <Card className="flex items-center gap-4 px-[22px] py-[18px] shadow-[0_0_0_1px_rgba(20,22,30,.05)]">
      <span className="grid size-11 place-items-center rounded-full bg-surface-sunken text-ink-2"><Icon as={Lock} size={17} strokeWidth={1.7} /></span>
      <div className="flex flex-1 flex-col gap-2">
        <div className="relative h-[5px] rounded-[3px] bg-track">
          <div className="h-full rounded-[3px] bg-blue" style={{ width: `${a.progress}%` }} />
          <span className="absolute top-1/2 size-[13px] -translate-1/2 rounded-full bg-white shadow-[0_0_0_2px_var(--blue-500)]" style={{ left: `${a.progress}%` }} />
        </div>
        <div className="flex justify-between font-mono text-xs text-ink-2"><span>{a.position}</span><span>{a.duration}</span></div>
      </div>
      <Tag tone="sunken" size="lg"><Icon as={Lock} size={11} strokeWidth={2} />{t('realMode')}</Tag>
      <Icon as={Volume1} className="text-ink-2" />
    </Card>
  );
}

/** Note-completion task (Part 2). */
export function NoteCompletion() {
  const t = useTranslations('test');
  return (
    <Card className="flex-1 px-7 py-6 shadow-[0_0_0_1px_rgba(20,22,30,.05)]">
      <div className="flex flex-col gap-1.5 pb-[18px]">
        <MonoLabel>{t('questionsRange', { range: LISTENING.range })}</MonoLabel>
        <h2 className="m-0 text-[22px] font-medium tracking-[-0.025em]">{LISTENING.title}</h2>
        <p className="m-0 text-sm text-ink-2">
          {LISTENING.instruction[0]}<b className="font-medium text-ink">{LISTENING.instruction[1]}</b>{LISTENING.instruction[2]}
        </p>
      </div>
      {LISTENING.notes.map((note) => (
        <div key={note.n} className="grid min-h-14 grid-cols-[220px_1fr] items-center gap-5 text-[15px] shadow-[0_1px_0_var(--divider)]">
          <span className="text-ink-2">{note.label}</span>
          <span className="flex flex-wrap items-center gap-2">
            {'before' in note && note.before}
            <GapInput n={note.n} defaultValue={'answer' in note ? note.answer : ''} autoFocus={'current' in note} placeholder={t('answerPlaceholder')} />
            {'after' in note && note.after}
          </span>
        </div>
      ))}
    </Card>
  );
}

/** README QuestionNavigator: answered = green-100, current = gradient, flagged = warning dot, empty = inset border. */
export function QuestionNavigator() {
  const t = useTranslations('test.navigator');
  const L = LISTENING;
  return (
    <Card className="flex flex-col gap-4 p-5 shadow-[0_0_0_1px_rgba(20,22,30,.05)]">
      <div className="flex items-baseline justify-between">
        <span className="text-[15px] font-medium">{t('title')}</span>
        <span className="font-mono text-xs text-ink-2">{L.answeredUpTo} / {L.totalQuestions}</span>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {Array.from({ length: L.totalQuestions }, (_, i) => i + 1).map((n) => {
          const current = n === L.currentQuestion;
          const answered = n <= L.answeredUpTo;
          return (
            <button
              key={n}
              type="button"
              aria-current={current || undefined}
              className={cn(
                'relative grid h-10 place-items-center rounded-sm font-mono text-xs',
                current ? 'bg-action font-medium text-white' : answered ? 'bg-green-100 text-green-text' : 'bg-surface text-ink-2 shadow-inset',
              )}
            >
              {n}
              {(L.flagged as readonly number[]).includes(n) && <span className="absolute top-1 right-1 size-1.5 rounded-full bg-warning" />}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-[14px] text-xs text-ink-2">
        <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-[3px] bg-green-100" />{t('answered')}</span>
        <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-[3px] shadow-[inset_0_0_0_1px_var(--border-strong)]" />{t('empty')}</span>
        <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-warning" />{t('flagged')}</span>
      </div>
    </Card>
  );
}

export function PartList() {
  return (
    <Card className="flex flex-col px-5 py-2 shadow-[0_0_0_1px_rgba(20,22,30,.05)]">
      {LISTENING.parts.map((p, i) => (
        <div
          key={p.n}
          className={cn(
            'flex h-[42px] items-center justify-between text-[13px]',
            i > 0 && 'shadow-[0_-1px_0_var(--divider)]',
            p.state === 'done' && 'text-ink-2',
            p.state === 'current' && 'font-medium',
            p.state === 'locked' && 'text-ink-3',
          )}
        >
          <span>Part {p.n} · {p.range}</span>
          {p.state === 'done' && <Icon as={Check} size={14} strokeWidth={2.2} className="text-success" />}
          {p.state === 'current' && <span className="size-1.5 rounded-full bg-blue" />}
          {p.state === 'locked' && <Icon as={Lock} size={13} className="text-ink-4" />}
        </div>
      ))}
    </Card>
  );
}
