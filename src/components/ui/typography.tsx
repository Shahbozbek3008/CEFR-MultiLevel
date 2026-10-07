import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Eyebrow({ className, ...rest }: ComponentProps<'span'>) {
  return <span className={cn('text-[13px] font-medium text-green-eyebrow', className)} {...rest} />;
}

/** Mono meta label: "SAVOLLAR 9–14", "PASSAGE 3". */
export function MonoLabel({ className, ...rest }: ComponentProps<'span'>) {
  return <span className={cn('font-mono text-xs uppercase text-ink-3', className)} {...rest} />;
}

type SectionHeadingProps = { eyebrow: string; title: ReactNode; align?: 'start' | 'center'; className?: string; as?: 'h1' | 'h2' };

/** Landing section heading: eyebrow + H2 (clamp 34–52px) with the muted second clause. */
export function SectionHeading({ eyebrow, title, align = 'start', className, as: Tag = 'h2' }: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-col gap-4 max-md:gap-2.5', align === 'center' && 'items-center text-center', className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Tag className="m-0 text-[32px] leading-[1.05] font-medium tracking-[-0.045em] md:text-[clamp(34px,4vw,52px)] md:leading-[1.02]">{title}</Tag>
    </div>
  );
}

type BigNumberProps = { value: ReactNode; max?: ReactNode; size: number; className?: string };

/** Big light number (weight 300) with an optional mono "/75" suffix. */
export function BigNumber({ value, max, size, className }: BigNumberProps) {
  return (
    <span className={cn('leading-none font-light tracking-[-0.055em]', className)} style={{ fontSize: size }}>
      {value}
      {max && <span className="ml-1 font-mono text-xs tracking-normal text-ink-3">{max}</span>}
    </span>
  );
}

/** Page title in the app shell (30 / 500 / −0.04em) with optional breadcrumb or meta above. */
export function PageTitle({ meta, title }: { meta?: ReactNode; title: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      {meta && <span className="text-[13px] text-ink-2">{meta}</span>}
      <h1 className="m-0 text-[30px] leading-[1.1] font-medium tracking-[-0.04em]">{title}</h1>
    </div>
  );
}

/** "A / B" breadcrumb used in page headers. */
export function Breadcrumb({ items }: { items: readonly string[] }) {
  return (
    <>
      {items.map((item, i) => (
        <span key={item} className={i === items.length - 1 ? 'text-ink' : undefined}>
          {i > 0 && <span className="mx-1.5 text-ink-4">/</span>}
          {item}
        </span>
      ))}
    </>
  );
}
