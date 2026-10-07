'use client';

import { useTranslations } from 'next-intl';
import { PLANS, RECOMMENDED_PLAN } from '@/lib/mock/plans';
import { formatSum } from '@/lib/format';
import { RadioCardGroup, RadioDot } from '@/components/ui/controls';
import { Tag } from '@/components/ui/tag';

/** W19 — subscription period radio cards. */
export function PlanPicker() {
  const t = useTranslations('plans');
  const tb = useTranslations('billing');
  return (
    <RadioCardGroup
      items={PLANS.map((p) => ({ ...p, value: p.id }))}
      defaultValue={RECOMMENDED_PLAN}
      label={tb('title')}
      className="flex flex-col gap-2.5"
      itemClassName="flex items-center gap-4 rounded-[20px] bg-surface px-5 py-[18px] shadow-inset transition-shadow duration-(--t-base) data-[state=checked]:bg-green-50 data-[state=checked]:shadow-selected"
      renderItem={(plan) => (
        <>
          <RadioDot />
          <span className="flex flex-1 flex-col gap-0.5">
            <span className="flex items-center gap-2 text-base font-medium">
              {t(`${plan.id}.name`)}
              {plan.discount && <Tag size="sm">−{plan.discount}%</Tag>}
            </span>
            <span className="text-[13px] text-ink-2">
              {plan.perMonth ? t('perMonth', { price: formatSum(plan.perMonth) }) : t('perMonthUnit')}
              {plan.id === RECOMMENDED_PLAN && ` · ${tb('untilExam')}`}
            </span>
          </span>
          <span className="font-mono text-base font-medium">{formatSum(plan.price)}</span>
        </>
      )}
    />
  );
}
