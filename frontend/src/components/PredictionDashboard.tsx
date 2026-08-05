"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sprout, AlertTriangle, RefreshCw, History, ArrowRight, Trash2, Search } from 'lucide-react';
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

const DIVISIONS = [
  { id: "all", en: "All Divisions", mr: "सर्व विभाग" },
  { id: "Konkan", en: "Konkan Division", mr: "कोकण विभाग" },
  { id: "Pune", en: "Pune Division", mr: "पुणे विभाग" },
  { id: "Nashik", en: "Nashik Division", mr: "नाशिक विभाग" },
  { id: "Aurangabad", en: "Chhatrapati Sambhajinagar Division", mr: "छत्रपती संभाजीनगर विभाग" },
  { id: "Amravati", en: "Amravati Division", mr: "अमरावती विभाग" },
  { id: "Nagpur", en: "Nagpur Division", mr: "नागपूर विभाग" }
];

const DISTRICTS = [
  { name: "Ahmednagar", nameMr: "अहमदनगर", division: "Nashik" },
  { name: "Akola", nameMr: "अकोला", division: "Amravati" },
  { name: "Amravati", nameMr: "अमरावती", division: "Amravati" },
  { name: "Beed", nameMr: "बीड", division: "Aurangabad" },
  { name: "Bhandara", nameMr: "भंडारा", division: "Nagpur" },
  { name: "Buldhana", nameMr: "बुलढाणा", division: "Amravati" },
  { name: "Chandrapur", nameMr: "चंद्रपूर", division: "Nagpur" },
  { name: "Chhatrapati Sambhajinagar", nameMr: "छत्रपती संभाजीनगर", division: "Aurangabad" },
  { name: "Dharashiv", nameMr: "धाराशिव", division: "Aurangabad" },
  { name: "Dhule", nameMr: "धुळे", division: "Nashik" },
  { name: "Gadchiroli", nameMr: "गडचिरोली", division: "Nagpur" },
  { name: "Gondia", nameMr: "गोंदिया", division: "Nagpur" },
  { name: "Hingoli", nameMr: "हिंगोली", division: "Aurangabad" },
  { name: "Jalgaon", nameMr: "जळगाव", division: "Nashik" },
  { name: "Jalna", nameMr: "जालना", division: "Aurangabad" },
  { name: "Kolhapur", nameMr: "कोल्हापूर", division: "Pune" },
  { name: "Latur", nameMr: "लातूर", division: "Aurangabad" },
  { name: "Mumbai City", nameMr: "मुंबई शहर", division: "Konkan" },
  { name: "Mumbai Suburban", nameMr: "मुंबई उपनगर", division: "Konkan" },
  { name: "Nagpur", nameMr: "नागपूर", division: "Nagpur" },
  { name: "Nanded", nameMr: "नांदेड", division: "Aurangabad" },
  { name: "Nandurbar", nameMr: "नंदुरबार", division: "Nashik" },
  { name: "Nashik", nameMr: "नाशिक", division: "Nashik" },
  { name: "Palghar", nameMr: "पालघर", division: "Konkan" },
  { name: "Parbhani", nameMr: "परभणी", division: "Aurangabad" },
  { name: "Pune", nameMr: "पुणे", division: "Pune" },
  { name: "Raigad", nameMr: "रायगड", division: "Konkan" },
  { name: "Ratnagiri", nameMr: "रत्नागिरी", division: "Konkan" },
  { name: "Sangli", nameMr: "सांगली", division: "Pune" },
  { name: "Satara", nameMr: "सातारा", division: "Pune" },
  { name: "Sindhudurg", nameMr: "सिंधुदुर्ग", division: "Konkan" },
  { name: "Solapur", nameMr: "सोलापूर", division: "Pune" },
  { name: "Thane", nameMr: "ठाणे", division: "Konkan" },
  { name: "Wardha", nameMr: "वर्धा", division: "Nagpur" },
  { name: "Washim", nameMr: "वाशीम", division: "Amravati" },
  { name: "Yavatmal", nameMr: "यवतमाळ", division: "Amravati" }
];

