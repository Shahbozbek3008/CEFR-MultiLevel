import { initLocale, type LocaleParams } from '@/lib/i18n';
import { Hero } from '@/components/marketing/hero';
import { FormatSection } from '@/components/marketing/format-section';
import { AiSection } from '@/components/marketing/ai-section';
import { StepsSection } from '@/components/marketing/steps-section';
import { PricingSection } from '@/components/marketing/pricing-section';
import { FaqSection } from '@/components/marketing/faq-section';
import { CtaBanner } from '@/components/marketing/cta-banner';

export default async function LandingPage({ params }: { params: LocaleParams }) {
  await initLocale(params);
  return (
    <>
      <Hero />
      <FormatSection />
      <AiSection />
      <StepsSection />
      <PricingSection />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
