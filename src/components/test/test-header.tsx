import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES, type Skill } from '@/lib/constants';
import { SESSION } from '@/lib/mock/test-content';
import { Icon } from '@/components/ui/icon';
import { SectionStepper } from './section-stepper';
import { TimerPill } from './timer-pill';
import { FinishDialog } from './finish-dialog';

const circle = 'grid size-10 shrink-0 place-items-center rounded-full bg-surface text-ink-body shadow-inset transition-[background-color,rotate] duration-(--t-sheet) ease-spring hover:rotate-90 hover:bg-bg-app hover:text-ink';

export function TestHeader({ testName, section }: { testName: string; section: Skill }) {
  const t = useTranslations('test');
  const s = SESSION[section];
  return (
    <header className="grid h-(--test-header-h) shrink-0 grid-cols-[1fr_auto_1fr] items-center bg-surface px-6 shadow-[0_1px_0_rgba(20,22,30,.06)]">
      <div className="flex items-center gap-[14px]">
        <Link href={ROUTES.catalog} className={circle} aria-label={t('exit')}>
          <Icon as={X} size={16} strokeWidth={1.7} />
        </Link>
        <div className="flex flex-col leading-[1.3]">
          <span className="text-sm font-medium">{testName}</span>
          <span className="text-xs text-ink-2">{t(`subtitle.${section}`, { current: s.current, total: s.total })}</span>
        </div>
      </div>
      <SectionStepper current={section} />
      <div className="flex items-center gap-2.5 justify-self-end">
        <TimerPill value={s.timer} warning={s.warning} />
        <FinishDialog />
      </div>
    </header>
  );
}
