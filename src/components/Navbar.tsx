"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  backHref?: string;
  backText?: string;
  showMenu?: boolean;
  transparent?: boolean;
  hideLogoAndText?: boolean;
}

export function Navbar({ backHref, backText, showMenu = false, transparent = false, hideLogoAndText = false }: NavbarProps) {
  return (
    <header className={`z-50 flex justify-between items-center px-6 py-4 uppercase text-xs font-semibold tracking-[0.2em] text-cine-text ${transparent ? 'absolute top-0 inset-x-0 bg-transparent' : 'sticky top-0 glass-panel shadow-lg shadow-black/5'}`}>
      
      {/* Left side: Back Button or Logo or Empty */}
      {hideLogoAndText ? (
        <div></div>
      ) : backHref && backText ? (
        <Link href={backHref} className="flex items-center gap-3 hover:text-cine-accent transition-colors duration-300">
          <div className="w-6 h-6 rounded-full border border-cine-border flex items-center justify-center bg-cine-surface">
            <span className="text-[10px] leading-none mb-px">←</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/Logo.png" alt="Cineken Logo" className="h-6 w-auto object-contain" />
            <div className="tracking-[0.3em]">{backText}</div>
          </div>
        </Link>
      ) : (
        <Link href="/" className="flex items-center gap-2 hover:text-cine-accent transition-colors duration-300">
          <img src="/Logo.png" alt="Cineken Logo" className="h-6 w-auto object-contain" />
          <div className="tracking-[0.3em]">CINEKEN</div>
        </Link>
      )}

      {/* Right side: Menu info and Theme Toggle */}
      <div className="flex items-center gap-6">
        {showMenu && (
          <div className="hidden sm:block text-cine-muted font-light">
            • LEGENDARY SCREENS
          </div>
        )}
        <ThemeToggle />
        {showMenu && (
          <div className="flex flex-col gap-[4px] w-6 cursor-pointer group">
            <div className="h-[2px] w-full bg-cine-text rounded-full group-hover:bg-cine-accent transition-colors"></div>
            <div className="h-[2px] w-2/3 bg-cine-text rounded-full self-end group-hover:bg-cine-accent transition-colors"></div>
          </div>
        )}
      </div>
    </header>
  );
}
