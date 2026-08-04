"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { FormatBadge } from "./FormatBadge";
import "../app/cinema/cinema.css";

export type ScreenData = {
  id: string;
  chain: string;
  venue: string;
  auditorium: string;
  badges: string[];
  screenSize: string;
  aspectRatio: string;
  projection: string;
  projectionDesc: string;
  audio: string;
  audioDesc: string;
  seating: string;
  type: string;
  ratings: {
    visual: string;
    audio: string;
    thirdLabel: string;
    thirdScore: string;
    overall: string;
  };
  certification: string;
  colorTheme: string;
  isCurved?: boolean;
  photoUrl?: string;
};

import { SectionConfig } from "@/data/layouts";
import { FormatLogoBadge } from "./FormatLogoBadge";

export default function CinemaComponent({ screen, layoutSections }: { screen: ScreenData, layoutSections: SectionConfig[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSeats, setShowSeats] = useState(false);

  // Defer heavy seat rendering to unblock initial page load on mobile
  useEffect(() => {
    const timer = setTimeout(() => setShowSeats(true), 150);
    return () => clearTimeout(timer);
  }, []);
  const isBlue = screen.colorTheme === "blue";
  const accentColor = isBlue ? "#0055FF" : "#E50914";
  const glowClass = isBlue ? "bg-[#0055FF]" : "bg-[#E50914]";
  const gradientClass = isBlue
    ? "from-[#0055FF]/90 to-[#001f5f]"
    : "from-cine-accent/90 to-[#99060d]";
  const borderClass = isBlue ? "border-[#0055FF]/20" : "border-cine-accent/20";
  const shadowClass = isBlue
    ? "shadow-[0_8px_30px_rgba(0,85,255,0.15)]"
    : "shadow-[0_8px_30px_rgb(229,9,20,0.15)]";

  // Calculate dynamic grid columns based on layout
  const maxCol = layoutSections.length > 0
    ? Math.max(...layoutSections.flatMap(s => s.rows.flatMap(r => r.seats.map(seat => seat.colStart)))) + 2
    : 17;

  const gridStyle = { gridTemplateColumns: `2rem repeat(${maxCol}, minmax(0, 1fr))` };

  // Calculate dynamic optimal zone (middle ~40% of rows)
  const allRowsCount = layoutSections.reduce((acc, section) => acc + section.rows.length, 0);
  const optimalRowStart = Math.floor(allRowsCount * 0.3);
  const optimalRowEnd = Math.floor(allRowsCount * 0.75);
  let currentRowGlobalIndex = 0;

  return (
    <div className="premium-body selection:bg-cine-accent selection:text-white min-h-screen">
      {/* Ambient background glows for premium feel */}
      <div className="fixed top-0 inset-x-0 h-96 bg-gradient-to-b from-cine-accent/5 to-transparent pointer-events-none -z-10"></div>

      {/* Header */}
      <Navbar backHref="/cinema" backText="ALL SCREENS" showMenu={true} />

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 space-y-32">
        <div className="space-y-6">
          {/* Hero Image */}
          {screen.photoUrl && (
            <div
              className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] rounded-3xl overflow-hidden relative shadow-2xl border border-cine-border group cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src={screen.photoUrl}
                alt={`${screen.auditorium} at ${screen.venue}`}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cine-surface via-transparent to-transparent opacity-60"></div>
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl"></div>
            </div>
          )}

          {/* Hierarchy Matrix: Chain, Venue, Audi */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Chain */}
              <div className="rounded-2xl bg-cine-surface border border-cine-border p-8 flex flex-col justify-center transition-all hover:bg-cine-surface-hover">
                <div className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3 text-cine-muted">
                  CHAIN
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-wide text-cine-text break-words">
                  {screen.chain}
                </h2>
              </div>
              {/* Venue (Colored for contrast) */}
              <div
                className={`rounded-2xl bg-gradient-to-br ${gradientClass} ${borderClass} p-8 flex flex-col justify-center text-white ${shadowClass} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="relative z-10">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3 text-white/70">
                    VENUE
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-wide break-words">
                    {screen.venue}
                  </h2>
                </div>
              </div>
            </div>

            {/* Audi */}
            <div className="rounded-2xl glass-panel p-8 md:p-12 flex flex-col justify-center text-cine-text shadow-xl relative overflow-hidden">
              <div
                className={`hidden md:block absolute -bottom-24 -right-24 w-64 h-64 ${glowClass}/10 rounded-full blur-[80px] transform-gpu`}
              ></div>
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div
                    className="text-[10px] font-semibold uppercase tracking-[0.3em]"
                    style={{ color: accentColor }}
                  >
                    AUDITORIUM
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {screen.badges.map((b) => (
                      <FormatBadge key={b} format={b as any} />
                    ))}
                  </div>
                </div>
                <h1 className="font-display text-6xl sm:text-7xl font-bold tracking-tight break-words">
                  {screen.auditorium}
                </h1>
                {screen.type && (
                  <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-cine-muted break-words">
                    {screen.type} • SEATING: {screen.seating}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Spec-Driven Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-cine-surface border border-cine-border p-8 md:p-16 flex flex-col justify-center min-h-[30vh] transition-all hover:border-cine-text/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cine-text/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div
                className={`hidden md:block absolute right-0 top-0 w-32 h-full ${glowClass}/0 blur-[0px] transform-gpu`}
              ></div>
              <div className="relative z-10">
                <div className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-4 text-cine-muted">
                  CANVAS DIMENSIONS
                </div>
                <h1 className="font-display text-5xl sm:text-[6rem] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-cine-text to-cine-muted drop-shadow-lg mb-4 break-words">
                  {screen.screenSize}
                </h1>
              </div>
            </div>

            <div className="grid grid-rows-2 gap-6">
              <div className="rounded-2xl bg-cine-surface border border-cine-border p-8 flex flex-col justify-center">
                <div className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3 text-cine-muted">
                  PROJECTION ENGINE
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-2 text-cine-text break-words">
                  {screen.projection}
                </h2>
                <div className="text-sm text-cine-muted font-light max-w-sm leading-relaxed break-words">
                  {screen.projectionDesc}
                </div>
              </div>
              <div className="rounded-2xl glass-panel p-8 flex flex-col justify-center relative overflow-hidden">
                <div
                  className={`absolute right-0 top-0 w-32 h-full ${glowClass}/5 blur-[50px]`}
                ></div>
                <div
                  className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3"
                  style={{ color: accentColor }}
                >
                  FORMAT RATIO
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-cine-text break-words">
                  {screen.aspectRatio}
                </h2>
              </div>
            </div>
          </section>

          {/* Audio & Ratings Matrix */}
          <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Audio Profile */}
            <div className="lg:col-span-2 rounded-2xl bg-cine-surface border border-cine-border p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
              <div
                className={`absolute -left-12 -top-12 w-64 h-64 ${glowClass}/5 rounded-full blur-[60px]`}
              ></div>
              <div className="relative z-10">
                <div className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-8 text-cine-muted">
                  ACOUSTIC ARCHITECTURE
                </div>
                <div>
                  <h2
                    className="font-display text-4xl sm:text-5xl tracking-tight mb-2 break-words"
                    style={{
                      color: accentColor,
                      textShadow: `0 0 10px ${accentColor}80`,
                    }}
                  >
                    {screen.audio.toUpperCase()}
                  </h2>
                  <p className="font-light text-sm text-cine-muted max-w-md leading-relaxed mt-4 break-words">
                    {screen.audioDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Individual Ratings */}
            <div className="rounded-2xl bg-cine-surface border border-cine-border flex flex-col overflow-hidden">
              <div className="flex-1 border-b border-cine-border p-6 flex items-center justify-between transition-colors hover:bg-cine-surface-hover">
                <span className="font-semibold text-xs uppercase tracking-[0.2em] text-cine-muted">
                  VISUAL
                </span>
                <span className="font-display text-3xl text-cine-text">
                  {screen.ratings.visual}
                </span>
              </div>
              <div className="flex-1 border-b border-cine-border p-6 flex items-center justify-between transition-colors hover:bg-cine-surface-hover">
                <span className="font-semibold text-xs uppercase tracking-[0.2em] text-cine-muted">
                  AUDIO
                </span>
                <span className="font-display text-3xl text-cine-text">
                  {screen.ratings.audio}
                </span>
              </div>
              <div className="flex-1 p-6 flex items-center justify-between transition-colors hover:bg-cine-surface-hover">
                <span className="font-semibold text-xs uppercase tracking-[0.2em] text-cine-muted">
                  {screen.ratings.thirdLabel}
                </span>
                <span className="font-display text-3xl text-cine-text">
                  {screen.ratings.thirdScore}
                </span>
              </div>
            </div>

            {/* Overall Rating */}
            <div
              className={`rounded-2xl bg-gradient-to-b ${Number(screen.ratings.overall) >= 8.6
                ? "from-emerald-500 to-green-800"
                : Number(screen.ratings.overall) >= 7.0
                  ? "from-amber-500 to-yellow-700"
                  : "from-rose-600 to-red-900"
                } p-8 md:p-10 flex flex-col justify-center items-center text-center shadow-[0_10px_40px_rgba(0,0,0,0.2)]`}
            >
              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-4 text-white/80">
                OVERALL SCORE
              </div>
              <div className="font-display text-7xl tracking-tighter text-white">
                {screen.ratings.overall}
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] mt-4 text-white border border-white/20 rounded-full px-4 py-1.5 glass-panel">
                {screen.certification}
              </div>
            </div>
          </section>
        </div>

        {/* Topography & Best Seats (Reference Section) */}
        <section className="mt-16 pt-16 border-t border-cine-border">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24 items-start">
            <div className="xl:col-span-4 space-y-12 sticky top-32">
              <div>
                <h2 className="font-display text-5xl tracking-tight mb-4 text-cine-text">
                  REFERENCE TOPOGRAPHY
                </h2>
                <p className="font-light text-sm text-cine-muted leading-relaxed max-w-sm">
                  Standard layout reference. The acoustic sweet spot is
                  pre-highlighted for optimal spatial immersion and visual
                  alignment in premium formats.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-cine-surface border border-cine-border relative overflow-hidden group shadow-sm">
                <div className="hidden md:block absolute top-0 right-0 w-32 h-32 bg-cine-accent/5 rounded-full blur-[40px] group-hover:bg-cine-accent/10 transition-all duration-700 transform-gpu"></div>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.3em] mb-6 text-cine-accent relative z-10">
                  OPTIMAL ZONE
                </h3>
                <div className="space-y-4 text-[11px] font-medium uppercase tracking-[0.2em] text-cine-muted relative z-10">
                  <div className="flex justify-between border-b border-cine-border pb-3">
                    <span>DISTANCE</span>
                    <span className="text-cine-text">45 FEET</span>
                  </div>
                  <div className="flex justify-between border-b border-cine-border pb-3">
                    <span>VIEWING ANGLE</span>
                    <span className="text-cine-text">36 DEGREES</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AUDIO DELAY</span>
                    <span className="text-cine-text">0.0ms</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-md bg-cine-accent shadow-[0_0_15px_rgba(229,9,20,0.5)] border border-cine-accent/50"></div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cine-text">
                    BEST SEATS (SWEET SPOT)
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-md bg-cine-surface border border-cine-border shadow-sm"></div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cine-muted">
                    STANDARD GALLERY
                  </span>
                </div>
              </div>
            </div>

            <div className="xl:col-span-8 w-full bg-cine-surface p-8 md:p-12 rounded-3xl border border-cine-border shadow-lg relative overflow-hidden">
              <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-cine-accent/5 blur-[100px] pointer-events-none transform-gpu"></div>
              <div className="w-full overflow-x-auto pb-12 hide-scrollbar">
                <div className="flex flex-col gap-3 sm:gap-4 min-w-max mx-auto px-4 relative z-10">
                  {!showSeats ? (
                    <div className="flex flex-col items-center justify-center h-64 opacity-50 animate-pulse">
                      <div className="w-8 h-8 rounded-full border-2 border-cine-accent border-t-transparent animate-spin mb-4"></div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cine-muted">
                        LOADING TOPOGRAPHY...
                      </div>
                    </div>
                  ) : (
                    layoutSections.map((section, sIdx) => (
                      <div key={sIdx} className="flex flex-col gap-1.5 sm:gap-2">
                        {/* Section Headers */}
                        {(section.title ||
                          section.leftTitle ||
                          section.rightTitle) && (
                            <div
                              className="grid gap-1 sm:gap-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-cine-muted/80 mb-2 mt-4 items-end"
                              style={gridStyle}
                            >
                              <div></div>

                              {section.title && (
                                <div className="col-start-2 text-center border-b border-cine-border pb-2" style={{ gridColumnEnd: maxCol + 2 }}>
                                  {section.title}
                                </div>
                              )}

                              {section.leftTitle && section.rightTitle && (
                                <>
                                  <div className="col-start-2 text-center border-b border-cine-border pb-2" style={{ gridColumnEnd: Math.floor(maxCol / 2) + 1 }}>
                                    {section.leftTitle}
                                  </div>
                                  <div className="text-center border-b border-cine-border pb-2" style={{ gridColumnStart: Math.floor(maxCol / 2) + 1, gridColumnEnd: maxCol + 2 }}>
                                    {section.rightTitle}
                                  </div>
                                </>
                              )}
                            </div>
                          )}

                        {/* Rows */}
                        {section.rows.map((row) => {
                          const isOptimalRow = currentRowGlobalIndex >= optimalRowStart && currentRowGlobalIndex <= optimalRowEnd;
                          currentRowGlobalIndex++;

                          // Calculate row label offset to match the leftmost seat's curve
                          const centerCol = Math.floor(maxCol / 2);
                          const curveFactor = 0.08;
                          const leftmostCol = Math.min(...row.seats.map(s => s.colStart));
                          const labelDist = Math.abs(leftmostCol - centerCol);
                          const labelTranslateY = screen.isCurved ? (labelDist * labelDist * curveFactor) : 0;

                          return (
                            <div
                              key={row.rowLabel}
                              className="grid gap-1 sm:gap-1.5 items-center"
                              style={gridStyle}
                            >
                              <div
                                className="font-display text-[10px] sm:text-xs font-medium pr-2 sm:pr-4 text-right text-cine-muted"
                                style={{ transform: `translateY(${labelTranslateY}px)` }}
                              >
                                {row.rowLabel}
                              </div>

                              {row.seats.map((seat) => {
                                // Define sweet spot dynamically based on center column and optimal rows
                                const colSpread = Math.max(3, Math.floor(maxCol * 0.08));
                                const isBest = Math.abs(seat.colStart - centerCol) <= colSpread && isOptimalRow;

                                // Calculate mathematical curve
                                const dist = Math.abs(seat.colStart - centerCol);
                                const translateY = screen.isCurved ? (dist * dist * curveFactor) : 0;

                                let seatClass =
                                  "w-6 h-6 sm:w-7 sm:h-7 rounded-t-lg rounded-b-sm flex items-center justify-center text-[8px] sm:text-[9px] font-medium transition-all duration-300 cursor-pointer shadow-sm ";

                                if (isBest) {
                                  seatClass +=
                                    " bg-gradient-to-br from-cine-accent to-[#b3070f] text-white shadow-[0_4px_12px_rgba(229,9,20,0.4)] border border-red-400/30 hover:scale-110 hover:-translate-y-1 z-10 glow-accent-hover";
                                } else {
                                  seatClass +=
                                    " bg-[#1a1a1a] border border-[#333] text-cine-muted hover:text-cine-text hover:bg-[#2a2a2a] hover:border-[#555] hover:scale-110 hover:-translate-y-1 z-10";
                                }

                                return (
                                  <div
                                    key={seat.id}
                                    style={{
                                      gridColumnStart: seat.colStart + 1,
                                      transform: `translateY(${translateY}px)`
                                    }}
                                  >
                                    <div className={seatClass}>
                                      {seat.label}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Screen Element */}
              <div className="w-full max-w-2xl mx-auto mt-8 relative">
                {/* Screen Glow */}
                <div className="absolute -top-4 inset-x-0 h-4 bg-cine-text/5 blur-[10px] rounded-full"></div>
                {/* Screen Arc */}
                <div className="h-2 w-full bg-gradient-to-r from-transparent via-cine-text/20 to-transparent rounded-[100%] shadow-[0_-10px_30px_rgba(0,0,0,0.1)]"></div>
                <div className="text-center mt-6">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cine-muted/70">
                    CINEMATIC SCREEN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Full-Screen Image Modal */}
      {isModalOpen && screen.photoUrl && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <img
            src={screen.photoUrl}
            alt={`${screen.auditorium} at ${screen.venue}`}
            className="max-w-full max-h-full rounded-lg object-contain shadow-2xl ring-1 ring-white/20 animate-in zoom-in-95 duration-300"
          />

          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors duration-300 border border-white/20"
            onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
