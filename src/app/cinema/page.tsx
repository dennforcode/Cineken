import Link from "next/link";
import screensData from "@/data/screens.json";
import { Navbar } from "@/components/Navbar";
import { FormatBadge } from "@/components/FormatBadge";
import "./cinema.css";

export default function CinemaDirectory() {
  return (
    <div className="premium-body selection:bg-cine-accent selection:text-white min-h-screen">
      <div className="fixed top-0 inset-x-0 h-96 bg-gradient-to-b from-cine-accent/5 to-transparent pointer-events-none -z-10"></div>
      
      {/* Header */}
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-16">
        <div className="mb-16">
          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-4 text-cine-accent">DIRECTORY</div>
          <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight mb-4">
            LEGENDARY SCREENS
          </h1>
          <p className="font-light text-cine-muted max-w-xl text-lg">
            A curated collection of the world's finest auditoriums, featuring reference-grade projection and acoustic architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {screensData.map((screen) => {
            const isBlue = screen.colorTheme === "blue";
            const hoverGlow = isBlue ? "hover:border-[#0055FF]/40 hover:shadow-[0_0_30px_rgba(0,85,255,0.15)]" : "hover:border-cine-accent/40 hover:shadow-[0_0_30px_rgba(229,9,20,0.15)]";
            
            return (
              <Link 
                key={screen.id} 
                href={`/cinema/${screen.id}`}
                className={`flex flex-col p-8 rounded-2xl bg-cine-surface border border-cine-border transition-all duration-300 ${hoverGlow} group`}
              >
                <div className="flex-1 mb-8">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {screen.badges.map(b => (
                      <FormatBadge key={b} format={b as any} />
                    ))}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cine-muted mb-2">
                    {screen.chain}
                  </div>
                  <h2 className="font-display text-3xl font-medium mb-1">
                    {screen.auditorium}
                  </h2>
                  <div className="text-sm font-light text-cine-muted">
                    {screen.venue}
                  </div>
                </div>
                
                <div className="mt-auto border-t border-cine-border pt-6 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cine-muted mb-1">VISUAL</div>
                    <div className="font-display text-xl">{screen.ratings.visual}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cine-muted mb-1">AUDIO</div>
                    <div className="font-display text-xl">{screen.ratings.audio}</div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  );
}
