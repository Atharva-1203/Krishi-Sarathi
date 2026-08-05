"use client";

import { Plus, Minus, RotateCcw } from 'lucide-react';

interface ZoomProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export default function ZoomControls({ onZoomIn, onZoomOut, onReset }: ZoomProps) {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-20">
      <button
        onClick={onZoomIn}
        className="w-8 h-8 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] hover:bg-[var(--bg-hover)] flex items-center justify-center shadow cursor-pointer transition"
        title="Zoom In"
      >
        <Plus size={16} />
      </button>
      <button
        onClick={onZoomOut}
        className="w-8 h-8 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] hover:bg-[var(--bg-hover)] flex items-center justify-center shadow cursor-pointer transition"
        title="Zoom Out"
      >
        <Minus size={16} />
      </button>
      <button
        onClick={onReset}
        className="w-8 h-8 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] hover:bg-[var(--bg-hover)] flex items-center justify-center shadow cursor-pointer transition"
        title="Reset Zoom"
      >
        <RotateCcw size={16} />
      </button>
    </div>
  );
}
