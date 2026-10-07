'use client';

import { useState } from 'react';

export function GapInput({ n, defaultValue = '', autoFocus, placeholder }: { n: number; defaultValue?: string; autoFocus?: boolean; placeholder: string }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <span className="inline-flex items-center gap-2 align-middle">
      <span className="font-mono text-[11px] text-ink-3">{n}</span>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus={autoFocus}
        placeholder={placeholder}
        aria-label={`Question ${n}`}
        className="h-[38px] w-[150px] rounded-[11px] bg-surface px-3 text-[15px] caret-green shadow-inset outline-none transition-[box-shadow,width] duration-(--t-sheet) ease-out-expo placeholder:text-ink-disabled focus:w-[170px] focus:shadow-focus"
      />
    </span>
  );
}
