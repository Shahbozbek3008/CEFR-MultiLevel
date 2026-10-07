import { useTranslations } from 'next-intl';
import { ROUTES } from '@/lib/constants';
import { ButtonLink, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { Container } from './container';

export function CtaBanner() {
  const t = useTranslations('landing.cta');
  return (
    <Container id="download" className="scroll-mt-20 pt-9 md:pt-0 md:pb-30">
      <div className="relative flex flex-col gap-5 overflow-hidden rounded-card-lg bg-hero px-[22px] py-7 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.18)] md:gap-8 md:rounded-banner md:p-[clamp(40px,6vw,80px)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_60%_80%_at_100%_0%,#000,transparent_70%)] max-md:hidden" />
        <h2 className="relative m-0 max-w-[720px] text-[32px] leading-[1.02] font-medium tracking-[-0.045em] md:text-[clamp(36px,5vw,64px)] md:leading-none md:tracking-[-0.05em]">{t('title')}</h2>
        <span className="relative text-sm text-white/75 md:hidden">{t('noteShort')}</span>
        <div className="relative flex flex-wrap items-center gap-2.5">
          <ButtonLink href={ROUTES.start} variant="onDark" arrow className="max-md:w-full md:min-w-[220px]">{t('start')}</ButtonLink>
          <a href="#" className={cn(buttonVariants({ variant: 'glass' }), 'px-[18px] max-md:hidden')}>{t('stores')}</a>
          <span className="ml-2 text-sm text-white/72 max-md:hidden">{t('note')}</span>
        </div>
      </div>
    </Container>
  );
}
