import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/lib/constants';
import { STATUS_TONE, type CatalogTest } from '@/lib/mock/tests';
import { Card } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import { ButtonLink } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress-bar';

function Footer({ test }: { test: CatalogTest }) {
  const t = useTranslations('catalog');
  switch (test.status) {
    case 'new':
      return <ButtonLink href={ROUTES.test(test.id)} size="sm" arrow className="px-[18px]">{t('start')}</ButtonLink>;
    case 'inProgress':
      return (
        <div className="flex flex-col gap-2.5">
          <ProgressBar value={test.progress ?? 0} />
          <div className="flex justify-between text-[13px] text-ink-2">
            <span>{test.progress}%</span>
            <Link href={ROUTES.testSection(test.id, 'reading')} className="font-medium">{t('continue')}</Link>
          </div>
        </div>
      );
    case 'done':
      return (
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-mono text-[15px]">{test.score}/75 <Tag size="sm">{test.level}</Tag></span>
          <Link href={ROUTES.result(test.id)} className="text-[13px] font-medium">{t('result')}</Link>
        </div>
      );
    default:
      return <ButtonLink href={ROUTES.test(test.id)} variant="secondary" size="sm" className="justify-between">{t('start')}</ButtonLink>;
  }
}

export function CatalogCard({ test }: { test: CatalogTest }) {
  const t = useTranslations('catalog');
  return (
    <Card interactive className="flex min-h-[200px] flex-col gap-[18px] p-[22px] shadow-[0_0_0_1px_rgba(20,22,30,.05)]">
      <div className="flex items-start justify-between">
        <Tag tone={STATUS_TONE[test.status]}>{t(`status.${test.status}`)}</Tag>
        <span className="font-mono text-xs text-ink-3">{test.duration}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[19px] font-medium tracking-[-0.025em]">{test.name}</span>
        <span className="text-[13px] text-ink-2">{t(`meta.${test.meta.key}`, test.meta.values)}</span>
      </div>
      <div className="mt-auto"><Footer test={test} /></div>
    </Card>
  );
}
