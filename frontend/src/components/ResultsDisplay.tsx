"use client";

import { motion } from 'framer-motion';
import { Sparkles, Sprout, TrendingUp, Droplet, Calendar } from 'lucide-react';

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
    warnings: string[];
    processing_time_ms: number;
  };
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  const recommendations = result.top_recommendations;
  const primary = recommendations[0];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Primary recommendation card */}
      <div className="p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-tr from-emerald-500/5 to-emerald-600/5 shadow-md shadow-emerald-500/5 relative overflow-hidden flex flex-col gap-4">
        <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl bg-emerald-500 text-white text-[10px] font-black tracking-widest uppercase shadow">
          Primary crop
        </div>
        
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <Sprout size={26} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
              Top recommended target
            </span>
            <h4 className="text-3xl font-black text-[var(--text-main)] mt-0.5 tracking-tight">
              {primary.crop}
            </h4>
          </div>
        </div>

        {/* Suitable metrics indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-emerald-500/20 pt-4 mt-2">
          <div>
            <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase block">Confidence</span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
              <TrendingUp size={12} /> {primary.confidence}
            </span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase block">Match score</span>
            <span className="text-xs font-black text-[var(--text-main)] block mt-0.5">
              {Math.round(primary.probability * 100)}%
            </span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase block">Water require</span>
            <span className="text-xs font-bold text-[var(--text-main)] flex items-center gap-1 mt-0.5">
              <Droplet size={12} className="text-blue-500" /> {primary.water_requirement}
            </span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase block">Cycle period</span>
            <span className="text-xs font-bold text-[var(--text-main)] flex items-center gap-1 mt-0.5">
              <Calendar size={12} className="text-amber-500" /> {primary.growing_duration}
            </span>
          </div>
        </div>

        {/* NLG Explanation text */}
        <div className="mt-2 p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 flex flex-col gap-1.5">
          <div className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
            <Sparkles size={12} /> Agronomic explainability rationale
          </div>
          <p className="text-xs text-[var(--text-main)] leading-relaxed font-medium">
            {primary.why_recommended}
          </p>
        </div>
      </div>

      {/* Local SHAP contributions */}
      {primary.shap_features && primary.shap_features.length > 0 && (
        <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4">
          <div>
            <h4 className="text-xs font-extrabold text-[var(--text-muted)] uppercase tracking-wider">
              SHAP Parametric Impact mapping
            </h4>
            <p className="text-[10px] text-[var(--text-muted)]">
              Feature contributions representing how much each soil constituent drove this recommendation.
            </p>
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
        </div>
      )}

      {/* Secondary & Tertiary suggestions */}
      {recommendations.slice(1).length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendations.slice(1).map((rec, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Sprout size={16} />
                </div>
                <div>
                  <span className="text-[8px] font-bold text-[var(--text-muted)] uppercase tracking-widest block">
                    Rank {idx + 2} suggest
                  </span>
                  <span className="text-sm font-bold text-[var(--text-main)]">{rec.crop}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 block">
                  {Math.round(rec.probability * 100)}% Match
                </span>
                <span className="text-[8px] text-[var(--text-muted)] block">{rec.confidence}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
