import { LEVELS, SCALE_SEGMENTS } from '@/lib/constants';
import { cn } from '@/lib/cn';

type ScaleBarProps = {
  /** Score on the 0–75 scale. */
  value: number;
  variant: 'onDark' | 'light';
  /** Labels under the bar (left → right). */
  labels: readonly string[];
};

/** CEFR scale bar split into <B1 · B1 · B2 · C1 segments, filled up to `value`. */
export function ScaleBar({ value, variant, labels }: ScaleBarProps) {
  const dark = variant === 'onDark';
  const fill = dark ? '#fff' : 'var(--blue-500)';
  const empty = dark ? 'rgba(255,255,255,.22)' : 'var(--track)';

  return (
    <div className="flex flex-col gap-2">
      <div className={cn('grid', dark ? 'gap-1' : 'gap-[3px]')} style={{ gridTemplateColumns: SCALE_SEGMENTS.map((s) => `${s}fr`).join(' ') }}>
        {SCALE_SEGMENTS.map((size, i) => {
          const start = SCALE_SEGMENTS.slice(0, i).reduce((a, b) => a + b, 0);
          const ratio = Math.min(Math.max((value - start) / size, 0), 1);
          return <span key={start} className="h-1.5 rounded-[3px]" style={{ background: `linear-gradient(90deg, ${fill} ${ratio * 100}%, ${empty} ${ratio * 100}%)` }} />;
        })}
      </div>
      <div className={cn('flex justify-between font-mono text-[11px]', dark ? 'text-white/72' : 'text-ink-3')}>
        {labels.map((l) => <span key={l}>{l}</span>)}
      </div>
    </div>
  );
}

export const LEVEL_LABELS = LEVELS.map((l) => `${l.code} · ${l.min}`);
