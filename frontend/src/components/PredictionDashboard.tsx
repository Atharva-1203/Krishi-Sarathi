"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sprout, AlertTriangle, RefreshCw } from 'lucide-react';
import { useLanguageStore } from '@/store/language';
import { TRANSLATIONS } from '@/store/translations';
import ResultsDisplay from './ResultsDisplay';

const formSchema = z.object({
  District: z.string().min(1, "District is required"),
  Soil_Color: z.string().min(1, "Soil color is required"),
  N: z.number().min(0, "Min Nitrogen is 0").max(300, "Max Nitrogen is 300"),
  P: z.number().min(0, "Min Phosphorus is 0").max(200, "Max Phosphorus is 200"),
  K: z.number().min(0, "Min Potassium is 0").max(500, "Max Potassium is 500"),
  pH: z.number().min(3.5, "Min pH is 3.5").max(10.0, "Max pH is 10.0"),
  Temperature: z.number().min(10, "Min Temp is 10").max(50, "Max Temp is 50"),
  Humidity: z.number().min(10, "Min Humidity is 10").max(100, "Max Humidity is 100"),
  Rainfall: z.number().min(100, "Min Rainfall is 100").max(3000, "Max Rainfall is 3000")
});

export default function PredictionDashboard() {
  const { language } = useLanguageStore();
  const t = TRANSLATIONS[language];
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      District: "Pune",
      Soil_Color: "Black",
      N: 80,
      P: 50,
      K: 120,
      pH: 6.8,
      Temperature: 24.5,
      Humidity: 70.0,
      Rainfall: 1100.0
    }
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    setErrorMsg('');
    setResult(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      if (!res.ok) {
        throw new Error(`Inference Server responded with code ${res.status}`);
      }
      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setErrorMsg(e.message || "Failed to contact crop prediction server.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setErrorMsg('');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">
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
        <div className="lg:col-span-5 p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              {/* District */}
              <div>
                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1.5">
                  {t.label_district}
                </label>
                <select
                  {...register("District")}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)] focus:outline-none focus:border-emerald-500 transition"
                >
                  <option value="Pune">Pune (पुणे)</option>
                  <option value="Kolhapur">Kolhapur (कोल्हापूर)</option>
                  <option value="Satara">Satara (सातारा)</option>
                  <option value="Solapur">Solapur (सोलापूर)</option>
                  <option value="Sangli">Sangli (सांगली)</option>
                </select>
              </div>

              {/* Soil Color */}
              <div>
                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1.5">
                  {t.label_soil_color}
                </label>
                <select
                  {...register("Soil_Color")}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)] focus:outline-none focus:border-emerald-500 transition"
                >
                  <option value="Black">{t.soil_black}</option>
                  <option value="Red">{t.soil_red}</option>
                  <option value="Dark Brown">{t.soil_dark_brown}</option>
                  <option value="Medium Brown">{t.soil_medium_brown}</option>
                  <option value="Light Brown">{t.soil_light_brown}</option>
                  <option value="Reddish Brown">{t.soil_reddish_brown}</option>
                </select>
              </div>
            </div>

            {/* Nutrients N, P, K */}
            <div className="border-t border-[var(--border-color)] pt-4 flex flex-col gap-3">
              <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1 block">
                {language === 'en' ? 'Primary Soil Nutrients (kg/ha)' : 'मृदा पोषकद्रव्ये (किलो/हेक्टर)'}
              </span>
              
              <div className="grid grid-cols-3 gap-3">
                {/* Nitrogen */}
                <div>
                  <label className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">{t.label_n}</label>
                  <input
                    type="number"
                    {...register("N", { valueAsNumber: true })}
                    className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)] focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                {/* Phosphorus */}
                <div>
                  <label className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">{t.label_p}</label>
                  <input
                    type="number"
                    {...register("P", { valueAsNumber: true })}
                    className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)] focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                {/* Potassium */}
                <div>
                  <label className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">{t.label_k}</label>
                  <input
                    type="number"
                    {...register("K", { valueAsNumber: true })}
                    className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)] focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* pH, Temp, Humidity, Rainfall */}
            <div className="border-t border-[var(--border-color)] pt-4 flex flex-col gap-4">
              <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1 block">
                {language === 'en' ? 'Environmental & Climate Parameters' : 'हवामान व भौगोलिक मर्यादा'}
              </span>

              {/* pH Range slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[var(--text-muted)]">{t.label_ph}</label>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                    {language === 'en' ? 'Neutral' : 'तटस्थ'}
                  </span>
                </div>
                <input
                  type="range"
                  min="3.5"
                  max="10.0"
                  step="0.1"
                  {...register("pH", { valueAsNumber: true })}
                  className="w-full h-1.5 bg-[var(--border-color)] rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              {/* Temperature, Humidity, Rainfall Inputs */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">{t.label_temp}</label>
                  <input
                    type="number"
                    step="0.1"
                    {...register("Temperature", { valueAsNumber: true })}
                    className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">{t.label_humidity}</label>
                  <input
                    type="number"
                    {...register("Humidity", { valueAsNumber: true })}
                    className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">{t.label_rainfall}</label>
                  <input
                    type="number"
                    {...register("Rainfall", { valueAsNumber: true })}
                    className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)]"
                  />
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

        {/* Results Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-96 flex flex-col items-center justify-center gap-3 border border-[var(--border-color)] bg-[var(--bg-card)] rounded-2xl shadow-sm"
              >
                <Loader2 size={36} className="text-emerald-500 animate-spin" />
                <h3 className="font-bold text-[var(--text-main)]">
                  {language === 'en' ? 'Inference engine is evaluating parameters' : 'कृत्रिम बुद्धिमत्ता मृदा घटकांचे मोजमाप करत आहे'}
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  {language === 'en' ? 'Applying custom One-Hot transformations & calculating TreeSHAPs...' : 'वन-हॉट रूपांतरणे आणि ट्री-शॅप प्रभाव मूल्य मोजले जात आहेत...'}
                </p>
              </motion.div>
            )}

            {errorMsg && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 text-rose-500 flex flex-col gap-3"
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  <AlertTriangle size={18} /> Prediction failed
                </div>
                <p className="text-xs">{errorMsg}</p>
                <p className="text-[10px] text-rose-400">Make sure that the backend python server is running locally on port 8000.</p>
              </motion.div>
            )}

            {result && !loading && (
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
                    onClick={handleReset}
                    className="text-xs flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
                  >
                    <RefreshCw size={12} /> {t.results_reset}
                  </button>
                </div>
                
                <ResultsDisplay result={result} />
              </motion.div>
            )}

            {!result && !loading && !errorMsg && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-96 flex flex-col items-center justify-center text-center p-8 border border-dashed border-[var(--border-color)] bg-[var(--bg-card)] rounded-2xl"
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
    </div>
  );
}
