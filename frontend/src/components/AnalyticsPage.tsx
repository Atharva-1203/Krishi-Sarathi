"use client";

import { useLanguageStore } from '@/store/language';
import { TRANSLATIONS } from '@/store/translations';
import { TrendingUp, Cpu } from 'lucide-react';

export default function AnalyticsPage() {
  const { language } = useLanguageStore();
  const t = TRANSLATIONS[language];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-8">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-main)]">
          {t.analytics_title}
        </h2>
        <p className="text-xs text-[var(--text-muted)]">
          {t.analytics_subtitle}
        </p>
      </div>

      {/* Model details stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Model Card */}
        <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
          
          <div className="flex items-center gap-2.5">
            <Cpu size={20} className="text-emerald-500" />
            <h4 className="font-bold text-sm text-[var(--text-main)]">{t.card_specs_title}</h4>
          </div>

          <div className="flex flex-col gap-3 text-xs border-t border-[var(--border-color)] pt-4">
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{t.spec_model}:</span>
              <span className="font-semibold text-[var(--text-main)]">ExtraTrees Classifier</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{t.spec_f1}:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">99.59%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{t.spec_top3}:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">100.0%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{t.spec_loss}:</span>
              <span className="font-semibold text-[var(--text-main)]">0.0091</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{t.spec_params}:</span>
              <span className="font-mono text-[var(--text-main)]">n_estimators=50, random_state=42</span>
            </div>
          </div>
        </div>

        {/* Intended agro boundaries */}
        <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <TrendingUp size={20} className="text-emerald-500" />
            <h4 className="font-bold text-sm text-[var(--text-main)]">{t.card_bounds_title}</h4>
          </div>

          <div className="flex flex-col gap-3 text-xs border-t border-[var(--border-color)] pt-4 leading-relaxed">
            <p className="text-[var(--text-muted)]">
              {t.desc_agro_1}
            </p>
            <p className="text-[var(--text-muted)]">
              {t.desc_agro_2}
            </p>
            <p className="text-[var(--text-muted)]">
              {t.desc_agro_3}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
