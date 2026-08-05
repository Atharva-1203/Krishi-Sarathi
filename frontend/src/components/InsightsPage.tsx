"use client";

import { useState } from 'react';
import { useLanguageStore } from '@/store/language';
import { TRANSLATIONS } from '@/store/translations';
import { Map, Info, CloudRain, Droplet, Sprout as Leaf } from 'lucide-react';

interface DistrictData {
  name: string;
  nameMr: string;
  rainfall: string;
  soil: string;
  soilMr: string;
  crops: string[];
  cropsMr: string[];
  oc: string;
  ph: string;
}

const DISTRICT_DATA: Record<string, DistrictData> = {
  Pune: {
    name: "Pune District",
    nameMr: "पुणे जिल्हा",
    rainfall: "980 mm",
    soil: "Medium Brown Clay",
    soilMr: "मध्यम तपकिरी चिकणमाती",
    crops: ["Sugarcane", "Wheat", "Jowar", "Onion"],
    cropsMr: ["ऊस", "गहू", "ज्वारी", "कांदा"],
    oc: "0.62% (Moderate / मध्यम)",
    ph: "7.1"
  },
  Kolhapur: {
    name: "Kolhapur District",
    nameMr: "कोल्हापूर जिल्हा",
    rainfall: "1890 mm",
    soil: "Deep Red Clay & Laterite",
    soilMr: "जांभी आणि तांबडी माती",
    crops: ["Sugarcane", "Rice", "Turmeric", "Groundnut"],
    cropsMr: ["ऊस", "भात", "हळद", "भुईमूग"],
    oc: "0.78% (High / जास्त)",
    ph: "6.5"
  },
  Satara: {
    name: "Satara District",
    nameMr: "सातारा जिल्हा",
    rainfall: "1050 mm",
    soil: "Black Cotton Soil",
    soilMr: "काळी कापसाची माती",
    crops: ["Sugarcane", "Ginger", "Gram", "Sorghum"],
    cropsMr: ["ऊस", "आले", "हरभरा", "ज्वारी"],
    oc: "0.65% (Moderate / मध्यम)",
    ph: "7.3"
  },
  Solapur: {
    name: "Solapur District",
    nameMr: "सोलापूर जिल्हा",
    rainfall: "580 mm",
    soil: "Shallow Light Brown Sandy",
    soilMr: "हलकी वाळुसर माती",
    crops: ["Jowar", "Pomegranate", "Gram", "Maize"],
    cropsMr: ["ज्वारी", "डाळिंब", "हरभरा", "मका"],
    oc: "0.45% (Low / कमी)",
    ph: "8.1"
  },
  Sangli: {
    name: "Sangli District",
    nameMr: "सांगली जिल्हा",
    rainfall: "690 mm",
    soil: "Medium Black Fertile",
    soilMr: "मध्यम काळी सुपीक माती",
    crops: ["Grapes", "Sugarcane", "Soyabean", "Turmeric"],
    cropsMr: ["द्राक्षे", "ऊस", "सोयाबीन", "हळद"],
    oc: "0.68% (Moderate / मध्यम)",
    ph: "7.4"
  }
};

