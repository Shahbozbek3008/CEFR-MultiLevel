import { useTranslations } from 'next-intl';
import { LEVELS, ROUTES } from '@/lib/constants';
import { MOCK_EXAM } from '@/lib/mock/user';
import { initLocale, metadataTitle, type LocaleParams } from '@/lib/i18n';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { AuthTopBar, BackLink, StepIndicator } from '@/components/auth/auth-top-bar';
import { Stage } from '@/components/layout/stage';
import { ExamCalendar } from '@/components/auth/exam-calendar';

export const generateMetadata = metadataTitle('onboarding.date.title');

const DAILY_OPTIONS = ['m15', 'm30', 'h1', 'h2'] as const;
const target = LEVELS.find((l) => l.code === MOCK_EXAM.target)!;

/** W4 — onboarding 2/3: exam date + daily time. */
function DateView() {
  const t = useTranslations('onboarding');
  return (
    <Stage topBar={<AuthTopBar start={<BackLink href={ROUTES.start} />} center={<StepIndicator current={2} />} />}>
      <div className="grid flex-1 items-center gap-16 px-5 pt-10 pb-16 lg:grid-cols-2 lg:px-30">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2.5">
            <h1 className="m-0 text-[40px] leading-[1.05] font-medium tracking-[-0.045em]">{t('date.title')}</h1>
            <p className="m-0 text-base leading-[1.55] text-ink-2">{t('date.text')}</p>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="text-[13px] font-medium">{t('date.daily')}</span>
            <SegmentedControl
              size="lg"
              label={t('date.daily')}
              defaultValue="m30"
              options={DAILY_OPTIONS.map((o) => ({ value: o, label: t(`date.options.${o}`) }))}
            />
          </div>
          <Card radius="md" className="flex items-center gap-4 rounded-[20px] px-5 py-[18px]">
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="text-xs text-ink-2">{t('date.planLabel')}</span>
              <span className="text-base font-medium">{t('date.planValue', { days: MOCK_EXAM.daysLeft, tests: MOCK_EXAM.mockTests })}</span>
            </div>
            <Tag className="h-[26px] rounded-[9px] px-2.5 font-mono font-normal">{t('date.target', { level: target.code, min: target.min })}</Tag>
          </Card>
          <ButtonLink href={ROUTES.startAccount} arrow block>{t('continue')}</ButtonLink>
        </div>
        <ExamCalendar year={2026} month={10} officialDays={[8, 15, 22, 29]} defaultSelected={1} />
      </div>
    </Stage>
  );
}

export default async function DatePage({ params }: { params: LocaleParams }) {
  await initLocale(params);
  return <DateView />;
}
