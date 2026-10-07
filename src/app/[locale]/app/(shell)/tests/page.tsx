import { useTranslations } from 'next-intl';
import { CATALOG } from '@/lib/mock/tests';
import { initLocale, metadataTitle, type LocaleParams } from '@/lib/i18n';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { AppMain, PageHeader } from '@/components/layout/page-header';
import { SearchField } from '@/components/app/search-field';
import { CatalogCard } from '@/components/app/catalog-card';
import { CatalogFilters } from '@/components/app/catalog-filters';

export const generateMetadata = metadataTitle('catalog.title');

function CatalogView() {
  const t = useTranslations('catalog');
  return (
    <AppMain className="gap-5 overflow-hidden">
      <PageHeader meta={t('count', { total: 42, fresh: 3 })} title={t('title')} actions={<SearchField placeholder={t('search')} className="w-[300px]" />} />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SegmentedControl
          label={t('title')}
          defaultValue="full"
          className="w-[300px]"
          options={[{ value: 'full', label: t('tabs.full') }, { value: 'drills', label: t('tabs.drills') }]}
        />
        <CatalogFilters />
      </div>
      <div className="stagger grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {CATALOG.map((test) => <CatalogCard key={test.id} test={test} />)}
      </div>
    </AppMain>
  );
}

export default async function CatalogPage({ params }: { params: LocaleParams }) {
  await initLocale(params);
  return <CatalogView />;
}
