import { useTranslations } from 'next-intl';
import { ROUTES } from '@/lib/constants';
import { MOCK_USER } from '@/lib/mock/user';
import { initLocale, metadataTitle, type LocaleParams } from '@/lib/i18n';
import { ButtonLink } from '@/components/ui/button';
import { Field, PhoneInput, TextInput } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/controls';
import { AuthTopBar, BackLink, StepIndicator } from '@/components/auth/auth-top-bar';
import { Stage } from '@/components/layout/stage';
import { SocialButtons } from '@/components/auth/social-buttons';
import { PlanSummary } from '@/components/auth/plan-summary';

export const generateMetadata = metadataTitle('onboarding.account.title');

/** W4a — onboarding 3/3: create account. */
function AccountView() {
  const t = useTranslations('onboarding.account');
  const ta = useTranslations('auth');
  return (
    <Stage topBar={<AuthTopBar start={<BackLink href={ROUTES.startDate} />} center={<StepIndicator current={3} partial />} />}>
      <div className="grid flex-1 items-center gap-20 px-5 pt-6 pb-12 lg:grid-cols-[1fr_420px] lg:px-35">
        <div className="flex max-w-[440px] flex-col gap-6">
          <div className="flex flex-col gap-2.5">
            <h1 className="m-0 text-[40px] leading-[1.05] font-medium tracking-[-0.045em]">{t('title')}</h1>
            <p className="m-0 text-base leading-[1.55] text-ink-2">{t('text')}</p>
          </div>
          <Field label={t('name')} htmlFor="name">
            <TextInput id="name" name="name" defaultValue={MOCK_USER.firstName} autoComplete="given-name" />
          </Field>
          <Field label={ta('phone')} htmlFor="phone" hint={t('smsHint')}>
            <PhoneInput id="phone" name="phone" defaultValue={MOCK_USER.phone} />
          </Field>
          <Checkbox id="consent" defaultChecked>
            {t.rich('consent', { terms: (c) => <a href="#">{c}</a>, privacy: (c) => <a href="#">{c}</a> })}
          </Checkbox>
          <ButtonLink href={ROUTES.startVerify} arrow block>{ta('sendCode')}</ButtonLink>
          <SocialButtons />
        </div>
        <PlanSummary />
      </div>
    </Stage>
  );
}

export default async function AccountPage({ params }: { params: LocaleParams }) {
  await initLocale(params);
  return <AccountView />;
}
