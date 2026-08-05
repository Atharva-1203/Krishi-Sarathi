"use client";

import { useState } from 'react';
import { Map, Info, CloudRain, Droplet, Sprout, Sprout as Leaf } from 'lucide-react';

interface DistrictData {
  name: string;
  rainfall: string;
  soil: string;
  crops: string[];
  oc: string;
  ph: string;
}

const DISTRICT_DATA: Record<string, DistrictData> = {
  Pune: {
    name: "Pune District",
    rainfall: "980 mm",
    soil: "Medium Brown Clay",
    crops: ["Sugarcane", "Wheat", "Jowar", "Onion"],
    oc: "0.62% (Moderate)",
    ph: "7.1"
  },
  Kolhapur: {
    name: "Kolhapur District",
    rainfall: "1890 mm",
    soil: "Deep Red Clay & Laterite",
    crops: ["Sugarcane", "Rice", "Turmeric", "Groundnut"],
    oc: "0.78% (High)",
    ph: "6.5"
  },
  Satara: {
    name: "Satara District",
    rainfall: "1050 mm",
    soil: "Black Cotton Soil",
    crops: ["Sugarcane", "Ginger", "Gram", "Sorghum"],
    oc: "0.65% (Moderate)",
    ph: "7.3"
  },
  Solapur: {
    name: "Solapur District",
    rainfall: "580 mm",
    soil: "Shallow Light Brown Sandy",
    crops: ["Jowar", "Pomegranate", "Gram", "Maize"],
    oc: "0.45% (Low)",
    ph: "8.1"
  },
  Sangli: {
    name: "Sangli District",
    rainfall: "690 mm",
    soil: "Medium Black Fertile",
    crops: ["Grapes", "Sugarcane", "Soyabean", "Turmeric"],
    oc: "0.68% (Moderate)",
    ph: "7.4"
  }
};

export default function InsightsPage() {
  const [selected, setSelected] = useState<string>("Pune");
  const data = DISTRICT_DATA[selected];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-main)]">
          Maharashtra Regional Insights
        </h2>
        <p className="text-xs text-[var(--text-muted)]">
          Interactive map selector of the Pune Division agricultural databases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* SVG Map visual column */}
        <div className="md:col-span-6 p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col items-center justify-center shadow-sm min-h-[350px]">
          <h4 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-6">
            Western Maharashtra SVG Interactive Selector
          </h4>
          
          <svg viewBox="0 0 400 400" className="w-[300px] h-[300px] drop-shadow-lg">
            {/* Pune Polygon */}
            <path
              d="M100,50 L200,80 L180,180 L120,160 Z"
              onClick={() => setSelected("Pune")}
              className={`cursor-pointer transition-all duration-300 stroke-[var(--border-color)] stroke-2 ${
                selected === "Pune" ? "fill-emerald-500/40 dark:fill-emerald-500/25 stroke-emerald-500" : "fill-emerald-500/10 hover:fill-emerald-500/20"
              }`}
            />
            <text x="140" y="115" className="fill-[var(--text-main)] text-[10px] font-bold pointer-events-none">Pune</text>

            {/* Solapur Polygon */}
            <path
              d="M200,80 L350,150 L280,260 L180,180 Z"
              onClick={() => setSelected("Solapur")}
              className={`cursor-pointer transition-all duration-300 stroke-[var(--border-color)] stroke-2 ${
                selected === "Solapur" ? "fill-emerald-500/40 dark:fill-emerald-500/25 stroke-emerald-500" : "fill-emerald-500/10 hover:fill-emerald-500/20"
              }`}
            />
            <text x="250" y="170" className="fill-[var(--text-main)] text-[10px] font-bold pointer-events-none">Solapur</text>

            {/* Satara Polygon */}
            <path
              d="M120,160 L180,180 L150,260 L90,240 Z"
              onClick={() => setSelected("Satara")}
              className={`cursor-pointer transition-all duration-300 stroke-[var(--border-color)] stroke-2 ${
                selected === "Satara" ? "fill-emerald-500/40 dark:fill-emerald-500/25 stroke-emerald-500" : "fill-emerald-500/10 hover:fill-emerald-500/20"
              }`}
            />
            <text x="120" y="215" className="fill-[var(--text-main)] text-[10px] font-bold pointer-events-none">Satara</text>

            {/* Sangli Polygon */}
            <path
              d="M150,260 L280,260 L230,330 L160,320 Z"
              onClick={() => setSelected("Sangli")}
              className={`cursor-pointer transition-all duration-300 stroke-[var(--border-color)] stroke-2 ${
                selected === "Sangli" ? "fill-emerald-500/40 dark:fill-emerald-500/25 stroke-emerald-500" : "fill-emerald-500/10 hover:fill-emerald-500/20"
              }`}
            />
            <text x="200" y="295" className="fill-[var(--text-main)] text-[10px] font-bold pointer-events-none">Sangli</text>

            {/* Kolhapur Polygon */}
            <path
              d="M90,240 L150,260 L160,320 L110,360 L70,300 Z"
              onClick={() => setSelected("Kolhapur")}
              className={`cursor-pointer transition-all duration-300 stroke-[var(--border-color)] stroke-2 ${
                selected === "Kolhapur" ? "fill-emerald-500/40 dark:fill-emerald-500/25 stroke-emerald-500" : "fill-emerald-500/10 hover:fill-emerald-500/20"
              }`}
            />
            <text x="100" y="300" className="fill-[var(--text-main)] text-[10px] font-bold pointer-events-none">Kolhapur</text>
          </svg>
          
          <span className="text-[9px] text-[var(--text-muted)] italic mt-4">
            Click on any district polygon to filter the details.
          </span>
        </div>

        {/* Detailed Agronomy stats info column */}
        <div className="md:col-span-6 flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm">
            <h3 className="text-xl font-black text-emerald-600 dark:text-emerald-400">
              {data.name}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {/* Rainfall */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <CloudRain size={18} />
                </div>
                <div>
                  <span className="text-[9px] text-[var(--text-muted)] uppercase block">Normal Rainfall</span>
                  <span className="text-xs font-bold text-[var(--text-main)]">{data.rainfall}</span>
                </div>
              </div>

              {/* Soil */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Droplet size={18} />
                </div>
                <div>
                  <span className="text-[9px] text-[var(--text-muted)] uppercase block">Predominant Soil</span>
                  <span className="text-xs font-bold text-[var(--text-main)]">{data.soil}</span>
                </div>
              </div>

              {/* pH */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Info size={18} />
                </div>
                <div>
                  <span className="text-[9px] text-[var(--text-muted)] uppercase block">Typical Soil pH</span>
                  <span className="text-xs font-bold text-[var(--text-main)]">{data.ph}</span>
                </div>
              </div>

              {/* Organic Carbon */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <Leaf size={18} />
                </div>
                <div>
                  <span className="text-[9px] text-[var(--text-muted)] uppercase block">Organic Carbon</span>
                  <span className="text-xs font-bold text-[var(--text-main)]">{data.oc}</span>
                </div>
              </div>
            </div>

            {/* Historical Crops */}
            <div className="border-t border-[var(--border-color)] pt-4 mt-6">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2.5 block">
                Primary Crops in District Database
              </span>
              <div className="flex flex-wrap gap-2">
                {data.crops.map((c, idx) => (
                  <span key={idx} className="text-xs font-semibold px-2.5 py-1 rounded bg-[var(--bg-app)] text-[var(--text-main)] border border-[var(--border-color)]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
