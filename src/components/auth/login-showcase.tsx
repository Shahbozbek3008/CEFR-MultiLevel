import { useTranslations } from 'next-intl';
import { MAX_SCORE } from '@/lib/constants';
import { LATEST_RESULT } from '@/lib/mock/results';
import { Ring } from '@/components/ui/gauge';

/** W1 right panel — grid backdrop, glow and the latest-result card. */
export function LoginShowcase() {
  const t = useTranslations('auth.login.showcase');
  return (
    <div className="relative flex items-center justify-center overflow-hidden bg-[#f5f5f6] max-lg:hidden">
      <div className="grid-backdrop absolute inset-0 bg-size-[56px_56px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000,transparent_75%)]" />
      <div className="absolute size-[520px] rounded-full bg-[radial-gradient(closest-side,var(--green-100),transparent)]" />
      <div className="relative flex w-[380px] flex-col gap-3">
        <div className="flex items-center gap-5 rounded-card bg-surface p-[22px] shadow-[0_0_0_1px_rgba(20,22,30,.05),0_24px_48px_-24px_rgba(20,22,30,.25)]">
          <Ring value={LATEST_RESULT.total} max={MAX_SCORE} size={88} stroke={7} r={38}>
            <span className="text-[28px] leading-none font-light tracking-[-0.05em]">{LATEST_RESULT.total}</span>
            <span className="font-mono text-[9px] text-[#93959d]">/{MAX_SCORE}</span>
          </Ring>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-ink-2">{t('label')}</span>
            <span className="text-lg font-medium tracking-[-0.02em]">{t('level')}</span>
            <span className="font-mono text-xs text-green-eyebrow">{t('growth')}</span>
          </div>
        </div>
        <span className="px-1.5 pt-2 text-sm leading-[1.6] text-ink-2">{t('sync')}</span>
      </div>
    </div>
  );
}
