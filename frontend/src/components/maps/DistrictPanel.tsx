"use client";

import { useLanguageStore } from '@/store/language';
import { TRANSLATIONS } from '@/store/translations';
import { CloudRain, Droplet, Sprout, Info, Award } from 'lucide-react';

interface DistrictPanelProps {
  districtData: {
    district_name: string;
    division: string;
    latitude: number;
    longitude: number;
    rainfall_key: string;
    soil_key: string;
  } | null;
}

export const DISTRICT_METRICS: Record<string, any> = {
  "Pune": { rainfall: "980 mm", soil: "Medium Brown Clay", crops: ["Sugarcane", "Wheat", "Jowar", "Onion"] },
  "Satara": { rainfall: "1050 mm", soil: "Black Cotton Soil", crops: ["Sugarcane", "Ginger", "Gram"] },
  "Kolhapur": { rainfall: "1890 mm", soil: "Laterite Red Clay", crops: ["Sugarcane", "Rice", "Turmeric"] },
  "Sangli": { rainfall: "690 mm", soil: "Medium Black Fertile", crops: ["Grapes", "Sugarcane", "Soyabean"] },
  "Solapur": { rainfall: "580 mm", soil: "Shallow Sandy Loam", crops: ["Jowar", "Pomegranate", "Gram"] },
  "Ahmednagar": { rainfall: "550 mm", soil: "Medium Black Soil", crops: ["Cotton", "Jowar", "Onion"] },
  "Nashik": { rainfall: "720 mm", soil: "Red Soil & Sandy Loam", crops: ["Grapes", "Onion", "Wheat"] },
  "Dhule": { rainfall: "610 mm", soil: "Shallow Sandy Loam", crops: ["Cotton", "Maize", "Groundnut"] },
  "Jalgaon": { rainfall: "680 mm", soil: "Deep Black Fertile", crops: ["Banana", "Cotton", "Jowar"] },
  "Nandurbar": { rainfall: "750 mm", soil: "Light Sandy Soil", crops: ["Maize", "Jowar", "Cotton"] },
  "Mumbai City": { rainfall: "2200 mm", soil: "Alluvial Sandy", crops: ["Rice", "Vegetables"] },
  "Mumbai Suburban": { rainfall: "2200 mm", soil: "Alluvial Sandy", crops: ["Rice", "Vegetables"] },
  "Thane": { rainfall: "2400 mm", soil: "Coastal Alluvial", crops: ["Rice", "Horticulture"] },
  "Palghar": { rainfall: "2500 mm", soil: "Coastal Saline Clay", crops: ["Rice", "Chiku", "Coconut"] },
  "Raigad": { rainfall: "3000 mm", soil: "Lateritic Red Soil", crops: ["Rice", "Mango", "Cashew"] },
  "Ratnagiri": { rainfall: "3300 mm", soil: "Laterite Clay Soil", crops: ["Alphonso Mango", "Cashew", "Rice"] },
  "Sindhudurg": { rainfall: "3200 mm", soil: "Laterite Clay Soil", crops: ["Mango", "Coconut", "Rice"] },
  "Dharashiv": { rainfall: "620 mm", soil: "Medium Black Clay", crops: ["Jowar", "Soyabean", "Gram"] },
  "Beed": { rainfall: "570 mm", soil: "Shallow Sandy Clay", crops: ["Cotton", "Jowar", "Soyabean"] },
  "Chhatrapati Sambhajinagar": { rainfall: "630 mm", soil: "Medium Black Soil", crops: ["Cotton", "Maize", "Bajra"] },
  "Jalna": { rainfall: "600 mm", soil: "Shallow Black Clay", crops: ["Cotton", "Sweet Orange", "Soyabean"] },
  "Latur": { rainfall: "700 mm", soil: "Deep Black Clay", crops: ["Soyabean", "Gram", "Sugarcane"] },
  "Nanded": { rainfall: "850 mm", soil: "Black Cotton Soil", crops: ["Soyabean", "Cotton", "Jowar"] },
  "Parbhani": { rainfall: "740 mm", soil: "Deep Clay Loam", crops: ["Cotton", "Soyabean", "Pigeonpea"] },
  "Hingoli": { rainfall: "800 mm", soil: "Medium Black Soil", crops: ["Soyabean", "Turmeric", "Cotton"] },
  "Akola": { rainfall: "750 mm", soil: "Deep Black Fertile", crops: ["Cotton", "Soyabean", "Jowar"] },
  "Amravati": { rainfall: "810 mm", soil: "Deep Black Soil", crops: ["Cotton", "Soyabean", "Orange"] },
  "Buldhana": { rainfall: "700 mm", soil: "Medium Black Loam", crops: ["Cotton", "Soyabean", "Gram"] },
  "Washim": { rainfall: "790 mm", soil: "Shallow Sandy Soil", crops: ["Soyabean", "Cotton", "Wheat"] },
  "Yavatmal": { rainfall: "910 mm", soil: "Black Cotton Soil", crops: ["Cotton", "Soyabean", "Pigeonpea"] },
  "Bhandara": { rainfall: "1250 mm", soil: "Red Sandy Clay", crops: ["Rice", "Linseed", "Pulses"] },
  "Chandrapur": { rainfall: "1200 mm", soil: "Red Alluvial Soil", crops: ["Rice", "Cotton", "Soyabean"] },
  "Gadchiroli": { rainfall: "1400 mm", soil: "Red Sandy Soil", crops: ["Rice", "Linseed", "Tur"] },
  "Gondia": { rainfall: "1350 mm", soil: "Red Gravelly Clay", crops: ["Rice", "Sugarcane", "Wheat"] },
  "Nagpur": { rainfall: "1050 mm", soil: "Black Clayey Loam", crops: ["Mandarin Orange", "Cotton", "Soyabean"] },
  "Wardha": { rainfall: "980 mm", soil: "Medium Black Soil", crops: ["Cotton", "Soyabean", "Pigeonpea"] }
};

