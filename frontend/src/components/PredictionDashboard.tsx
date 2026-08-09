"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sprout, AlertTriangle, RefreshCw, History, ArrowRight, Trash2, Search, Mic, MicOff } from 'lucide-react';
import { useLanguageStore } from '@/store/language';
import { TRANSLATIONS } from '@/store/translations';
import ResultsDisplay from './ResultsDisplay';
import CropExplorer from './CropExplorer';
import ModelTransparency from './ModelTransparency';

const formSchema = z.object({
  N: z.number({ message: "Must be a number" }).min(0, "Nitrogen cannot be negative").max(1000, "Nitrogen exceeds physical limit (max 1000 kg/ha)"),
  P: z.number({ message: "Must be a number" }).min(0, "Phosphorus cannot be negative").max(1000, "Phosphorus exceeds physical limit (max 1000 kg/ha)"),
  K: z.number({ message: "Must be a number" }).min(0, "Potassium cannot be negative").max(1000, "Potassium exceeds physical limit (max 1000 kg/ha)"),
  ph: z.number({ message: "Must be a number" }).min(0.0, "pH must be at least 0.0").max(14.0, "pH cannot exceed 14.0"),
  temperature: z.number({ message: "Must be a number" }).min(-20.0, "Temperature too low (min -20°C)").max(60.0, "Temperature too high (max 60°C)"),
  humidity: z.number({ message: "Must be a number" }).min(0, "Humidity must be at least 0%").max(100, "Humidity cannot exceed 100%"),
  rainfall: z.number({ message: "Must be a number" }).min(0, "Rainfall cannot be negative").max(5000, "Rainfall exceeds physical limit (max 5000 mm)")
});

type PredictionState =
  | "idle"
  | "validating"
  | "loading"
  | "success"
  | "validation_error"
  | "out_of_scope"
  | "server_error"
  | "network_error"
  | "timeout";

