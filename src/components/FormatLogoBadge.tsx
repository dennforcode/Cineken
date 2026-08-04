"use client";

import React from "react";
import logos from "./FormatSVG";

// Map badge keys used in the app to their SVG logo entries
const badgeToLogoMap: Record<string, { category: "video" | "audio"; key: string; label: string; accentColor: string; glowColor: string }> = {
  // Video formats
  imax: {
    category: "video",
    key: "imax",
    label: "IMAX",
    accentColor: "#0055FF",
    glowColor: "rgba(0, 85, 255, 0.35)",
  },
  screenx: {
    category: "video",
    key: "screenx",
    label: "ScreenX",
    accentColor: "#00C9B7",
    glowColor: "rgba(0, 201, 183, 0.35)",
  },
  "dolby-cinema": {
    category: "video",
    key: "dolby_cinema",
    label: "Dolby Cinema",
    accentColor: "#FFFFFF",
    glowColor: "rgba(255, 255, 255, 0.25)",
  },
  "4dx": {
    category: "video",
    key: "fourdx",
    label: "4DX",
    accentColor: "#E50914",
    glowColor: "rgba(229, 9, 20, 0.35)",
  },
  ice: {
    category: "video",
    key: "ice",
    label: "ICE",
    accentColor: "#B4B4B4",
    glowColor: "rgba(180, 180, 180, 0.3)",
  },
  "reald-3d": {
    category: "video",
    key: "reald3d",
    label: "RealD 3D",
    accentColor: "#0573AC",
    glowColor: "rgba(5, 115, 172, 0.35)",
  },

  // Audio formats
  "dolby-atmos": {
    category: "audio",
    key: "atmos",
    label: "Dolby Atmos",
    accentColor: "#FFFFFF",
    glowColor: "rgba(255, 255, 255, 0.25)",
  },
  dolby: {
    category: "audio",
    key: "dolby",
    label: "Dolby",
    accentColor: "#FFFFFF",
    glowColor: "rgba(255, 255, 255, 0.25)",
  },
  "dts-x": {
    category: "audio",
    key: "dtsx",
    label: "DTS:X",
    accentColor: "#FDBB30",
    glowColor: "rgba(253, 187, 48, 0.3)",
  },
  "auro-3d": {
    category: "audio",
    key: "auro3d",
    label: "Auro 3D",
    accentColor: "#FFFFFF",
    glowColor: "rgba(255, 255, 255, 0.25)",
  },
};

export type LogoBadgeFormat = keyof typeof badgeToLogoMap;

interface FormatLogoBadgeProps {
  format: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function FormatLogoBadge({
  format,
  size = "md",
  className = "",
}: FormatLogoBadgeProps) {
  const mapping = badgeToLogoMap[format];

  // Fallback: if no SVG logo mapping exists, render a simple text pill
  if (!mapping) {
    return (
      <span
        className={`inline-flex items-center justify-center px-3 py-1.5 rounded-lg 
          bg-cine-surface border border-cine-border text-cine-muted 
          text-[10px] font-semibold uppercase tracking-widest ${className}`}
      >
        {format}
      </span>
    );
  }

  const logoCategory = logos[mapping.category] as Record<string, string>;
  const svgString = logoCategory?.[mapping.key];

  // If we have a mapping but the SVG is missing (e.g. mx4d which is an external URL), fall back
  if (!svgString || !svgString.startsWith("<svg")) {
    return (
      <span
        className={`inline-flex items-center justify-center px-3 py-1.5 rounded-lg
          bg-cine-surface border border-cine-border text-cine-text
          text-[10px] font-semibold uppercase tracking-widest ${className}`}
      >
        {mapping.label}
      </span>
    );
  }

  // Size dimensions
  const sizeStyles = {
    sm: { h: 18, w: 64 },
    md: { h: 22, w: 90 },
    lg: { h: 28, w: 120 },
  };

  const s = sizeStyles[size];

  // Strip width/height/style attributes from the SVG so CSS can control sizing
  const cleanSvg = svgString
    .replace(/<svg([^>]*)>/, (_match: string, attrs: string) => {
      const cleaned = attrs
        .replace(/\s*width="[^"]*"/gi, "")
        .replace(/\s*height="[^"]*"/gi, "")
        .replace(/\s*style="[^"]*"/gi, "");
      return `<svg${cleaned}>`;
    });

  return (
    <span
      className={`format-logo-badge inline-flex items-center justify-center rounded-xl relative overflow-hidden group ${className}`}
      style={{
        padding: "5px 12px",
        background: `radial-gradient(ellipse at center, ${mapping.glowColor} 0%, transparent 70%)`,
        boxShadow: `0 0 20px ${mapping.glowColor}, inset 0 0 12px ${mapping.glowColor}`,
        border: `1px solid color-mix(in srgb, ${mapping.accentColor} 20%, transparent)`,
      }}
      title={mapping.label}
    >
      {/* Inner glow layer */}
      <span
        className="absolute inset-0 rounded-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at center, ${mapping.glowColor} 0%, transparent 60%)`,
        }}
      />

      {/* SVG — all intrinsic sizing stripped, CSS controls dimensions */}
      <span
        className="relative z-10 block [&_svg]:brightness-0 [&_svg]:invert [&_svg]:block"
        style={{
          width: `${s.w}px`,
          height: `${s.h}px`,
        }}
        dangerouslySetInnerHTML={{
          __html: cleanSvg.replace(
            "<svg",
            `<svg width="${s.w}" height="${s.h}" preserveAspectRatio="xMidYMid meet"`
          ),
        }}
      />
    </span>
  );
}

