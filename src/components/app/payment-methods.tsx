'use client';

import { useTranslations } from 'next-intl';
import { PAYMENT_METHODS } from '@/lib/mock/plans';
import { RadioCardGroup, RadioDot } from '@/components/ui/controls';

export function PaymentMethods() {
  const t = useTranslations('billing');
  return (
    <RadioCardGroup
      items={PAYMENT_METHODS}
      defaultValue="click"
      label={t('paymentMethod')}
      className="flex flex-col gap-2"
      itemClassName="flex h-14 items-center gap-3 rounded-btn bg-surface px-4 shadow-inset data-[state=checked]:shadow-[inset_0_0_0_1.5px_var(--green-500)]"
      renderItem={(m) => (
        <>
          <span className="grid size-[30px] place-items-center rounded-[9px] text-xs font-semibold text-white" style={{ background: m.color }}>{m.letter}</span>
          <span className="flex-1 text-[15px] font-medium">{m.name}</span>
          <RadioDot size={18} />
        </>
      )}
    />
  );
}
