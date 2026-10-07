import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Calendar, Check } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { LEVELS, ROUTES } from '@/lib/constants';
import { MOCK_EXAM, MOCK_USER } from '@/lib/mock/user';
import { initLocale, metadataTitle, type LocaleParams } from '@/lib/i18n';
import { cn } from '@/lib/cn';
import { Card } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import { Icon } from '@/components/ui/icon';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/controls';
import { Field, TextInput } from '@/components/ui/field';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { AppMain, PageHeader } from '@/components/layout/page-header';
import { LocaleSwitcher } from '@/components/layout/locale-switcher';

export const generateMetadata = metadataTitle('settings.title');

const SECTIONS = [
  { key: 'profile', href: '#profile' },
  { key: 'exam', href: '#exam' },
  { key: 'notifications', href: '#exam' },
  { key: 'subscription', href: ROUTES.billing },
  { key: 'security', href: '#profile' },
] as const;

function SettingsNav() {
  const t = useTranslations('settings.nav');
  return (
    <nav className="flex flex-col gap-0.5">
      {SECTIONS.map((s, i) => {
        const className = cn('flex h-[38px] items-center rounded-[11px] px-3 text-sm', i === 0 ? 'bg-surface font-medium text-ink shadow-e0 hover:text-ink' : 'text-ink-2 hover:bg-hover hover:text-ink');
        return s.href.startsWith('#') ? (
          <a key={s.key} href={s.href} aria-current={i === 0 ? 'page' : undefined} className={className}>{t(s.key)}</a>
        ) : (
          <Link key={s.key} href={s.href} className={className}>{t(s.key)}</Link>
        );
      })}
    </nav>
  );
}

function SettingRow({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="flex min-h-16 items-center gap-5 shadow-[0_1px_0_var(--divider)] last:shadow-none">
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-[15px]">{title}</span>
        <span className="text-[13px] text-ink-2">{description}</span>
      </div>
      {children}
    </div>
  );
}

function ProfileCard() {
  const t = useTranslations('settings.profile');
  return (
    <Card id="profile" className="flex flex-col gap-[22px] p-6 shadow-[0_0_0_1px_rgba(20,22,30,.05)]">
      <div className="flex items-center gap-4">
        <Avatar initial={MOCK_USER.initial} size={64} />
        <div className="flex flex-1 flex-col gap-0.5">
          <span className="text-[17px] font-medium">{MOCK_USER.firstName} {MOCK_USER.lastName}</span>
          <span className="text-[13px] text-ink-2">{t('since')}</span>
        </div>
        <Button variant="secondary" size="xs" className="h-[38px] rounded-[13px] px-4">{t('changePhoto')}</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('firstName')} htmlFor="firstName"><TextInput size="md" id="firstName" defaultValue={MOCK_USER.firstName} /></Field>
        <Field label={t('lastName')} htmlFor="lastName"><TextInput size="md" id="lastName" defaultValue={MOCK_USER.lastName} /></Field>
        <Field label={t('phone')} htmlFor="phone">
          <TextInput
            size="md"
            readOnly
            id="phone"
            defaultValue={`+998 ${MOCK_USER.phone}`}
            className="font-mono"
            suffix={<Tag tone="success"><Icon as={Check} size={11} strokeWidth={2.5} />{t('verified')}</Tag>}
          />
        </Field>
        <Field label={t('email')} htmlFor="email"><TextInput size="md" id="email" type="email" placeholder={t('optional')} /></Field>
      </div>
    </Card>
  );
}

function PreferencesCard() {
  const t = useTranslations('settings.preferences');
  const tc = useTranslations('common');
  return (
    <Card id="exam" className="px-6 py-1 shadow-[0_0_0_1px_rgba(20,22,30,.05)]">
      <SettingRow title={t('target')} description={t('targetHint')}>
        <SegmentedControl label={t('target')} defaultValue={MOCK_EXAM.target} className="w-[180px]" options={LEVELS.map((l) => ({ value: l.code, label: l.code }))} />
      </SettingRow>
      <SettingRow title={t('examDate')} description={t('daysLeft', { days: MOCK_EXAM.daysLeft })}>
        <Button variant="secondary" size="xs" icon={<Icon as={Calendar} size={16} />} className="h-[38px] rounded-[13px] px-4">{tc('examDate')}</Button>
      </SettingRow>
      <SettingRow title={t('reminder')} description={t('reminderHint', { time: '19:00' })}>
        <Switch label={t('reminder')} defaultChecked />
      </SettingRow>
      <SettingRow title={t('language')} description={t('languageHint')}>
        <LocaleSwitcher className="h-[38px] rounded-[12px]" />
      </SettingRow>
      <SettingRow title={t('theme')} description={t('themeHint')}>
        <SegmentedControl label={t('theme')} defaultValue="light" className="w-[260px]" options={(['light', 'dark', 'system'] as const).map((v) => ({ value: v, label: t(`themes.${v}`) }))} />
      </SettingRow>
    </Card>
  );
}

/** W18 — profile & settings. */
function SettingsView() {
  const t = useTranslations('settings');
  return (
    <AppMain className="gap-5 overflow-hidden">
      <PageHeader title={t('title')} />
      <div className="grid flex-1 gap-8 lg:grid-cols-[220px_1fr]">
        <SettingsNav />
        <div className="flex max-w-[760px] flex-col gap-4">
          <ProfileCard />
          <PreferencesCard />
          <div className="flex items-center justify-between px-1 pt-1">
            <button type="button" className="text-sm font-medium text-error-text">{t('logout')}</button>
            <div className="flex gap-2">
              <Button variant="secondary" size="md" className="px-4">{t('cancel')}</Button>
              <Button size="md">{t('save')}</Button>
            </div>
          </div>
        </div>
      </div>
    </AppMain>
  );
}

export default async function SettingsPage({ params }: { params: LocaleParams }) {
  await initLocale(params);
  return <SettingsView />;
}
