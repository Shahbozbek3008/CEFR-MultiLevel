import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type GaugeProps = {
  value: number;
  max: number;
  size: number;
  stroke: number;
  /** Arc radius; defaults to size/2 − stroke. */
  r?: number;
  /** Visible height (the open bottom of the 270° arc is cropped). */
  height?: number;
  /** Offset that optically centers the label inside the arc. */
  labelOffset?: number;
  children: ReactNode;
  className?: string;
};

const ARC = 0.75; // 270° — README: "Gauge 270° yoy, rotate(135)"

export function Gauge({ value, max, size, stroke, r = size / 2 - stroke, height = size * 0.86, labelOffset, children, className }: GaugeProps) {
  const c = 2 * Math.PI * r;
  const half = size / 2;
  const track = c * ARC;
  const fill = (value / max) * track;
  return (
    <div className={cn('relative', className)} style={{ width: size, height }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-x-0 top-0" aria-hidden>
        <circle cx={half} cy={half} r={r} fill="none" stroke="var(--track)" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${track} ${c}`} transform={`rotate(135 ${half} ${half})`} />
        <circle cx={half} cy={half} r={r} fill="none" stroke="var(--blue-500)" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${fill} ${c}`} transform={`rotate(135 ${half} ${half})`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingTop: labelOffset ?? size * 0.1 }}>
        {children}
      </div>
    </div>
  );
}

type RingProps = { value: number; max: number; size: number; stroke: number; r?: number; children: ReactNode; className?: string };

/** Full circle progress ring — README: "Halqa rotate(-90)". */
export function Ring({ value, max, size, stroke, r = size / 2 - 6, children, className }: RingProps) {
  const c = 2 * Math.PI * r;
  const half = size / 2;
  return (
    <div className={cn('relative shrink-0', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle cx={half} cy={half} r={r} fill="none" stroke="var(--track)" strokeWidth={stroke} />
        <circle cx={half} cy={half} r={r} fill="none" stroke="var(--blue-500)" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${(value / max) * c} ${c}`} transform={`rotate(-90 ${half} ${half})`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

type ScoreValueProps = { value: number; max: number; size: number; className?: string; maxClassName?: string };

/** Big light score number with a mono "/ 75" under it (used inside Gauge/Ring). */
export function ScoreValue({ value, max, size, className, maxClassName }: ScoreValueProps) {
  return (
    <>
      <span className={cn('font-light leading-[.9] tracking-[-0.06em]', className)} style={{ fontSize: size }}>{value}</span>
      <span className={cn('font-mono text-xs text-ink-3', maxClassName)}>/ {max}</span>
    </>
  );
}
