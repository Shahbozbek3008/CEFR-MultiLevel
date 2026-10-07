import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui/icon';
import { Logo } from '@/components/ui/logo';

export function BackLink({ href }: { href: string }) {
  const t = useTranslations('auth');
  return (
    <Link href={href} className="flex h-[38px] items-center gap-1.5 rounded-[11px] bg-surface pr-[14px] pl-2.5 text-sm text-ink-body shadow-inset hover:bg-bg-app hover:text-ink">
      <Icon as={ChevronLeft} size={16} strokeWidth={1.75} />
      {t('back')}
    </Link>
  );
}

type StepIndicatorProps = { current: number; total?: number; /** Current step only partially done (lighter fill). */ partial?: boolean };

export function StepIndicator({ current, total = 3, partial = false }: StepIndicatorProps) {
  const t = useTranslations('onboarding');
  return (
    <div className="flex items-center gap-[14px] text-[13px] text-ink-2">
      <span className="font-mono">{t('step', { current, total })}</span>
      <div className="grid grid-cols-[repeat(3,48px)] gap-1" aria-hidden>
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={cn('h-1 rounded-[2px]', i < current - (partial ? 1 : 0) ? 'bg-green' : i === current - 1 ? 'bg-green-300' : 'bg-divider-page')} />
        ))}
      </div>
    </div>
  );
}

const SPACER = <span className="w-[90px]" aria-hidden />;

/** Top bar of auth/onboarding screens: start · centre · end slots (72px). */
export function AuthTopBar({ start = <Logo />, center, end = SPACER, className }: { start?: ReactNode; center?: ReactNode; end?: ReactNode; className?: string }) {
  return (
    <div className={cn('relative z-10 flex h-18 shrink-0 items-center justify-between px-5 md:px-10', className)}>
      {start}
      {center}
      {end}
    </div>
  );
}
