import { useTranslations } from 'next-intl';
import { Shield, Tag as TagIcon } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { PLANS, PRO_FEATURES, RECOMMENDED_PLAN } from '@/lib/mock/plans';
import { formatSum } from '@/lib/format';
import { initLocale, metadataTitle, type LocaleParams } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { ButtonLink } from '@/components/ui/button';
import { FeatureList } from '@/components/ui/feature-list';
import { Breadcrumb } from '@/components/ui/typography';
import { AppMain, PageHeader } from '@/components/layout/page-header';
import { PlanPicker } from '@/components/app/plan-picker';
import { PaymentMethods } from '@/components/app/payment-methods';

export const generateMetadata = metadataTitle('billing.title');

const plan = PLANS.find((p) => p.id === RECOMMENDED_PLAN)!;
const discount = (plan.fullPrice ?? plan.price) - plan.price;

function OrderSummary() {
  const t = useTranslations('billing');
  const tp = useTranslations('plans');
  const total = formatSum(plan.price);
  return (
    <Card elevation="e1" className="flex flex-col gap-[18px] p-6">
      <span className="text-[15px] font-medium">{t('order')}</span>
      <div className="flex flex-col gap-2.5 text-sm">
        <div className="flex justify-between"><span className="text-ink-2">{t('planLine', { plan: tp(`${plan.id}.name`) })}</span><span className="font-mono">{formatSum(plan.fullPrice ?? plan.price)}</span></div>
        <div className="flex justify-between"><span className="text-ink-2">{t('discount')}</span><span className="font-mono text-success">−{formatSum(discount)}</span></div>
      </div>
      <label className="flex h-11 items-center gap-2.5 rounded-[12px] pr-1.5 pl-[14px] text-sm shadow-inset focus-within:shadow-focus">
        <Icon as={TagIcon} size={15} className="text-ink-3" />
        <input placeholder={t('promo')} aria-label={t('promo')} className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-ink-disabled" />
        <button type="button" className="flex h-8 items-center rounded-[9px] bg-surface-sunken px-3 text-[13px] font-medium text-ink-body">{t('apply')}</button>
      </label>
      <div className="flex items-baseline justify-between pt-4 shadow-[0_-1px_0_var(--divider)]">
        <span className="text-sm font-medium">{t('total')}</span>
        <span className="text-[30px] tracking-[-0.04em]">{total} <span className="text-sm tracking-normal text-ink-2">{tp('currency')}</span></span>
      </div>
      <PaymentMethods />
      <ButtonLink href={ROUTES.billingSuccess} arrow className="px-[18px] shadow-action-sm">{t('pay', { amount: total })}</ButtonLink>
      <span className="flex items-center justify-center gap-1.5 text-xs text-ink-3">
        <Icon as={Shield} size={13} />
        {t('secure')}
      </span>
    </Card>
  );
}

function BillingView() {
  const t = useTranslations('billing');
  const ts = useTranslations('settings.nav');
  const tp = useTranslations('plans');
  return (
    <AppMain className="gap-5 overflow-hidden">
      <PageHeader meta={<Breadcrumb items={[ts('settings'), ts('subscription')]} />} title={t('title')} />
      <div className="grid flex-1 gap-6 xl:grid-cols-[1fr_420px]">
        <div className="flex flex-col gap-5">
          <PlanPicker />
          <FeatureList variant="badge" items={PRO_FEATURES.map((f) => tp(`features.${f}`))} className="grid gap-x-6 gap-y-2.5 px-1 pt-5 sm:grid-cols-2" />
        </div>
        <OrderSummary />
      </div>
    </AppMain>
  );
}

export default async function BillingPage({ params }: { params: LocaleParams }) {
  await initLocale(params);
  return <BillingView />;
}
