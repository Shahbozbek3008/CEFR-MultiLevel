import type { ReactNode } from 'react';

/** Shared tags for `t.rich(...)` — keeps markup out of translation files. */
export const richTags = {
  muted: (chunks: ReactNode) => <span className="text-ink-3">{chunks}</span>,
  b: (chunks: ReactNode) => <b className="font-medium text-ink">{chunks}</b>,
  mono: (chunks: ReactNode) => <span className="font-mono text-ink">{chunks}</span>,
  br: () => <br />,
};
