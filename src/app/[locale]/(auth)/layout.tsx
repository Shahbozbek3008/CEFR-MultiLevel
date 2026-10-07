import type { ReactNode } from 'react';
import { initLocale, type LocaleParams } from '@/lib/i18n';

export default async function AuthLayout({ children, params }: { children: ReactNode; params: LocaleParams }) {
  await initLocale(params);
  return <main className="min-h-dvh bg-bg">{children}</main>;
}
