import { useTranslations } from 'next-intl';
import { Check, ChevronLeft, Headphones, Mic, Play, Wifi } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES, SKILL_ICONS } from '@/lib/constants';
import { TEST_OVERVIEW } from '@/lib/mock/tests';
import { initLocale, metadataTitle, type PageProps } from '@/lib/i18n';
import { testName } from '@/lib/test-route';
import { Card } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import { Icon } from '@/components/ui/icon';
import { ButtonLink } from '@/components/ui/button';
import { Breadcrumb } from '@/components/ui/typography';

export const generateMetadata = metadataTitle('pretest.title');

function SectionList() {
  const t = useTranslations('pretest.sections');
  const ts = useTranslations('skills');
  return (
    <Card className="px-6 py-1 shadow-[0_0_0_1px_rgba(20,22,30,.05)]">
      {TEST_OVERVIEW.sections.map((s) => (
        <div key={s.skill} className="grid h-16 grid-cols-[40px_1fr_auto] items-center gap-4 shadow-[0_1px_0_var(--divider)] last:shadow-none">
          <span className="grid size-10 place-items-center rounded-[12px] bg-surface-sunken text-ink-body"><Icon as={SKILL_ICONS[s.skill]} strokeWidth={1.5} /></span>
          <span className="flex flex-col leading-[1.35]">
            <span className="text-[15px] font-medium">{ts(s.skill)}</span>
            <span className="text-[13px] text-ink-2">
              {'questions' in s ? t('partsQuestions', { parts: s.parts, questions: s.questions }) : 'tasks' in s ? t('tasksAi', { tasks: s.tasks }) : t('partsAi', { parts: s.parts })}
            </span>
          </span>
          <span className="font-mono text-[13px] text-ink-body">{t('minutes', { value: s.minutes })}</span>
        </div>
      ))}
    </Card>
  );
}

function DeviceCheck() {
  const t = useTranslations('pretest');
  const row = 'flex h-[52px] items-center gap-3 rounded-[14px] bg-surface-muted px-[14px]';
  return (
    <Card elevation="e1" className="flex flex-col gap-5 p-6 lg:sticky lg:top-6">
      <div className="flex items-baseline justify-between">
        <span className="text-[13px] text-ink-2">{t('totalTime')}</span>
        <span className="font-mono text-[28px] tracking-[-0.03em]">{TEST_OVERVIEW.totalTime}</span>
      </div>
      <div className="flex flex-col gap-3 pt-[18px] shadow-[0_-1px_0_var(--divider)]">
        <span className="text-sm font-medium">{t('deviceCheck')}</span>
        <div className={row}>
          <Icon as={Headphones} size={17} className="text-ink-body" />
          <span className="flex-1 text-sm">{t('headphones')}</span>
          <button type="button" className="flex h-8 items-center gap-1.5 rounded-sm bg-surface px-3 text-[13px] shadow-inset">
            <Play size={11} fill="currentColor" strokeWidth={0} aria-hidden />{t('listen')}
          </button>
        </div>
        <div className={row}>
          <Icon as={Mic} size={17} className="text-ink-body" />
          <span className="flex-1 text-sm">{t('microphone')}</span>
          <Tag tone="success"><Icon as={Check} size={12} strokeWidth={2.5} />{t('ready')}</Tag>
        </div>
      </div>
      <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[13px] leading-normal text-ink-body">
        <li className="flex gap-2.5"><Icon as={Headphones} size={15} className="shrink-0 text-blue" />{t('ruleAudio')}</li>
        <li className="flex gap-2.5"><Icon as={Wifi} size={15} className="shrink-0 text-blue" />{t('ruleOffline')}</li>
      </ul>
      <ButtonLink href={ROUTES.testSection(TEST_OVERVIEW.id, 'listening')} arrow className="px-[18px] shadow-action-sm">{t('start')}</ButtonLink>
    </Card>
  );
}

function PretestView({ id }: { id: string }) {
  const t = useTranslations('pretest');
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex h-(--test-header-h) items-center justify-between bg-surface px-6 shadow-[0_1px_0_rgba(20,22,30,.06)]">
        <div className="flex items-center gap-[14px]">
          <Link href={ROUTES.catalog} aria-label={t('back')} className="grid size-10 place-items-center rounded-full bg-surface text-ink-body shadow-inset hover:bg-bg-app hover:text-ink">
            <Icon as={ChevronLeft} size={16} strokeWidth={1.7} />
          </Link>
          <span className="text-sm text-ink-2"><Breadcrumb items={[t('crumb'), testName(id)]} /></span>
        </div>
        <span className="flex items-center gap-2 text-[13px] text-ink-2"><Icon as={Wifi} size={15} />{t('online')}</span>
      </header>
      <div className="grid flex-1 items-start gap-6 px-6 py-10 lg:grid-cols-[1fr_420px] xl:px-30">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <div className="flex gap-1.5"><Tag>{t('fullMock')}</Tag><Tag tone="neutral">{t('realMode')}</Tag></div>
            <h1 className="m-0 text-[44px] leading-[1.05] font-medium tracking-[-0.045em]">{testName(id)}</h1>
            <span className="text-base text-ink-2">{t('subtitle')}</span>
          </div>
          <SectionList />
        </div>
        <DeviceCheck />
      </div>
    </div>
  );
}

export default async function PretestPage({ params }: PageProps<{ id: string }>) {
  await initLocale(params);
  const { id } = await params;
  return <PretestView id={id} />;
}
