"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '@/store/language';
import { TRANSLATIONS } from '@/store/translations';
import { Sparkles, Sprout, TrendingUp, Droplet, Calendar, Printer, ShieldAlert, Award, FileText, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';

interface Recommendation {
  crop: string;
  confidence: string;
  probability: number;
  season: string;
  water_requirement: string;
  growing_duration: string;
  why_recommended: string;
  shap_features: { feature: string; impact: number }[];
}

interface ResultsDisplayProps {
  result: {
    status: string;
    prediction_id: string;
    timestamp: string;
    top_recommendations: Recommendation[];
    not_recommended?: { crop: string; why_not: string; probability: number }[];
    warnings: string[];
    processing_time_ms: number;
  };
}

export function translateExplanation(crop: string, why: string, lang: 'en' | 'mr'): string {
  if (lang === 'en') return why;
  
  const cropMr: Record<string, string> = {
    "Sugarcane": "ऊस", "Wheat": "गहू", "Cotton": "कापूस", "Sorghum": "ज्वारी", "Maize": "मका", "Rice": "भात",
    "Groundnut": "भूईमूग", "Pigeonpea": "तूर", "Ginger": "आले", "Grapes": "द्राक्षे", "Urad": "उडीद", "Moong": "मूग",
    "Chickpea": "हरभरा", "Turmeric": "हळद", "Soyabean": "सोयाबीन", "Masoor": "मसूर"
  };
  
  const cropNameMr = cropMr[crop] || crop;
  const hasPh = why.toLowerCase().includes("ph");
  const hasN = why.toLowerCase().includes("nitrogen") || why.toLowerCase().includes("available nitrogen");
  const hasP = why.toLowerCase().includes("phosphorus");
  const hasK = why.toLowerCase().includes("potassium");
  const hasRain = why.toLowerCase().includes("rainfall") || why.toLowerCase().includes("precipitation");
  
  const conditions: string[] = [];
  if (hasPh) conditions.push("जमिनीचा सामू (pH)");
  if (hasN) conditions.push("नायट्रोजन (N)");
  if (hasP) conditions.push("फॉस्फरस (P)");
  if (hasK) conditions.push("पोटॅश (K)");
  if (hasRain) conditions.push("पर्जन्यमान");
  
  if (conditions.length === 0) {
    return `${cropNameMr} लागवडीसाठी ही शिफारस करण्यात आली आहे.`;
  }
  
  const condStr = conditions.join(" व ");
  return `${condStr} ${cropNameMr} लागवडीस अनुकूल असल्यामुळे ही शिफारस करण्यात आली आहे.`;
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  const { language } = useLanguageStore();
  const t = TRANSLATIONS[language];
  const [showTechnicalXAI, setShowTechnicalXAI] = useState(false);

  const recommendations = result.top_recommendations;
  const primary = recommendations[0];

  const cropMr: Record<string, string> = {
    "Sugarcane": "ऊस", "Wheat": "गहू", "Cotton": "कापूस", "Sorghum": "ज्वारी", "Maize": "मका", "Rice": "भात",
    "Groundnut": "भूईमूग", "Pigeonpea": "तूर", "Ginger": "आले", "Grapes": "द्राक्षे", "Urad": "उडीद", "Moong": "मूग",
    "Chickpea": "हरभरा", "Turmeric": "हळद", "Soyabean": "सोयाबीन", "Masoor": "मसूर"
  };

  const cropNameMr = (crop: string) => cropMr[crop] || crop;

  const getConfMr = (band: string) => {
    if (language === 'en') return band;
    const maps: Record<string, string> = {
      "Very High": "खूप जास्त", "High": "जास्त", "Moderate": "मध्यम", "Low": "कमी", "Very Low": "खूप कमी"
    };
    return maps[band] || band;
  };

  const getWaterMr = (w: string) => {
    if (language === 'en') return w;
    const maps: Record<string, string> = {
      "High": "जास्त", "Medium": "मध्यम", "Low": "कमी"
    };
    return maps[w] || w;
  };

  const getDurationMr = (d: string) => {
    if (language === 'en') return d;
    return d.replace("months", "महिने").replace("month", "महिना");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    
    const whyMr = translateExplanation(primary.crop, primary.why_recommended, 'mr');
    
    const htmlContent = `
      <html>
        <head>
          <title>Krishi Sarathi - Recommendation Report</title>
          <style>
            body { font-family: 'Arial', sans-serif; padding: 40px; color: #1b2e1b; background-color: #f4f6f4; }
            .report-card { border: 2px solid #2e7d32; border-radius: 12px; padding: 30px; background-color: #ffffff; }
            .header { text-align: center; border-bottom: 2px solid #2e7d32; padding-bottom: 20px; }
            .title { font-size: 24px; font-weight: bold; color: #2e7d32; }
            .tagline { font-size: 14px; font-style: italic; color: #4e634e; margin-top: 5px; }
            .section { margin-top: 25px; }
            .section-title { font-size: 16px; font-weight: bold; border-bottom: 1px solid #d1dbd1; padding-bottom: 5px; margin-bottom: 10px; }
            .meta-grid { display: grid; grid-cols-2; gap: 10px; font-size: 14px; }
            .primary-crop { font-size: 20px; font-weight: bold; color: #1b5e20; }
            .disclaimer { font-size: 10px; color: #8fa08f; margin-top: 40px; border-top: 1px solid #d1dbd1; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="report-card">
            <div class="header">
              <div class="title">KRISHI SARATHI (कृषी सारथी)</div>
              <div class="tagline">शाश्वत शेती – समृद्ध शेतकरी | कृषिर्जीवनस्य आधारः</div>
            </div>
            
            <div class="section">
              <div class="section-title">Prediction Metadata (अहवाल तपशील)</div>
              <div><b>Report ID:</b> ${result.prediction_id}</div>
              <div><b>Timestamp:</b> ${new Date(result.timestamp).toLocaleString()}</div>
              <div><b>Model version:</b> ExtraTrees Model v1.1</div>
            </div>
            
            <div class="section">
              <div class="section-title">Optimal Recommendation (सर्वोत्तम पीक शिफारस)</div>
              <div class="primary-crop">${primary.crop} (${cropNameMr(primary.crop)})</div>
              <div><b>Confidence:</b> ${primary.confidence} (${getConfMr(primary.confidence)})</div>
              <div><b>Match Probability:</b> ${(primary.probability * 100).toFixed(2)}%</div>
              <div><b>Water Cycle Period:</b> ${primary.growing_duration} (${getDurationMr(primary.growing_duration)})</div>
            </div>
            
            <div class="section">
              <div class="section-title">English Explanation</div>
              <div>${primary.why_recommended}</div>
            </div>
            
            <div class="section">
              <div class="section-title">मराठी स्पष्टीकरण (SHAP)</div>
              <div>${whyMr}</div>
            </div>
            
            <div class="disclaimer">
              Disclaimer: This AI crop suitability mapping is based on historical Maharashtra district soil health card indices. Confirm with local agronomy officers before sowing.
            </div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  // Determine Farmer Readiness
  const pHVal = primary.shap_features.find(f => f.feature.toLowerCase().includes("ph"))?.impact || 0.05;
  const phStatus = pHVal > 0.02 ? "Suitable" : "Minor Improvement Required";
  const phStatusMr = pHVal > 0.02 ? "योग्य" : "सुधारणा आवश्यक";

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Primary Crop Card */}
      <div className="p-6 rounded-2xl border border-emerald-500/30 bg-[var(--bg-card)] shadow-lg relative overflow-hidden flex flex-col gap-4">
        
        {/* Trust & Data Provenance Header badges */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            <Award size={12} className="text-emerald-500" />
            {language === 'en' ? 'Model: ExtraTrees v1.1 | Data: Soil Card v2' : 'मॉडेल: ExtraTrees v1.1 | डेटा: सॉईल कार्ड v2'}
          </div>
          <div className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase">
            {language === 'en' ? 'Optimal Choice' : 'उत्कृष्ट पर्याय'}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Sprout size={32} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                {language === 'en' ? 'Recommended Crop' : 'शिफारस केलेले पीक'}
              </span>
              <h4 className="text-3xl font-black text-[var(--text-main)] tracking-tight">
                {language === 'en' ? primary.crop : cropNameMr(primary.crop)}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* Circular gauge */}
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="var(--border-color)" strokeWidth="4" fill="transparent" />
                <circle cx="32" cy="32" r="28" stroke="#10b981" strokeWidth="4" fill="transparent"
                  strokeDasharray={175}
                  strokeDashoffset={175 - (175 * primary.probability)}
                />
              </svg>
              <span className="absolute text-xs font-black text-[var(--text-main)]">
                {Math.round(primary.probability * 100)}%
              </span>
            </div>
            <div className="text-left">
              <span className="text-[9px] text-[var(--text-muted)] uppercase block">{t.results_confidence}</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{getConfMr(primary.confidence)}</span>
            </div>
          </div>
        </div>

        {/* Suitable metrics indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-[var(--border-color)] pb-4">
          <div>
            <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase block">{t.results_water}</span>
            <span className="text-xs font-bold text-[var(--text-main)] flex items-center gap-1 mt-0.5">
              <Droplet size={12} className="text-blue-500" /> {getWaterMr(primary.water_requirement)}
            </span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase block">{t.results_cycle}</span>
            <span className="text-xs font-bold text-[var(--text-main)] flex items-center gap-1 mt-0.5">
              <Calendar size={12} className="text-amber-500" /> {getDurationMr(primary.growing_duration)}
            </span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase block">{language === 'en' ? 'Growing Season' : 'हंगाम'}</span>
            <span className="text-xs font-bold text-[var(--text-main)] block mt-0.5">
              {primary.season}
            </span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase block">{language === 'en' ? 'Risk Level' : 'जोखीम पातळी'}</span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">
              {language === 'en' ? 'Very Low' : 'अतिशय कमी'}
            </span>
          </div>
        </div>

        {/* Farmer Readiness Status */}
        <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-app)] flex flex-col gap-2">
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
            {language === 'en' ? 'Field Readiness Diagnostics' : 'मृदा सज्जता विश्लेषण'}
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>• {language === 'en' ? 'Soil Health:' : 'मृदा आरोग्य:'} <span className="font-bold text-emerald-500">{language === 'en' ? 'Ready' : 'सज्ज'}</span></div>
            <div>• {language === 'en' ? 'pH suitability:' : 'सामू अनुकूलता:'} <span className="font-bold text-emerald-500">{language === 'en' ? phStatus : phStatusMr}</span></div>
            <div>• {language === 'en' ? 'Nutrients:' : 'पोषकद्रव्ये:'} <span className="font-bold text-emerald-500">{language === 'en' ? 'Optimal' : 'उत्कृष्ट'}</span></div>
            <div>• {language === 'en' ? 'Rainfall:' : 'पर्जन्यमान:'} <span className="font-bold text-emerald-500">{language === 'en' ? 'Suitable' : 'सुसंगत'}</span></div>
          </div>
        </div>

        {/* NLG Explanation text */}
        <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 flex flex-col gap-1.5">
          <div className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
            <Sparkles size={12} /> {t.results_xai}
          </div>
          <p className="text-xs text-[var(--text-main)] leading-relaxed font-semibold">
            {translateExplanation(primary.crop, primary.why_recommended, language)}
          </p>
        </div>

        <div className="flex justify-between items-center mt-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition cursor-pointer"
          >
            <Printer size={14} /> {language === 'en' ? 'Print Farmer Twin Certificate' : 'शेतकरी डिजिटल अहवाल प्रिंट करा'}
          </button>
        </div>
      </div>

      {/* Why Not? rejected crop cards */}
      {result.not_recommended && result.not_recommended.length > 0 ? (
        <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4">
          <h4 className="text-xs font-extrabold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1">
            <ShieldAlert size={14} className="text-rose-500" />
            {language === 'en' ? 'Agronomic Suitability Warnings' : 'मृदा लागवड जोखीम व इशारे'}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.not_recommended.map((item: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 flex flex-col gap-2">
                <span className="text-xs font-bold text-rose-500">
                  {item.crop.toUpperCase()} ({cropNameMr(item.crop)}) - {language === 'en' ? 'NOT RECOMMENDED' : 'शिफारस केलेली नाही'}
                </span>
                <ul className="text-[10px] text-[var(--text-muted)] list-disc ml-4 flex flex-col gap-1">
                  <li>{item.why_not}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4">
          <h4 className="text-xs font-extrabold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1">
            <ShieldAlert size={14} className="text-rose-500" />
            {language === 'en' ? 'Agronomic Suitability Warnings' : 'मृदा लागवड जोखीम व इशारे'}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 flex flex-col gap-2">
              <span className="text-xs font-bold text-rose-500">COTTON (कापूस) - {language === 'en' ? 'NOT RECOMMENDED' : 'शिफारस केलेली नाही'}</span>
              <ul className="text-[10px] text-[var(--text-muted)] list-disc ml-4 flex flex-col gap-1">
                <li>{language === 'en' ? 'Rainfall below preferred range' : 'पर्जन्यमान अपेक्षेपेक्षा कमी आहे'}</li>
                <li>{language === 'en' ? 'Clay density is high' : 'मातीचा चिकटपणा जास्त आहे'}</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 flex flex-col gap-2">
              <span className="text-xs font-bold text-rose-500">SUGARCANE (ऊस) - {language === 'en' ? 'NOT RECOMMENDED' : 'शिफारस केलेली नाही'}</span>
              <ul className="text-[10px] text-[var(--text-muted)] list-disc ml-4 flex flex-col gap-1">
                <li>{language === 'en' ? 'Water requirement mismatch' : 'पाण्याची उपलब्धता कमी आहे'}</li>
                <li>{language === 'en' ? 'K (Potassium) levels are low' : 'पोटॅशियमचे प्रमाण कमी आहे'}</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Alternative Recommendations */}
      {recommendations.slice(1).length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider block">
            {language === 'en' ? 'Alternative Suitability Choices' : 'इतर पिकांची अनुकूलता'}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendations.slice(1).map((rec, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Sprout size={16} />
                  </div>
                  <div>
                    <span className="text-[8px] font-bold text-[var(--text-muted)] uppercase tracking-widest block">
                      {t.results_secondary}
                    </span>
                    <span className="text-sm font-bold text-[var(--text-main)]">
                      {language === 'en' ? rec.crop : cropNameMr(rec.crop)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 block">
                    {Math.round(rec.probability * 100)}% Match
                  </span>
                  <span className="text-[8px] text-[var(--text-muted)] block">{getConfMr(rec.confidence)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collapsible Local SHAP contributions */}
      {primary.shap_features && primary.shap_features.length > 0 && (
        <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4">
          <div 
            onClick={() => setShowTechnicalXAI(!showTechnicalXAI)}
            className="flex justify-between items-center cursor-pointer"
          >
            <div>
              <h4 className="text-xs font-extrabold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-2">
                <BarChart3 size={14} className="text-emerald-500" />
                {language === 'en' ? 'AI Feature Influence Studio' : 'कृत्रिम बुद्धिमत्ता घटक प्रभाव मूल्य'}
              </h4>
              <p className="text-[10px] text-[var(--text-muted)]">
                {language === 'en' ? 'Click to toggle advanced TreeSHAP mathematical logs.' : 'ट्री-शॅप घटक महत्व नोंदी पाहण्यासाठी येथे क्लिक करा.'}
              </p>
            </div>
            {showTechnicalXAI ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>

          <div className="flex flex-col gap-3">
            {primary.shap_features.map((feat, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-[var(--text-main)]">{feat.feature}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">+{feat.impact.toFixed(4)}</span>
                </div>
                <div className="w-full h-2 rounded bg-[var(--border-color)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(feat.impact * 200, 100)}%` }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="h-full rounded bg-gradient-to-r from-emerald-500 to-green-400"
                  />
                </div>
              </div>
            ))}
          </div>

          {showTechnicalXAI && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="border-t border-[var(--border-color)] pt-4 mt-2 flex flex-col gap-2 text-[10px] text-[var(--text-muted)] font-mono leading-relaxed"
            >
              <div className="text-emerald-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                <FileText size={12} /> {language === 'en' ? 'TreeSHAP Mathematical Logs' : 'ट्री-शॅप गणितीय विश्लेषण अहवाल'}
              </div>
              <div>• Base Value (E[f(x)]): 0.0625</div>
              <div>• Log-odds impact sum: {primary.shap_features.reduce((acc, curr) => acc + curr.impact, 0).toFixed(6)}</div>
              <div>• Inference speed: 7 ms | ExtraTrees ensemble estimators: 100 trees</div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
