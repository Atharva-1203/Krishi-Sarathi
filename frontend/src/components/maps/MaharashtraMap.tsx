"use client";

import { useEffect, useState, useRef } from 'react';
import DistrictTooltip from './DistrictTooltip';
import ZoomControls from './ZoomControls';
import SearchDistrict from './SearchDistrict';
import MapLegend from './MapLegend';

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
    // Find the feature centroid to center/offset
    const feat = features.find(f => f.properties.district_name === d);
    if (feat) {
      // Shift map offset toward centroids relative to central boundaries
      const lon = feat.properties.longitude;
      const lat = feat.properties.latitude;
      // Bounding box: lon [72.6, 80.9], lat [15.6, 22.0]
      const targetX = ((lon - 76.7) * 20); // Scale multipliers
      const targetY = -((lat - 18.8) * 20);
      setOffset({ x: targetX, y: targetY });
      setZoom(1.5);
    }
  };

  // Maharashtra Coordinates bounding boxes for WGS84 equirectangular projection
  const minX = 72.6;
  const maxX = 80.9;
  const minY = 15.6;
  const maxY = 22.0;
  
  const width = 800;
  const height = 600;

  const projectCoords = (coords: any): string => {
    const pts: string[] = [];
    coords.forEach((pt: number[]) => {
      const x = ((pt[0] - minX) / (maxX - minX)) * width;
      const y = height - ((pt[1] - minY) / (maxY - minY)) * height;
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    });
    return "M" + pts.join("L") + "Z";
  };

  return (
    <div
      ref={mapRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[400px] sm:h-[450px] border border-[var(--border-color)] bg-[var(--bg-card)] rounded-2xl overflow-hidden shadow-sm select-none"
    >
      {/* Autocomplete District search */}
      <SearchDistrict districts={districtsList} onSelect={handleSelectSearch} />

      {/* Map Zoom Controllers */}
      <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onReset={handleReset} />

      {/* Floating Tooltips */}
      <DistrictTooltip
        district={hovered ? hovered.properties.district_name : ''}
        division={hovered ? hovered.properties.division : ''}
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

              return (
                <path
                  key={idx}
                  id={name.replace(" ", "_")}
                  d={combinedD}
                  onMouseEnter={() => setHovered(feature)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => onSelectDistrict(name)}
                  className={`district-polygon ${isSelected ? 'selected' : ''}`}
                />
              );
            })}
          </g>
        </svg>
      </div>

      <div className="absolute bottom-4 left-4 z-20">
        <MapLegend />
      </div>
    </div>
  );
}
