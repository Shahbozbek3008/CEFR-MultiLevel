import type { ReactNode } from 'react';

/** Full-viewport frame for onboarding and confirmation screens (optional top bar + green glow). */
export function Stage({ topBar, children, glow = false }: { topBar?: ReactNode; children: ReactNode; glow?: boolean }) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-bg">
      {glow && <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_50%_at_50%_45%,oklch(0.96_0.05_135),transparent_70%)]" />}
      {topBar}
      <div className="relative flex flex-1 flex-col">{children}</div>
    </div>
  );
}
