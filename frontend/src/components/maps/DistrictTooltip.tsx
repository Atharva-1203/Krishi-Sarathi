"use client";

import { useLanguageStore } from '@/store/language';

interface TooltipProps {
  district: string;
  division: string;
  rainfall: string;
  soil: string;
  x: number;
  y: number;
  visible: boolean;
}

export default function DistrictTooltip({ district, division, rainfall, soil, x, y, visible }: TooltipProps) {
  const { language } = useLanguageStore();

  if (!visible) return null;

  return (
    <div
      className="absolute pointer-events-none z-50 p-3 rounded-xl border border-[var(--border-color)] bg-black/80 backdrop-blur-md shadow-2xl text-[11px] flex flex-col gap-1 min-w-[150px] transition-all"
      style={{ left: x + 15, top: y - 10 }}
    >
      <div className="font-bold text-[var(--text-main)] text-xs border-b border-white/10 pb-1">
        {district}
      </div>
      <div>
        <span className="text-[var(--text-muted)] font-medium">
          {language === 'en' ? 'Division:' : 'विभाग:'}
        </span>{' '}
        <span className="font-semibold text-[var(--text-main)]">{division}</span>
      </div>
      <div>
        <span className="text-[var(--text-muted)] font-medium">
          {language === 'en' ? 'Rainfall:' : 'पर्जन्यमान:'}
        </span>{' '}
        <span className="font-semibold text-emerald-400">{rainfall}</span>
      </div>
      <div>
        <span className="text-[var(--text-muted)] font-medium">
          {language === 'en' ? 'Soil Type:' : 'मृदा प्रकार:'}
        </span>{' '}
        <span className="font-semibold text-amber-500">{soil}</span>
      </div>
    </div>
  );
}
