type Threshold = { value: number; label: string };

type LineChartProps = {
  data: readonly number[];
  thresholds: readonly Threshold[];
  /** Score shown at the bottom edge and pixels per point (design: 38 → y230, 7px/pt). */
  floor?: number;
  pxPerPoint?: number;
  label: string;
};

const W = 840;
const H = 250;
const BASE = 230;
const PAD_X = 30;

/** README LineChart: dashed `3 5` thresholds, area fill blue/.07, last point hollow. */
export function LineChart({ data, thresholds, floor = 38, pxPerPoint = 7, label }: LineChartProps) {
  const y = (v: number) => BASE - (v - floor) * pxPerPoint;
  const step = (W - PAD_X * 2 + 4) / Math.max(data.length - 1, 1);
  const points = data.map((v, i) => [PAD_X + i * step, y(v)] as const);
  const line = points.map(([px, py]) => `${px},${py}`).join(' ');
  const last = points.at(-1)!;

  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label={label}>
      {thresholds.map((t) => (
        <g key={t.label}>
          <line x1="0" x2={W} y1={y(t.value)} y2={y(t.value)} stroke="var(--wave-idle)" strokeDasharray="3 5" />
          <text x={W - 4} y={y(t.value) - 6} textAnchor="end" fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-3)">{t.label}</text>
        </g>
      ))}
      <polygon points={`${points[0][0]},${BASE} ${line} ${last[0]},${BASE}`} fill="oklch(0.52 0.1 258 / .07)" />
      <polyline points={line} fill="none" stroke="var(--blue-500)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {points.slice(0, -1).map(([px, py]) => (
        <circle key={px} cx={px} cy={py} r="3.5" fill="var(--blue-500)" />
      ))}
      <circle cx={last[0]} cy={last[1]} r="6" fill="#fff" stroke="var(--blue-500)" strokeWidth="3" />
    </svg>
  );
}
