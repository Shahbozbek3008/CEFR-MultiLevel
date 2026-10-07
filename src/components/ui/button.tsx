import type { ComponentProps, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { Icon } from './icon';

export const buttonVariants = cva(
  'inline-flex shrink-0 items-center gap-2 whitespace-nowrap font-medium transition-[filter,background-color,transform] duration-(--t-fast) ease-brand active:scale-[.985] disabled:pointer-events-none disabled:bg-track disabled:bg-none disabled:text-ink-disabled disabled:shadow-none',
  {
    variants: {
      variant: {
        primary: 'bg-action text-white hover:text-white hover:brightness-105',
        secondary: 'bg-surface text-ink shadow-inset hover:bg-bg-app hover:text-ink',
        ghost: 'text-ink hover:bg-hover hover:text-ink',
        onDark: 'bg-white text-ink hover:bg-surface-sunken hover:text-ink',
        glass: 'bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.18)] hover:bg-white/16 hover:text-white',
      },
      size: {
        lg: 'h-[52px] rounded-btn px-5 text-[15px]',
        md: 'h-11 rounded-[13px] px-[18px] text-sm',
        sm: 'h-10 rounded-[13px] px-4 text-sm',
        xs: 'h-9 rounded-[11px] px-[14px] text-sm',
      },
      arrow: { true: 'justify-between gap-4', false: 'justify-center' },
      block: { true: 'w-full', false: '' },
    },
    compoundVariants: [
      { variant: 'primary', size: 'lg', className: 'shadow-action' },
      { variant: 'primary', size: ['md', 'sm', 'xs'], className: 'shadow-action-sm' },
    ],
    defaultVariants: { variant: 'primary', size: 'lg', arrow: false, block: false },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

type OwnProps = Variants & { icon?: ReactNode; children?: ReactNode };

function Content({ icon, arrow, size, children }: OwnProps) {
  return (
    <>
      {icon}
      {children}
      {arrow && <Icon as={ArrowRight} size={size === 'lg' ? 17 : 16} strokeWidth={1.75} />}
    </>
  );
}

export type ButtonProps = OwnProps & Omit<ComponentProps<'button'>, keyof OwnProps>;

export function Button({ variant, size, arrow, block, icon, className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size, arrow, block }), className)} {...rest}>
      <Content icon={icon} arrow={arrow} size={size}>{children}</Content>
    </button>
  );
}

export type ButtonLinkProps = OwnProps & Omit<ComponentProps<typeof Link>, keyof OwnProps>;

export function ButtonLink({ variant, size, arrow, block, icon, className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={cn(buttonVariants({ variant, size, arrow, block }), className)} {...rest}>
      <Content icon={icon} arrow={arrow} size={size}>{children}</Content>
    </Link>
  );
}
