"use client";

import { useState, useEffect } from 'react';
import { useLanguageStore } from '@/store/language';
import { TRANSLATIONS } from '@/store/translations';
import { CloudRain, Droplet, Sprout, Info, Award, BarChart2 } from 'lucide-react';

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

  const [soilAverages, setSoilAverages] = useState<any>(null);

  useEffect(() => {
    if (!districtData) return;
    fetch('/maps/district_soil_data.json')
      .then(res => res.json())
      .then(data => {
        if (data && data[districtData.district_name]) {
          setSoilAverages(data[districtData.district_name]);
        }
      })
      .catch(err => console.error("Failed to load district averages inside panel", err));
  }, [districtData]);

  if (!districtData) {
    return (
      <div className="p-6 rounded-2xl border border-dashed border-[var(--border-color)] bg-[var(--bg-card)] text-center text-xs text-[var(--text-muted)]">
        {language === 'en' ? "Select a district on the GIS map to view localized agricultural context." : "स्थानिक कृषी माहिती पाहण्यासाठी नकाशावरील जिल्ह्यावर क्लिक करा."}
      </div>
    );
  }

  const met = DISTRICT_METRICS[districtData.district_name] || { rainfall: "N/A", soil: "N/A", crops: [] };

  // Calculate Shannon Crop Diversity Index & Herfindahl Index based on crop variety
  const cropCount = met.crops.length;
  const shannonIndex = cropCount > 0 ? Math.log(cropCount) : 0.0;
  const hhiIndex = cropCount > 0 ? Math.round(10000 / cropCount) : 10000;

  const getDiversityLabel = (sdi: number) => {
    if (sdi >= 1.3) return language === 'en' ? "High Diversity (Resilient)" : "उच्च विविधता (शाश्वत)";
    if (sdi >= 0.8) return language === 'en' ? "Moderate Concentration" : "मध्यम विविधता";
    return language === 'en' ? "Low Diversity (Monoculture Risk)" : "कमी विविधता (एकपीक जोखीम)";
  };

  const getDiagnosticInsight = () => {
    if (!soilAverages) return "";
    const ph = soilAverages.pH;
    const n = soilAverages.N;
    if (ph > 7.8) {
      return language === 'en' 
        ? "Alkaline soil chemistry detected. Suitable for dryland crops like Sorghum; organic green manure suggested to lower pH."
        : "सामू आम्लधर्मीय (अल्कधर्मी) आढळला. ज्वारीसारख्या कोरडवाहू पिकांसाठी सुयोग्य; सेंद्रिय खतांचा वापर सुचवला जातो.";
    }
    if (ph < 6.0) {
      return language === 'en' 
        ? "Acidic soil profile observed. Organic liming recommended to prevent phosphorus locking and improve intake."
        : "सामू आम्लधर्मी आढळला. स्फुरद स्थिरीकरण रोखण्यासाठी आणि शोषण वाढवण्यासाठी सेंद्रिय लिमिंगचा वापर सुचवला जातो.";
    }
    if (n < 160) {
      return language === 'en' 
        ? "Low Nitrogen reserves detected. Rotation with nitrogen-fixing pulses (Gram, Soyabean) is highly recommended."
        : "नत्र (N) प्रमाण अल्प आढळले. नत्र स्थिरीकरण करणाऱ्या कडधान्य पिकांची (हरभरा, सोयाबीन) फेरपालट सुचवली जाते.";
    }
    return language === 'en' 
      ? "Balanced soil chemical profile. Optimal for general horticulture and multi-crop rotation."
      : "मृदा रासायनिक घटक संतुलित आढळले. फलोत्पादन आणि बहुपीक फेरपालटीसाठी अत्यंत अनुकूल.";
  };

  return (
    <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-5">
      <div>
        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
          {language === 'en' ? "Selected District (GIS Observatory)" : "निवडलेला जिल्हा (भौगोलिक निरीक्षण)"}
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

      {/* Dynamic Soil Health Card Telemetry */}
      {soilAverages && (
        <div className="border-t border-[var(--border-color)] pt-4 flex flex-col gap-3">
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
            <BarChart2 size={13} className="text-emerald-500" />
            {language === 'en' ? "Soil Chemistry Averages (7.8L Cards)" : "मृदा घटक सरासरी (७.८ लाख कार्ड्स)"}
          </span>
          <div className="grid grid-cols-3 gap-3 text-xs bg-[var(--bg-app)] p-3 rounded-xl border border-[var(--border-color)]">
            <div>
              <span className="text-[9px] text-[var(--text-muted)] uppercase block">N (Nitrogen)</span>
              <span className="font-extrabold text-[var(--text-main)]">{soilAverages.N.toFixed(1)} kg/ha</span>
            </div>
            <div>
              <span className="text-[9px] text-[var(--text-muted)] uppercase block">P (Phosphorus)</span>
              <span className="font-extrabold text-[var(--text-main)]">{soilAverages.P.toFixed(1)} kg/ha</span>
            </div>
            <div>
              <span className="text-[9px] text-[var(--text-muted)] uppercase block">K (Potassium)</span>
              <span className="font-extrabold text-[var(--text-main)]">{soilAverages.K.toFixed(1)} kg/ha</span>
            </div>
            <div>
              <span className="text-[9px] text-[var(--text-muted)] uppercase block">pH (Acidity)</span>
              <span className="font-extrabold text-[var(--text-main)]">{soilAverages.pH.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-[9px] text-[var(--text-muted)] uppercase block">OC (Carbon)</span>
              <span className="font-extrabold text-[var(--text-main)]">{soilAverages.OC.toFixed(2)} %</span>
            </div>
            <div>
              <span className="text-[9px] text-[var(--text-muted)] uppercase block">SQI Index</span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{soilAverages.soil_quality_index.toFixed(1)}</span>
            </div>
          </div>
          <span className="text-[8px] text-[var(--text-muted)] italic block text-right">
            {language === 'en' ? `Based on ${soilAverages.sample_count.toLocaleString()} soil test cards` : `एकूण ${soilAverages.sample_count.toLocaleString()} चाचण्यांवर आधारित`}
          </span>
        </div>
      )}

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

      {/* Crop Diversity Indexing */}
      {cropCount > 0 && (
        <div className="border-t border-[var(--border-color)] pt-4 flex flex-col gap-2.5">
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
            <Info size={12} className="text-emerald-500" />
            {language === 'en' ? "Crop Diversity Indexing" : "पीक विविधता निर्देशांक"}
          </span>
          <div className="flex flex-col gap-1.5 text-xs bg-[var(--bg-app)] p-3 rounded-xl border border-[var(--border-color)]">
            <div className="flex justify-between">
              <span className="text-[10px] text-[var(--text-muted)]">{language === 'en' ? "Shannon Diversity Index (SDI)" : "शॅनन विविधता निर्देशांक"}</span>
              <span className="font-extrabold text-[var(--text-main)]">{shannonIndex.toFixed(3)}</span>
            </div>
            <div className="flex justify-between border-t border-[var(--border-color)] pt-1.5">
              <span className="text-[10px] text-[var(--text-muted)]">{language === 'en' ? "HHI Concentration Index" : "एचएचआय एकत्रीकरण निर्देशांक"}</span>
              <span className="font-extrabold text-[var(--text-main)]">{hhiIndex}</span>
            </div>
            <div className="mt-1 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
              {getDiversityLabel(shannonIndex)}
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Soil Diagnostics */}
      {soilAverages && (
        <div className="border-t border-[var(--border-color)] pt-4 flex flex-col gap-2">
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
            <Info size={12} className="text-amber-500" />
            {language === 'en' ? "Observational Soil Diagnostics" : "निरीक्षणात्मक मृदा विश्लेषण"}
          </span>
          <p className="text-xs bg-amber-500/5 p-3 rounded-xl border border-amber-500/10 text-[var(--text-main)] leading-relaxed italic">
            "{getDiagnosticInsight()}"
          </p>
        </div>
      )}

      {/* Decoupling Notice */}
      <div className="border-t border-[var(--border-color)] pt-4.5 flex flex-col gap-2 bg-blue-500/5 p-4 rounded-xl border border-blue-500/15">
        <span className="text-[9px] font-extrabold text-blue-500 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
          <Info size={12} />
          {language === 'en' ? "ENGINE DECOUPLING NOTICE" : "इंजिन पृथक्करण सूचना"}
        </span>
        <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
          {language === 'en' 
            ? "The crop prediction engine is strictly geography-independent. Live recommendations do not ingest coordinates, district boundaries, or regional specialization, preventing geographic biases (e.g., historical sugarcane over-representation). This map serves as an independent agricultural baseline reference." 
            : "पीक शिफारस इंजिन भौगोलिक घटकांपासून पूर्णपणे स्वतंत्र आहे. अनुमान घेण्यासाठी जिल्हा किंवा भौगोलिक सीमांचा वापर केला जात नाही, जेणेकरून विशिष्ट पिकांचा पूर्वग्रह (उदा. ऊस लागवडीचा अतिरेक) टाळला जाईल."}
        </p>
      </div>
    </div>
  );
}
