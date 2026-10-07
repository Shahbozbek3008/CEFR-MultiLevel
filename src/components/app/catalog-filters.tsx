'use client';

import { useId, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CATALOG_FILTERS } from '@/lib/mock/tests';
import { Chip } from '@/components/ui/chip';

export function CatalogFilters() {
  const t = useTranslations('catalog.filters');
  const [active, setActive] = useState<(typeof CATALOG_FILTERS)[number]>('all');
  const layoutId = useId();
  return (
    <div className="flex flex-wrap gap-1.5">
      {CATALOG_FILTERS.map((f) => (
        <Chip key={f} active={f === active} layoutId={layoutId} onClick={() => setActive(f)}>{t(f)}</Chip>
      ))}
    </div>
  );
}
