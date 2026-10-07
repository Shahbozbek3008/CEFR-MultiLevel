import type { ReactNode } from 'react';
import { initLocale, type LocaleParams } from '@/lib/i18n';

/** Focused routes without the sidebar (pre-test, test sections, payment result). */
export default async function FocusLayout({ children, params }: { children: ReactNode; params: LocaleParams }) {
  await initLocale(params);
  return <div className="min-h-dvh bg-bg-app">{children}</div>;
}
