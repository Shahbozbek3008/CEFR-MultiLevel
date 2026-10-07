import { useTranslations } from 'next-intl';
import { ChevronRight, Play } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { LEVELS, ROUTES } from '@/lib/constants';
import { MOCK_EXAM, MOCK_USER } from '@/lib/mock/user';
import { DASHBOARD_SKILLS, LATEST_RESULT } from '@/lib/mock/results';
import { IN_PROGRESS, RECOMMENDED } from '@/lib/mock/tests';
import { initLocale, metadataTitle, type LocaleParams } from '@/lib/i18n';
import { Icon } from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import { ButtonLink } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress-bar';
import { AppMain } from '@/components/layout/page-header';
import { PageTitle } from '@/components/ui/typography';
import { SearchField } from '@/components/app/search-field';
import { ScaleBar } from '@/components/app/scale-bar';
import { SkillStatCard } from '@/components/app/skill-stat-card';
import { CountUp } from '@/components/motion/count-up';

export const generateMetadata = metadataTitle('dashboard.metaTitle');

const RECOMMENDED_HREF: Record<(typeof RECOMMENDED)[number]['kind'], string> = {
  full: ROUTES.test('13'),
  drill: ROUTES.testSection('13', 'writing'),
  done: ROUTES.result(LATEST_RESULT.attemptId),
};

function ExamCountdown() {
  const t = useTranslations('dashboard.countdown');
  const [, b2, c1] = LEVELS;
  return (
    <div className="relative isolate flex flex-col gap-[22px] overflow-hidden rounded-card bg-hero px-7 py-[26px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.18),0_24px_48px_-28px_oklch(0.4_0.095_263/.7)]">
      <span aria-hidden className="pointer-events-none absolute -top-1/2 -right-1/4 -z-10 size-[420px] animate-aurora rounded-full bg-[oklch(0.7_0.14_200/.45)] blur-[90px]" />
      <div aria-hidden className="grid-backdrop-light pointer-events-none absolute inset-0 -z-10 bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_90%_at_100%_0%,#000,transparent_70%)]" />
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[13px] text-white/72">{t('label')}</span>
          <span className="text-[64px] leading-[.95] font-light tracking-[-0.06em]">
            <CountUp value={MOCK_EXAM.daysLeft} />
            <span className="ml-1.5 text-lg tracking-normal text-white/70">{t('days')}</span>
          </span>
        </div>
        <span className="flex h-[26px] items-center rounded-[9px] bg-white/14 px-2.5 text-xs backdrop-blur-sm">{t('badge', { date: t('date'), level: MOCK_EXAM.target })}</span>
      </div>
      <ScaleBar value={MOCK_EXAM.currentScore} variant="onDark" labels={[t('now', { score: MOCK_EXAM.currentScore }), `${b2.code} · ${b2.min}`, `${c1.code} · ${c1.min}`]} />
    </div>
  );
}

function ContinueCard() {
  const t = useTranslations('dashboard.continue');
  return (
    <Card elevation="e1" interactive className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-ink-2">{t('label')}</span>
        <span className="font-mono text-xs text-ink-2">{t('left', { time: IN_PROGRESS.left })}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xl font-medium tracking-[-0.025em]">{IN_PROGRESS.name}</span>
        <span className="text-sm text-ink-2">{t('meta', { section: IN_PROGRESS.section, part: IN_PROGRESS.part, answered: IN_PROGRESS.answered, total: IN_PROGRESS.total })}</span>
      </div>
      <ProgressBar value={IN_PROGRESS.progress} />
      <ButtonLink href={ROUTES.testSection(IN_PROGRESS.id, 'reading')} size="sm" arrow className="mt-auto h-11 shadow-[inset_0_1px_0_rgba(255,255,255,.22)]">
        {t('cta')}
      </ButtonLink>
    </Card>
  );
}

function RecommendedTests() {
  const t = useTranslations('dashboard.recommended');
  return (
    <Card className="flex flex-col px-6 pt-1.5 pb-2 shadow-[0_0_0_1px_rgba(20,22,30,.05)]">
      <div className="flex h-[52px] items-center justify-between">
        <span className="text-[15px] font-medium">{t('title')}</span>
        <Link href={ROUTES.catalog} className="text-[13px] font-medium">{t('catalog')}</Link>
      </div>
      {RECOMMENDED.map((test) => (
        <Link
          key={test.id}
          href={RECOMMENDED_HREF[test.kind]}
          className="group -mx-3 grid h-[60px] grid-cols-[1.6fr_1fr_110px_90px_32px] items-center gap-4 rounded-[14px] px-3 text-sm text-ink shadow-[0_-1px_0_var(--divider)] transition-[background-color,box-shadow] duration-(--t-base) hover:bg-surface-muted hover:text-ink hover:shadow-none"
        >
          <span className="flex flex-col leading-[1.35]">
            <span className="font-medium">{test.name}</span>
            <span className="text-xs text-ink-2">{t(`kinds.${test.kind}`)}</span>
          </span>
          <span className="font-mono text-xs text-ink-2">{t(test.kind === 'drill' ? 'minutes' : 'hours', { value: test.duration })}</span>
          <Tag tone={test.tone} className="justify-self-start">{t(`tags.${test.tag}`)}</Tag>
          <span className="text-right font-mono text-[13px]">{test.result}</span>
          <Icon as={ChevronRight} size={16} strokeWidth={1.75} className="justify-self-center text-ink-4 transition-[translate,color] duration-(--t-base) ease-out-expo group-hover:translate-x-1 group-hover:text-ink-2" />
        </Link>
      ))}
    </Card>
  );
}

function DashboardView() {
  const t = useTranslations('dashboard');
  return (
    <AppMain className="gap-6 overflow-hidden">
      <div className="flex items-center justify-between gap-4">
        <PageTitle meta={t('today')} title={<span className="text-[28px]">{t('greeting', { name: MOCK_USER.firstName })}</span>} />
        <div className="flex items-center gap-2">
          <SearchField placeholder={t('search')} className="w-[280px] max-xl:hidden" />
          <ButtonLink href={ROUTES.test('13')} size="sm" icon={<Play size={12} fill="currentColor" strokeWidth={0} aria-hidden />} className="h-10 rounded-[12px] shadow-[inset_0_1px_0_rgba(255,255,255,.22)]">
            {t('newTest')}
          </ButtonLink>
        </div>
      </div>
      <div className="stagger grid gap-4 xl:grid-cols-[1.25fr_1fr]">
        <ExamCountdown />
        <ContinueCard />
      </div>
      <div className="stagger grid grid-cols-2 gap-3 xl:grid-cols-4">
        {DASHBOARD_SKILLS.map((s) => <SkillStatCard key={s.skill} {...s} />)}
      </div>
      <RecommendedTests />
    </AppMain>
  );
}

export default async function DashboardPage({ params }: { params: LocaleParams }) {
  await initLocale(params);
  return <DashboardView />;
}
