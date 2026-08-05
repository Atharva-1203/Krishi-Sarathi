"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sprout, AlertTriangle, RefreshCw } from 'lucide-react';
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
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
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
      // Connect to existing FastAPI backend
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
          Crop Suitability Analysis
        </h2>
        <p className="text-xs text-[var(--text-muted)]">
          Input regional agronomic values to predict optimal crop recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-5 p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              {/* District */}
              <div>
                <label className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1.5">
                  District
                </label>
                <select
                  {...register("District")}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)] focus:outline-none focus:border-emerald-500 transition"
                >
                  <option value="Pune">Pune</option>
                  <option value="Kolhapur">Kolhapur</option>
                  <option value="Satara">Satara</option>
                  <option value="Solapur">Solapur</option>
                  <option value="Sangli">Sangli</option>
                </select>
              </div>

              {/* Soil Color */}
              <div>
                <label className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1.5">
                  Soil Color
                </label>
                <select
                  {...register("Soil_Color")}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)] focus:outline-none focus:border-emerald-500 transition"
                >
                  <option value="Black">Black Soil</option>
                  <option value="Red">Red Soil</option>
                  <option value="Dark Brown">Dark Brown</option>
                  <option value="Medium Brown">Medium Brown</option>
                  <option value="Light Brown">Light Brown</option>
                  <option value="Reddish Brown">Reddish Brown</option>
                </select>
              </div>
            </div>

            {/* Nutrients N, P, K */}
            <div className="border-t border-[var(--border-color)] pt-4 flex flex-col gap-3">
              <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1 block">
                Primary Soil Nutrients (kg/ha)
              </span>
              
              <div className="grid grid-cols-3 gap-3">
                {/* Nitrogen */}
                <div>
                  <label className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">Nitrogen (N)</label>
                  <input
                    type="number"
                    {...register("N", { valueAsNumber: true })}
                    className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)] focus:outline-none focus:border-emerald-500 transition"
                  />
                  {errors.N && <span className="text-[9px] text-rose-500">{errors.N.message}</span>}
                </div>

                {/* Phosphorus */}
                <div>
                  <label className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">Phosphorus (P)</label>
                  <input
                    type="number"
                    {...register("P", { valueAsNumber: true })}
                    className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)] focus:outline-none focus:border-emerald-500 transition"
                  />
                  {errors.P && <span className="text-[9px] text-rose-500">{errors.P.message}</span>}
                </div>

                {/* Potassium */}
                <div>
                  <label className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">Potassium (K)</label>
                  <input
                    type="number"
                    {...register("K", { valueAsNumber: true })}
                    className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)] focus:outline-none focus:border-emerald-500 transition"
                  />
                  {errors.K && <span className="text-[9px] text-rose-500">{errors.K.message}</span>}
                </div>
              </div>
            </div>

            {/* pH, Temp, Humidity, Rainfall */}
            <div className="border-t border-[var(--border-color)] pt-4 flex flex-col gap-4">
              <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1 block">
                Environmental & Climate parameters
              </span>

              {/* pH Range slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[var(--text-muted)]">Soil pH</label>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">Neutral</span>
                </div>
                <input
                  type="range"
                  min="3.5"
                  max="10.0"
                  step="0.1"
                  {...register("pH", { valueAsNumber: true })}
                  className="w-full h-1.5 bg-[var(--border-color)] rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                {errors.pH && <span className="text-[9px] text-rose-500">{errors.pH.message}</span>}
              </div>

              {/* Temperature, Humidity, Rainfall Inputs */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">Temp (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    {...register("Temperature", { valueAsNumber: true })}
                    className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">Humidity (%)</label>
                  <input
                    type="number"
                    {...register("Humidity", { valueAsNumber: true })}
                    className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">Rainfall (mm)</label>
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
                  <Loader2 size={16} className="animate-spin" /> Running ML Engine...
                </>
              ) : (
                <>
                  <Sprout size={16} /> Predict Optimal Crops
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
                <h3 className="font-bold text-[var(--text-main)]">Inference engine is evaluating parameters</h3>
                <p className="text-xs text-[var(--text-muted)]">Applying custom One-Hot transformations & calculating TreeSHAPs...</p>
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
                  <h3 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    Suitability Results
                  </h3>
                  <button
                    onClick={handleReset}
                    className="text-xs flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
                  >
                    <RefreshCw size={12} /> Analyze Another Soil
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
                <h3 className="font-bold text-[var(--text-main)] mb-1">No suitabilities mapped yet</h3>
                <p className="text-xs text-[var(--text-muted)] max-w-sm">
                  Fill in the Nitrogen, Phosphorus, Potassium and pH fields, and click optimal prediction to trigger the ML pipeline.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
