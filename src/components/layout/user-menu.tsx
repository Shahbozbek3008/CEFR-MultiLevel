'use client';

import { useTranslations } from 'next-intl';
import { DropdownMenu } from 'radix-ui';
import { ChevronsUpDown, CreditCard, LogOut, Settings } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/lib/constants';
import { MOCK_USER, type Plan } from '@/lib/mock/user';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui/icon';
import { Avatar } from '@/components/ui/avatar';
import { menuContent, menuItem, menuSeparator } from '@/components/ui/menu';

const LINKS = [
  { key: 'settings', href: ROUTES.settings, icon: Settings },
  { key: 'billing', href: ROUTES.billing, icon: CreditCard },
] as const;

export function UserMenu({ plan }: { plan: Plan }) {
  const t = useTranslations('app');
  const fullName = `${MOCK_USER.firstName} ${MOCK_USER.lastName}`;

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger
        aria-label={t('user.menu')}
        className="group flex w-full items-center gap-2.5 rounded-[11px] p-1.5 text-left transition-colors duration-(--t-fast) outline-none hover:bg-hover focus-visible:shadow-focus data-[state=open]:bg-hover"
      >
        <Avatar initial={MOCK_USER.initial} size={32} />
        <span className="flex min-w-0 flex-1 flex-col leading-[1.3]">
          <span className="truncate text-[13px] font-medium text-ink">{fullName}</span>
          <span className="truncate text-[11px] text-ink-3">{t(`plan.${plan}`)}</span>
        </span>
        <Icon as={ChevronsUpDown} size={14} strokeWidth={1.6} className="text-ink-3" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content side="top" align="start" sideOffset={8} className={cn(menuContent, 'w-(--radix-dropdown-menu-trigger-width)')}>
          <div className="flex flex-col px-2.5 pt-1.5 pb-2">
            <span className="text-[13px] font-medium">{fullName}</span>
            <span className="font-mono text-[11px] text-ink-3">+998 {MOCK_USER.phone}</span>
          </div>
          <DropdownMenu.Separator className={menuSeparator} />
          {LINKS.map((l) => (
            <DropdownMenu.Item key={l.key} asChild className={menuItem}>
              <Link href={l.href}>
                <Icon as={l.icon} size={15} strokeWidth={1.6} />
                {t(`user.${l.key}`)}
              </Link>
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Separator className={menuSeparator} />
          <DropdownMenu.Item asChild className={cn(menuItem, 'data-highlighted:bg-error-50 data-highlighted:text-error-text')}>
            <Link href={ROUTES.login}>
              <Icon as={LogOut} size={15} strokeWidth={1.6} />
              {t('user.logout')}
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