export default function InsightsPage() {
  const { language } = useLanguageStore();
  const t = TRANSLATIONS[language];
  const [selected, setSelected] = useState<string>("Pune");
  const data = DISTRICT_DATA[selected];

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

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* SVG Map visual column */}
        <div className="md:col-span-6 p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col items-center justify-center shadow-sm min-h-[350px]">
          <h4 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-6">
            {t.map_svg_title}
          </h4>
          
          <svg viewBox="0 0 400 400" className="w-[300px] h-[300px] drop-shadow-lg">
            {/* Pune Polygon */}
            <path
              d="M100,50 L200,80 L180,180 L120,160 Z"
              onClick={() => setSelected("Pune")}
              className={`cursor-pointer transition-all duration-300 stroke-[var(--border-color)] stroke-2 ${
                selected === "Pune" ? "fill-emerald-500/40 dark:fill-emerald-500/25 stroke-emerald-500" : "fill-emerald-500/10 hover:fill-emerald-500/20"
              }`}
            />
            <text x="140" y="115" className="fill-[var(--text-main)] text-[10px] font-bold pointer-events-none">{language === 'en' ? 'Pune' : 'पुणे'}</text>

            {/* Solapur Polygon */}
            <path
              d="M200,80 L350,150 L280,260 L180,180 Z"
              onClick={() => setSelected("Solapur")}
              className={`cursor-pointer transition-all duration-300 stroke-[var(--border-color)] stroke-2 ${
                selected === "Solapur" ? "fill-emerald-500/40 dark:fill-emerald-500/25 stroke-emerald-500" : "fill-emerald-500/10 hover:fill-emerald-500/20"
              }`}
            />
            <text x="250" y="170" className="fill-[var(--text-main)] text-[10px] font-bold pointer-events-none">{language === 'en' ? 'Solapur' : 'सोलापूर'}</text>

            {/* Satara Polygon */}
            <path
              d="M120,160 L180,180 L150,260 L90,240 Z"
              onClick={() => setSelected("Satara")}
              className={`cursor-pointer transition-all duration-300 stroke-[var(--border-color)] stroke-2 ${
                selected === "Satara" ? "fill-emerald-500/40 dark:fill-emerald-500/25 stroke-emerald-500" : "fill-emerald-500/10 hover:fill-emerald-500/20"
              }`}
            />
            <text x="120" y="215" className="fill-[var(--text-main)] text-[10px] font-bold pointer-events-none">{language === 'en' ? 'Satara' : 'सातारा'}</text>

            {/* Sangli Polygon */}
            <path
              d="M150,260 L280,260 L230,330 L160,320 Z"
              onClick={() => setSelected("Sangli")}
              className={`cursor-pointer transition-all duration-300 stroke-[var(--border-color)] stroke-2 ${
                selected === "Sangli" ? "fill-emerald-500/40 dark:fill-emerald-500/25 stroke-emerald-500" : "fill-emerald-500/10 hover:fill-emerald-500/20"
              }`}
            />
            <text x="200" y="295" className="fill-[var(--text-main)] text-[10px] font-bold pointer-events-none">{language === 'en' ? 'Sangli' : 'सांगली'}</text>

            {/* Kolhapur Polygon */}
            <path
              d="M90,240 L150,260 L160,320 L110,360 L70,300 Z"
              onClick={() => setSelected("Kolhapur")}
              className={`cursor-pointer transition-all duration-300 stroke-[var(--border-color)] stroke-2 ${
                selected === "Kolhapur" ? "fill-emerald-500/40 dark:fill-emerald-500/25 stroke-emerald-500" : "fill-emerald-500/10 hover:fill-emerald-500/20"
              }`}
            />
            <text x="100" y="300" className="fill-[var(--text-main)] text-[10px] font-bold pointer-events-none">{language === 'en' ? 'Kolhapur' : 'कोल्हापूर'}</text>
          </svg>
          
          <span className="text-[9px] text-[var(--text-muted)] italic mt-4">
            {t.map_help}
          </span>
        </div>

        {/* Detailed Agronomy stats info column */}
        <div className="md:col-span-6 flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm">
            <h3 className="text-xl font-black text-emerald-600 dark:text-emerald-400">
              {language === 'en' ? data.name : data.nameMr}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {/* Rainfall */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <CloudRain size={18} />
                </div>
                <div>
                  <span className="text-[9px] text-[var(--text-muted)] uppercase block">{t.map_label_rainfall}</span>
                  <span className="text-xs font-bold text-[var(--text-main)]">{data.rainfall}</span>
                </div>
              </div>

              {/* Soil */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Droplet size={18} />
                </div>
                <div>
                  <span className="text-[9px] text-[var(--text-muted)] uppercase block">{t.map_label_soil}</span>
                  <span className="text-xs font-bold text-[var(--text-main)]">
                    {language === 'en' ? data.soil : data.soilMr}
                  </span>
                </div>
              </div>

              {/* pH */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Info size={18} />
                </div>
                <div>
                  <span className="text-[9px] text-[var(--text-muted)] uppercase block">{t.map_label_ph}</span>
                  <span className="text-xs font-bold text-[var(--text-main)]">{data.ph}</span>
                </div>
              </div>

              {/* Organic Carbon */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <Leaf size={18} />
                </div>
                <div>
                  <span className="text-[9px] text-[var(--text-muted)] uppercase block">{t.map_label_oc}</span>
                  <span className="text-xs font-bold text-[var(--text-main)]">{data.oc}</span>
                </div>
              </div>
            </div>

            {/* Historical Crops */}
            <div className="border-t border-[var(--border-color)] pt-4 mt-6">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2.5 block">
                {t.map_label_crops}
              </span>
              <div className="flex flex-wrap gap-2">
                {(language === 'en' ? data.crops : data.cropsMr).map((c, idx) => (
                  <span key={idx} className="text-xs font-semibold px-2.5 py-1 rounded bg-[var(--bg-app)] text-[var(--text-main)] border border-[var(--border-color)]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
