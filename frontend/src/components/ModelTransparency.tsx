"use client";

import { motion } from 'framer-motion';
import { useLanguageStore } from '@/store/language';
import { 
  Sliders, ShieldCheck, FileText, Settings, Cpu, BarChart2, 
  HelpCircle, AlertOctagon, Terminal, Award, ChevronDown 
} from 'lucide-react';

export default function ModelTransparency() {
  const { language } = useLanguageStore();

  const pipelineStages = [
    {
      id: 1,
      title: "1. User Soil Input Ingestion",
      desc: "Farmers submit 7 measured soil and climate parameter values (N, P, K, pH, temp, humidity, rainfall).",
      icon: <Sliders className="text-emerald-500" size={18} />
    },
    {
      id: 2,
      title: "2. Input quality & validation checks",
      desc: "Zod enforces type safety and boundaries on client inputs before request serialization.",
      icon: <ShieldCheck className="text-blue-500" size={18} />
    },
    {
      id: 3,
      title: "3. Feature Contract Enforcement",
      desc: "V3FeatureBuilder maps features. Strict isolation filters block geographic defaults to eliminate bias.",
      icon: <FileText className="text-purple-500" size={18} />
    },
    {
      id: 4,
      title: "4. Out-of-Distribution (OOD) Scanner",
      desc: "Inspects parameters against training bounds. Flags CAUTION/OOD alerts on range violations.",
      icon: <AlertOctagon className="text-amber-500" size={18} />
    },
    {
      id: 5,
      title: "5. Preprocessing Pipeline",
      desc: "V3Preprocessor applies standard scaling using StandardScaler fit on the clean training partition.",
      icon: <Settings className="text-zinc-500" size={18} />
    },
    {
      id: 6,
      title: "6. Calibrated ExtraTrees Inference",
      desc: "The fit classifier evaluates inputs. Sigmoid Platt Scaling calibrates probability accuracy.",
      icon: <Cpu className="text-rose-500" size={18} />
    },
    {
      id: 7,
      title: "7. Statistical Profile Comparison",
      desc: "AgronomicProfileMatcher runs robust standardized distance to assess crop feature similarity.",
      icon: <BarChart2 className="text-emerald-400" size={18} />
    },
    {
      id: 8,
      title: "8. Deep Explanation & Uncertainty Engine",
      desc: "Calculates local sensitivity impacts, prediction entropy levels, and Why-Not alternatives.",
      icon: <HelpCircle className="text-orange-500" size={18} />
    },
    {
      id: 9,
      title: "9. Handoff Decision Support output",
      desc: "Provides Top-5 crop rankings with calibrated probabilities, scorecard heatmaps, and actionable next steps.",
      icon: <Award className="text-yellow-500" size={18} />
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full text-[var(--text-main)] max-w-4xl mx-auto py-4">
      
      <div className="text-center flex flex-col gap-1.5 mb-2">
        <h2 className="text-xl font-bold tracking-tight">
          {language === 'en' ? "TRANSPARENT AGRICULTURAL AI PIPELINE" : "कृत्रिम बुद्धिमत्ता कार्यप्रणाली पारदर्शकता"}
        </h2>
        <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
          {language === 'en'
            ? "Inspect how the Krishi Sarathi V3.1 engine processes parameters end-to-end to deliver crop decisions."
            : "कृषी सारथी इंजिन मृदा आणि हवामान घटकांवर प्रक्रिया करून शिफारस कशी तयार करते, ते तपासा."}
        </p>
      </div>

      {/* Visual Pipeline Stack */}
      <div className="flex flex-col items-center gap-1.5">
        {pipelineStages.map((stage, index) => {
          const isLast = index === pipelineStages.length - 1;
          return (
            <div key={stage.id} className="flex flex-col items-center w-full">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="w-full p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex items-start gap-4 hover:border-emerald-500/20 transition"
              >
                <div className="p-2.5 rounded-lg bg-[var(--bg-app)] border border-[var(--border-color)]">
                  {stage.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-extrabold text-sm">{stage.title}</h4>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{stage.desc}</p>
                </div>
              </motion.div>
              
              {!isLast && (
                <div className="py-1 opacity-40">
                  <ChevronDown size={18} className="text-emerald-500" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Model Spec Summary Card */}
      <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-3 text-xs leading-relaxed text-[var(--text-muted)] mt-4">
        <h4 className="font-bold text-[var(--text-main)] flex items-center gap-2">
          <Terminal size={16} className="text-zinc-400" />
          System Isolation Safeguards
        </h4>
        <p>
          To maintain strict scientific transparency and avoid historical regional biases, the prediction engine enforces **zero-leakage safeguards**:
        </p>
        <ul className="list-inside list-disc flex flex-col gap-1 pl-2">
          <li><strong>No Geographic Variables</strong>: District, Division, and coordinates are physically barred from the ML model input matrix.</li>
          <li><strong>Empirical Base</strong>: Feature weights are learned entirely from balanced physical crop-soil parameters.</li>
          <li><strong>Calibrated Outputs</strong>: Model probability sums are strictly verified at the contract boundary.</li>
        </ul>
      </div>

    </div>
  );
}
