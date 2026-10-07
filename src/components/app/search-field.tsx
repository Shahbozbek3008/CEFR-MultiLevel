import { Search } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui/icon';

/** Search trigger with ⌘K hint (README: Ctrl/⌘ K opens catalog search). */
export function SearchField({ placeholder, className }: { placeholder: string; className?: string }) {
  return (
    <label className={cn('flex h-10 items-center gap-2.5 rounded-[12px] bg-surface px-[14px] text-sm text-ink-3 shadow-inset focus-within:shadow-focus', className)}>
      <Icon as={Search} size={15} strokeWidth={1.75} />
      <input type="search" placeholder={placeholder} aria-label={placeholder} className="min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-ink-3" />
      <kbd className="flex h-5 items-center rounded-md px-1.5 font-mono text-[11px] shadow-inset">⌘K</kbd>
    </label>
  );
}