export default function PredictionDashboard() {
  const { language } = useLanguageStore();
  const t = TRANSLATIONS[language];

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [historyList, setHistoryList] = useState<any[]>([]);
  const [historySearch, setHistorySearch] = useState('');

  // Dropdown states
  const [division, setDivision] = useState('all');
  const [districtQuery, setDistrictQuery] = useState('');
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);

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
      District: "",
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

  useEffect(() => {
    const isDemo = localStorage.getItem("run_demo");
    if (isDemo === "true") {
      localStorage.removeItem("run_demo");
      setValue("District", "Pune");
      setValue("N", 80);
      setValue("P", 50);
      setValue("K", 120);
      setValue("pH", 6.8);
      setValue("Temperature", 24.5);
      setValue("Humidity", 70.0);
      setValue("Rainfall", 1100.0);
      setTimeout(() => {
        handleSubmit(onSubmit)();
      }, 200);
    }
  }, [setValue]);

  const selectedDistrict = watch("District");
  const watchPH = watch("pH");

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
    setLoading(true);
    setErrorMsg('');
    setResult(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${apiUrl}/api/v1/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      if (!res.ok) {
        throw new Error(`Inference Server responded with code ${res.status}`);
      }
      const data = await res.json();
      setResult(data);

      const newHistoryItem = {
        id: data.prediction_id,
        timestamp: data.timestamp,
        district: values.District,
        top_crop: data.top_recommendations[0].crop,
        confidence: data.top_recommendations[0].confidence,
        payload: values,
        result: data
      };

      const updatedHistory = [newHistoryItem, ...historyList.filter(h => h.id !== data.prediction_id).slice(0, 9)];
      setHistoryList(updatedHistory);
      localStorage.setItem("prediction_history", JSON.stringify(updatedHistory));

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

  // Filtered districts list based on division and search queries
  const filteredDistricts = DISTRICTS.filter(d => {
    const matchesDiv = division === 'all' || d.division === division;
    const matchesQuery = d.name.toLowerCase().includes(districtQuery.toLowerCase()) || 
                         d.nameMr.includes(districtQuery);
    return matchesDiv && matchesQuery;
  });

  const activeDistrictName = DISTRICTS.find(d => d.name === selectedDistrict);
  const displayDistrictLabel = activeDistrictName 
    ? `${activeDistrictName.name} - ${activeDistrictName.nameMr}`
    : (language === 'en' ? 'Select a District' : 'जिल्हा निवडा');

  const filteredHistory = historyList.filter(h => 
    h.top_crop.toLowerCase().includes(historySearch.toLowerCase()) ||
    h.district.toLowerCase().includes(historySearch.toLowerCase())
  );

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
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              
              {/* Division Selector */}
              <div>
                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1.5">
                  {language === 'en' ? 'Administrative Division' : 'प्रशासकीय विभाग'}
                </label>
                <select
                  value={division}
                  onChange={(e) => {
                    setDivision(e.target.value);
                    setDistrictQuery('');
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)] focus:outline-none focus:border-emerald-500 transition"
                >
                  {DIVISIONS.map(div => (
                    <option key={div.id} value={div.id}>
                      {language === 'en' ? div.en : div.mr}
                    </option>
                  ))}
                </select>
              </div>

              {/* District Autocomplete */}
              <div className="relative">
                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1.5">
                  {t.label_district}
                </label>
                <div
                  onClick={() => setShowDistrictDropdown(!showDistrictDropdown)}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)] cursor-pointer flex justify-between items-center"
                >
                  <span>{displayDistrictLabel}</span>
                  <span className="text-[10px] text-emerald-500 font-bold uppercase">{language === 'en' ? 'Change' : 'बदला'}</span>
                </div>

                {showDistrictDropdown && (
                  <div className="absolute left-0 right-0 mt-1.5 p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] shadow-xl z-20 max-h-56 overflow-y-auto">
                    <input
                      type="text"
                      value={districtQuery}
                      onChange={(e) => setDistrictQuery(e.target.value)}
                      placeholder={language === 'en' ? "Search district..." : "जिल्हा शोधा..."}
                      className="w-full px-2.5 py-1.5 rounded bg-[var(--bg-app)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none mb-2"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex flex-col gap-0.5">
                      {filteredDistricts.map(d => (
                        <div
                          key={d.name}
                          onClick={() => {
                            setValue("District", d.name);
                            setShowDistrictDropdown(false);
                          }}
                          className="px-2.5 py-1.5 rounded text-xs hover:bg-[var(--bg-hover)] cursor-pointer text-[var(--text-main)] flex justify-between"
                        >
                          <span>{d.name}</span>
                          <span className="text-[var(--text-muted)]">{d.nameMr}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Soil Color Selector */}
              <div>
                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1.5">
                  {t.label_soil_color}
                </label>
                <select
                  {...register("Soil_Color")}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)] focus:outline-none focus:border-emerald-500 transition"
                >
                  <option value="Black">{language === 'en' ? 'Black Soil - काळी माती' : 'काळी माती'}</option>
                  <option value="Medium Brown">{language === 'en' ? 'Medium Black Soil - मध्यम काळी माती' : 'मध्यम काळी माती'}</option>
                  <option value="Dark Brown">{language === 'en' ? 'Deep Black Soil - खोल काळी माती' : 'खोल काळी माती'}</option>
                  <option value="Red">{language === 'en' ? 'Red Soil - लाल माती' : 'लाल माती'}</option>
                  <option value="Reddish Brown">{language === 'en' ? 'Lateritic Soil - जांभी माती' : 'जांभी माती'}</option>
                  <option value="Light Brown">{language === 'en' ? 'Alluvial Soil - गाळाची माती' : 'गाळाची माती'}</option>
                </select>
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
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">{t.label_p}</label>
                    <input
                      type="number"
                      {...register("P", { valueAsNumber: true })}
                      className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">{t.label_k}</label>
                    <input
                      type="number"
                      {...register("K", { valueAsNumber: true })}
                      className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-app)] text-sm text-[var(--text-main)] focus:outline-none"
                    />
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
                    <span className={`text-xs font-black ${phMeta.color}`}>
                      {phMeta.status} ({watchPH.toFixed(1)})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3.5"
                    max="10.0"
                    step="0.1"
                    {...register("pH", { valueAsNumber: true })}
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

          {/* History tracker */}
          {historyList.length > 0 && (
            <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xs font-extrabold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
                  <History size={14} className="text-emerald-500" /> {t.history_title}
                </h4>
                <button
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
    </div>
  );
}
