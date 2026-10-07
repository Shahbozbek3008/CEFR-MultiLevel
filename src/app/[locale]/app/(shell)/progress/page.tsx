import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { LEVELS, MAX_SCORE } from '@/lib/constants';
import { LATEST_RESULT, PROGRESS_HISTORY, PROGRESS_SKILLS } from '@/lib/mock/results';
import { initLocale, metadataTitle, type LocaleParams } from '@/lib/i18n';
import { cn } from '@/lib/cn';
import { signed } from '@/lib/format';
import { Card } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import { LineChart } from '@/components/ui/line-chart';
import { ProgressBar } from '@/components/ui/progress-bar';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { AppMain, PageHeader } from '@/components/layout/page-header';

export const generateMetadata = metadataTitle('progress.title');

const THRESHOLDS = LEVELS.slice(1).map((l) => ({ value: l.min, label: `${l.code} · ${l.min}` }));
const nextLevel = LEVELS.find((l) => l.min > LATEST_RESULT.total)!;
const ROW = 'grid h-[50px] items-center gap-4 text-sm shadow-[0_1px_0_var(--divider)] last:shadow-none';

function CardTitle({ title, aside }: { title: string; aside: ReactNode }) {
  return (
    <div className="flex h-11 items-center justify-between">
      <span className="text-[15px] font-medium">{title}</span>
      {aside}
    </div>
  );
}

/** W17 — progress over time. */
function ProgressView() {
  const t = useTranslations('progress');
  const ts = useTranslations('skills');
  return (
    <AppMain className="gap-5 overflow-hidden">
      <PageHeader
        meta={t('meta', { count: PROGRESS_HISTORY.scores.length })}
        title={t('title')}
        actions={<SegmentedControl label={t('title')} defaultValue="3m" className="w-[260px]" options={(['1m', '3m', 'all'] as const).map((v) => ({ value: v, label: t(`range.${v}`) }))} />}
      />
      <Card elevation="e1" className="flex flex-col gap-[14px] px-7 py-6">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[13px] text-ink-2">{t('overall')}</span>
            <div className="flex items-baseline gap-2.5">
              <span className="text-5xl leading-[.9] font-light tracking-[-0.055em]">{LATEST_RESULT.total}</span>
              <Tag tone="success">{signed(PROGRESS_HISTORY.gain)}</Tag>
              <span className="text-[13px] text-ink-2">{t('toNext', { level: nextLevel.code, points: nextLevel.min - LATEST_RESULT.total })}</span>
            </div>
          </div>
          <div className="flex w-[360px] justify-between font-mono text-[11px] text-ink-3">
            {t('months').split(',').map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>
        <LineChart data={PROGRESS_HISTORY.scores} thresholds={THRESHOLDS} label={t('chartLabel')} />
      </Card>
      <div className="grid gap-4 xl:grid-cols-[1fr_1.3fr]">
        <Card className="px-[22px] py-2 shadow-[0_0_0_1px_rgba(20,22,30,.05)]">
          <CardTitle title={t('sections')} aside={<span className="text-xs text-ink-2">{t('period')}</span>} />
          {PROGRESS_SKILLS.map((s) => (
            <div key={s.skill} className={cn(ROW, 'grid-cols-[1fr_140px_60px]')}>
              <span className="flex items-center gap-2">
                {ts(s.skill)}
                {s.weak && <span className="size-1.5 rounded-full bg-warning" />}
              </span>
              <ProgressBar value={s.score} max={MAX_SCORE} tone={s.weak ? 'warning' : 'blue'} />
              <span className="text-right font-mono text-[13px]">
                {s.score}<span className="ml-1.5 text-[11px] text-success">{signed(s.delta)}</span>
              </span>
            </div>
          ))}
        </Card>
        <Card className="px-[22px] py-2 shadow-[0_0_0_1px_rgba(20,22,30,.05)]">
          <CardTitle title={t('history')} aside={<span className="text-[13px] font-medium text-green-text">{t('all')}</span>} />
          {PROGRESS_HISTORY.attempts.map((a) => (
            <div key={a.name} className={cn(ROW, 'grid-cols-[90px_1fr_80px_70px_60px]')}>
              <span className="font-mono text-xs text-ink-3">{a.date}</span>
              <span>{a.name}</span>
              <span className="font-mono">{a.score}/{MAX_SCORE}</span>
              <Tag size="sm" className="justify-self-start">{a.level}</Tag>
              <span className="text-right font-mono text-xs text-success">{signed(a.delta)}</span>
            </div>
          ))}
        </Card>
      </div>
    </AppMain>
  );
}

export default async function ProgressPage({ params }: { params: LocaleParams }) {
  await initLocale(params);
  return <ProgressView />;
}
