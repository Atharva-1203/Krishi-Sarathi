"use client";

import { useLanguageStore } from '@/store/language';

export default function MapLegend() {
  const { language } = useLanguageStore();

  const colors = [
    { label: language === 'en' ? "Pune Division" : "पुणे विभाग", color: "rgba(16, 185, 129, 0.45)" },
    { label: language === 'en' ? "Other Divisions" : "इतर विभाग", color: "rgba(16, 185, 129, 0.08)" }
  ];

  return (
    <div className="flex items-center gap-4 mt-3 px-1">
      {colors.map((c, idx) => (
        <div key={idx} className="flex items-center gap-2 text-xs">
          <div className="w-3.5 h-3.5 rounded border border-[var(--border-color)]" style={{ backgroundColor: c.color }} />
          <span className="text-[var(--text-muted)] font-medium">{c.label}</span>
        </div>
      ))}
    </div>
  );
}
