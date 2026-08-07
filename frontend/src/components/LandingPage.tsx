"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '@/store/language';
import { TRANSLATIONS } from '@/store/translations';
import { Sprout, ShieldCheck, Database, Award, ArrowRight, Activity, Thermometer, Globe, Star } from 'lucide-react';

interface LandingPageProps {
  setTab: (tab: string) => void;
}

export default function LandingPage({ setTab }: LandingPageProps) {
  const { language } = useLanguageStore();
  const t = TRANSLATIONS[language];
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cereals' | 'pulses' | 'fruits' | 'cash'>('all');

  const handleStartAnalysis = () => {
    setTab('dashboard');
  };

  const handleGuidedDemo = () => {
    localStorage.setItem("run_demo", "true");
    setTab('dashboard');
  };

  const cropCategories = {
    cereals: {
      title: language === 'en' ? 'Cereals' : 'तृणधान्ये',
      crops: ['Rice', 'Maize', 'Wheat', 'Sorghum']
    },
    pulses: {
      title: language === 'en' ? 'Pulses' : 'कडधान्ये',
      crops: ['Chickpea', 'Kidneybeans', 'Pigeonpeas', 'Mothbeans', 'Mungbean', 'Lentil', 'Blackgram']
    },
    fruits: {
      title: language === 'en' ? 'Fruits' : 'फळे',
      crops: ['Apple', 'Banana', 'Grapes', 'Mango', 'Orange', 'Papaya', 'Pomegranate', 'Muskmelon', 'Watermelon']
    },
    cash: {
      title: language === 'en' ? 'Fiber & Plantation' : 'नगदी व बागायती पिके',
      crops: ['Cotton', 'Jute', 'Coconut', 'Coffee']
    }
  };

  const CROP_LABELS: Record<string, string> = {
    "Rice": "भात", "Maize": "मका", "Wheat": "गहू", "Sorghum": "ज्वारी",
    "Chickpea": "हरभरा", "Kidneybeans": "राजमा", "Pigeonpeas": "तूर", "Mothbeans": "मटकी",
    "Mungbean": "मूग", "Lentil": "मसूर", "Blackgram": "उडीद", "Apple": "सफरचंद",
    "Banana": "केळी", "Grapes": "द्राक्षे", "Mango": "आंबा", "Orange": "संत्री",
    "Papaya": "पपई", "Pomegranate": "डाळिंब", "Muskmelon": "खरबूज", "Watermelon": "कलिंगड",
    "Cotton": "कापूस", "Jute": "ताग", "Coconut": "नारळ", "Coffee": "कॉफी"
  };

  const getVisibleCrops = () => {
    if (selectedCategory === 'all') {
      return [...cropCategories.cereals.crops, ...cropCategories.pulses.crops, ...cropCategories.fruits.crops, ...cropCategories.cash.crops];
    }
    return cropCategories[selectedCategory].crops;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16 text-[var(--text-main)]">
      
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
          {language === 'en' ? 'Official Agricultural Databases Connected' : 'अधिकृत कृषी सांख्यिकी प्रणाली जोडली आहे'}
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl leading-tight"
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

      {/* Redesigned Premium Telemetry Statistics Section */}
      <section className="flex flex-col gap-6 border-t border-b border-[var(--border-color)] py-10">
        <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest text-center">
          {language === 'en' ? 'System Database Stats & Telemetry' : 'सिस्टम डेटाबेस आकडेवारी व टेलिमेट्री'}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col gap-1 items-center text-center shadow-sm">
            <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider block font-bold">Predictor Rows</span>
            <span className="text-3xl font-black text-emerald-500">2,200</span>
            <span className="text-[9px] text-[var(--text-muted)] font-medium mt-1">Cross-Validated Training Instances</span>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col gap-1 items-center text-center shadow-sm">
            <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider block font-bold">Target Classes</span>
            <span className="text-3xl font-black text-emerald-500">22</span>
            <span className="text-[9px] text-[var(--text-muted)] font-medium mt-1">Botanically Diverse Crop Species</span>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col gap-1 items-center text-center shadow-sm">
            <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider block font-bold">Soil Database Rows</span>
            <span className="text-3xl font-black text-emerald-500">779,144</span>
            <span className="text-[9px] text-[var(--text-muted)] font-medium mt-1">Maharashtra Soil Health Cards</span>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col gap-1 items-center text-center shadow-sm">
            <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider block font-bold">Covered Districts</span>
            <span className="text-3xl font-black text-emerald-500">36</span>
            <span className="text-[9px] text-[var(--text-muted)] font-medium mt-1">Districts Map Baselines</span>
          </div>
        </div>
      </section>

      {/* Taxonomic Crop Explorer Section */}
      <section className="flex flex-col gap-6">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
          <h3 className="text-2xl font-bold tracking-tight">
            {language === 'en' ? 'Taxonomic Crop Explorer' : 'पिकांचे वर्गीकरण सूची'}
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            {language === 'en' ? 'Browse the 22 supported crop targets sorted by their agronomic classification groups.' : 'कृषी-वर्गीकरणांनुसार विभागलेल्या २२ पिकांची माहिती मिळवा.'}
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-1.5 p-1 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] max-w-lg mx-auto w-full">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg cursor-pointer transition ${selectedCategory === 'all' ? 'bg-emerald-600 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
          >
            {language === 'en' ? 'All Crops' : 'सर्व पिके'}
          </button>
          <button
            onClick={() => setSelectedCategory('cereals')}
            className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg cursor-pointer transition ${selectedCategory === 'cereals' ? 'bg-emerald-600 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
          >
            {cropCategories.cereals.title}
          </button>
          <button
            onClick={() => setSelectedCategory('pulses')}
            className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg cursor-pointer transition ${selectedCategory === 'pulses' ? 'bg-emerald-600 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
          >
            {cropCategories.pulses.title}
          </button>
          <button
            onClick={() => setSelectedCategory('fruits')}
            className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg cursor-pointer transition ${selectedCategory === 'fruits' ? 'bg-emerald-600 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
          >
            {cropCategories.fruits.title}
          </button>
          <button
            onClick={() => setSelectedCategory('cash')}
            className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg cursor-pointer transition ${selectedCategory === 'cash' ? 'bg-emerald-600 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
          >
            {cropCategories.cash.title}
          </button>
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {getVisibleCrops().map((crop) => {
            const label = CROP_LABELS[crop] || crop;
            return (
              <div 
                key={crop}
                className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-emerald-500/50 hover:bg-emerald-500/5 transition flex flex-col gap-1.5 items-center justify-center text-center shadow-xs"
              >
                <Sprout size={20} className="text-emerald-500" />
                <span className="font-bold text-xs block">{crop}</span>
                <span className="text-[10px] text-[var(--text-muted)] block">{label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Storytelling & Credibility */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[var(--border-color)] pt-12">
        <div className="flex flex-col gap-4 justify-center">
          <h2 className="text-2xl font-bold tracking-tight">
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
          <blockquote className="text-2xl font-serif font-bold italic leading-relaxed">
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
