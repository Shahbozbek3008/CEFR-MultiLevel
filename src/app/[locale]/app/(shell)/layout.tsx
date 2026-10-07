import type { ReactNode } from 'react';
import { initLocale, type LocaleParams } from '@/lib/i18n';
import { Sidebar } from '@/components/layout/sidebar';

export default async function ShellLayout({ children, params }: { children: ReactNode; params: LocaleParams }) {
  await initLocale(params);
  return (
    <div className="flex min-h-dvh bg-bg-app">
      <Sidebar />
      {children}
    </div>
  );
}
