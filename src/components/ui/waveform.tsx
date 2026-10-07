import { cn } from '@/lib/cn';
import { WAVE_HEIGHTS } from '@/lib/mock/waveform';

type WaveformProps = {
  bars: number;
  played: number;
  gap?: 2 | 3;
  live?: boolean;
  className?: string;
};

export function Waveform({ bars, played, gap = 2, live = false, className }: WaveformProps) {
  return (
    <div className={cn('flex flex-1 items-center', gap === 2 ? 'gap-0.5' : 'gap-[3px]', className)} aria-hidden>
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className={cn(
            'flex-1 rounded-[2px] transition-colors duration-(--t-slow)',
            i < played ? 'bg-blue' : 'bg-wave-idle',
            live && i < played && 'origin-center animate-wave',
          )}
          style={{ height: `${WAVE_HEIGHTS[i % WAVE_HEIGHTS.length]}%`, animationDelay: live ? `${-((i * 137) % 1100)}ms` : undefined }}
        />
      ))}
    </div>
  );
}