export default function PredictionDashboard() {
  const { language } = useLanguageStore();
  const t = TRANSLATIONS[language];

  const [predictionState, setPredictionState] = useState<PredictionState>("idle");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [outOfScopeData, setOutOfScopeData] = useState<any>(null);
  const [backendValidationErrors, setBackendValidationErrors] = useState<any>(null);
  const [historyList, setHistoryList] = useState<any[]>([]);
  const [historySearch, setHistorySearch] = useState('');
  const [activeTab, setActiveTab] = useState<'predict' | 'explorer' | 'transparency'>('predict');
  const [modelMetadata, setModelMetadata] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");

  const parseAgronomicSpeech = (text: string) => {
    const normalized = text.toLowerCase();
    const findNumberAfter = (keywords: string[]) => {
      for (const kw of keywords) {
        const idx = normalized.indexOf(kw);
        if (idx !== -1) {
          const sub = normalized.substring(idx + kw.length);
          const match = sub.match(/\d+(\.\d+)?/);
          if (match) {
            return parseFloat(match[0]);
          }
        }
      }
      return undefined;
    };

    return {
      N: findNumberAfter(["nitrogen", "n", "नत्र", "युरिया"]),
      P: findNumberAfter(["phosphorus", "p", "स्फुरद", "फॉस्फरस"]),
      K: findNumberAfter(["potassium", "k", "पालाश", "पोटॅशियम"]),
      ph: findNumberAfter(["ph", "सामू", "पीएच", "पोटेंशियल"]),
      temperature: findNumberAfter(["temp", "temperature", "तापमान", "तपमान"]),
      humidity: findNumberAfter(["humidity", "आद्रता", "दमटपणा", "ह्युमिडिटी"]),
      rainfall: findNumberAfter(["rain", "rainfall", "पाऊस", "रेनफॉल"])
    };
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(language === 'en' 
        ? "Browser speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari."
        : "तुमच्या ब्राउझरमध्ये स्पीच रेकग्निशन सपोर्ट नाही. कृपया गुगल क्रोम किंवा मायक्रोसॉफ्ट एज वापरा.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = language === 'mr' ? 'mr-IN' : 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceText("");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (e: any) => {
      console.error(e);
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setVoiceText(text);
      
      const parsedValues = parseAgronomicSpeech(text);
      
      if (parsedValues.N !== undefined) setValue("N", parsedValues.N);
      if (parsedValues.P !== undefined) setValue("P", parsedValues.P);
      if (parsedValues.K !== undefined) setValue("K", parsedValues.K);
      if (parsedValues.ph !== undefined) setValue("ph", parsedValues.ph);
      if (parsedValues.temperature !== undefined) setValue("temperature", parsedValues.temperature);
      if (parsedValues.humidity !== undefined) setValue("humidity", parsedValues.humidity);
      if (parsedValues.rainfall !== undefined) setValue("rainfall", parsedValues.rainfall);
    };

    recognition.start();
  };

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${apiUrl}/api/v3/model`);
        if (res.ok) {
          const data = await res.json();
          setModelMetadata(data);
        }
      } catch (err) {
        console.error("Failed to load V3.1 metadata in dashboard", err);
      }
    };
    fetchModel();
  }, []);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem("prediction_history");
    if (saved) {
      try {
        setHistoryList(JSON.parse(saved));
      } catch {
        setHistoryList([]);
      }
    }
  }, []);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      N: 80,
      P: 50,
      K: 50,
      ph: 6.5,
      temperature: 25.0,
      humidity: 70.0,
      rainfall: 150.0
    }
  });

  useEffect(() => {
    const isDemo = localStorage.getItem("run_demo");
    if (isDemo === "true") {
      localStorage.removeItem("run_demo");
      setValue("N", 80);
      setValue("P", 50);
      setValue("K", 50);
      setValue("ph", 6.5);
      setValue("temperature", 25.0);
      setValue("humidity", 70.0);
      setValue("rainfall", 150.0);
      setTimeout(() => {
        handleSubmit(onSubmit)();
      }, 200);
    }
  }, [setValue]);

  const watchPH = watch("ph") ?? 6.5;
  const watchN = watch("N");
  const watchP = watch("P");
  const watchK = watch("K");
  const watchTemp = watch("temperature");
  const watchHumidity = watch("humidity");
  const watchRainfall = watch("rainfall");

  const getFieldWarning = (field: string, val: number | undefined) => {
    if (val === undefined || isNaN(val)) return null;
    const bounds = modelMetadata?.model_metadata?.feature_bounds?.[field];
    if (!bounds) return null;
    if (val < bounds.min || val > bounds.max) {
      return language === 'en'
        ? `⚠ Out of range (${bounds.min.toFixed(0)}-${bounds.max.toFixed(0)})`
        : `⚠ मर्यादेबाहेर (${bounds.min.toFixed(0)}-${bounds.max.toFixed(0)})`;
    }
    return null;
  };

  // Determine pH visual metadata
  const getPHStatus = (val: number) => {
    if (val < 5.5) return { status: language === 'en' ? 'Strongly Acidic' : 'अति आम्लधर्मी', color: 'text-red-500', note: language === 'en' ? 'Poor for sensitive crops' : 'नाजूक पिकांसाठी अयोग्य' };
    if (val < 6.5) return { status: language === 'en' ? 'Slightly Acidic' : 'किंचित आम्लधर्मी', color: 'text-orange-500', note: language === 'en' ? 'Ideal for tea & potato' : 'बटाटा पिकांसाठी चांगले' };
    if (val <= 7.5) return { status: language === 'en' ? 'Neutral' : 'तटस्थ', color: 'text-emerald-500', note: language === 'en' ? 'Ideal for Soybean & Wheat' : 'सोयाबीन आणि गव्हासाठी उत्तम' };
    if (val < 8.5) return { status: language === 'en' ? 'Slightly Alkaline' : 'किंचित विम्लधर्मी', color: 'text-orange-400', note: language === 'en' ? 'Suitable for Cotton & Jowar' : 'कापूस व ज्वारीसाठी योग्य' };
    return { status: language === 'en' ? 'Strongly Alkaline' : 'अति विम्लधर्मी', color: 'text-red-400', note: language === 'en' ? 'Restricts nutrient uptake' : 'पोषकद्रव्ये शोषण्यास अडथळा' };
  };

  const phMeta = getPHStatus(watchPH);

  const onSubmit = async (values: any) => {
    setPredictionState("loading");
    setLoading(true);
    setErrorMsg('');
    setResult(null);
    setOutOfScopeData(null);
    setBackendValidationErrors(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 12000); // 12 seconds request timeout

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      
      const res = await fetch(`${apiUrl}/api/v3/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (res.status === 200) {
        const data = await res.json();
        setResult(data);
        setPredictionState("success");

        // Save history
        const predictionId = Math.random().toString(36).substr(2, 9);
        const newHistoryItem = {
          id: predictionId,
          timestamp: new Date().toISOString(),
          district: `N:${values.N} P:${values.P} K:${values.K}`,
          top_crop: data.top_recommendations[0].crop,
          confidence: `${(data.top_recommendations[0].probability * 100).toFixed(1)}%`,
          payload: values,
          result: data
        };

        const updatedHistory = [newHistoryItem, ...historyList.filter(h => h.id !== predictionId).slice(0, 9)];
        setHistoryList(updatedHistory);
        localStorage.setItem("prediction_history", JSON.stringify(updatedHistory));
      } else if (res.status === 422) {
        const data = await res.json();
        if (data.status === "out_of_scope") {
          setOutOfScopeData(data);
          setPredictionState("out_of_scope");
        } else {
          setBackendValidationErrors(data.field_errors);
          setPredictionState("validation_error");
        }
      } else {
        setPredictionState("server_error");
        setErrorMsg(language === 'en'
          ? `Prediction engine error (HTTP ${res.status})`
          : `पूर्वानुमान इंजिन त्रुटी (HTTP ${res.status})`);
      }
    } catch (e: any) {
      clearTimeout(timeoutId);
      if (e.name === 'AbortError') {
        setPredictionState("timeout");
        setErrorMsg(language === 'en'
          ? "Prediction request timed out. Please try again."
          : "पूर्वानुमान विनंतीची वेळ संपली. कृपया पुन्हा प्रयत्न करा.");
      } else {
        setPredictionState("network_error");
        setErrorMsg(e.message || "Failed to contact crop prediction server.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setErrorMsg('');
    setPredictionState("idle");
    setOutOfScopeData(null);
    setBackendValidationErrors(null);
  };

  const handleLoadHistory = (item: any) => {
    Object.keys(item.payload).forEach((key) => {
      setValue(key as any, item.payload[key]);
    });
    setResult(item.result);
    setErrorMsg('');
  };

  const handleDeleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = historyList.filter(h => h.id !== id);
    setHistoryList(updated);
    localStorage.setItem("prediction_history", JSON.stringify(updated));
  };

  const handleClearAllHistory = () => {
    setHistoryList([]);
    localStorage.removeItem("prediction_history");
  };

  const filteredHistory = historyList.filter(h => 
    h.top_crop.toLowerCase().includes(historySearch.toLowerCase()) ||
    h.district.toLowerCase().includes(historySearch.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">
      
      {/* Sub-tab navigation bar */}
      <div className="flex border-b border-[var(--border-color)] gap-6 text-sm font-bold pb-2 mb-2">
        <button
          type="button"
          onClick={() => setActiveTab('predict')}
          className={`pb-1 cursor-pointer transition ${activeTab === 'predict' ? "text-emerald-500 border-b-2 border-emerald-500" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"}`}
        >
          {language === 'en' ? "AI Crop Predictor" : "एआय पीक शिफारस"}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('explorer')}
          className={`pb-1 cursor-pointer transition ${activeTab === 'explorer' ? "text-emerald-500 border-b-2 border-emerald-500" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"}`}
        >
          {language === 'en' ? "Crop Profile Explorer" : "पीक माहिती निर्देशिका"}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('transparency')}
          className={`pb-1 cursor-pointer transition ${activeTab === 'transparency' ? "text-emerald-500 border-b-2 border-emerald-500" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"}`}
        >
          {language === 'en' ? "How the AI Works" : "कार्यप्रणाली पारदर्शकता"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'predict' && (
          <motion.div
            key="predict"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-1.5">
              <h2 className="text-2xl font-bold tracking-tight text-[var(--text-main)]">
                {t.form_title}
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                {t.form_subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Column */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm">
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    
                    {/* Voice Input Integration */}
                    <div className="flex flex-col gap-2 p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-xl text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-800 dark:text-emerald-300">
                          {language === 'en' ? "Voice Assistant (Speech-to-Text)" : "आवाज शिफारस साहाय्यक"}
                        </span>
                        <button
                          type="button"
                          onClick={handleVoiceInput}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${isListening ? "bg-red-500 hover:bg-red-600 text-white animate-pulse" : "bg-emerald-600 hover:bg-emerald-700 text-white"}`}
                        >
                          {isListening ? (
                            <>
                              <MicOff size={13} />
                              {language === 'en' ? "Listening..." : "ऐकत आहे..."}
                            </>
                          ) : (
                            <>
                              <Mic size={13} />
                              {language === 'en' ? "Speak Input" : "बोला"}
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-[10px] text-emerald-700/80 dark:text-emerald-400/80 leading-normal">
                        {language === 'en' 
                          ? 'Speak like: "Nitrogen 80, Phosphorus 50, Potassium 50, Temperature 25, Humidity 70, pH 6.5, Rainfall 150"'
                          : 'याप्रमाणे बोला: "नत्र ८०, स्फुरद ५०, पालाश ५०, तापमान २५, आद्रता ७०, पीएच ६.५, पाऊस १५०"'}
                      </p>
                      {voiceText && (
                        <div className="mt-1 p-2 bg-white/70 dark:bg-black/20 rounded border border-emerald-100 dark:border-emerald-900/30 text-[11px] font-medium italic text-[var(--text-main)]">
                          "{voiceText}"
                        </div>
                      )}
                    </div>
                    
                    {/* Nutrients N, P, K */}
                    <div className="border-t border-[var(--border-color)] pt-4 flex flex-col gap-3">
                      <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1 block">
                        {language === 'en' ? 'Primary Soil Nutrients (kg/ha)' : 'मृदा पोषकद्रव्ये (किलो/हेक्टर)'}
                      </span>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">{t.label_n}</label>
                          <input
                            type="number"
                            {...register("N", { valueAsNumber: true })}
                            className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)] focus:outline-none"
                          />
                          {getFieldWarning("N", watchN) && (
                            <span className="text-[8px] text-amber-500 font-semibold block mt-0.5 leading-tight">
                              {getFieldWarning("N", watchN)}
                            </span>
                          )}
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">{t.label_p}</label>
                          <input
                            type="number"
                            {...register("P", { valueAsNumber: true })}
                            className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)] focus:outline-none"
                          />
                          {getFieldWarning("P", watchP) && (
                            <span className="text-[8px] text-amber-500 font-semibold block mt-0.5 leading-tight">
                              {getFieldWarning("P", watchP)}
                            </span>
                          )}
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">{t.label_k}</label>
                          <input
                            type="number"
                            {...register("K", { valueAsNumber: true })}
                            className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)] focus:outline-none"
                          />
                          {getFieldWarning("K", watchK) && (
                            <span className="text-[8px] text-amber-500 font-semibold block mt-0.5 leading-tight">
                              {getFieldWarning("K", watchK)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* pH, Temp, Humidity, Rainfall */}
                    <div className="border-t border-[var(--border-color)] pt-4 flex flex-col gap-4">
                      <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1 block">
                        {language === 'en' ? 'Environmental & Climate Parameters' : 'हवामान व भौगोलिक मर्यादा'}
                      </span>

                      {/* pH Slider with color-coded info */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-bold text-[var(--text-muted)]">{t.label_ph}</label>
                          <span className={`text-xs font-black ${getFieldWarning("ph", watchPH) ? 'text-amber-500' : phMeta.color}`}>
                            {getFieldWarning("ph", watchPH) ? getFieldWarning("ph", watchPH) : `${phMeta.status} (${watchPH.toFixed(1)})`}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0.0"
                          max="14.0"
                          step="0.1"
                          {...register("ph", { valueAsNumber: true })}
                          className="w-full h-1.5 bg-[var(--border-color)] rounded-lg appearance-none cursor-pointer accent-emerald-600 mb-1"
                        />
                        <div className="flex justify-between text-[9px] text-[var(--text-muted)] uppercase tracking-wider">
                          <span>{language === 'en' ? 'Acidic' : 'आम्लयुक्त'}</span>
                          <span>{phMeta.note}</span>
                          <span>{language === 'en' ? 'Alkaline' : 'विम्लधर्मी'}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">{t.label_temp}</label>
                          <input
                            type="number"
                            step="0.1"
                            {...register("temperature", { valueAsNumber: true })}
                            className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)]"
                          />
                          {getFieldWarning("temperature", watchTemp) && (
                            <span className="text-[8px] text-amber-500 font-semibold block mt-0.5 leading-tight">
                              {getFieldWarning("temperature", watchTemp)}
                            </span>
                          )}
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">{t.label_humidity}</label>
                          <input
                            type="number"
                            {...register("humidity", { valueAsNumber: true })}
                            className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)]"
                          />
                          {getFieldWarning("humidity", watchHumidity) && (
                            <span className="text-[8px] text-amber-500 font-semibold block mt-0.5 leading-tight">
                              {getFieldWarning("humidity", watchHumidity)}
                            </span>
                          )}
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">{t.label_rainfall}</label>
                          <input
                            type="number"
                            {...register("rainfall", { valueAsNumber: true })}
                            className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)]"
                          />
                          {getFieldWarning("rainfall", watchRainfall) && (
                            <span className="text-[8px] text-amber-500 font-semibold block mt-0.5 leading-tight">
                              {getFieldWarning("rainfall", watchRainfall)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-md shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer hover:shadow-emerald-500/25 transition disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> {t.btn_predict_loading}
                        </>
                      ) : (
                        <>
                          <Sprout size={16} /> {t.btn_predict}
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* History tracker */}
                {historyList.length > 0 && (
                  <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs font-extrabold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
                        <History size={14} className="text-emerald-500" /> {t.history_title}
                      </h4>
                      <button
                        type="button"
                        onClick={handleClearAllHistory}
                        className="text-[10px] font-bold text-rose-500 hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <Trash2 size={10} /> {language === 'en' ? 'Clear All' : 'सर्व मिटवा'}
                      </button>
                    </div>

                    <div className="relative mb-3">
                      <input
                        type="text"
                        value={historySearch}
                        onChange={(e) => setHistorySearch(e.target.value)}
                        placeholder={language === 'en' ? "Search history..." : "इतिहास शोधा..."}
                        className="w-full px-2.5 py-1.5 pl-8 rounded-lg bg-[var(--bg-app)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none"
                      />
                      <Search size={12} className="absolute left-2.5 top-2.5 text-[var(--text-muted)]" />
                    </div>

                    <div className="flex flex-col gap-2.5 max-h-60 overflow-y-auto">
                      {filteredHistory.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleLoadHistory(item)}
                          className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-app)] text-xs cursor-pointer hover:bg-[var(--bg-hover)] transition"
                        >
                          <div>
                            <span className="font-bold text-[var(--text-main)]">{item.top_crop}</span>
                            <span className="text-[var(--text-muted)] block text-[10px]">{item.district} | {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => handleDeleteHistoryItem(item.id, e)}
                              className="p-1 rounded hover:bg-rose-500/10 text-[var(--text-muted)] hover:text-rose-500 transition"
                            >
                              <Trash2 size={12} />
                            </button>
                            <ArrowRight size={12} className="text-[var(--text-muted)]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Results Column */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <AnimatePresence mode="wait">
                  {predictionState === "loading" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-96 flex flex-col items-center justify-center gap-3 border border-[var(--border-color)] bg-[var(--bg-card)] rounded-2xl shadow-sm"
                    >
                      <Loader2 size={36} className="text-emerald-500 animate-spin" />
                      <h3 className="font-bold text-[var(--text-main)]">
                        {language === 'en' ? 'Evaluating soil parameters...' : 'कृत्रिम बुद्धिमत्ता मृदा घटकांचे मोजमाप करत आहे...'}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)]">
                        {language === 'en' ? 'Ingesting contract features & measuring profile matching distances...' : 'घटकांचे सांख्यिकीय साम्य मोजले जात आहे...'}
                      </p>
                    </motion.div>
                  )}

                  {predictionState === "out_of_scope" && outOfScopeData && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex flex-col gap-4 shadow-sm"
                    >
                      <div className="flex items-center gap-2.5 font-bold text-amber-600 dark:text-amber-400 text-sm">
                        <AlertTriangle size={18} />
                        {language === 'en' ? 'Input Outside Prediction Scope' : 'मृदा घटक अंदाज मर्यादेबाहेर'}
                      </div>
                      
                      <p className="text-xs text-[var(--text-main)] leading-relaxed">
                        {language === 'en' 
                          ? 'The prediction engine cannot reliably evaluate this combination of agricultural parameters.'
                          : 'अंदाज प्रणाली या मृदा व हवामान घटकांच्या जोडणीचे अचूक मूल्यांकन करू शकत नाही.'}
                      </p>
                      
                      <div className="bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl p-4 flex flex-col gap-2">
                        <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider block">
                          {language === 'en' ? 'Out-of-Scope Parameters' : 'मर्यादेबाहेर असणारे घटक'}
                        </span>
                        {outOfScopeData.field_errors?.map((err: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-center text-xs border-b border-[var(--border-color)] last:border-b-0 py-1.5">
                            <span className="font-bold text-[var(--text-main)]">{err.field}</span>
                            <span className="text-[var(--text-muted)]">
                              {language === 'en' 
                                ? `Entered: ${err.value} | Range: ${err.supported_min} - ${err.supported_max}`
                                : `दाखल: ${err.value} | मर्यादा: ${err.supported_min} - ${err.supported_max}`}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="text-xs text-[var(--text-muted)] leading-relaxed">
                        <h5 className="font-bold text-[var(--text-main)] mb-1">
                          {language === 'en' ? 'Why is this restricted?' : 'हे का मर्यादित आहे?'}
                        </h5>
                        {language === 'en'
                          ? 'The machine learning model is trained on a crop dataset restricted to the bounds shown above. Extrapolating predictions outside this range could yield misleading or agronomically invalid recommendations.'
                          : 'मशीन लर्निंग मॉडेल वरील मर्यादांमध्ये प्रशिक्षित केले गेले आहे. या मर्यादेबाहेर अंदाज लावल्यास चुकीच्या किंवा चुकीच्या कृषी शिफारसी मिळू शकतात.'}
                      </div>

                      <div className="flex gap-3 mt-2">
                        <button
                          type="button"
                          onClick={handleReset}
                          className="px-4 py-2 rounded-lg bg-[var(--border-color)] hover:bg-[var(--bg-hover)] text-xs font-bold text-[var(--text-main)] transition cursor-pointer"
                        >
                          {language === 'en' ? '← Edit Inputs' : '← घटक बदला'}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {predictionState === "validation_error" && backendValidationErrors && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 text-rose-500 flex flex-col gap-4 shadow-sm"
                    >
                      <div className="flex items-center gap-2.5 font-bold text-sm">
                        <AlertTriangle size={18} />
                        {language === 'en' ? 'Please Correct Inputs' : 'कृपया घटक दुरुस्त करा'}
                      </div>
                      
                      <div className="bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl p-4 flex flex-col gap-2">
                        {Object.entries(backendValidationErrors).map(([field, msg]: any, idx) => (
                          <div key={idx} className="flex justify-between items-start text-xs border-b border-[var(--border-color)] last:border-b-0 py-1.5">
                            <span className="font-bold text-[var(--text-main)]">{field}</span>
                            <span className="text-rose-500 text-right">{msg}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3 mt-2">
                        <button
                          type="button"
                          onClick={handleReset}
                          className="px-4 py-2 rounded-lg bg-[var(--border-color)] hover:bg-[var(--bg-hover)] text-xs font-bold text-[var(--text-main)] transition cursor-pointer"
                        >
                          {language === 'en' ? '← Edit Inputs' : '← घटक बदला'}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {["server_error", "network_error", "timeout"].includes(predictionState) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 text-rose-500 flex flex-col gap-4 shadow-sm"
                    >
                      <div className="flex items-center gap-2.5 font-bold text-sm">
                        <AlertTriangle size={18} />
                        {predictionState === "timeout"
                          ? (language === 'en' ? 'Request Timed Out' : 'विनंतीची वेळ संपली')
                          : (language === 'en' ? 'Prediction Failed' : 'शिफारस अयशस्वी')}
                      </div>
                      <p className="text-xs text-[var(--text-main)] leading-relaxed">
                        {errorMsg}
                      </p>
                      <div className="flex gap-3 mt-2">
                        <button
                          type="button"
                          onClick={handleReset}
                          className="px-4 py-2 rounded-lg bg-[var(--border-color)] hover:bg-[var(--bg-hover)] text-xs font-bold text-[var(--text-main)] transition cursor-pointer"
                        >
                          {language === 'en' ? '← Edit Inputs' : '← घटक बदला'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSubmit(onSubmit)()}
                          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
                        >
                          {language === 'en' ? 'Try Again' : 'पुन्हा प्रयत्न करा'}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {predictionState === "success" && result && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col gap-6"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                          {t.results_title}
                        </h3>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="text-xs flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
                        >
                          <RefreshCw size={12} /> {t.results_reset}
                        </button>
                      </div>
                      
                      <ResultsDisplay result={result} />
                    </motion.div>
                  )}

                  {predictionState === "idle" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-full h-96 flex flex-col items-center justify-center text-center p-8 border border-dashed border-[var(--border-color)] bg-[var(--bg-card)] rounded-2xl shadow-sm"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                        <Sprout size={24} />
                      </div>
                      <h3 className="font-bold text-[var(--text-main)] mb-1">
                        {language === 'en' ? 'No suitabilities mapped yet' : 'अद्याप कोणतेही विश्लेषण केलेले नाही'}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] max-w-sm">
                        {language === 'en' 
                          ? 'Fill in the Nitrogen, Phosphorus, Potassium and pH fields, and click optimal prediction to trigger the ML pipeline.'
                          : 'नायट्रोजन, फॉस्फरस, पोटॅश आणि जमिनीचा पीएच मूल्य भरा, आणि पीक शिफारस मिळवण्यासाठी बटणावर क्लिक करा.'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'explorer' && (
          <motion.div
            key="explorer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <CropExplorer 
              cropMetadata={modelMetadata?.crop_metadata || []} 
              cropProfiles={modelMetadata?.crop_profiles || {}} 
              currentField={watch()} 
            />
          </motion.div>
        )}

        {activeTab === 'transparency' && (
          <motion.div
            key="transparency"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <ModelTransparency />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
