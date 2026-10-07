import { useTranslations } from 'next-intl';
import { AudioLines, ChartColumn, PenLine } from 'lucide-react';
import { MAX_SCORE } from '@/lib/constants';
import { WRITING_CRITERIA } from '@/lib/mock/results';
import { richTags } from '@/lib/rich';
import { Icon } from '@/components/ui/icon';
import { Ring } from '@/components/ui/gauge';
import { CriteriaList } from '@/components/ui/criteria-list';
import { Correction, Mark } from '@/components/ui/mark';
import { SectionHeading } from '@/components/ui/typography';
import { Container } from './container';

const POINTS = [
  { key: 'criteria', icon: ChartColumn },
  { key: 'inline', icon: PenLine },
  { key: 'transcript', icon: AudioLines },
] as const;

const panel = 'rounded-card bg-surface';

export function AiSection() {
  const t = useTranslations('landing.ai');

  return (
    <section id="ai" className="scroll-mt-20 md:bg-surface md:shadow-[0_-1px_0_rgba(20,22,30,.06),0_1px_0_rgba(20,22,30,.06)]">
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-[18px] pt-[58px] md:gap-18 md:py-36">
        <div className="flex flex-col gap-4">
          <SectionHeading eyebrow={t('eyebrow')} title={t.rich('title', richTags)} />
          <p className="m-0 max-w-[420px] text-base leading-[1.6] text-ink-2 max-md:hidden">{t('text')}</p>
          <ul className="mt-6 flex flex-col max-md:hidden">
            {POINTS.map((p) => (
              <li key={p.key} className="grid grid-cols-[32px_1fr] gap-[14px] py-[18px] shadow-[0_-1px_0_var(--divider-muted)]">
                <span className="grid size-8 place-items-center rounded-sm bg-surface-sunken text-ink-body"><Icon as={p.icon} size={16} /></span>
                <span className="flex flex-col gap-[3px]">
                  <span className="text-[15px] font-medium">{t(`points.${p.key}.title`)}</span>
                  <span className="text-sm leading-normal text-ink-2">{t(`points.${p.key}.desc`)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-[18px] md:gap-3 md:rounded-hero md:bg-[#f5f5f6] md:p-[clamp(20px,3vw,36px)]">
          <div className={`${panel} flex items-center gap-4 p-[18px] shadow-e1 md:gap-[22px] md:p-[22px]`}>
            <Ring value={52} max={MAX_SCORE} size={88} stroke={7} className="max-md:size-[72px]! max-md:[&_svg]:size-[72px]">
              <span className="text-[22px] leading-none font-light tracking-[-0.05em] md:text-[28px]">52</span>
              <span className="font-mono text-[9px] text-[#93959d] max-md:hidden">/{MAX_SCORE}</span>
            </Ring>
            <div className="flex flex-col gap-1 md:gap-1.5">
              <span className="text-xs text-ink-2">{t('card.task')}</span>
              <span className="text-base font-medium tracking-[-0.02em] md:text-lg">{t('card.level')}</span>
              <span className="text-xs leading-normal text-ink-2 md:text-[13px]">
                <span className="max-md:hidden">{t('card.summaryLead')} </span>{t('card.summary')}
              </span>
            </div>
          </div>

          <CriteriaList
            items={WRITING_CRITERIA}
            columns="1fr minmax(60px,120px) 44px"
            rowClassName="max-md:text-[13px] md:h-12"
            className={`${panel} px-[18px] py-0.5 shadow-[0_0_0_1px_rgba(20,22,30,.05)] md:px-[22px] md:py-1.5`}
          />

          <div className={`${panel} flex flex-col gap-[14px] px-[18px] py-4 shadow-[0_0_0_1px_rgba(20,22,30,.05)] md:px-[22px] md:py-5`}>
            <p className="m-0 text-sm leading-[1.75] text-ink-reading md:text-[15px] md:leading-[1.8]">
              Many people <Mark kind="grammar">believes</Mark> that public transport <Mark kind="lexical">is very good</Mark> for a<span className="max-md:hidden"> sustainable</span> city.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-[14px] text-[13px] shadow-[0_-1px_0_var(--divider)] max-md:hidden">
              <Correction from="believes" to="believe" className="text-[13px]" />
              <span className="text-ink-2">{t('card.fixNote')}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
