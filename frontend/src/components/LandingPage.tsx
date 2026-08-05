"use client";

import { motion } from 'framer-motion';
import { Sprout, ShieldCheck, Database, Award, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  setTab: (tab: string) => void;
}

export default function LandingPage({ setTab }: LandingPageProps) {
  const stats = [
    { label: 'Soil Card Records', value: '779,144', icon: Database },
    { label: 'F1 Classification Score', value: '99.59%', icon: Award },
    { label: 'Recommendation Output Crops', value: '16 Classifications', icon: Sprout },
    { label: 'Coordinate Accuracy Check', value: '100% Validated', icon: ShieldCheck }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold"
        >
          <Sprout size={14} /> Production Crop Recommendation AI Platform
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text-main)] max-w-4xl"
        >
          Predict Optimal Crops. <br />
          <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
            Empower Sustainable Farming.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-[var(--text-muted)] max-w-2xl mt-2"
        >
          Krishi Sarathi utilizes tree-based machine learning ensembles and over 770,000 Soil Health Cards to deliver real-time, explainable crop suitability analytics for Western Maharashtra.
        </motion.p>

        <motion.button
          onClick={() => setTab('dashboard')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer hover:shadow-emerald-500/35 transition-all duration-300"
        >
          Start Crop Analysis <ArrowRight size={18} />
        </motion.button>
      </section>

      {/* Stats Counters Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((st, idx) => {
          const Icon = st.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-emerald-500/30 transition-all flex flex-col gap-4 shadow-sm"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Icon size={20} />
              </div>
              <div>
                <h3 className="text-[11px] font-bold text-[var(--text-muted)] tracking-wider uppercase">
                  {st.label}
                </h3>
                <p className="text-2xl font-black text-[var(--text-main)] mt-1">
                  {st.value}
                </p>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Explainer / Technical Detail cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[var(--border-color)] pt-12">
        <div className="flex flex-col gap-4 justify-center">
          <h2 className="text-2xl font-bold text-[var(--text-main)]">
            State-of-the-Art Explainable AI (XAI)
          </h2>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed">
            By integrating tree-based SHAP values, Krishi Sarathi maps the local feature contributions of nitrogen, phosphorus, soil pH, and cumulative rainfall. Farmers receive clear, transparent, and actionable reasoning behind why each crop is recommended.
          </p>
          <div className="flex items-center gap-2.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
            <Sprout size={16} /> Calibrated confidence scores mapped to 5 suitability bands.
          </div>
        </div>
        <div className="p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col gap-3 justify-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
          <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            Sanskrit Tagline
          </h4>
          <blockquote className="text-2xl font-serif text-[var(--text-main)] font-bold italic Sanskrit leading-relaxed">
            "ज्ञानसमन्विता कृषिः समृद्धये।"
          </blockquote>
          <p className="text-[var(--text-muted)] text-xs">
            Translates to: <i>"Knowledge-integrated agriculture leads to prosperity."</i>
          </p>
        </div>
      </section>
    </div>
  );
}
