"use client";

import { useLanguageStore } from '@/store/language';

interface TooltipProps {
  district: string;
  division: string;
  x: number;
  y: number;
  visible: boolean;
}

export default function DistrictTooltip({ district, division, x, y, visible }: TooltipProps) {
  const { language } = useLanguageStore();

  if (!visible) return null;

  return (
    <div
      className="absolute pointer-events-none z-50 p-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-glass)] backdrop-blur-md shadow-lg text-xs"
      style={{ left: x + 15, top: y - 10 }}
    >
      <div className="font-bold text-[var(--text-main)]">
        {district}
      </div>
      <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
        {language === 'en' ? `Division: ${division}` : `विभाग: ${division}`}
      </div>
    </div>
  );
}
