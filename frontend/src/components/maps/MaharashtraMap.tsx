"use client";

import { useEffect, useState, useRef } from 'react';
import DistrictTooltip from './DistrictTooltip';
import ZoomControls from './ZoomControls';
import SearchDistrict from './SearchDistrict';
import MapLegend from './MapLegend';
import { DISTRICT_METRICS } from './DistrictPanel';

interface Feature {
  type: string;
  properties: {
    district_name: string;
    division: string;
    district_code: string;
    latitude: number;
    longitude: number;
  };
  geometry: {
    type: string;
    coordinates: any;
  };
}

interface MapProps {
  selectedDistrict: string;
  onSelectDistrict: (district: string) => void;
}

export default function MaharashtraMap({ selectedDistrict, onSelectDistrict }: MapProps) {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [hovered, setHovered] = useState<Feature | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  
  // Layer Selector: 'rainfall' | 'soil_health' | 'soil_type'
  const [activeLayer, setActiveLayer] = useState('rainfall');
  
  const mapRef = useRef<HTMLDivElement>(null);

  // Load geojson boundary paths
  useEffect(() => {
    fetch('/maps/maharashtra.geojson')
      .then(res => res.json())
      .then(data => {
        if (data && data.features) {
          setFeatures(data.features);
        }
      })
      .catch(err => console.error("Failed to load map GeoJSON:", err));
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mapRef.current) {
      const bounds = mapRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top
      });
    }
  };

  const districtsList = features.map(f => f.properties.district_name);

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.25, 3));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.25, 0.75));
  const handleReset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleSelectSearch = (d: string) => {
    onSelectDistrict(d);
    const feat = features.find(f => f.properties.district_name === d);
    if (feat) {
      const lon = feat.properties.longitude;
      const lat = feat.properties.latitude;
      const targetX = ((lon - 76.7) * 20);
      const targetY = -((lat - 18.8) * 20);
      setOffset({ x: targetX, y: targetY });
      setZoom(1.5);
    }
  };

  // Coordinates bounding boxes
  const minX = 72.6;
  const maxX = 80.9;
  const minY = 15.6;
  const maxY = 22.0;
  
  const width = 800;
  const height = 600;

  // Solid, high-contrast layer coloring logic
  const getFillColor = (name: string) => {
    const met = DISTRICT_METRICS[name] || { rainfall: "0 mm", soil: "Clay" };
    const rain = parseInt(met.rainfall);

    if (activeLayer === 'rainfall') {
      if (rain < 600) return 'rgba(59, 130, 246, 0.35)'; // Visible light blue
      if (rain < 1200) return 'rgba(59, 130, 246, 0.65)'; // Mid blue
      return 'rgba(29, 78, 216, 0.9)'; // Dark blue
    }

    if (activeLayer === 'soil_health') {
      if (rain < 700) return 'rgba(16, 185, 129, 0.3)'; // Light green
      if (rain < 1500) return 'rgba(16, 185, 129, 0.6)'; // Mid green
      return 'rgba(4, 120, 87, 0.9)'; // Deep forest green
    }

    // soil_type
    const soil = met.soil.toLowerCase();
    if (soil.includes("clay") || soil.includes("black")) {
      return 'rgba(5, 150, 105, 0.75)'; // Rich emerald/black
    }
    if (soil.includes("sandy") || soil.includes("alluvial")) {
      return 'rgba(217, 119, 6, 0.75)'; // Warm amber
    }
    return 'rgba(220, 38, 38, 0.75)'; // Crimson red
  };

  const activeHoverData = hovered 
    ? DISTRICT_METRICS[hovered.properties.district_name] || { rainfall: "N/A", soil: "N/A" }
    : { rainfall: "N/A", soil: "N/A" };

  return (
    <div
      ref={mapRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[400px] sm:h-[450px] border border-[var(--border-color)] bg-[var(--bg-card)] rounded-2xl overflow-hidden shadow-sm select-none"
    >
      {/* Autocomplete District search */}
      <SearchDistrict districts={districtsList} onSelect={handleSelectSearch} />

      {/* Layer selector tabs */}
      <div className="absolute top-4 right-4 z-20 flex gap-1 p-1 rounded-lg border border-emerald-500/20 bg-slate-900/90 backdrop-blur-md">
        <button
          onClick={() => setActiveLayer('rainfall')}
          className={`px-2.5 py-1 text-[9px] font-bold uppercase rounded transition cursor-pointer ${activeLayer === 'rainfall' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          Rainfall
        </button>
        <button
          onClick={() => setActiveLayer('soil_health')}
          className={`px-2.5 py-1 text-[9px] font-bold uppercase rounded transition cursor-pointer ${activeLayer === 'soil_health' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          Health
        </button>
        <button
          onClick={() => setActiveLayer('soil_type')}
          className={`px-2.5 py-1 text-[9px] font-bold uppercase rounded transition cursor-pointer ${activeLayer === 'soil_type' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          Soil
        </button>
      </div>

      {/* Map Zoom Controls */}
      <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onReset={handleReset} />

      {/* Floating Tooltips */}
      <DistrictTooltip
        district={hovered ? hovered.properties.district_name : ''}
        division={hovered ? hovered.properties.division : ''}
        rainfall={activeHoverData.rainfall}
        soil={activeHoverData.soil}
        x={mousePos.x}
        y={mousePos.y}
        visible={hovered !== null}
      />

      <div
        className="w-full h-full flex items-center justify-center transition-transform duration-300"
        style={{
          transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)`,
          transformOrigin: 'center center'
        }}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full max-h-[420px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="districts">
            {features.map((feature, idx) => {
              const name = feature.properties.district_name;
              const paths: string[] = [];
              
              const geomType = feature.geometry.type;
              if (geomType === "Polygon") {
                feature.geometry.coordinates.forEach((ring: any) => {
                  const pts: string[] = [];
                  ring.forEach((pt: number[]) => {
                    const x = ((pt[0] - minX) / (maxX - minX)) * width;
                    const y = height - ((pt[1] - minY) / (maxY - minY)) * height;
                    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
                  });
                  paths.push("M" + pts.join("L") + "Z");
                });
              } else if (geomType === "MultiPolygon") {
                feature.geometry.coordinates.forEach((poly: any) => {
                  poly.forEach((ring: any) => {
                    const pts: string[] = [];
                    ring.forEach((pt: number[]) => {
                      const x = ((pt[0] - minX) / (maxX - minX)) * width;
                      const y = height - ((pt[1] - minY) / (maxY - minY)) * height;
                      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
                    });
                    paths.push("M" + pts.join("L") + "Z");
                  });
                });
              }

              const combinedD = paths.join(" ");
              const isSelected = selectedDistrict === name;
              const fillVal = getFillColor(name);

              return (
                <path
                  key={idx}
                  id={name.replace(" ", "_")}
                  d={combinedD}
                  onMouseEnter={() => setHovered(feature)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => onSelectDistrict(name)}
                  stroke={isSelected ? '#10b981' : '#1e293b'}
                  strokeWidth={isSelected ? '2.5' : '1.2'}
                  strokeOpacity="0.95"
                  style={{ fill: isSelected ? 'rgba(16, 185, 129, 0.45)' : fillVal }}
                  className={`district-polygon cursor-pointer transition-colors ${isSelected ? 'selected' : ''}`}
                />
              );
            })}
          </g>
        </svg>
      </div>

      <div className="absolute bottom-4 left-4 z-20">
        <MapLegend activeLayer={activeLayer} />
      </div>
    </div>
  );
}
