import Link from "next/link";
import { Film, Building2, MapPin, LayoutDashboard, MonitorPlay } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-50 flex flex-col md:flex-row font-sans selection:bg-zinc-800 selection:text-white">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0a0a0a] border-r border-zinc-800/60 p-6 flex flex-col gap-8 shrink-0 z-10">
        <div className="flex items-center gap-3 cursor-pointer mb-2 px-1">
          <div className="p-1.5 bg-zinc-100 rounded-lg shadow-sm">
            <Film className="w-5 h-5 text-zinc-950" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-100">
            Cineken Admin
          </h1>
        </div>
        
        <nav className="flex flex-col gap-1.5">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-2 px-3">Menu</div>
          <Link 
            href="/admin"
            className="group flex items-center justify-between px-3 py-2 rounded-md hover:bg-zinc-900 transition-colors duration-200"
          >
            <div className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-100 transition-colors">
              <LayoutDashboard className="w-4 h-4" />
              <span className="font-medium text-sm">Dashboard</span>
            </div>
          </Link>
          <Link 
            href="/admin/chains/new"
            className="group flex items-center justify-between px-3 py-2 rounded-md hover:bg-zinc-900 transition-colors duration-200"
          >
            <div className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-100 transition-colors">
              <Building2 className="w-4 h-4" />
              <span className="font-medium text-sm">Add Chain</span>
            </div>
          </Link>
          <Link 
            href="/admin/theaters/new"
            className="group flex items-center justify-between px-3 py-2 rounded-md hover:bg-zinc-900 transition-colors duration-200"
          >
            <div className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-100 transition-colors">
              <MapPin className="w-4 h-4" />
              <span className="font-medium text-sm">Add Theater</span>
            </div>
          </Link>
          <Link 
            href="/admin/auditoriums/new"
            className="group flex items-center justify-between px-3 py-2 rounded-md hover:bg-zinc-900 transition-colors duration-200"
          >
            <div className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-100 transition-colors">
              <MonitorPlay className="w-4 h-4" />
              <span className="font-medium text-sm">Add Screen</span>
            </div>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
