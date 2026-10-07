import { useTranslations } from 'next-intl';
import { PenLine } from 'lucide-react';
import { READING } from '@/lib/mock/test-content';
import { Icon } from '@/components/ui/icon';
import { MonoLabel } from '@/components/ui/typography';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { AnnotatedText } from '@/components/app/annotated-text';
import { TfngQuestion } from './tfng-question';

function HighlightToolbar() {
  const t = useTranslations('test.reading');
  return (
    <div role="toolbar" aria-label={t('toolbar')} className="absolute -top-11 left-[280px] flex h-[38px] items-center gap-1.5 rounded-[12px] bg-surface px-1.5 shadow-[0_0_0_1px_rgba(20,22,30,.06),0_14px_28px_-12px_rgba(20,22,30,.3)]">
      <button type="button" aria-label={t('yellow')} className="size-5 rounded-full bg-highlight shadow-[0_0_0_2px_#fff,0_0_0_3.5px_var(--border-strong)]" />
      <button type="button" aria-label={t('blue')} className="size-5 rounded-full bg-blue-100" />
      <span className="h-[18px] w-px bg-divider-muted" />
      <button type="button" className="flex items-center gap-1.5 px-1.5 text-xs text-ink-body"><Icon as={PenLine} size={13} />{t('note')}</button>
      <button type="button" className="px-1.5 text-xs text-ink-3">{t('clear')}</button>
    </div>
  );
}

export function ReadingPassage() {
  const t = useTranslations('test.reading');
  const p = READING.passage;
  return (
    <article className="relative flex flex-col gap-[22px] overflow-hidden bg-surface px-12 py-8 shadow-[1px_0_0_rgba(20,22,30,.06)]">
      <div className="flex items-center justify-between">
        <MonoLabel>{t('passage', { n: p.n })}</MonoLabel>
        <SegmentedControl
          label={t('fontSize')}
          defaultValue="s"
          className="h-8 w-auto rounded-sm text-xs [&>button]:flex-none [&>button]:rounded-lg [&>button]:px-2.5"
          options={[{ value: 's', label: 'A' }, { value: 'm', label: <span className="text-sm">A</span> }, { value: 'l', label: <span className="text-base">A</span> }]}
        />
      </div>
      <h2 className="m-0 text-[30px] leading-[1.15] font-medium tracking-[-0.035em]">{p.title}</h2>
      {p.paragraphs.map((para) => (
        <div key={para.id} className="relative grid grid-cols-[24px_1fr] gap-[14px]">
          <span className="pt-1.5 font-mono text-xs text-ink-3">{para.id}</span>
          <p className="m-0 max-w-[68ch] text-[17px] leading-[1.8] text-ink-reading">
            <AnnotatedText segments={para.segments} />
          </p>
          {'toolbar' in para && <HighlightToolbar />}
        </div>
      ))}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-b from-transparent to-white" />
    </article>
  );
}

export function StatementsPanel() {
  const t = useTranslations('test');
  return (
    <div className="flex flex-col gap-1.5 overflow-hidden px-10 py-8">
      <MonoLabel>{t('questionsRange', { range: READING.range })}</MonoLabel>
      <span className="pb-2.5 text-[15px] leading-[1.55] text-ink-2">{READING.instruction}</span>
      {READING.statements.map((s) => (
        <TfngQuestion key={s.n} n={s.n} text={s.text} options={READING.options} defaultValue={'answer' in s ? s.answer : undefined} current={'current' in s} />
      ))}
    </div>
  );
}
