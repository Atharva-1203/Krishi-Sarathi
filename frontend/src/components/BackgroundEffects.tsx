"use client";

import { useEffect, useState } from 'react';

export default function BackgroundEffects() {
  const [particles, setParticles] = useState<{ id: number; left: string; top: string; size: string; delay: string }[]>([]);

  useEffect(() => {
    // Generate organic floating seed particles
    const list = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 2}px`,
      delay: `${Math.random() * 8}s`
    }));
    setParticles(list);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 transition-colors duration-500 bg-[var(--bg-app)]">
      {/* Dynamic ambient radial gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-950/20" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-amber-500/5 blur-[150px] dark:bg-amber-950/10" />

      {/* Floating agricultural green seeds */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-emerald-500/20 dark:bg-emerald-400/10 animate-float"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: '14s'
          }}
        />
      ))}
    </div>
  );
}
