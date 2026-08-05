"use client";

import { useState } from 'react';
import { useLanguageStore } from '@/store/language';
import { TRANSLATIONS } from '@/store/translations';
import MaharashtraMap from './maps/MaharashtraMap';
import DistrictPanel from './maps/DistrictPanel';
import districtMetadata from '../../public/maps/district_metadata.json';

export default function InsightsPage() {
  const { language } = useLanguageStore();
  const t = TRANSLATIONS[language];
  const [selected, setSelected] = useState<string>("Pune");

  const metaMap = districtMetadata as Record<string, any>;
  const activeMeta = metaMap[selected] || null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-main)]">
          {t.map_title}
        </h2>
        <p className="text-xs text-[var(--text-muted)]">
          {t.map_subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* SVG Map visual column */}
        <div className="md:col-span-7">
          <MaharashtraMap selectedDistrict={selected} onSelectDistrict={setSelected} />
        </div>

        {/* Detailed Agronomy stats info column */}
        <div className="md:col-span-5">
          <DistrictPanel districtData={activeMeta} />
        </div>
      </div>
    </div>
  );
}