export default function DistrictPanel({ districtData }: DistrictPanelProps) {
  const { language } = useLanguageStore();
  const t = TRANSLATIONS[language];

  if (!districtData) {
    return (
      <div className="p-6 rounded-2xl border border-dashed border-[var(--border-color)] bg-[var(--bg-card)] text-center text-xs text-[var(--text-muted)]">
        {language === 'en' ? "Select a district on the GIS map to view localized agricultural context." : "स्थानिक कृषी माहिती पाहण्यासाठी नकाशावरील जिल्ह्यावर क्लिक करा."}
      </div>
    );
  }

  const met = DISTRICT_METRICS[districtData.district_name] || { rainfall: "N/A", soil: "N/A", crops: [] };

  return (
    <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-5">
      <div>
        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
          {language === 'en' ? "Selected District" : "निवडलेला जिल्हा"}
        </span>
        <h3 className="text-2xl font-black text-[var(--text-main)] mt-0.5">
          {districtData.district_name}
        </h3>
        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">
          {language === 'en' ? `Administrative Division: ${districtData.division}` : `प्रशासकीय विभाग: ${districtData.division}`}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-[var(--border-color)] pt-4">
        {/* Rainfall */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <CloudRain size={16} />
          </div>
          <div>
            <span className="text-[9px] text-[var(--text-muted)] uppercase block">{t.map_label_rainfall}</span>
            <span className="text-xs font-bold text-[var(--text-main)]">{met.rainfall}</span>
          </div>
        </div>

        {/* Soil Type */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Droplet size={16} />
          </div>
          <div>
            <span className="text-[9px] text-[var(--text-muted)] uppercase block">{t.map_label_soil}</span>
            <span className="text-xs font-bold text-[var(--text-main)]">{met.soil}</span>
          </div>
        </div>
      </div>

      {/* Recommended Crops */}
      <div className="border-t border-[var(--border-color)] pt-4 flex flex-col gap-2.5">
        <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1">
          <Sprout size={12} className="text-emerald-500" /> {t.map_label_crops}
        </span>
        <div className="flex flex-wrap gap-2">
          {met.crops.map((crop: string, idx: number) => (
            <span
              key={idx}
              className="text-xs font-semibold px-2.5 py-1 rounded bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-main)]"
            >
              {crop}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
