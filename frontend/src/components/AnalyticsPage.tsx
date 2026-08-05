"use client";

import { useLanguageStore } from '@/store/language';
import { TRANSLATIONS } from '@/store/translations';
import { Cpu, BarChart3, Database, Layers, CheckCircle } from 'lucide-react';

export default function AnalyticsPage() {
  const { language } = useLanguageStore();
  const t = TRANSLATIONS[language];

  // Feature weights for feature importance SVG bar graph
  const featureImportance = [
    { name: "Rainfall (पर्जन्यमान)", weight: 0.28 },
    { name: "pH (जमिनीचा सामू)", weight: 0.22 },
    { name: "Nitrogen (N)", weight: 0.18 },
    { name: "Potassium (K)", weight: 0.14 },
    { name: "Phosphorus (P)", weight: 0.10 },
    { name: "Temperature (तापमान)", weight: 0.05 },
    { name: "Humidity (हवामान)", weight: 0.03 }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-8">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-main)]">
          {language === 'en' ? 'Model Card & Dataset Intelligence' : 'मॉडेल आणि डेटासेट विश्लेषण अहवाल'}
        </h2>
        <p className="text-xs text-[var(--text-muted)]">
          {language === 'en' ? 'Detailed machine learning benchmarks and training dataset profiles.' : 'मशीन लर्निंगचे मूल्यमापन आणि वापरलेल्या डेटासेटची सांख्यिकी.'}
        </p>
      </div>

      {/* Dataset Summaries & Model metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Dataset Card */}
        <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <Database size={18} className="text-emerald-500" />
            <h4 className="font-bold text-sm text-[var(--text-main)]">
              {language === 'en' ? 'Dataset Specifications' : 'डेटासेट तपशील'}
            </h4>
          </div>
          <div className="flex flex-col gap-2.5 text-xs border-t border-[var(--border-color)] pt-3 font-medium">
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{language === 'en' ? 'Soil Health Samples:' : 'एकूण मृदा नमुने:'}</span>
              <span className="text-[var(--text-main)] font-semibold">779,144</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{language === 'en' ? 'Rainfall Timeline:' : 'पर्जन्य नोंदी काळ:'}</span>
              <span className="text-[var(--text-main)] font-semibold">10+ Years (MahaRain)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{language === 'en' ? 'Features Scored:' : 'घटक संख्या:'}</span>
              <span className="text-[var(--text-main)] font-semibold">27 engineered variables</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{language === 'en' ? 'Missing Values:' : 'अपूर्ण नोंदी:'}</span>
              <span className="text-[var(--text-main)] font-semibold">0 (100% Cleaned)</span>
            </div>
          </div>
        </div>

        {/* Model Card */}
        <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <Cpu size={18} className="text-emerald-500" />
            <h4 className="font-bold text-sm text-[var(--text-main)]">
              {language === 'en' ? 'ExtraTrees Classifier v1.1' : 'एक्स्ट्रा ट्रीज मॉडेल v1.1'}
            </h4>
          </div>
          <div className="flex flex-col gap-2.5 text-xs border-t border-[var(--border-color)] pt-3 font-medium">
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{language === 'en' ? 'Classification Type:' : 'वर्गीकरण प्रकार:'}</span>
              <span className="text-[var(--text-main)] font-semibold">Ensemble multiclass</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{language === 'en' ? 'Calibration Method:' : 'कॅलिब्रेशन पद्धत:'}</span>
              <span className="text-[var(--text-main)] font-semibold">Platt scaling probability</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{language === 'en' ? 'Estimators Count:' : 'वृक्ष संख्या (Estimators):'}</span>
              <span className="text-[var(--text-main)] font-semibold">100 trees</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{language === 'en' ? 'Prediction Latency:' : 'अनुमान वेग:'}</span>
              <span className="text-emerald-500 font-bold">7 ms</span>
            </div>
          </div>
        </div>

        {/* Model Accuracy Benchmarks */}
        <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <Layers size={18} className="text-emerald-500" />
            <h4 className="font-bold text-sm text-[var(--text-main)]">
              {language === 'en' ? 'Accuracy Benchmarks' : 'मॉडेल अचूकता मूल्यांकन'}
            </h4>
          </div>
          <div className="flex flex-col gap-2.5 text-xs border-t border-[var(--border-color)] pt-3 font-medium">
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{language === 'en' ? 'Validation Method:' : 'मूल्यांकन पद्धत:'}</span>
              <span className="text-[var(--text-main)] font-semibold">5-Fold Cross Validation</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{language === 'en' ? 'F1-Score (Macro):' : 'F1-स्कोअर (मॅक्रो):'}</span>
              <span className="text-emerald-500 font-bold">99.59%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{language === 'en' ? 'Top-3 Accuracy:' : 'टॉप-३ अचूकता दर:'}</span>
              <span className="text-emerald-500 font-bold">100.0%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{language === 'en' ? 'Out-Of-Bag (OOB):' : 'OOB स्कोअर:'}</span>
              <span className="text-[var(--text-main)] font-semibold">0.9942</span>
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Feature Importance charts */}
        <div className="lg:col-span-7 p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <BarChart3 size={18} className="text-emerald-500" />
            <h4 className="font-bold text-sm text-[var(--text-main)]">
              {language === 'en' ? 'Global Feature Importance Weights (Gini)' : 'जागतिक घटक प्रभाव भार (जिनी)'}
            </h4>
          </div>
          
          <div className="flex flex-col gap-3.5 border-t border-[var(--border-color)] pt-4">
            {featureImportance.map((feat, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--text-main)]">{feat.name}</span>
                  <span className="font-bold text-emerald-500">{(feat.weight * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[var(--border-color)] overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                    style={{ width: `${feat.weight * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Validation Matrix description */}
        <div className="lg:col-span-5 p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <CheckCircle size={18} className="text-emerald-500" />
            <h4 className="font-bold text-sm text-[var(--text-main)]">
              {language === 'en' ? 'Model Quality Assurance' : 'मॉडेल गुणवत्ता खात्री'}
            </h4>
          </div>

          <div className="flex flex-col gap-3.5 border-t border-[var(--border-color)] pt-4 text-xs leading-relaxed text-[var(--text-muted)]">
            <p>
              {language === 'en'
                ? '✓ High feature convergence matching 779k Soil Health Cards.'
                : '✓ ७.७ लाख मृदा नमुने आधारित मॉडेल अचूकता निश्चितीकरण.'}
            </p>
            <p>
              {language === 'en'
                ? '✓ Clean parameters calibration: GADM boundaries coordinate validation yields high classification confidence.'
                : '✓ अधिकृत सीमा निर्धारण आणि प्लेट-स्केलिंग पद्धतीमुळे मॉडेलची जोखीम कमी होते.'}
            </p>
            <p>
              {language === 'en'
                ? '✓ Explainable locally using TreeSHAP values outputting custom contribution indicators.'
                : '✓ स्थानिक पातळीवर प्रत्येक शिफारशीचे स्पष्टीकरण देण्यास सक्षम.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
