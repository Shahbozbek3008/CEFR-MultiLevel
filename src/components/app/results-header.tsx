import type { ReactNode } from 'react';
import { LATEST_RESULT } from '@/lib/mock/results';
import { Breadcrumb } from '@/components/ui/typography';
import { PageHeader } from '@/components/layout/page-header';

/** "Mock Test #11 / <crumb>" header shared by W13–W15. */
export function ResultsHeader({ crumb, title, actions }: { crumb: string; title: string; actions?: ReactNode }) {
  return <PageHeader meta={<Breadcrumb items={[LATEST_RESULT.testName, crumb]} />} title={title} actions={actions} />;
}
