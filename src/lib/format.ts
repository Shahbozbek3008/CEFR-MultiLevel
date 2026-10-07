/** 49000 → "49 000" (thin grouping used across all locales in the design). */
export function formatSum(value: number): string {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/** Score → percentage width string for progress bars. */
export function pct(value: number, max: number): string {
  return `${(value / max) * 100}%`;
}

/** Signed delta label: 4 → "+4", -1 → "−1". */
export function signed(value: number): string {
  return value >= 0 ? `+${value}` : `−${Math.abs(value)}`;
}
