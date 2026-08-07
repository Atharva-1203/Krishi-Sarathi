"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguageStore } from '@/store/language';
import { Search, Sprout, Filter, Info, ShieldAlert, Check } from 'lucide-react';

interface CropMetadataItem {
  crop: string;
  category: string;
  scientific_name: string;
  description: string;
  primary_parameters: string[];
  water_demand: string;
  soil_preference: string;
  temperature_preference: string;
  rainfall_preference: string;
  growing_notes: string;
}

interface CropExplorerProps {
  cropMetadata: CropMetadataItem[];
  cropProfiles: Record<string, any>;
  currentField?: {
    N: number;
    P: number;
    K: number;
    ph: number;
    temperature: number;
    humidity: number;
    rainfall: number;
  };
}

const CROP_TRANSLATIONS: Record<string, string> = {
  "apple": "सफरचंद", "banana": "केळी", "blackgram": "उडीद", "chickpea": "हरभरा",
  "coconut": "नारळ", "coffee": "कॉफी", "cotton": "कापूस", "grapes": "द्राक्षे",
  "jute": "ताग", "kidneybeans": "राजमा", "lentil": "मसूर", "maize": "मका",
  "mango": "आंबा", "mothbeans": "मटकी", "mungbean": "मूग", "muskmelon": "खरबूज",
  "orange": "संत्री", "papaya": "पपई", "pigeonpeas": "तूर", "pomegranate": "डाळिंब",
  "rice": "भात", "watermelon": "कलिंगड"
};

export default function CropExplorer({ cropMetadata, cropProfiles, currentField }: CropExplorerProps) {
  const { language } = useLanguageStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [compareCrop, setCompareCrop] = useState<string | null>(null);

  const getCropLabel = (crop: string) => {
    const mrName = CROP_TRANSLATIONS[crop.toLowerCase()] || crop;
    return language === 'en' ? crop.charAt(0).toUpperCase() + crop.slice(1) : mrName;
  };

  const getCategories = () => {
    const cats = new Set(cropMetadata.map(c => c.category));
    return ["All", ...Array.from(cats)];
  };

  const filteredCrops = cropMetadata.filter(c => {
    const matchesSearch = c.crop.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (CROP_TRANSLATIONS[c.crop.toLowerCase()] || "").includes(searchTerm);
    const matchesCat = selectedCategory === "All" || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Calculate profile similarity scorecard for comparison
  const calculateCompatibility = (inputVal: number, median: number, iqr: number) => {
    const dist = abs(inputVal - median) / max(iqr, 1e-5);
    return Math.round(Math.exp(-0.5 * (dist ** 1.5)) * 100);
  };

  const abs = (val: number) => Math.abs(val);
  const max = (a: number, b: number) => Math.max(a, b);

  const getComparisonScores = (crop: string) => {
    if (!currentField || !cropProfiles[crop]) return null;
    const profile = cropProfiles[crop];
    const features = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"];
    
    let total = 0;
    const featureScores: Record<string, number> = {};
    
    features.forEach(f => {
      const uVal = currentField[f as keyof typeof currentField] || 0;
      const median = profile[f].median;
      const iqr = profile[f].iqr;
      const score = calculateCompatibility(uVal, median, iqr);
      featureScores[f] = score;
      total += score;
    });
    
    return {
      overall: Math.round(total / features.length),
      features: featureScores
    };
  };

  return (
    <div className="flex flex-col gap-6 text-[var(--text-main)] w-full">
      
      {/* Search & Filters */}
      <div className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={language === 'en' ? "Search crops..." : "पिके शोधा..."}
            className="w-full px-3.5 py-2 pl-9 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm focus:outline-none"
          />
          <Search size={14} className="absolute left-3 top-3 text-[var(--text-muted)]" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {getCategories().map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                selectedCategory === cat
                  ? "bg-emerald-600 border-emerald-500 text-white shadow-sm"
                  : "bg-[var(--bg-app)] border-[var(--border-color)] hover:bg-[var(--bg-hover)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCrops.map(crop => {
          const isComparing = compareCrop === crop.crop;
          const scores = isComparing ? getComparisonScores(crop.crop) : null;
          const profile = cropProfiles[crop.crop];

          return (
            <motion.div
              key={crop.crop}
              layout
              className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold capitalize flex items-center gap-1.5">
                      <Sprout size={16} className="text-emerald-500" />
                      {getCropLabel(crop.crop)}
                    </h3>
                    <span className="text-[10px] text-[var(--text-muted)] italic block">{crop.scientific_name} ({crop.category})</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded">
                    Water: {crop.water_demand}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{crop.description}</p>
              </div>

              {/* Stat Details */}
              <div className="grid grid-cols-2 gap-3 text-[10px] border-t border-[var(--border-color)] pt-3">
                <div>
                  <span className="text-[8px] font-bold text-[var(--text-muted)] uppercase block">Soil Preference</span>
                  <span className="font-medium text-[var(--text-main)] leading-relaxed block mt-0.5">{crop.soil_preference}</span>
                </div>
                <div>
                  <span className="text-[8px] font-bold text-[var(--text-muted)] uppercase block">Growing Notes</span>
                  <span className="font-medium text-[var(--text-main)] leading-relaxed block mt-0.5">{crop.growing_notes}</span>
                </div>
              </div>

              {/* Comparison Section */}
              <div className="border-t border-[var(--border-color)] pt-3 flex flex-col gap-2.5">
                <button
                  onClick={() => setCompareCrop(isComparing ? null : crop.crop)}
                  className={`w-full py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                    isComparing
                      ? "bg-zinc-200 dark:bg-zinc-800 text-[var(--text-main)] border border-[var(--border-color)]"
                      : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                  }`}
                >
                  {isComparing ? "Hide Comparison" : "Compare My Field Profile"}
                </button>

                <AnimatePresence>
                  {isComparing && scores && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-[var(--bg-app)] rounded-xl p-3.5 border border-[var(--border-color)] flex flex-col gap-3"
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold">Overall Fit Similarity</span>
                        <span className="font-black text-emerald-500 text-sm">{scores.overall}%</span>
                      </div>
                      
                      {/* Progress overall */}
                      <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${scores.overall}%` }} />
                      </div>

                      {/* Feature Breakdown */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[9px] mt-1">
                        {Object.keys(scores.features).map(feat => {
                          const val = scores.features[feat];
                          return (
                            <div key={feat} className="p-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-card)] flex justify-between items-center">
                              <span className="font-bold uppercase text-[8px] text-[var(--text-muted)]">{feat}</span>
                              <span className={`font-extrabold ${val >= 70 ? "text-emerald-500" : "text-amber-500"}`}>{val}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
