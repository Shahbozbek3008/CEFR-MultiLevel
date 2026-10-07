import type { ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

const cardVariants = cva('bg-surface', {
  variants: {
    elevation: { e0: 'shadow-e0', e1: 'shadow-e1', e2: 'shadow-e2', none: '' },
    radius: { md: 'rounded-card-sm', lg: 'rounded-card', xl: 'rounded-card-lg', hero: 'rounded-hero' },
  },
  defaultVariants: { elevation: 'e0', radius: 'lg' },
});

export type CardProps = ComponentProps<'div'> & VariantProps<typeof cardVariants>;

/** Surface: white, radius 24, 1px ring (`--e0`). `e1` for the main card on a page. */
export function Card({ elevation, radius, className, ...rest }: CardProps) {
  return <div className={cn(cardVariants({ elevation, radius }), className)} {...rest} />;
}

/** Inner block inside a card: `--surface-muted`, radius 16–20. */
export function Inset({ className, ...rest }: ComponentProps<'div'>) {
  return <div className={cn('rounded-2xl bg-surface-muted', className)} {...rest} />;
}
