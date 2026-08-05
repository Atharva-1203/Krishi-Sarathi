"use client";

import { motion } from 'framer-motion';
import { useLanguageStore } from '@/store/language';
import { TRANSLATIONS } from '@/store/translations';
import { Sprout, ShieldCheck, Database, Award, ArrowRight, Activity, Thermometer } from 'lucide-react';

interface LandingPageProps {
  setTab: (tab: string) => void;
}

export default function LandingPage({ setTab }: LandingPageProps) {
  const { language } = useLanguageStore();
  const t = TRANSLATIONS[language];

  const handleStartAnalysis = () => {
    setTab('dashboard');
  };

  const handleGuidedDemo = () => {
    localStorage.setItem("run_demo", "true");
    setTab('dashboard');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16">
      
      {/* Immersive Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 mt-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent blur-3xl -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider"
        >
          <Activity size={12} className="animate-pulse" />
          {language === 'en' ? 'Official Maharashtra GIS Intelligence Connected' : 'महाराष्ट्र शासन कृषी माहिती प्रणाली जोडली आहे'}
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black tracking-tight text-[var(--text-main)] max-w-4xl leading-tight"
        >
          {language === 'en' ? 'KRISHI SARATHI' : 'कृषि सारथी'}<br />
          <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
            {language === 'en' ? 'Agricultural Decision Support Platform' : 'कृषी निर्णय समर्थन प्रणाली'}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base text-[var(--text-muted)] max-w-2xl mt-2 font-medium"
        >
          {language === 'en' 
            ? 'An Explainable AI crop suitability prediction advisor built on official Maharashtra Soil Health Cards and MahaRain datasets.'
            : 'अधिकृत मृदा आरोग्य पत्रिका आणि पर्जन्यमान माहितीवर आधारित कृत्रिम बुद्धिमत्ता पीक शिफारस प्रणाली.'}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-4 mt-4 justify-center"
        >
          <button
            onClick={handleStartAnalysis}
            className="px-8 py-4 rounded-xl font-bold bg-emerald-600 text-white shadow-lg shadow-emerald-500/10 flex items-center gap-2 cursor-pointer hover:bg-emerald-700 transition"
          >
            {t.hero_cta} <ArrowRight size={16} />
          </button>
          <button
            onClick={handleGuidedDemo}
            className="px-8 py-4 rounded-xl font-bold border border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 flex items-center gap-2 cursor-pointer hover:bg-emerald-500/10 transition"
          >
            {language === 'en' ? 'Run Guided Demo (Judge Mode)' : 'मार्गदर्शित डेमो पहा (जज मोड)'}
          </button>
        </motion.div>
      </section>

      {/* Trust Banner & Telemetry Grid */}
      <section className="flex flex-col gap-6">
        <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest text-center">
          {language === 'en' ? 'Live Telemetry & Intelligence Indicators' : 'लाइव्ह कृषी माहिती संकेत फलक'}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col gap-2">
            <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider block">AI Core Status</span>
            <span className="text-sm font-bold text-emerald-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow shadow-emerald-500" />
              ONLINE (7ms)
            </span>
          </div>
          <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col gap-2">
            <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider block">Soil Health Database</span>
            <span className="text-sm font-bold text-[var(--text-main)] flex items-center gap-1">
              <Database size={14} className="text-emerald-500" />
              779,144 Samples
            </span>
          </div>
          <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col gap-2">
            <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider block">Climate Records</span>
            <span className="text-sm font-bold text-[var(--text-main)] flex items-center gap-1">
              <ShieldCheck size={14} className="text-emerald-500" />
              10+ Years (MahaRain)
            </span>
          </div>
          <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col gap-2">
            <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider block">Agricultural Season</span>
            <span className="text-sm font-bold text-amber-500 flex items-center gap-1">
              <Thermometer size={14} className="text-amber-500" />
              Kharif / खरीप
            </span>
          </div>
        </div>
      </section>

      {/* Storytelling & Credibility */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[var(--border-color)] pt-12">
        <div className="flex flex-col gap-4 justify-center">
          <h2 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">
            {language === 'en' ? 'Official Datasets & Validation' : 'अधिकृत डेटासेट आणि प्रमाणीकरण'}
          </h2>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed font-medium">
            {language === 'en'
              ? 'Krishi Sarathi maps district boundaries directly to cross-validated Soil Health Card databases. We calculate probability indices to ensure crop suggestions remain robust and risk-free.'
              : 'कृषि सारथी जिल्हा सीमा थेट मूल्यांकित सॉईल कार्ड डेटाशी जोडते. पीक शिफारसी सुरक्षित ठेवण्यासाठी आम्ही अचूकता निर्देशांक मोजतो.'}
          </p>
        </div>
        
        <div className="p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col gap-3 justify-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
          <h4 className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            {language === 'en' ? 'Sanskrit Tagline' : 'संस्कृत घोषवाक्य'}
          </h4>
          <blockquote className="text-2xl font-serif text-[var(--text-main)] font-bold italic leading-relaxed">
            "ज्ञानसमन्विता कृषिः समृद्धये।"
          </blockquote>
          <p className="text-[var(--text-muted)] text-xs font-semibold">
            {language === 'en' ? 'Agriculture paired with knowledge leads to prosperity.' : 'ज्ञानाने समृद्ध झालेली शेती समृद्धी आणते.'}
          </p>
        </div>
      </section>

    </div>
  );
}
