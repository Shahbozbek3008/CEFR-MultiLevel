'use client';

import { useId } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_OUT, VIEWPORT } from '@/lib/motion';

type Threshold = { value: number; label: string };

type LineChartProps = {
  data: readonly number[];
  thresholds: readonly Threshold[];
  floor?: number;
  pxPerPoint?: number;
  label: string;
};

const W = 840;
const H = 250;
const BASE = 230;
const PAD_X = 30;
const DRAW = 1.8;

export function LineChart({ data, thresholds, floor = 38, pxPerPoint = 7, label }: LineChartProps) {
  const y = (v: number) => BASE - (v - floor) * pxPerPoint;
  const step = (W - PAD_X * 2 + 4) / Math.max(data.length - 1, 1);
  const points = data.map((v, i) => [PAD_X + i * step, y(v)] as const);
  const line = points.map(([px, py]) => `${px},${py}`).join(' ');
  const last = points.at(-1)!;
  const gradientId = useId();
  const reduced = useReducedMotion();

  return (
    <motion.svg
      width="100%"
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={label}
      initial={reduced ? false : 'hidden'}
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.52 0.1 258)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="oklch(0.52 0.1 258)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {thresholds.map((t) => (
        <g key={t.label}>
          <line x1="0" x2={W} y1={y(t.value)} y2={y(t.value)} stroke="var(--wave-idle)" strokeDasharray="3 5" />
          <text x={W - 4} y={y(t.value) - 6} textAnchor="end" fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-3)">{t.label}</text>
        </g>
      ))}
      <motion.polygon
        points={`${points[0][0]},${BASE} ${line} ${last[0]},${BASE}`}
        fill={`url(#${gradientId})`}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.2, delay: DRAW * 0.5 } } }}
      />
      <motion.polyline
        points={line}
        fill="none"
        stroke="var(--blue-500)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: DRAW, ease: EASE_OUT } } }}
      />
      {points.slice(0, -1).map(([px, py], i) => (
        <motion.circle
          key={px}
          cx={px}
          cy={py}
          r="3.5"
          fill="var(--blue-500)"
          variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { delay: (i / points.length) * DRAW, type: 'spring', bounce: 0.5 } } }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}
      <motion.circle
        cx={last[0]}
        cy={last[1]}
        r="6"
        fill="#fff"
        stroke="var(--blue-500)"
        strokeWidth="3"
        variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { delay: DRAW * 0.9, type: 'spring', bounce: 0.55 } } }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />
    </motion.svg>
  );
}
