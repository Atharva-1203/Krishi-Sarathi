"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useLanguageStore } from '@/store/language';

interface SearchProps {
  districts: string[];
  onSelect: (district: string) => void;
}

export default function SearchDistrict({ districts, onSelect }: SearchProps) {
  const { language } = useLanguageStore();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filtered = query
    ? districts.filter(d => d.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="absolute top-4 left-4 z-20 w-56">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={language === 'en' ? "Search district..." : "जिल्हा शोधा..."}
          className="w-full px-3 py-1.5 pl-8 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500 shadow transition"
        />
        <Search size={14} className="absolute left-2.5 top-2 text-[var(--text-muted)]" />
      </div>

      {isOpen && filtered.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] shadow-lg z-30">
          {filtered.map((d, idx) => (
            <li
              key={idx}
              onClick={() => {
                onSelect(d);
                setQuery('');
                setIsOpen(false);
              }}
              className="px-3 py-2 text-xs text-[var(--text-main)] hover:bg-[var(--bg-hover)] cursor-pointer transition"
            >
              {d}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
