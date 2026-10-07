import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, Flag } from 'lucide-react';
import { Icon } from '@/components/ui/icon';
import { Button, ButtonLink } from '@/components/ui/button';

export function TestFooter({ start, center, end }: { start?: ReactNode; center?: ReactNode; end?: ReactNode }) {
  return (
    <footer className="grid h-(--test-footer-h) shrink-0 grid-cols-[1fr_auto_1fr] items-center bg-surface px-6 shadow-[0_-1px_0_rgba(20,22,30,.06)]">
      <div className="flex gap-2">{start}</div>
      <div className="flex items-center gap-1.5">{center}</div>
      <div className="flex gap-2 justify-self-end">{end}</div>
    </footer>
  );
}

export function FlagButton() {
  const t = useTranslations('test');
  return <Button variant="secondary" size="md" className="px-4" icon={<Icon as={Flag} size={16} />} aria-keyshortcuts="F">{t('flag')}</Button>;
}

export function PrevButton({ label }: { label?: string }) {
  const t = useTranslations('test');
  return <Button variant="secondary" size="md" className="px-4" icon={<Icon as={ChevronLeft} size={16} />} aria-keyshortcuts="ArrowLeft">{label ?? t('prev')}</Button>;
}

export function NextButton({ href, label }: { href: string; label: string }) {
  return <ButtonLink href={href} size="md" arrow aria-keyshortcuts="ArrowRight">{label}</ButtonLink>;
}
