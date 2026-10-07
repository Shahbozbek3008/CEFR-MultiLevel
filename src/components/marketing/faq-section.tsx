'use client';

import { useTranslations } from 'next-intl';
import { Accordion } from 'radix-ui';
import { Plus } from 'lucide-react';
import { SectionHeading } from '@/components/ui/typography';
import { Icon } from '@/components/ui/icon';
import { Container } from './container';

const FAQ_KEYS = ['format', 'accuracy', 'free', 'offline'] as const;

/** README: Radix Accordion, "+" rotates 45° on open (220ms --ease). */
export function FaqSection() {
  const t = useTranslations('landing.faq');
  return (
    <Container id="faq" className="grid scroll-mt-20 grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-x-20 gap-y-1.5 pt-12 md:gap-y-12 md:py-36">
      <div className="flex flex-col gap-4">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
        <span className="text-[15px] leading-[1.6] text-ink-2 max-md:hidden">
          {t.rich('help', { link: (c) => <a href="https://t.me/">{c}</a> })}
        </span>
      </div>
      <Accordion.Root type="single" collapsible defaultValue={FAQ_KEYS[0]} className="flex flex-col">
        {FAQ_KEYS.map((key) => (
          <Accordion.Item key={key} value={key} className="shadow-[0_1px_0_var(--divider-page)]">
            <Accordion.Header className="m-0">
              <Accordion.Trigger className="group flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-base font-medium tracking-[-0.015em] text-ink md:min-h-[72px] md:gap-6 md:py-5 md:text-[17px]">
                {t(`items.${key}.q`)}
                <span className="grid size-7 shrink-0 place-items-center rounded-full text-ink-2 shadow-inset transition-transform duration-(--t-base) ease-brand group-data-[state=open]:rotate-45">
                  <Icon as={Plus} size={12} strokeWidth={2} />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden">
              <p className="m-0 pr-9 pb-[18px] text-sm leading-[1.6] text-ink-2 md:pr-14 md:pb-6 md:text-[15px] md:leading-[1.65]">{t(`items.${key}.a`)}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Container>
  );
}
