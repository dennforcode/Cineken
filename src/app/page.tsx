"use client";

import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Star, MapPin, MonitorPlay, Volume2, Armchair, ChevronRight, User } from "lucide-react";
import "./cinema/cinema.css";

export default function Home() {
  return (
    <div className="premium-body selection:bg-cine-accent selection:text-white min-h-screen relative overflow-x-hidden flex flex-col">
      {/* Navbar */}
      <Navbar transparent={true} />

      {/* Background Ambient Glows */}
      <div className="hidden md:block absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cine-accent/10 rounded-full blur-[120px] pointer-events-none transform-gpu"></div>
      <div className="hidden md:block absolute bottom-1/4 right-1/4 w-[600px] h-[400px] bg-cine-accent/5 rounded-full blur-[150px] pointer-events-none transform-gpu"></div>

      {/* Hero Section */}
      <section className="px-6 md:px-12 pt-32 pb-20 flex-grow flex flex-col justify-center relative z-10">
        <div className="max-w-6xl mx-auto w-full text-center">
          <div className="flex justify-center items-center mb-6">
             <div className="px-4 py-1.5 rounded-full border border-cine-border bg-cine-surface/50 text-xs font-semibold tracking-widest text-cine-accent uppercase backdrop-blur-sm">
               The Encyclopedia for Theater Screens
             </div>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] leading-[1.1] font-bold tracking-tight text-cine-text mx-auto max-w-4xl">
            Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cine-accent to-red-500">Perfect Place</span> for Your Movie
          </h1>
          <p className="font-sans text-lg md:text-xl text-cine-muted max-w-2xl mx-auto leading-relaxed mt-6 font-light">
            Explore an exhaustive encyclopedia of cinema auditoriums. Discover screen specifications, sound systems, and authentic reviews to elevate your movie-watching experience.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/cinema"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-sans text-sm font-semibold tracking-widest text-white uppercase overflow-hidden bg-cine-accent rounded-full transition-all hover:scale-105 glow-accent-hover w-full sm:w-auto shadow-xl shadow-red-500/20"
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Theaters
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Theaters Section */}
      <section className="px-6 md:px-12 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cine-text">Featured Auditoriums</h2>
              <p className="text-cine-muted mt-2 font-light">The most detailed specs for the best screens.</p>
            </div>
            <Link href="/cinema" className="hidden sm:flex text-sm text-cine-accent font-semibold tracking-widest uppercase items-center gap-1 hover:text-red-500 transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Theater Card 1 */}
            <div className="glass-panel rounded-2xl overflow-hidden group hover:border-cine-accent/50 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/5">
              <div className="h-48 bg-zinc-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop" alt="Cinema" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-white text-xs font-bold mb-2 w-fit">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> 4.9
                  </div>
                  <h3 className="text-white font-display text-xl font-bold">PVR IMAX, Nexus Mall</h3>
                  <div className="flex items-center gap-1 text-zinc-300 text-sm mt-1">
                    <MapPin className="w-3 h-3" /> Koramangala, Bengaluru
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-cine-text">
                    <MonitorPlay className="w-4 h-4 text-cine-accent" /> 70ft IMAX Laser
                  </div>
                  <div className="flex items-center gap-2 text-sm text-cine-text">
                    <Volume2 className="w-4 h-4 text-cine-accent" /> 12-Channel Audio
                  </div>
                  <div className="flex items-center gap-2 text-sm text-cine-text">
                    <Armchair className="w-4 h-4 text-cine-accent" /> Recliner Seats
                  </div>
                </div>
                <Link href="/theater/pvr-imax" className="block text-center w-full py-2.5 rounded-lg bg-cine-surface border border-cine-border text-sm font-semibold hover:bg-cine-accent hover:text-white hover:border-cine-accent transition-colors">
                  View Details
                </Link>
              </div>
            </div>

            {/* Theater Card 2 */}
            <div className="glass-panel rounded-2xl overflow-hidden group hover:border-cine-accent/50 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/5">
              <div className="h-48 bg-zinc-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop" alt="Cinema" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-white text-xs font-bold mb-2 w-fit">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> 4.7
                  </div>
                  <h3 className="text-white font-display text-xl font-bold">INOX Insignia</h3>
                  <div className="flex items-center gap-1 text-zinc-300 text-sm mt-1">
                    <MapPin className="w-3 h-3" /> MG Road, Bengaluru
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-cine-text">
                    <MonitorPlay className="w-4 h-4 text-cine-accent" /> 4K Projection
                  </div>
                  <div className="flex items-center gap-2 text-sm text-cine-text">
                    <Volume2 className="w-4 h-4 text-cine-accent" /> Dolby Atmos
                  </div>
                  <div className="flex items-center gap-2 text-sm text-cine-text">
                    <Armchair className="w-4 h-4 text-cine-accent" /> Luxury Recliners
                  </div>
                </div>
                <Link href="/theater/inox-insignia" className="block text-center w-full py-2.5 rounded-lg bg-cine-surface border border-cine-border text-sm font-semibold hover:bg-cine-accent hover:text-white hover:border-cine-accent transition-colors">
                  View Details
                </Link>
              </div>
            </div>
            
            {/* Theater Card 3 */}
            <div className="glass-panel rounded-2xl overflow-hidden group hover:border-cine-accent/50 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/5">
              <div className="h-48 bg-zinc-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=2079&auto=format&fit=crop" alt="Cinema" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-white text-xs font-bold mb-2 w-fit">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> 4.5
                  </div>
                  <h3 className="text-white font-display text-xl font-bold">Cinepolis VIP</h3>
                  <div className="flex items-center gap-1 text-zinc-300 text-sm mt-1">
                    <MapPin className="w-3 h-3" /> Shantiniketan, Bengaluru
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-cine-text">
                    <MonitorPlay className="w-4 h-4 text-cine-accent" /> Dual 4K Laser
                  </div>
                  <div className="flex items-center gap-2 text-sm text-cine-text">
                    <Volume2 className="w-4 h-4 text-cine-accent" /> THX Certified
                  </div>
                  <div className="flex items-center gap-2 text-sm text-cine-text">
                    <Armchair className="w-4 h-4 text-cine-accent" /> Premium Seats
                  </div>
                </div>
                <Link href="/theater/cinepolis-vip" className="block text-center w-full py-2.5 rounded-lg bg-cine-surface border border-cine-border text-sm font-semibold hover:bg-cine-accent hover:text-white hover:border-cine-accent transition-colors">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="px-6 md:px-12 py-20 bg-cine-surface/30 relative z-10 border-t border-cine-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cine-text">Real Experiences</h2>
            <p className="text-cine-muted mt-2 font-light">Honest reviews from real moviegoers.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Review Card 1 */}
            <div className="glass-panel p-6 rounded-2xl relative shadow-lg shadow-black/5 hover:-translate-y-1 transition-transform duration-300">
              <User className="absolute top-6 right-6 w-8 h-8 text-cine-muted/20" />
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <h4 className="font-bold text-lg text-cine-text mb-2">Best audio experience in the city</h4>
              <p className="text-cine-muted font-light text-sm mb-4 leading-relaxed">
                "The acoustics in Screen 1 at PVR IMAX are phenomenal. I sat in row G (the sweet spot) and the bass was shaking the floor. However, the screen is slightly smaller than the classic 70mm IMAX."
              </p>
              <div className="flex items-center justify-between text-xs text-cine-muted mt-auto pt-4 border-t border-cine-border/50">
                <span className="font-semibold text-cine-text">Dennis Xavier</span>
                <span>Reviewed 2 days ago</span>
              </div>
            </div>

            {/* Review Card 2 */}
            <div className="glass-panel p-6 rounded-2xl relative shadow-lg shadow-black/5 hover:-translate-y-1 transition-transform duration-300">
              <User className="absolute top-6 right-6 w-8 h-8 text-cine-muted/20" />
              <div className="flex items-center gap-1 mb-3">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
                <Star className="w-4 h-4 text-zinc-300 dark:text-zinc-700" />
              </div>
              <h4 className="font-bold text-lg text-cine-text mb-2">Luxury at a premium</h4>
              <p className="text-cine-muted font-light text-sm mb-4 leading-relaxed">
                "Insignia offers amazing recliners that go almost flat. Food is brought to your seat. The 4K projection is crisp but the screen feels a bit small if you sit anywhere past row D."
              </p>
              <div className="flex items-center justify-between text-xs text-cine-muted mt-auto pt-4 border-t border-cine-border/50">
                <span className="font-semibold text-cine-text">Alex M.</span>
                <span>Reviewed 1 week ago</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-6 md:px-12 py-8 border-t border-cine-border/50 bg-cine-surface z-50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold tracking-widest uppercase text-cine-muted">
        <div className="flex items-center gap-2">
          <img src="/Logo.png" alt="Cineken Logo" className="h-4 w-auto opacity-50 grayscale" />
          <span>© 2026 CINEKEN</span>
        </div>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-cine-accent transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-cine-accent transition-colors">Terms</Link>
        </div>
        <div>
          Created with <span className="text-cine-accent mx-1 text-sm">♥</span> by <span className="text-cine-text ml-1">Dennis Xavier</span>
        </div>
      </footer>
    </div>
  );
}