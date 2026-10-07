import { useTranslations } from 'next-intl';
import { Smartphone } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/lib/constants';
import { MOCK_USER } from '@/lib/mock/user';
import { richTags } from '@/lib/rich';
import { initLocale, metadataTitle, type LocaleParams } from '@/lib/i18n';
import { Icon } from '@/components/ui/icon';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { OtpInput } from '@/components/ui/otp-input';
import { AuthTopBar, BackLink } from '@/components/auth/auth-top-bar';
import { Stage } from '@/components/layout/stage';
import { ResendTimer } from '@/components/auth/resend-timer';

export const generateMetadata = metadataTitle('auth.verify.title');

function VerifyView() {
  const t = useTranslations('auth');
  return (
    <Stage topBar={<AuthTopBar start={<BackLink href={ROUTES.login} />} center={<Logo />} />}>
      <div className="flex flex-1 items-center justify-center px-5 pb-18">
        <div className="flex w-full max-w-[440px] flex-col gap-7 rounded-card-lg bg-surface p-10 shadow-[0_0_0_1px_rgba(20,22,30,.06),0_30px_60px_-30px_rgba(20,22,30,.2)] max-sm:p-6">
          <span className="grid size-12 place-items-center rounded-btn bg-green-100 text-green-text">
            <Icon as={Smartphone} size={22} />
          </span>
          <div className="flex flex-col gap-2">
            <h1 className="m-0 text-[28px] font-medium tracking-[-0.04em]">{t('verify.title')}</h1>
            <p className="m-0 text-[15px] leading-[1.55] text-ink-2">
              {t.rich('verify.text', { ...richTags, phone: `+998 ${MOCK_USER.phone}` })}{' '}
              <Link href={ROUTES.login}>{t('verify.change')}</Link>
            </p>
          </div>
          <OtpInput label={t('verify.otpLabel')} defaultValue="481" autoFocusIndex={3} />
          <Button disabled block className="justify-start">{t('verify.confirm')}</Button>
          <ResendTimer seconds={42} />
        </div>
      </div>
    </Stage>
  );
}

export default async function VerifyPage({ params }: { params: LocaleParams }) {
  await initLocale(params);
  return <VerifyView />;
}
