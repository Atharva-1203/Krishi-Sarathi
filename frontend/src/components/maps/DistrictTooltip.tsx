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
  soilInfo?: {
    N: number;
    P: number;
    K: number;
    pH: number;
    soil_quality_index: number;
    sample_count: number;
  };
}

export default function DistrictTooltip({ district, division, rainfall, soil, x, y, visible, soilInfo }: TooltipProps) {
  const { language } = useLanguageStore();

  if (!visible) return null;

  return (
    <div
      className="absolute pointer-events-none z-50 p-3.5 rounded-xl border border-emerald-500/20 bg-slate-950/95 backdrop-blur-md shadow-2xl text-[11px] flex flex-col gap-1 min-w-[180px] transition-all"
      style={{ left: x + 15, top: y - 10 }}
    >
      <div className="font-bold text-white text-xs border-b border-white/10 pb-1 flex justify-between items-center">
        <span>{district}</span>
        {soilInfo && (
          <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-black">
            SQI: {soilInfo.soil_quality_index}
          </span>
        )}
      </div>
      <div>
        <span className="text-slate-400 font-medium">
          {language === 'en' ? 'Division:' : 'विभाग:'}
        </span>{' '}
        <span className="font-semibold text-slate-100">{division}</span>
      </div>
      <div>
        <span className="text-slate-400 font-medium">
          {language === 'en' ? 'Rainfall:' : 'पर्जन्यमान:'}
        </span>{' '}
        <span className="font-semibold text-emerald-400">{rainfall}</span>
      </div>
      <div>
        <span className="text-slate-400 font-medium">
          {language === 'en' ? 'Soil Type:' : 'मृदा प्रकार:'}
        </span>{' '}
        <span className="font-semibold text-amber-400">{soil}</span>
      </div>
      {soilInfo && (
        <div className="mt-1 pt-1.5 border-t border-white/5 flex flex-col gap-0.5 text-[9px] text-slate-400 font-medium">
          <div className="flex justify-between">
            <span>Avg N-P-K:</span>
            <span className="font-bold text-slate-200">{soilInfo.N}-{soilInfo.P}-{soilInfo.K}</span>
          </div>
          <div className="flex justify-between">
            <span>Avg pH:</span>
            <span className="font-bold text-slate-200">{soilInfo.pH}</span>
          </div>
          <div className="flex justify-between text-[8px] text-slate-500">
            <span>Samples:</span>
            <span>{soilInfo.sample_count.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
