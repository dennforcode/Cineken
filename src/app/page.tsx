"use client";

import Link from "next/link";
import { Navbar } from "../components/Navbar";
import "./cinema/cinema.css";

export default function Home() {
  return (
    <div className="premium-body selection:bg-cine-accent selection:text-white min-h-screen relative overflow-x-hidden flex flex-col">

      {/* Header with Theme Toggle */}
      <Navbar transparent={true} hideLogoAndText={true} />

      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cine-accent/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-cine-accent/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Introduction Section */}
      <section className="px-6 md:px-12 py-24 flex-grow flex flex-col justify-center relative z-10">
        <div className="max-w-5xl mx-auto w-full">

          <div className="flex items-center gap-6 mb-8">
            <img src="/Logo.png" alt="Cineken Logo" className="h-24 md:h-32 object-contain drop-shadow-2xl" />
            <h1 className="font-display text-5xl sm:text-7xl md:text-[6rem] leading-[1.1] font-bold tracking-tight text-cine-text">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cine-text to-cine-muted">CINE</span>KEN
            </h1>
          </div>

          <p className="font-sans text-lg md:text-xl text-cine-muted max-w-3xl leading-relaxed mt-8 font-light">
            This platform is a demonstration of a highly interactive, state-of-the-art cinema seating and booking interface. Built with an uncompromising premium cinematic aesthetic, it prioritizes sleek typography, subtle glows, and deep contrasts. Explore the topography matrix to find your optimal acoustic sweet spot.
          </p>

          <div className="mt-16 flex">
            <Link
              href="/cinema"
              className="group relative inline-flex items-center justify-center px-8 py-5 font-sans text-sm font-semibold tracking-widest text-white uppercase overflow-hidden bg-cine-accent rounded-full transition-all hover:scale-105 glow-accent-hover"
            >
              <span className="relative z-10 flex items-center gap-3">
                ENTER THE MATRIX
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-6 md:px-12 z-50 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-cine-muted pb-8 sm:pb-6 mt-8 relative">
        <div className="bg-cine-accent/10 border border-cine-accent/30 text-cine-accent px-4 py-2 rounded-full backdrop-blur-sm shadow-lg">
          Demo Mode Active
        </div>
        <div className="backdrop-blur-sm px-4 py-2 rounded-full border border-cine-border/50 bg-cine-surface/30 shadow-lg">
          Created with <span className="text-cine-accent mx-1 text-sm">♥</span> by <span className="text-cine-text ml-1">Dennis Xavier</span>
        </div>
      </footer>
    </div>
  );
}