import type { ComponentProps } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';
import { Icon } from './icon';

const iconButton = cva(
  'grid shrink-0 place-items-center bg-surface text-ink-body shadow-inset transition-colors duration-(--t-fast) hover:bg-bg-app active:scale-[.97]',
  {
    variants: {
      size: { xs: 'size-8 rounded-sm', sm: 'size-9 rounded-full', md: 'size-10 rounded-full', lg: 'size-12 rounded-full' },
      shape: { round: '', square: '' },
    },
    compoundVariants: [{ size: 'md', shape: 'square', className: 'rounded-[12px]' }],
    defaultVariants: { size: 'md', shape: 'round' },
  },
);

type IconButtonProps = Omit<ComponentProps<'button'>, 'children'> & VariantProps<typeof iconButton> & { icon: LucideIcon; label: string; iconSize?: number };

/** Circular secondary button holding a single icon (close, back, playback controls). */
export function IconButton({ icon, label, size, shape, iconSize = 16, className, type = 'button', ...rest }: IconButtonProps) {
  return (
    <button type={type} aria-label={label} className={cn(iconButton({ size, shape }), className)} {...rest}>
      <Icon as={icon} size={iconSize} strokeWidth={1.7} />
    </button>
  );
}
