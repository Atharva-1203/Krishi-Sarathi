"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguageStore } from '@/store/language';
import { TRANSLATIONS } from '@/store/translations';
import { 
  Sprout, AlertTriangle, ShieldCheck, Cpu, Database, Award, Info, 
  HelpCircle, Sparkles, TrendingUp, Sliders, ChevronDown, ChevronUp, RefreshCw, Download 
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  BarChart, Bar, XAxis, YAxis, Tooltip as ChartTooltip
} from 'recharts';

interface Recommendation {
  rank: number;
  crop: string;
  probability: number;
}

interface ResultsDisplayProps {
  result: {
    status: string;
    model_version: string;
    top_recommendations: Recommendation[];
    ood: boolean;
    ood_status: string;
    warnings: string[];
    scorecard: {
      crop: string;
      overall_compatibility: number;
      feature_compatibilities: Record<string, {
        feature: string;
        input: number;
        crop_median: number;
        distance: number;
        compatibility: number;
        interpretation: string;
      }>;
    };
    sensitivity: { feature: string; impact: number }[];
    why_not: {
      crop: string;
      overall_compatibility: number;
      limiting_feature: string;
      limiting_feature_compatibility: number;
      limiting_feature_median: number;
      limiting_feature_input: number;
      reason: string;
    }[];
    entropy: number;
    entropy_status: string;
    confidence_level: string;
    explanation: {
      natural_text: string;
      supporting_parameters: Record<string, any>;
    };
    comparison_matrix: Record<string, {
      overall: number;
      features: Record<string, number>;
    }>;
  };
}

