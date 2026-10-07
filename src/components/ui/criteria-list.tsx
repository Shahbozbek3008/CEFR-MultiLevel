import { cn } from '@/lib/cn';
import { ProgressBar, type ProgressTone } from './progress-bar';

export type Criterion = { name: string; score: number; max: number; tone?: ProgressTone };

type CriteriaListProps = {
  items: readonly Criterion[];
  /** Grid template for name / bar / score columns. */
  columns?: string;
  rowClassName?: string;
  className?: string;
};

/** Rows of "name ▬▬▬ 15/20" (AI Writing criteria, landing AI card). */
export function CriteriaList({ items, columns = '1fr 110px 44px', rowClassName, className }: CriteriaListProps) {
  return (
    <div className={className}>
      {items.map((c) => (
        <div
          key={c.name}
          className={cn('grid h-[46px] items-center gap-[14px] text-sm shadow-[0_1px_0_var(--divider)] last:shadow-none', rowClassName)}
          style={{ gridTemplateColumns: columns }}
        >
          <span>{c.name}</span>
          <ProgressBar value={c.score} max={c.max} tone={c.tone} />
          <span className="text-right font-mono text-[13px]">
            {c.score}
            <span className="text-ink-3">/{c.max}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
