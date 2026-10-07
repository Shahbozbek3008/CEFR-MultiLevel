import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

/** Landing container: 1200px, 32px gutter (20px on phones). */
export function Container({ className, ...rest }: ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-page px-5 md:px-8', className)} {...rest} />;
}
