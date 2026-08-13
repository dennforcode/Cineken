import adminSupabase from "../../../supabase/Supabaseadmin";
import Link from "next/link";
import { Building2, MapPin, Plus, ExternalLink, MonitorPlay } from "lucide-react";

export default async function AdminDashboard() {
  const { data: chains, error: chainsError } = await adminSupabase
    .from("chains")
    .select("*")
    .order("name");

  const { data: theaters, error: theatersError } = await adminSupabase
    .from("theaters")
    .select("*, chains(name)")
    .order("name");

  const { data: auditoriums, error: auditoriumsError } = await adminSupabase
    .from("auditoriums")
    .select("*, theaters(name)")
    .order("name");

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/60 pb-6">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-100 mb-1.5">
            Dashboard
          </h2>
          <p className="text-zinc-500 text-sm">
            Overview of your cinema infrastructure and locations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chains Summary */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-zinc-400" />
              <h3 className="font-medium text-zinc-300">Chains</h3>
              <span className="text-xs font-medium bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full ml-1">
                {chains?.length || 0}
              </span>
            </div>
            <Link 
              href="/admin/chains/new"
              className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              Add New <Plus className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800/60 rounded-xl overflow-hidden shadow-sm">
            {chainsError && <div className="p-4 text-sm text-red-400">Error loading chains</div>}
            {chains?.length === 0 && <div className="p-4 text-sm text-zinc-500 text-center">No chains found.</div>}
            
            <div className="divide-y divide-zinc-800/60">
              {chains?.map((chain) => (
                <div key={chain.id} className="flex items-center justify-between p-4 hover:bg-zinc-800/30 transition-colors">
                  <span className="text-sm font-medium text-zinc-200">{chain.name}</span>
                  {chain.website && (
                    <a 
                      href={chain.website} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Theaters Summary */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-zinc-400" />
              <h3 className="font-medium text-zinc-300">Theaters</h3>
              <span className="text-xs font-medium bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full ml-1">
                {theaters?.length || 0}
              </span>
            </div>
            <Link 
              href="/admin/theaters/new"
              className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              Add New <Plus className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/60 rounded-xl overflow-hidden shadow-sm">
            {theatersError && <div className="p-4 text-sm text-red-400">Error loading theaters</div>}
            {theaters?.length === 0 && <div className="p-4 text-sm text-zinc-500 text-center">No theaters found.</div>}
            
            <div className="divide-y divide-zinc-800/60">
              {theaters?.map((theater) => (
                <div key={theater.id} className="flex items-center justify-between p-4 hover:bg-zinc-800/30 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-200">{theater.name}</span>
                    <span className="text-xs text-zinc-500 mt-0.5">{theater.city}, {theater.state}</span>
                  </div>
                  {/* @ts-ignore */}
                  <span className="text-[10px] font-medium text-zinc-400 bg-zinc-800 px-2 py-1 rounded-md border border-zinc-700/50">
                    {theater.chains?.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Screens Summary */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MonitorPlay className="w-4 h-4 text-zinc-400" />
              <h3 className="font-medium text-zinc-300">Screens</h3>
              <span className="text-xs font-medium bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full ml-1">
                {auditoriums?.length || 0}
              </span>
            </div>
            <Link 
              href="/admin/auditoriums/new"
              className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              Add New <Plus className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/60 rounded-xl overflow-hidden shadow-sm">
            {auditoriumsError && <div className="p-4 text-sm text-red-400">Error loading screens</div>}
            {auditoriums?.length === 0 && <div className="p-4 text-sm text-zinc-500 text-center">No screens found.</div>}
            
            <div className="divide-y divide-zinc-800/60">
              {auditoriums?.map((audi) => (
                <div key={audi.id} className="flex items-center justify-between p-4 hover:bg-zinc-800/30 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-200">{audi.name}</span>
                    <span className="text-xs text-zinc-500 mt-0.5">{audi.type || "Standard"}</span>
                  </div>
                  {/* @ts-ignore */}
                  <span className="text-[10px] font-medium text-zinc-400 bg-zinc-800 px-2 py-1 rounded-md border border-zinc-700/50">
                    {audi.theaters?.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
