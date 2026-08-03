"use client";

import React from 'react';

export type FormatType = 'imax' | 'dolby' | 'premium' | "dolby-atmos";

interface FormatBadgeProps {
  format: FormatType;
  label?: string;
}

export function FormatBadge({ format, label }: FormatBadgeProps) {
  switch (format) {
    case 'imax':
      return (
        <span className="inline-flex items-center justify-center bg-transparent text-[#0055FF] border border-[#0055FF]/30 px-3 py-1 rounded font-black uppercase tracking-tighter text-sm">
          {label || 'IMAX'}
        </span>
      );
    case 'dolby':
      return (
        <span className="inline-flex items-center justify-center bg-black text-white px-3 py-1 rounded shadow-sm font-medium tracking-wide text-sm border border-white/10">
          {label || 'Dolby Atmos'}
        </span>
      );
    case 'dolby-atmos':
      return (
        <span className="inline-flex items-center justify-center bg-black text-white px-3 py-1 rounded shadow-sm font-medium tracking-wide text-sm border border-white/10">
          {label || 'Dolby Atmos'}
        </span>
      );
    case 'premium':
      return (
        <span className="inline-flex items-center justify-center bg-gradient-to-br from-neutral-900 to-black text-[#D4AF37] border border-[#D4AF37]/50 px-3 py-1 rounded-full uppercase font-bold tracking-widest text-xs">
          {label || 'Premium Format'}
        </span>
      );
    default:
      return null;
  }
}
