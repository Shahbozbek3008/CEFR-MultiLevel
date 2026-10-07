import { useTranslations } from 'next-intl';
import { Check, ChevronRight, Play, Sparkle } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { richTags } from '@/lib/rich';
import { Icon } from '@/components/ui/icon';
import { ButtonLink } from '@/components/ui/button';
import { ResultPhone } from './result-phone';

const floatingCard = 'absolute bg-white/92 backdrop-blur-md shadow-e2';

function GrowthSparkline() {
  return (
    <svg width="64" height="28" viewBox="0 0 64 28" aria-hidden>
      <polyline points="2,24 12,21 22,22 32,16 42,14 52,9 62,4" fill="none" stroke="var(--green-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="62" cy="4" r="3" fill="#fff" stroke="var(--green-500)" strokeWidth="2" />
    </svg>
  );
}

export function Hero() {
  const t = useTranslations('landing.hero');

  return (
    <section className="relative overflow-hidden">
      <div className="grid-backdrop pointer-events-none absolute inset-0 bg-size-[64px_64px] mask-[radial-gradient(ellipse_70%_60%_at_70%_40%,#000_20%,transparent_75%)] max-md:hidden" />
      <div className="pointer-events-none absolute -top-[10%] -right-[30%] h-[60%] w-[90%] bg-[radial-gradient(closest-side,oklch(0.95_0.06_135/.9),transparent)] md:-right-[10%] md:h-[90%] md:w-[60%]" />

      <div className="relative mx-auto grid max-w-page grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))] items-center gap-[22px] px-5 pt-7 md:gap-18 md:px-8 md:pt-[104px] md:pb-30">
        <div className="flex flex-col gap-[22px] md:gap-8">
          <a href="#format" className="flex h-[30px] items-center gap-2 self-start rounded-pill bg-surface pr-2.5 pl-1 text-xs text-ink-body shadow-[0_0_0_1px_rgba(20,22,30,.07),0_1px_2px_rgba(20,22,30,.04)] hover:text-ink md:h-8 md:gap-2.5 md:pr-3 md:text-[13px]">
            <span className="flex h-[22px] items-center rounded-pill bg-green-100 px-2 text-[11px] font-medium text-green-text md:h-6 md:px-[9px] md:text-xs">2026</span>
            <span className="max-md:hidden">{t('announcement')}</span>
            <span className="md:hidden">{t('announcementShort')}</span>
            <Icon as={ChevronRight} size={14} strokeWidth={1.75} className="max-md:hidden" />
          </a>
          <h1 className="m-0 text-[44px] leading-none font-medium tracking-[-0.052em] md:text-[clamp(44px,6vw,76px)] md:leading-[.98]">
            {t.rich('title', { ...richTags, br: () => <br className="max-md:hidden" /> })}
          </h1>
          <p className="m-0 max-w-[440px] text-base leading-[1.55] text-ink-2 md:text-lg md:leading-[1.6]">{t('subtitle')}</p>
          <div className="flex flex-col gap-1.5 md:flex-row md:flex-wrap md:items-center md:gap-2.5">
            <ButtonLink href={ROUTES.start} arrow className="max-md:h-[54px] md:min-w-[220px]">{t('cta')}</ButtonLink>
            <a href="#steps" className="flex h-[46px] items-center justify-center gap-2.5 rounded-btn px-[18px] text-[15px] font-medium text-ink hover:bg-hover hover:text-ink md:h-[52px]">
              <span className="grid size-[26px] place-items-center rounded-full bg-surface shadow-[0_0_0_1px_rgba(20,22,30,.08)] md:size-7">
                <Play size={10} fill="currentColor" strokeWidth={0} aria-hidden />
              </span>
              {t('how')}
            </a>
          </div>
          <div className="flex flex-wrap gap-7 pt-5 text-[13px] text-ink-2 max-md:hidden">
            {(['noCard', 'platforms'] as const).map((k) => (
              <span key={k} className="flex items-center gap-2">
                <Icon as={Check} size={15} strokeWidth={2} className="text-[oklch(0.5_0.14_140)]" />
                {t(k)}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center md:h-[640px] md:items-center">
          <ResultPhone variant="full" className="max-md:hidden" />
          <ResultPhone variant="compact" className="mt-1 md:hidden" />

          <div className={`${floatingCard} top-[18%] left-0 flex w-[220px] flex-col gap-2.5 rounded-[20px] p-[14px] max-md:hidden`}>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-medium">
                <Icon as={Sparkle} size={13} strokeWidth={1.8} className="text-blue" />
                {t('aiFix')}
              </span>
              <span className="font-mono text-[10px] text-[#93959d]">Writing</span>
            </div>
            <div className="text-[13px] leading-[1.55] text-ink-body">
              People <span className="text-error-text line-through">believes</span>{' '}
              <span className="rounded px-[3px] font-medium text-[oklch(0.36_0.11_140)] bg-green-100">believe</span> that…
            </div>
          </div>

          <div className={`${floatingCard} right-0 bottom-[18%] flex items-center gap-3 rounded-card-sm px-[14px] py-3 max-md:hidden`}>
            <GrowthSparkline />
            <div className="flex flex-col leading-tight">
              <span className="font-mono text-[15px] font-medium">+14</span>
              <span className="text-[11px] text-ink-2">{t('growth')}</span>
            </div>
          </div>

          <div className="absolute bottom-[110px] -left-1.5 flex items-center gap-2 rounded-[14px] bg-surface px-[11px] py-[9px] shadow-[0_0_0_1px_rgba(20,22,30,.06),0_16px_32px_-14px_rgba(20,22,30,.3)] md:hidden">
            <span className="font-mono text-[13px] font-medium text-success">+14</span>
            <span className="text-[11px] text-ink-2">{t('growth')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