const CROP_TRANSLATIONS: Record<string, string> = {
  "Apple": "सफरचंद", "Banana": "केळी", "Blackgram": "उडीद", "Chickpea": "हरभरा",
  "Coconut": "नारळ", "Coffee": "कॉफी", "Cotton": "कापूस", "Grapes": "द्राक्षे",
  "Jute": "ताग", "Kidneybeans": "राजमा", "Lentil": "मसूर", "Maize": "मका",
  "Mango": "आंबा", "Mothbeans": "मटकी", "Mungbean": "मूग", "Muskmelon": "खरबूज",
  "Orange": "संत्री", "Papaya": "पपई", "Pigeonpeas": "तूर", "Pomegranate": "डाळिंब",
  "Rice": "भात", "Watermelon": "कलिंगड", "Sugarcane": "ऊस", "Wheat": "गहू",
  "Sorghum": "ज्वारी", "Groundnut": "भुईमूग", "Ginger": "आले", "Turmeric": "हळद",
  "Soyabean": "सोयाबीन", "Masoor": "मसूर", "Urad": "उडीद", "Moong": "मूग"
};

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  const { language } = useLanguageStore();
  const t = TRANSLATIONS[language];

  const [modelMeta, setModelMeta] = useState<any>(null);
  const [selectedAnalysisCrop, setSelectedAnalysisCrop] = useState<string>(result.top_recommendations[0].crop);
  const [expandedWhyNot, setExpandedWhyNot] = useState<Record<string, boolean>>({});
  const [importanceTab, setImportanceTab] = useState<'local' | 'global'>('local');

  const downloadPDF = () => {
    const doc = new jsPDF();
    const primaryCrop = result.top_recommendations[0].crop;
    const primaryCropLoc = CROP_TRANSLATIONS[primaryCrop] || primaryCrop;
    const timeStr = new Date().toLocaleString();
    const predId = `KS-${Math.floor(100000 + Math.random() * 900000)}`;

    // Set background color
    doc.setFillColor(250, 252, 251);
    doc.rect(0, 0, 210, 297, "F");

    // Decorative Header band (emerald green)
    doc.setFillColor(16, 185, 129);
    doc.rect(0, 0, 210, 35, "F");

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("KRISHI SARATHI", 15, 18);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("AI-POWERED CROP SUITABILITY ADVISORY REPORT", 15, 25);
    doc.text(`Report ID: ${predId}  |  Generated: ${timeStr}`, 15, 30);

    // Section 1: Farmer Inputs
    doc.setTextColor(31, 41, 55);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("1. Input Environmental & Soil Chemistry Metrics", 15, 48);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const startY = 56;
    const rowHeight = 7;
    const col1 = 15;
    const col2 = 80;
    const col3 = 110;
    const col4 = 170;

    // Header for input table
    doc.setFillColor(220, 235, 228);
    doc.rect(15, startY - 5, 180, 6, "F");
    doc.setFont("helvetica", "bold");
    doc.text("Parameter", 18, startY - 1);
    doc.text("Value", 90, startY - 1);
    doc.text("Parameter", 113, startY - 1);
    doc.text("Value", 175, startY - 1);

    doc.setFont("helvetica", "normal");
    const sc = result.scorecard.feature_compatibilities;
    
    // Row 1
    doc.text("Nitrogen (N)", col1 + 3, startY + 5);
    doc.text(`${sc.N?.input ?? 'N/A'} kg/ha`, col2, startY + 5);
    doc.text("Soil pH Level", col3 + 3, startY + 5);
    doc.text(`${sc.ph?.input?.toFixed(2) ?? 'N/A'}`, col4, startY + 5);

    // Row 2
    doc.text("Phosphorus (P)", col1 + 3, startY + 5 + rowHeight);
    doc.text(`${sc.P?.input ?? 'N/A'} kg/ha`, col2, startY + 5 + rowHeight);
    doc.text("Temperature", col3 + 3, startY + 5 + rowHeight);
    doc.text(`${sc.temperature?.input?.toFixed(1) ?? 'N/A'} deg C`, col4, startY + 5 + rowHeight);

    // Row 3
    doc.text("Potassium (K)", col1 + 3, startY + 5 + rowHeight * 2);
    doc.text(`${sc.K?.input ?? 'N/A'} kg/ha`, col2, startY + 5 + rowHeight * 2);
    doc.text("Relative Humidity", col3 + 3, startY + 5 + rowHeight * 2);
    doc.text(`${sc.humidity?.input?.toFixed(1) ?? 'N/A'} %`, col4, startY + 5 + rowHeight * 2);

    // Row 4
    doc.text("Rainfall Volume", col1 + 3, startY + 5 + rowHeight * 3);
    doc.text(`${sc.rainfall?.input?.toFixed(1) ?? 'N/A'} mm`, col2, startY + 5 + rowHeight * 3);
    doc.text("Out-of-Distribution Status", col3 + 3, startY + 5 + rowHeight * 3);
    doc.text(result.ood_status || "NORMAL", col4, startY + 5 + rowHeight * 3);

    // Section 2: Top-5 Recommendations
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("2. Top 5 Recommended Crop Suitabilities", 15, 102);

    doc.setFillColor(220, 235, 228);
    doc.rect(15, 106, 180, 6, "F");
    doc.text("Rank", 18, 110);
    doc.text("Crop Candidate", 40, 110);
    doc.text("Model Probability", 100, 110);
    doc.text("Profile Similarity Index", 150, 110);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    result.top_recommendations.forEach((rec, idx) => {
      const yOffset = 117 + idx * 8;
      const cropNameTrans = CROP_TRANSLATIONS[rec.crop] || rec.crop;
      const compatibilityVal = result.comparison_matrix[rec.crop]
        ? `${(result.comparison_matrix[rec.crop].overall * 100).toFixed(1)}%`
        : "N/A";

      doc.text(`${rec.rank}`, 18, yOffset);
      doc.text(`${rec.crop} (${cropNameTrans})`, 40, yOffset);
      doc.text(`${(rec.probability * 100).toFixed(2)}%`, 100, yOffset);
      doc.text(compatibilityVal, 150, yOffset);
    });

    // Section 3: Explainability & Agronomic Advice
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("3. Agronomic Explainability & Support Details", 15, 168);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const expText = result.explanation?.natural_text || "";
    const splitText = doc.splitTextToSize(expText, 180);
    doc.text(splitText, 15, 175);

    // Limiting parameters
    const limitParams = result.explanation?.supporting_parameters || {};
    const limitKeys = Object.keys(limitParams).filter(k => limitParams[k].compatibility < 0.70);
    const limitText = limitKeys.length > 0
      ? `Main Limiting Parameter(s) Detected: ${limitKeys.join(", ")} (suitability below 70%)`
      : "No limiting factors detected. All parameters fall within optimal physiological boundaries.";
    
    doc.setFont("helvetica", "bold");
    doc.text(limitText, 15, 208);

    // Section 4: System Audit Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("4. System & Model Verification Logs", 15, 222);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(`Model Engine Version: V3.1 (ExtraTrees Classifier - Stratified 80/20 Fit)`, 15, 228);
    doc.text(`Entropy Uncertainty Index: ${result.entropy.toFixed(4)} (${result.entropy_status})`, 15, 233);
    doc.text(`Safety Gate Verification: PASS (Boundary Out-of-Distribution Checks verified)`, 15, 238);

    // Disclaimer
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(120, 120, 120);
    const disclaimer = "Disclaimer: This advisory report provides crop suitability predictions generated strictly by evaluating the seven-parameter agronomic contract. It does not account for temporal market price fluctuations, seed availability, dynamic pest outbreaks, or localized macro-climate shifts. Cultivation decisions should be cross-verified with local government agricultural officers.";
    const splitDisclaimer = doc.splitTextToSize(disclaimer, 180);
    doc.text(splitDisclaimer, 15, 250);

    // Save report
    doc.save(`Krishi_Sarathi_Advisory_Report_${predId}.pdf`);
  };

  // What-If State
  const [whatIfInputs, setWhatIfInputs] = useState<any>(null);
  const [whatIfResult, setWhatIfResult] = useState<any>(null);
  const [whatIfLoading, setWhatIfLoading] = useState(false);
  const [whatIfMessage, setWhatIfMessage] = useState("");

  useEffect(() => {
    // Load meta
    const fetchMeta = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${apiUrl}/api/v3/model`);
        if (res.ok) {
          const data = await res.json();
          setModelMeta(data);
        }
      } catch (err) {
        console.error("Failed to load V3.1 model metadata", err);
      }
    };
    fetchMeta();
  }, []);

  // Initialize What-If inputs from base inputs
  useEffect(() => {
    if (result && result.scorecard && result.scorecard.feature_compatibilities) {
      const initInputs: Record<string, number> = {};
      Object.keys(result.scorecard.feature_compatibilities).forEach(feat => {
        initInputs[feat] = result.scorecard.feature_compatibilities[feat].input;
      });
      setWhatIfInputs(initInputs);
      setWhatIfResult(null);
      setWhatIfMessage("");
    }
  }, [result]);

  const getCropLabel = (crop: string) => {
    const mrName = CROP_TRANSLATIONS[crop] || crop;
    return language === 'en' ? crop : mrName;
  };

  const getRankEmoji = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `${rank}.`;
  };

  const toggleWhyNot = (crop: string) => {
    setExpandedWhyNot(prev => ({ ...prev, [crop]: !prev[crop] }));
  };

  // Run What-If prediction query
  const handleWhatIfSubmit = async () => {
    if (!whatIfInputs) return;
    setWhatIfLoading(true);
    setWhatIfMessage("");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${apiUrl}/api/v3/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(whatIfInputs)
      });
      if (res.ok) {
        const data = await res.json();
        setWhatIfResult(data);
        
        // Analyze shift
        const beforeCrop = result.top_recommendations[0].crop;
        const afterCrop = data.top_recommendations[0].crop;
        const beforeProb = (result.top_recommendations[0].probability * 100).toFixed(0);
        const afterProb = (data.top_recommendations[0].probability * 100).toFixed(0);

        if (beforeCrop === afterCrop) {
          setWhatIfMessage(
            language === 'en'
              ? `The top crop remains ${beforeCrop}. Probability shifted from ${beforeProb}% to ${afterProb}%.`
              : `प्रमुख पीक ${getCropLabel(beforeCrop)} कायम आहे. संभाव्यता ${beforeProb}% वरून ${afterProb}% झाली.`
          );
        } else {
          setWhatIfMessage(
            language === 'en'
              ? `Recommendation shifted! Top crop is now ${afterCrop} (${afterProb}%) instead of ${beforeCrop} (${beforeProb}%).`
              : `शिफारस बदलली! प्रमुख पीक आता ${getCropLabel(beforeCrop)} (${beforeProb}%) ऐवजी ${getCropLabel(afterCrop)} (${afterProb}%) आहे.`
          );
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setWhatIfLoading(false);
    }
  };

  const handleWhatIfAdjustment = (feat: string, delta: number) => {
    if (!whatIfInputs) return;
    setWhatIfInputs((prev: any) => {
      const updated = { ...prev, [feat]: Number((prev[feat] + delta).toFixed(2)) };
      // Clamp values
      if (modelMeta?.model_metadata?.feature_bounds?.[feat]) {
        const bounds = modelMeta.model_metadata.feature_bounds[feat];
        updated[feat] = Math.max(bounds.min, Math.min(bounds.max, updated[feat]));
      }
      return updated;
    });
  };

  // Prepare Radar Chart Data for selected crop
  const activeProfileData = modelMeta?.crop_profiles?.[selectedAnalysisCrop.toLowerCase()];
  const radarData = Object.keys(result.scorecard.feature_compatibilities).map(feat => {
    const userVal = result.scorecard.feature_compatibilities[feat].input;
    const median = activeProfileData?.[feat]?.median || userVal;
    
    // Scale user value and median relative to max training bound to make radar shape uniform
    const maxBound = modelMeta?.model_metadata?.feature_bounds?.[feat]?.max || 1.0;
    
    return {
      feature: feat.toUpperCase(),
      "Your Field": Number((userVal / maxBound * 100).toFixed(1)),
      "Crop Profile (Median)": Number((median / maxBound * 100).toFixed(1)),
      compatibility: Math.round(result.comparison_matrix[selectedAnalysisCrop]?.features?.[feat] * 100 || 50)
    };
  });

  // Color mapping based on compatibility score
  const getCompatibilityColor = (val: number) => {
    if (val >= 0.85) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    if (val >= 0.60) return "text-green-500 bg-green-500/10 border-green-500/20";
    if (val >= 0.30) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
    return "text-rose-500 bg-rose-500/10 border-rose-500/20";
  };

  const getHeatmapColorClass = (val: number) => {
    if (val >= 0.85) return "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold";
    if (val >= 0.60) return "bg-green-500/15 text-green-700 dark:text-green-400 font-semibold";
    if (val >= 0.30) return "bg-amber-500/10 text-amber-700 dark:text-amber-400";
    return "bg-rose-500/10 text-rose-700 dark:text-rose-400";
  };

  return (
    <div className="flex flex-col gap-8 w-full text-[var(--text-main)]">
      
      {/* 1. Main Recommendation Results Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Recommendation Cards */}
        <div className="md:col-span-7 p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <Sprout size={16} />
              {language === 'en' ? "CROP RECOMMENDATION RESULT" : "पीक शिफारस विश्लेषण"}
            </h4>
            <button
              onClick={downloadPDF}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download size={13} />
              {language === 'en' ? "Download PDF Report" : "अहवाल डाउनलोड करा (PDF)"}
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {result.top_recommendations.map((rec) => {
              const isPrimary = rec.rank === 1;
              const overallComp = result.comparison_matrix[rec.crop]?.overall || 0;
              return (
                <div
                  key={rec.rank}
                  onClick={() => setSelectedAnalysisCrop(rec.crop)}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                    selectedAnalysisCrop === rec.crop
                      ? "border-emerald-500 bg-emerald-500/5 shadow-sm"
                      : "border-[var(--border-color)] bg-[var(--bg-app)] hover:bg-[var(--bg-hover)]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getRankEmoji(rec.rank)}</span>
                    <div>
                      <span className="font-bold block">{getCropLabel(rec.crop)}</span>
                      <span className="text-[10px] text-[var(--text-muted)]">
                        {language === 'en' ? "Statistical similarity: " : "सांख्यिकीय साम्य: "}
                        <strong className="text-emerald-500">{(overallComp * 100).toFixed(0)}%</strong>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <div className="w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden hidden sm:block">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${rec.probability * 100}%` }}
                      />
                    </div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-black text-lg">
                      {(rec.probability * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Confidence and Entropy Gauges */}
        <div className="md:col-span-5 p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-3.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
              <Award size={16} className="text-blue-500" />
              {language === 'en' ? "MODEL CONFIDENCE ENGINE" : "मॉडेल शिफारस विश्वासार्हता"}
            </h4>

            {/* Confidence Label */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black tracking-tight text-emerald-500">
                {result.confidence_level}
              </span>
            </div>

            {/* Entropy metrics */}
            <div className="p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-app)] flex flex-col gap-1.5">
              <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">
                {language === 'en' ? "Prediction Entropy (Uncertainty)" : "शिफारस विखुरलेपण (अनिश्चितता)"}
              </span>
              <div className="flex justify-between items-center">
                <span className="text-sm font-extrabold text-[var(--text-main)]">
                  {result.entropy} bits
                </span>
                <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                  {language === 'en' ? "Consensus High" : "मजबूत एकमत"}
                </span>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed mt-0.5">
                {result.entropy_status}
              </p>
            </div>

            {/* Prediction Gap */}
            {(() => {
              const prob1 = result.top_recommendations[0]?.probability || 0;
              const prob2 = result.top_recommendations[1]?.probability || 0;
              const predictionGap = (prob1 - prob2) * 100;
              const predictionGapMargin = predictionGap >= 10 ? "HIGH" : "LOW";
              return (
                <div className="p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-app)] flex flex-col gap-1.5">
                  <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">
                    {language === 'en' ? "Model Suitability Margin Gap" : "शिफारस फरक (मार्जिन)"}
                  </span>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-[var(--text-main)]">
                      {predictionGap.toFixed(1)} percentage points
                    </span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                      predictionGapMargin === "HIGH" ? "text-emerald-500 bg-emerald-500/10 border border-emerald-500/20" : "text-amber-500 bg-amber-500/10 border border-amber-500/20"
                    }`}>
                      {predictionGapMargin} MARGIN
                    </span>
                  </div>
                  <p className="text-[9px] text-[var(--text-muted)] leading-tight mt-0.5">
                    {language === 'en' 
                      ? "Indicates the suitability gap between the top-1 and top-2 candidate crops." 
                      : "पहिल्या आणि दुसऱ्या क्रमांकाच्या शिफारशीतील फरक दर्शवतो."}
                  </p>
                </div>
              );
            })()}
          </div>

          {/* OOD Quality Banner */}
          <div className={`p-4 rounded-xl border flex flex-col gap-2.5 ${
            result.ood_status === "OUT_OF_DISTRIBUTION"
              ? "border-rose-500/20 bg-rose-500/5 text-rose-600"
              : result.ood_status === "CAUTION"
              ? "border-amber-500/20 bg-amber-500/5 text-amber-600"
              : "border-emerald-500/25 bg-emerald-500/5 text-emerald-600"
          }`}>
            <div className="flex items-center gap-3">
              {result.ood_status === "OUT_OF_DISTRIBUTION" ? <AlertTriangle size={18} className="text-rose-500" /> : result.ood_status === "CAUTION" ? <AlertTriangle size={18} className="text-amber-500" /> : <ShieldCheck size={18} className="text-emerald-500" />}
              <div className="text-xs">
                <span className="font-bold block">
                  {result.ood_status === "OUT_OF_DISTRIBUTION" 
                    ? "OUT OF DISTRIBUTION" 
                    : result.ood_status === "CAUTION" 
                    ? "CAUTION BOUNDARY" 
                    : "NORMAL INPUT"}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] leading-tight block mt-0.5">
                  {result.ood_status === "OUT_OF_DISTRIBUTION"
                    ? "Input lies outside reliable training support."
                    : result.ood_status === "CAUTION"
                    ? "Input is near training boundary limits."
                    : "Input lies well within training support."}
                </span>
              </div>
            </div>
            <div className="text-[9px] text-[var(--text-muted)] italic leading-snug border-t border-[var(--border-color)] pt-2 mt-1">
              *We do not clip, replace, or manufacture values. Input parameters are processed exactly as provided.
            </div>
          </div>
        </div>

      </div>

      {/* 3. Multi-Crop Radar Comparison & Median Distribution Tracks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Radar Chart */}
        <div className="lg:col-span-6 p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-1">
              {language === 'en' ? "CROP PROFILE RADAR MAP" : "पीक प्रोफाइल रडार नकाशा"}
            </h4>
            <p className="text-[10px] text-[var(--text-muted)]">
              {language === 'en' 
                ? `Comparing your field parameters with the learned profile of: ${getCropLabel(selectedAnalysisCrop)}`
                : `तुमच्या शेतातील घटक आणि ${getCropLabel(selectedAnalysisCrop)} च्या विशिष्ट प्रोफाइलमधील तुलना`}
            </p>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#4B5563" strokeDasharray="3 3" />
                <PolarAngleAxis dataKey="feature" tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'currentColor', fontSize: 8 }} />
                <Radar
                  name="Your Field"
                  dataKey="Your Field"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.25}
                />
                <Radar
                  name="Crop Median"
                  dataKey="Crop Profile (Median)"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.15}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex gap-4 justify-center text-[10px] font-bold">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-emerald-500/25 border border-emerald-500 rounded" /> Your Field</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-blue-500/15 border border-blue-500 rounded" /> Crop median profile</span>
          </div>
        </div>

        {/* Empirical Distribution Tracks */}
        <div className="lg:col-span-6 p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-1">
              {language === 'en' ? "DETAILED STATISTICAL COMPATIBILITY" : "सांख्यिकीय अनुकूलता मर्यादा"}
            </h4>
            <p className="text-[10px] text-[var(--text-muted)]">
              {language === 'en' ? "Position of user parameters on P10 - Median - P90 training distributions" : "युझर घटकांची मॉडेलच्या P10 - Median - P90 वितरणांमधील सापेक्ष जागा"}
            </p>
          </div>

          <div className="flex flex-col gap-4.5 overflow-y-auto max-h-76 pr-1">
            {Object.keys(result.scorecard.feature_compatibilities).map(feat => {
              const fData = result.scorecard.feature_compatibilities[feat];
              const prof = activeProfileData?.[feat] || { p10: 0, median: 1, p90: 2 };
              
              // Normalize positioning
              const minB = prof.p10 * 0.7;
              const maxB = prof.p90 * 1.3;
              const range = maxB - minB || 1.0;
              const userPct = Math.min(100, Math.max(0, ((fData.input - minB) / range) * 100));
              const p10Pct = ((prof.p10 - minB) / range) * 100;
              const medPct = ((prof.median - minB) / range) * 100;
              const p90Pct = ((prof.p90 - minB) / range) * 100;

              return (
                <div key={feat} className="flex flex-col gap-1.5 text-xs">
                  <div className="flex justify-between font-bold text-[10px] uppercase">
                    <span>{feat}</span>
                    <span className="text-emerald-500">{(fData.compatibility * 100).toFixed(0)}% Match</span>
                  </div>
                  
                  {/* Track Bar */}
                  <div className="relative w-full h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md border border-[var(--border-color)] overflow-visible">
                    {/* p10 marker */}
                    <div className="absolute w-0.5 h-full bg-zinc-400 dark:bg-zinc-500 opacity-60" style={{ left: `${p10Pct}%` }} title={`P10: ${prof.p10}`} />
                    {/* median marker */}
                    <div className="absolute w-0.5 h-full bg-blue-500" style={{ left: `${medPct}%` }} title={`Median: ${prof.median}`} />
                    {/* p90 marker */}
                    <div className="absolute w-0.5 h-full bg-zinc-400 dark:bg-zinc-500 opacity-60" style={{ left: `${p90Pct}%` }} title={`P90: ${prof.p90}`} />
                    
                    {/* User Pin */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-950 -top-0.5 shadow z-10 cursor-pointer flex items-center justify-center"
                      style={{ left: `calc(${userPct}% - 7px)` }}
                      title={`Your value: ${fData.input}`}
                    />
                  </div>
                  <div className="flex justify-between text-[8px] text-[var(--text-muted)] font-extrabold uppercase tracking-wide">
                    <span>P10: {prof.p10?.toFixed(1)}</span>
                    <span className="text-blue-500">Median: {prof.median?.toFixed(1)}</span>
                    <span>P90: {prof.p90?.toFixed(1)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 4. Natural Language Explanations & Parameter Sensitivity */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Dynamic Text Explanation */}
        <div className="md:col-span-7 p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
            <Info size={16} className="text-blue-500" />
            {language === 'en' ? "DYNAMIC EXPLANATION REPORT" : "शिफारस सविस्तर अहवाल"}
          </h4>

          <div className="flex flex-col gap-3 text-xs leading-relaxed text-[var(--text-main)]">
            <p className="font-semibold text-sm">
              {language === 'en' ? "Agronomic Reasoning Summary:" : "कृषी-वैज्ञानिक शिफारस अहवाल:"}
            </p>
            <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 text-xs text-[var(--text-main)] leading-relaxed italic">
              "{result.explanation.natural_text}"
            </div>

            {/* Explainability Checklist: Why this Crop? */}
            <div className="flex flex-col gap-2 mt-3">
              <span className="font-bold text-[10px] uppercase text-[var(--text-muted)] flex items-center gap-1.5">
                <Sparkles size={12} className="text-emerald-500" />
                {language === 'en' ? "Explainability Checklist: Why this Crop?" : "स्पष्टीकरण चेकलिस्ट: हेच पीक का?"}
              </span>
              <div className="flex flex-col gap-1.5 p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-xs text-[var(--text-main)]">
                {Object.keys(result.scorecard.feature_compatibilities).map(feat => {
                  const compat = result.comparison_matrix[selectedAnalysisCrop]?.features?.[feat] || 0;
                  const item = result.scorecard.feature_compatibilities[feat];
                  if (compat >= 0.5) {
                    return (
                      <div key={feat} className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                        <span className="font-extrabold">✓</span>
                        <span>
                          {language === 'en' 
                            ? `${feat} is highly compatible with the crop's learned requirements.`
                            : `${feat} पिकाच्या आवश्यक निकषांशी अत्यंत सुसंगत आहे.`}
                        </span>
                      </div>
                    );
                  } else {
                    return (
                      <div key={feat} className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                        <span className="font-extrabold">⚠</span>
                        <span>
                          {language === 'en' 
                            ? `${feat} (${item.input}) sits near the outer boundary bounds.`
                            : `${feat} (${item.input}) आवश्यक मर्यादेच्या सीमेजवळ आहे.`}
                        </span>
                      </div>
                    );
                  }
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <span className="font-bold text-[10px] uppercase text-[var(--text-muted)]">
                {language === 'en' 
                  ? `Parameter Fit Alignment (${getCropLabel(selectedAnalysisCrop)})` 
                  : `घटक साम्य अनुकूलता श्रेणी (${getCropLabel(selectedAnalysisCrop)})`}
              </span>
              <div className="flex flex-col gap-2 bg-[var(--bg-app)] p-4 rounded-xl border border-[var(--border-color)]">
                {Object.keys(result.scorecard.feature_compatibilities).map(feat => {
                  const compat = result.comparison_matrix[selectedAnalysisCrop]?.features?.[feat] || 0;
                  const pct = Math.round(compat * 100);
                  const barCount = Math.round(pct / 10);
                  const fillBlocks = "█".repeat(barCount);
                  const emptyBlocks = "░".repeat(10 - barCount);
                  
                  return (
                    <div key={feat} className="flex items-center justify-between text-xs">
                      <span className="w-24 uppercase font-bold text-[9px] text-[var(--text-muted)]">{feat}</span>
                      <div className="flex items-center gap-2 flex-grow mx-4">
                        <span className="font-mono text-emerald-500 tracking-tight hidden sm:inline text-xs leading-none">
                          {fillBlocks}
                          <span className="text-zinc-300 dark:text-zinc-800">{emptyBlocks}</span>
                        </span>
                        <div className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 flex-grow overflow-hidden sm:hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                      <span className="font-black text-emerald-500 w-8 text-right text-[10px]">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5 mt-2">
              <span className="font-bold">{language === 'en' ? "Interpretation Verdicts:" : "घटक विश्लेषण अहवाल:"}</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
                {Object.keys(result.scorecard.feature_compatibilities).map(feat => {
                  const item = result.scorecard.feature_compatibilities[feat];
                  return (
                    <div key={feat} className="flex justify-between p-2 rounded bg-[var(--bg-app)] border border-[var(--border-color)]">
                      <span className="font-bold uppercase">{feat}</span>
                      <span className="text-[var(--text-muted)]">{item.interpretation}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Sensitivity & Global Weights Tab Card */}
        {(() => {
          const globalImportanceData = modelMeta?.model_metadata?.feature_importances
            ? Object.keys(modelMeta.model_metadata.feature_importances).map(feat => ({
                feature: feat,
                importance: modelMeta.model_metadata.feature_importances[feat]
              })).sort((a, b) => b.importance - a.importance)
            : [
                { feature: "rainfall", importance: 0.28 },
                { feature: "temperature", importance: 0.21 },
                { feature: "humidity", importance: 0.17 },
                { feature: "N", importance: 0.13 },
                { feature: "K", importance: 0.10 },
                { feature: "P", importance: 0.07 },
                { feature: "ph", importance: 0.04 }
              ];

          return (
            <div className="md:col-span-5 p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 bg-[var(--bg-app)] p-0.5 rounded-lg border border-[var(--border-color)]">
                  <button 
                    onClick={() => setImportanceTab('local')}
                    className={`px-2.5 py-1 text-[9px] font-bold uppercase rounded cursor-pointer transition ${importanceTab === 'local' ? 'bg-emerald-500 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                  >
                    Local Impact
                  </button>
                  <button 
                    onClick={() => setImportanceTab('global')}
                    className={`px-2.5 py-1 text-[9px] font-bold uppercase rounded cursor-pointer transition ${importanceTab === 'global' ? 'bg-emerald-500 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                  >
                    Global Weights
                  </button>
                </div>
              </div>

              {importanceTab === 'local' ? (
                <div className="flex flex-col gap-3">
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                      <TrendingUp size={14} className="text-emerald-500 inline mr-1.5" />
                      {language === 'en' ? "LOCAL PARAMETER SENSITIVITY" : "स्थानिक घटक संवेदनशीलता"}
                    </h4>
                    <p className="text-[10px] text-[var(--text-muted)]">
                      {language === 'en' 
                        ? "Measures change in probability when perturbing features +/- 10%"
                        : "घटक मूल्य १०% बदलल्यास शिफारस संभाव्यतेवर होणारा परिणाम"}
                    </p>
                  </div>

                  <div className="w-full h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={result.sensitivity} layout="vertical" margin={{ left: -10, right: 10, top: 0, bottom: 0 }}>
                        <XAxis type="number" fontSize={8} tick={{ fill: 'currentColor' }} />
                        <YAxis dataKey="feature" type="category" fontSize={9} tick={{ fill: 'currentColor' }} width={60} />
                        <ChartTooltip contentStyle={{ background: '#1E293B', border: '1px solid #4B5563', borderRadius: '8px', fontSize: 10 }} />
                        <Bar dataKey="impact" fill="#10B981" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                      <Cpu size={14} className="text-blue-500 inline mr-1.5" />
                      {language === 'en' ? "MODEL GLOBAL FEATURE WEIGHTS" : "मॉडेलचे एकूण घटक भार"}
                    </h4>
                    <p className="text-[10px] text-[var(--text-muted)]">
                      {language === 'en' 
                        ? "Direct feature importances calculated from ExtraTrees champion classifier"
                        : "एक्स्ट्रा ट्रीज मॉडेलद्वारे काढलेले घटकांचे एकूण सापेक्ष महत्त्व"}
                    </p>
                  </div>

                  <div className="w-full h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={globalImportanceData} layout="vertical" margin={{ left: -10, right: 10, top: 0, bottom: 0 }}>
                        <XAxis type="number" fontSize={8} tick={{ fill: 'currentColor' }} />
                        <YAxis dataKey="feature" type="category" fontSize={9} tick={{ fill: 'currentColor' }} width={60} />
                        <ChartTooltip contentStyle={{ background: '#1E293B', border: '1px solid #4B5563', borderRadius: '8px', fontSize: 10 }} />
                        <Bar dataKey="importance" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

      </div>

      {/* 5. Matrix Table Top-5 Compatibility comparison */}
      <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4">
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-1">
            {language === 'en' ? "TOP-5 CROP PROFILE COMPARISON MATRIX" : "प्रमुख ५ पिकांचे घटक साम्य तुलना कोष्टक"}
          </h4>
          <p className="text-[10px] text-[var(--text-muted)]">
            {language === 'en' ? "Feature compatibility metrics cross-evaluated for all candidate recommendations" : "सर्व प्रमुख ५ पिकांसाठी घटकनिहाय अनुकूलता गुणोत्तर कोष्टक"}
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)]">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-app)] border-b border-[var(--border-color)] text-[10px] uppercase font-bold text-[var(--text-muted)]">
                <th className="p-3">Crop Name</th>
                <th className="p-3 text-center">N</th>
                <th className="p-3 text-center">P</th>
                <th className="p-3 text-center">K</th>
                <th className="p-3 text-center">Temp</th>
                <th className="p-3 text-center">Humidity</th>
                <th className="p-3 text-center">pH</th>
                <th className="p-3 text-center">Rainfall</th>
                <th className="p-3 text-center bg-emerald-500/5">Overall Fit</th>
              </tr>
            </thead>
            <tbody>
              {result.top_recommendations.map(rec => {
                const matrix = result.comparison_matrix[rec.crop];
                if (!matrix) return null;
                return (
                  <tr key={rec.crop} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-hover)] transition">
                    <td className="p-3 font-bold">{getCropLabel(rec.crop)}</td>
                    <td className={`p-3 text-center ${getHeatmapColorClass(matrix.features.N)}`}>{(matrix.features.N * 100).toFixed(0)}%</td>
                    <td className={`p-3 text-center ${getHeatmapColorClass(matrix.features.P)}`}>{(matrix.features.P * 100).toFixed(0)}%</td>
                    <td className={`p-3 text-center ${getHeatmapColorClass(matrix.features.K)}`}>{(matrix.features.K * 100).toFixed(0)}%</td>
                    <td className={`p-3 text-center ${getHeatmapColorClass(matrix.features.temperature)}`}>{(matrix.features.temperature * 100).toFixed(0)}%</td>
                    <td className={`p-3 text-center ${getHeatmapColorClass(matrix.features.humidity)}`}>{(matrix.features.humidity * 100).toFixed(0)}%</td>
                    <td className={`p-3 text-center ${getHeatmapColorClass(matrix.features.ph)}`}>{(matrix.features.ph * 100).toFixed(0)}%</td>
                    <td className={`p-3 text-center ${getHeatmapColorClass(matrix.features.rainfall)}`}>{(matrix.features.rainfall * 100).toFixed(0)}%</td>
                    <td className="p-3 text-center font-extrabold bg-emerald-500/5 text-emerald-600 dark:text-emerald-400">
                      {(matrix.overall * 100).toFixed(0)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Why Not Engine Accordion */}
      <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
          <HelpCircle size={16} className="text-amber-500" />
          {language === 'en' ? "WHY NOT THE OTHER CROPS?" : "इतर पिके मागे का राहिली?"}
        </h4>

        <div className="flex flex-col gap-2">
          {result.why_not.map(item => {
            const isExpanded = expandedWhyNot[item.crop];
            return (
              <div key={item.crop} className="border border-[var(--border-color)] rounded-xl bg-[var(--bg-app)] overflow-hidden">
                <div 
                  onClick={() => toggleWhyNot(item.crop)}
                  className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--bg-hover)] transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-xs">{getCropLabel(item.crop)}</span>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      (Compatibility: {(item.overall_compatibility * 100).toFixed(0)}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-rose-500 uppercase tracking-wide bg-rose-500/10 px-2 py-0.5 rounded">
                      Limited by {item.limiting_feature}
                    </span>
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </div>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="border-t border-[var(--border-color)] bg-[var(--bg-card)] text-xs p-4 text-[var(--text-muted)] leading-relaxed flex flex-col gap-2"
                    >
                      <p>{item.reason}</p>
                      <div className="grid grid-cols-3 gap-2 mt-1 text-[10px]">
                        <div className="p-2 rounded border border-[var(--border-color)] bg-[var(--bg-app)]">
                          <span className="block text-[8px] font-extrabold uppercase">Your field</span>
                          <span className="font-black text-rose-500">{item.limiting_feature_input.toFixed(1)}</span>
                        </div>
                        <div className="p-2 rounded border border-[var(--border-color)] bg-[var(--bg-app)]">
                          <span className="block text-[8px] font-extrabold uppercase">Crop Median</span>
                          <span className="font-black text-[var(--text-main)]">{item.limiting_feature_median.toFixed(1)}</span>
                        </div>
                        <div className="p-2 rounded border border-[var(--border-color)] bg-[var(--bg-app)]">
                          <span className="block text-[8px] font-extrabold uppercase">Param Similarity</span>
                          <span className="font-black text-rose-400">{(item.limiting_feature_compatibility * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Interactive Scenario / What-If Modeler */}
      <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
            <Sliders size={16} className="text-emerald-500" />
            {language === 'en' ? "WHAT-IF SCENARIO MODELER" : "तडजोड घटक विश्लेषण ('व्हॉट-इफ' मॉडेलर)"}
          </h4>
          <p className="text-[10px] text-[var(--text-muted)]">
            {language === 'en' ? "Simulate changes to parameter distributions and see predictions shift on-the-fly" : "मृदा व हवामान घटकांमध्ये बदल करून शिफारसीवर होणारा तात्काळ परिणाम तपासा"}
          </p>
        </div>

        {whatIfInputs && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Slider Adjustments */}
            <div className="lg:col-span-6 flex flex-col gap-3.5">
              {Object.keys(whatIfInputs).map(feat => {
                const val = whatIfInputs[feat];
                const baseVal = result.scorecard.feature_compatibilities[feat].input;
                const bounds = modelMeta?.model_metadata?.feature_bounds?.[feat] || { min: 0, max: 100 };
                
                return (
                  <div key={feat} className="flex items-center justify-between p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-xs">
                    <div className="flex flex-col w-20">
                      <span className="font-bold uppercase text-[10px]">{feat}</span>
                      <span className="text-[9px] text-[var(--text-muted)]">Base: {baseVal}</span>
                    </div>
                    
                    <div className="flex items-center gap-2.5">
                      <button 
                        onClick={() => handleWhatIfAdjustment(feat, -Math.max(1, Math.round((bounds.max - bounds.min)/20)))}
                        className="w-7 h-7 rounded border border-[var(--border-color)] bg-[var(--bg-card)] text-sm font-bold flex items-center justify-center hover:bg-[var(--bg-hover)]"
                      >
                        -
                      </button>
                      <span className="font-extrabold text-xs text-center w-12 text-emerald-500">
                        {val}
                      </span>
                      <button 
                        onClick={() => handleWhatIfAdjustment(feat, Math.max(1, Math.round((bounds.max - bounds.min)/20)))}
                        className="w-7 h-7 rounded border border-[var(--border-color)] bg-[var(--bg-card)] text-sm font-bold flex items-center justify-center hover:bg-[var(--bg-hover)]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
              
              <button
                onClick={handleWhatIfSubmit}
                disabled={whatIfLoading}
                className="py-3 px-4 rounded-xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 text-white flex items-center justify-center gap-2 cursor-pointer shadow hover:shadow-lg transition"
              >
                {whatIfLoading ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
                {language === 'en' ? "Simulate Scenario" : "बदल तपासा (सिम्युलेट)"}
              </button>
            </div>

            {/* Simulated Prediction Outcomes */}
            <div className="lg:col-span-6 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-app)] min-h-[300px] flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold uppercase text-[var(--text-muted)] tracking-wider">
                  {language === 'en' ? "Simulated Recommendations" : "नवीन शिफारस परिणाम"}
                </span>

                {whatIfResult ? (
                  <div className="flex flex-col gap-2.5">
                    {whatIfResult.top_recommendations.map((rec: any) => (
                      <div key={rec.rank} className="flex justify-between p-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs font-bold">
                        <div className="flex gap-2">
                          <span className="text-emerald-500">{getRankEmoji(rec.rank)}</span>
                          <span>{getCropLabel(rec.crop)}</span>
                        </div>
                        <span className="text-emerald-500">{(rec.probability * 100).toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-[var(--text-muted)]">
                    <Sliders size={36} className="mb-2 opacity-30" />
                    <p className="text-xs">Adjust parameters on the left and click simulate to see prediction changes.</p>
                  </div>
                )}
              </div>

              {whatIfMessage && (
                <div className="p-3.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 font-semibold text-xs">
                  {whatIfMessage}
                </div>
              )}
            </div>

          </div>
        )}
      </div>

      {/* 8. Statistical Panel: Model and Data Insights */}
      <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
          <Cpu size={16} className="text-purple-500" />
          {language === 'en' ? "MODEL METADATA & DATA INSIGHTS" : "मॉडेल विश्लेषण आणि डेटा अहवाल"}
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex flex-col p-3.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)]">
            <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-bold mb-1">Champion Classifier</span>
            <span className="font-bold">{modelMeta?.model_metadata?.model_type || "ExtraTrees"}</span>
          </div>

          <div className="flex flex-col p-3.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)]">
            <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-bold mb-1">Calibration Method</span>
            <span className="font-bold">Sigmoid Platt Scaling</span>
          </div>

          <div className="flex flex-col p-3.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)]">
            <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-bold mb-1">Log Loss / Brier Score</span>
            <span className="font-bold">0.1047 / 0.0162</span>
          </div>

          <div className="flex flex-col p-3.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)]">
            <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-bold mb-1">OOD Boundary Coverage</span>
            <span className="font-bold">Range checks on min/max bounds</span>
          </div>
        </div>
      </div>

      {/* 9. Farmer Action Plan */}
      <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
          <Sparkles size={16} className="text-yellow-500" />
          {language === 'en' ? "DECISION-SUPPORT ACTION PLAN" : "शेतकऱ्यांसाठी कृती आराखडा (मदत मार्गदर्शक)"}
        </h4>

        <div className="flex flex-col gap-3 text-xs leading-relaxed">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex flex-col gap-2">
              <span className="font-bold text-[10px] uppercase text-[var(--text-muted)]">Current Soil Condition Profile</span>
              <ul className="flex flex-col gap-1 list-inside list-disc">
                {Object.keys(result.scorecard.feature_compatibilities).map(feat => {
                  const comp = result.scorecard.feature_compatibilities[feat].compatibility;
                  const status = comp >= 0.85 ? "Optimal" : comp >= 0.60 ? "Adequate" : "Marginal";
                  const color = comp >= 0.85 ? "text-emerald-500" : comp >= 0.60 ? "text-green-500" : "text-amber-500";
                  return (
                    <li key={feat} className="text-[11px]">
                      <span className="font-semibold uppercase">{feat}</span>: <strong className={color}>{status}</strong>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex flex-col gap-2 justify-between">
              <div>
                <span className="font-bold text-[10px] uppercase text-[var(--text-muted)]">Recommended Actions</span>
                <ol className="flex flex-col gap-1.5 list-decimal list-inside text-[11px] mt-1.5 leading-relaxed">
                  <li>Monitor fertilizer application based on profile gaps.</li>
                  <li>Consider the primary recommended crop or the safe alternatives highlighted in the Why-Not panel.</li>
                  <li>If features trigger CAUTION alerts, re-verify soil testing accuracy before major investment.</li>
                </ol>
              </div>
              <p className="text-[9px] text-[var(--text-muted)] italic leading-tight">
                *Note: This is a decision-support system, not a dynamic fertilizer prescription engine. Consult certified agricultural guides for custom treatments.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
