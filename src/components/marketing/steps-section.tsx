import { useTranslations } from 'next-intl';
import { richTags } from '@/lib/rich';
import { cn } from '@/lib/cn';
import { SectionHeading } from '@/components/ui/typography';
import { Container } from './container';

const STEPS = ['goal', 'test', 'review'] as const;

export function StepsSection() {
  const t = useTranslations('landing.steps');
  return (
    <Container id="steps" className="flex scroll-mt-20 flex-col gap-10 py-20 md:gap-16 md:py-36">
      <SectionHeading eyebrow={t('eyebrow')} title={t.rich('title', richTags)} className="max-w-[640px]" />
      <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-x-8 gap-y-10 p-0">
        {STEPS.map((step, i) => (
          <li key={step} className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className={cn('font-mono text-[13px]', i === 0 ? 'text-green-eyebrow' : 'text-ink-3')}>{String(i + 1).padStart(2, '0')}</span>
              <span className={cn('h-0.5 flex-1 rounded-[1px]', i === 0 ? 'bg-green' : 'bg-divider-page')} />
            </div>
            <span className="text-xl font-medium tracking-[-0.025em]">{t(`items.${step}.title`)}</span>
            <span className="max-w-[320px] text-[15px] leading-[1.6] text-ink-2">{t(`items.${step}.desc`)}</span>
          </li>
        ))}
      </ol>
    </Container>
  );
}
