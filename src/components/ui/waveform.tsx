import { cn } from '@/lib/cn';
import { WAVE_HEIGHTS } from '@/lib/mock/waveform';

type WaveformProps = {
  /** Number of bars to render (taken cyclically from the shared pattern). */
  bars: number;
  /** Bars already played/recorded (rendered blue). */
  played: number;
  gap?: 2 | 3;
  className?: string;
};

export function Waveform({ bars, played, gap = 2, className }: WaveformProps) {
  return (
    <div className={cn('flex flex-1 items-center', gap === 2 ? 'gap-0.5' : 'gap-[3px]', className)} aria-hidden>
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className={cn('flex-1 rounded-[2px]', i < played ? 'bg-blue' : 'bg-wave-idle')}
          style={{ height: `${WAVE_HEIGHTS[i % WAVE_HEIGHTS.length]}%` }}
        />
      ))}
    </div>
  );
}
