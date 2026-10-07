import type { ReactNode } from 'react';
import { initLocale } from '@/lib/i18n';
import { assertSkill, testName, type TestSectionParams } from '@/lib/test-route';
import { TestHeader } from '@/components/test/test-header';
import { LeaveGuard } from '@/components/test/leave-guard';

export default async function TestSectionLayout({ children, params }: { children: ReactNode; params: TestSectionParams }) {
  await initLocale(params);
  const { id, section } = await params;
  const skill = assertSkill(section);
  return (
    <div className="flex h-dvh min-h-[720px] flex-col bg-bg-app">
      <LeaveGuard />
      <TestHeader testName={testName(id)} section={skill} />
      {children}
    </div>
  );
}
