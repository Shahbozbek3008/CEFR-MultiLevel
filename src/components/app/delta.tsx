import { cn } from '@/lib/cn';
import { signed } from '@/lib/format';

/** Mono "+4" / "−1" coloured by sign. */
export function Delta({ value, className }: { value: number; className?: string }) {
  return <span className={cn('font-mono text-xs', value >= 0 ? 'text-success' : 'text-error-text', className)}>{signed(value)}</span>;
}
