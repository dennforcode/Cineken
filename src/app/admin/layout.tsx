import Link from "next/link";
import { Film, Building2, MapPin, LayoutDashboard } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col gap-8 shrink-0">
        <div className="flex items-center gap-3 text-red-500">
          <Film className="w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tight">Admin</h1>
        </div>
        
        <nav className="flex flex-col gap-2">
          <Link 
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-zinc-800 transition-colors text-zinc-300 hover:text-white"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link 
            href="/admin/chains/new"
            className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-zinc-800 transition-colors text-zinc-300 hover:text-white"
          >
            <Building2 className="w-5 h-5" />
            Add Chain
          </Link>
          <Link 
            href="/admin/theaters/new"
            className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-zinc-800 transition-colors text-zinc-300 hover:text-white"
          >
            <MapPin className="w-5 h-5" />
            Add Theater
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
