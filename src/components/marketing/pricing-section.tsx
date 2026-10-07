import { useTranslations } from 'next-intl';
import { ROUTES } from '@/lib/constants';
import { PLANS, RECOMMENDED_PLAN, type PlanInfo } from '@/lib/mock/plans';
import { formatSum } from '@/lib/format';
import { cn } from '@/lib/cn';
import { ButtonLink } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { FeatureList } from '@/components/ui/feature-list';
import { SectionHeading } from '@/components/ui/typography';
import { Container } from './container';

function PlanCard({ plan, highlighted }: { plan: PlanInfo; highlighted: boolean }) {
  const t = useTranslations('plans');
  const sub = plan.perMonth ? t('perMonth', { price: formatSum(plan.perMonth) }) : t('everyMonth');

  return (
    <div
      className={cn(
        'flex flex-col gap-[18px] rounded-card p-[22px] md:gap-7 md:rounded-card-lg md:p-8',
        highlighted
          ? 'bg-surface shadow-[0_0_0_1.5px_var(--green-500),0_24px_48px_-28px_oklch(0.45_0.14_140/.4)] max-md:order-first md:shadow-[0_0_0_1.5px_var(--green-500),0_30px_60px_-30px_oklch(0.45_0.14_140/.35)]'
          : 'bg-surface shadow-e0 md:bg-bg',
      )}
    >
      <div className="flex min-h-[26px] items-center justify-between">
        <span className="text-[15px] font-medium">{t(`${plan.id}.name`)}</span>
        {plan.discount && <Tag className="md:h-[26px] md:rounded-pill md:px-2.5">−{plan.discount}%</Tag>}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[38px] leading-none font-light tracking-[-0.055em] md:text-5xl">{formatSum(plan.price)}</span>
          <span className="text-[13px] text-ink-2 md:text-sm">
            {t('currency')}<span className="md:hidden"> · {t(`${plan.id}.period`)}</span>
          </span>
        </div>
        <span className="text-[13px] text-ink-2 max-md:hidden">{sub}</span>
      </div>
      <ButtonLink
        href={ROUTES.start}
        variant={highlighted ? 'primary' : 'secondary'}
        size="md"
        arrow
        className={cn('h-12 rounded-[14px] text-[15px] md:order-none', highlighted ? 'max-md:order-last' : 'max-md:hidden')}
      >
        {t(highlighted ? 'choose' : 'start')}
      </ButtonLink>
      <FeatureList
        items={plan.features.map((f) => t(`features.${f}`))}
        className={cn('pt-4 shadow-[0_-1px_0_var(--track)] max-md:gap-2.5 md:pt-6 md:shadow-[0_-1px_0_var(--divider-muted)]', !highlighted && 'max-md:hidden')}
      />
    </div>
  );
}

export function PricingSection() {
  const t = useTranslations('landing.pricing');
  return (
    <section id="pricing" className="scroll-mt-20 md:bg-surface md:shadow-[0_-1px_0_rgba(20,22,30,.06),0_1px_0_rgba(20,22,30,.06)]">
      <Container className="flex flex-col gap-[14px] pt-9 md:gap-14 md:py-36">
        <div className="flex flex-col gap-2.5 pb-1.5 md:items-center md:gap-4 md:pb-0 md:text-center">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} className="md:items-center" />
          <span className="text-sm text-ink-2 md:text-[15px]">{t('text')}</span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-stretch gap-[14px] md:gap-4">
          {PLANS.map((plan) => <PlanCard key={plan.id} plan={plan} highlighted={plan.id === RECOMMENDED_PLAN} />)}
        </div>
      </Container>
    </section>
  );
}
