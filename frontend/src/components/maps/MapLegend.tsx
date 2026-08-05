"use client";

import { useLanguageStore } from '@/store/language';

interface LegendProps {
  activeLayer: string;
}

export default function MapLegend({ activeLayer }: LegendProps) {
  const { language } = useLanguageStore();

  const getLegendItems = () => {
    if (activeLayer === 'rainfall') {
      return [
        { label: language === 'en' ? '< 600 mm (Arid)' : '< ६०० मिमी', color: 'rgba(59, 130, 246, 0.15)' },
        { label: language === 'en' ? '600-1200 mm' : '६००-१२०० मिमी', color: 'rgba(59, 130, 246, 0.45)' },
        { label: language === 'en' ? '> 1200 mm (Wet)' : '> १२०० मिमी', color: 'rgba(59, 130, 246, 0.85)' }
      ];
    }
    if (activeLayer === 'soil_health') {
      return [
        { label: language === 'en' ? 'Poor (झीज झालेली)' : 'कमी सुपिकता', color: 'rgba(16, 185, 129, 0.15)' },
        { label: language === 'en' ? 'Moderate' : 'मध्यम', color: 'rgba(16, 185, 129, 0.45)' },
        { label: language === 'en' ? 'Excellent (सुपीक)' : 'उत्कृष्ट सुपीक', color: 'rgba(16, 185, 129, 0.85)' }
      ];
    }
    // soil_type
    return [
      { label: language === 'en' ? 'Clay / Black' : 'काळी माती', color: 'rgba(16, 185, 129, 0.65)' },
      { label: language === 'en' ? 'Sandy / Loam' : 'गाळाची माती', color: 'rgba(245, 158, 11, 0.55)' },
      { label: language === 'en' ? 'Laterite / Red' : 'तांबडी माती', color: 'rgba(239, 68, 68, 0.55)' }
    ];
  };

  return (
    <div className="flex flex-col gap-2 p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] backdrop-blur-md shadow">
      <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-wider block">
        {language === 'en' ? 'Map Key / Scale' : 'नकाशा सूची / प्रमाण'}
      </span>
      <div className="flex flex-col gap-2">
        {getLegendItems().map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5 text-[10px]">
            <div className="w-3.5 h-3.5 rounded border border-[var(--border-color)]" style={{ backgroundColor: item.color }} />
            <span className="text-[var(--text-muted)] font-semibold">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
