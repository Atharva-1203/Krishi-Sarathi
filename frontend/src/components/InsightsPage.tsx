"use client";

import { useState } from 'react';
import { useLanguageStore } from '@/store/language';
import { TRANSLATIONS } from '@/store/translations';
import MaharashtraMap from './maps/MaharashtraMap';
import DistrictPanel, { DISTRICT_METRICS } from './maps/DistrictPanel';
import districtMetadata from '../../public/maps/district_metadata.json';
import { GitCompare, X } from 'lucide-react';

export default function InsightsPage() {
  const { language } = useLanguageStore();
  const t = TRANSLATIONS[language];
  
  // Set initial state to empty string (No District Selected) to remove Pune bias
  const [selected, setSelected] = useState<string>("");
  const [compareDistrict, setCompareDistrict] = useState<string>("");
  const [isComparing, setIsComparing] = useState(false);

  const metaMap = districtMetadata as Record<string, any>;
  const activeMeta = metaMap[selected] || null;
  const compareMeta = metaMap[compareDistrict] || null;

  const handleSelectDistrict = (name: string) => {
    if (isComparing) {
      // Toggle slots: if Slot A is empty, fill it. Otherwise fill Slot B
      if (!selected) {
        setSelected(name);
      } else {
        setCompareDistrict(name);
      }
    } else {
      setSelected(name);
    }
  };

  const selectedMetrics = DISTRICT_METRICS[selected] || null;
  const compareMetrics = DISTRICT_METRICS[compareDistrict] || null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text-main)]">
            {t.map_title}
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            {t.map_subtitle}
          </p>
        </div>

        {/* Comparison toggle button */}
        <button
          onClick={() => {
            setIsComparing(!isComparing);
            if (!isComparing) {
              setCompareDistrict("");
            }
          }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${isComparing ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] hover:bg-[var(--bg-hover)]'}`}
        >
          <GitCompare size={14} />
          {isComparing 
            ? (language === 'en' ? 'Exit Comparison Mode' : 'तुलना मोड बंद करा')
            : (language === 'en' ? 'Compare Districts' : 'जिल्हा तुलना मोड')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* SVG Map visual column */}
        <div className="md:col-span-7">
          <MaharashtraMap selectedDistrict={selected} onSelectDistrict={handleSelectDistrict} />
        </div>

        {/* Detailed Agronomy stats info column */}
        <div className="md:col-span-5 flex flex-col gap-6">
          
          {/* Comparison Mode side panel */}
          {isComparing ? (
            <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4">
              <h3 className="text-sm font-bold text-[var(--text-main)] uppercase tracking-wider flex items-center gap-1.5">
                <GitCompare size={16} className="text-emerald-500" />
                {language === 'en' ? 'Side-by-Side Comparison' : 'जिल्हावार तुलना पत्रक'}
              </h3>
              
              <div className="grid grid-cols-2 gap-4 text-xs font-medium border-t border-[var(--border-color)] pt-3">
                {/* District A Column */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-1.5">
                    <span className="font-extrabold text-emerald-500 text-sm">{selected || (language === 'en' ? 'Select slot A' : 'निवडा अ')}</span>
                    {selected && <button onClick={() => setSelected("")} className="text-rose-500"><X size={12} /></button>}
                  </div>
                  {selectedMetrics ? (
                    <div className="flex flex-col gap-2">
                      <div>
                        <span className="text-[9px] text-[var(--text-muted)] uppercase block">{language === 'en' ? 'Rainfall' : 'पर्जन्यमान'}</span>
                        <span className="font-bold text-[var(--text-main)]">{selectedMetrics.rainfall}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-[var(--text-muted)] uppercase block">{language === 'en' ? 'Soil Type' : 'मृदा प्रकार'}</span>
                        <span className="font-bold text-[var(--text-main)]">{selectedMetrics.soil}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-[var(--text-muted)] uppercase block">{language === 'en' ? 'Crops' : 'मुख्य पिके'}</span>
                        <span className="text-[var(--text-main)] font-semibold">{selectedMetrics.crops.join(', ')}</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-[10px] text-[var(--text-muted)] italic">{language === 'en' ? 'Click district on map' : 'नकाशावर क्लिक करा'}</span>
                  )}
                </div>

                {/* District B Column */}
                <div className="flex flex-col gap-3 border-l border-[var(--border-color)] pl-4">
                  <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-1.5">
                    <span className="font-extrabold text-emerald-500 text-sm">{compareDistrict || (language === 'en' ? 'Select slot B' : 'निवडा ब')}</span>
                    {compareDistrict && <button onClick={() => setCompareDistrict("")} className="text-rose-500"><X size={12} /></button>}
                  </div>
                  {compareMetrics ? (
                    <div className="flex flex-col gap-2">
                      <div>
                        <span className="text-[9px] text-[var(--text-muted)] uppercase block">{language === 'en' ? 'Rainfall' : 'पर्जन्यमान'}</span>
                        <span className="font-bold text-[var(--text-main)]">{compareMetrics.rainfall}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-[var(--text-muted)] uppercase block">{language === 'en' ? 'Soil Type' : 'मृदा प्रकार'}</span>
                        <span className="font-bold text-[var(--text-main)]">{compareMetrics.soil}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-[var(--text-muted)] uppercase block">{language === 'en' ? 'Crops' : 'मुख्य पिके'}</span>
                        <span className="text-[var(--text-main)] font-semibold">{compareMetrics.crops.join(', ')}</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-[10px] text-[var(--text-muted)] italic">{language === 'en' ? 'Click district on map' : 'नकाशावर क्लिक करा'}</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <DistrictPanel districtData={activeMeta} />
          )}

        </div>
      </div>
    </div>
  );
}
