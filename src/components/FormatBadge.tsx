"use client";

import React from 'react';

export type FormatType =
  | 'imax'
  | 'dolby'
  | 'dolby-atmos'
  | 'dolby-cinema'
  | 'premium'
  | 'screenx'
  | '4dx'
  | 'ice'
  | 'reald-3d'
  | 'dts-x'
  | 'auro-3d';

interface FormatBadgeProps {
  format: FormatType;
  label?: string;
}

const badgeBase =
  "inline-flex items-center justify-center px-3 py-1 rounded font-semibold uppercase tracking-wider text-xs transition-colors";

export function FormatBadge({ format, label }: FormatBadgeProps) {
  switch (format) {
    case 'imax':
      return (
        <span className={`${badgeBase} bg-transparent text-[#0055FF] border border-[#0055FF]/30 font-black tracking-tighter text-sm`}>
          {label || 'IMAX'}
        </span>
      );

    case 'dolby':
    case 'dolby-atmos':
      return (
        <span className={`${badgeBase} bg-black text-white border border-white/10 shadow-sm tracking-wide text-sm`}>
          {label || (format === 'dolby' ? 'Dolby' : 'Dolby Atmos')}
        </span>
      );

    case 'dolby-cinema':
      return (
        <span className={`${badgeBase} bg-gradient-to-r from-black to-neutral-900 text-white border border-white/10 shadow-sm tracking-wide text-sm`}>
          {label || 'Dolby Cinema'}
        </span>
      );

    case 'screenx':
      return (
        <span className={`${badgeBase} bg-gradient-to-r from-cyan-500 to-teal-400 text-black border border-cyan-300/40 font-black tracking-wider text-sm`}>
          {label || 'ScreenX'}
        </span>
      );

    case '4dx':
      return (
        <span className={`${badgeBase} bg-gradient-to-r from-[#E50914] to-[#b3070f] text-white border border-red-400/30 font-black tracking-tight text-sm`}>
          {label || '4DX'}
        </span>
      );

    case 'ice':
      return (
        <span className={`${badgeBase} bg-gradient-to-r from-slate-600 to-slate-700 text-slate-200 border border-slate-500/30 font-bold text-sm`}>
          {label || 'ICE'}
        </span>
      );

    case 'reald-3d':
      return (
        <span className={`${badgeBase} bg-transparent text-[#0573AC] border border-[#0573AC]/30 font-bold tracking-tight text-sm`}>
          {label || 'RealD 3D'}
        </span>
      );

    case 'dts-x':
      return (
        <span className={`${badgeBase} bg-gradient-to-r from-[#1a1a1a] to-black text-[#FDBB30] border border-[#FDBB30]/30 font-bold tracking-wide text-sm`}>
          {label || 'DTS:X'}
        </span>
      );

    case 'auro-3d':
      return (
        <span className={`${badgeBase} bg-gradient-to-r from-neutral-800 to-neutral-900 text-white border border-neutral-600/30 font-bold tracking-wide text-sm`}>
          {label || 'Auro 3D'}
        </span>
      );

    case 'premium':
      return (
        <span className={`${badgeBase} bg-gradient-to-br from-neutral-900 to-black text-[#D4AF37] border border-[#D4AF37]/50 rounded-full font-bold tracking-widest text-xs`}>
          {label || 'Premium Format'}
        </span>
      );

    default:
      return null;
  }
}

