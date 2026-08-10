import adminSupabase from "../../../supabase/Supabaseadmin";
import Link from "next/link";
import { Building2, MapPin, Plus } from "lucide-react";

export default async function AdminDashboard() {
  const { data: chains, error: chainsError } = await adminSupabase
    .from("chains")
    .select("*")
    .order("name");

  const { data: theaters, error: theatersError } = await adminSupabase
    .from("theaters")
    .select("*, chains(name)")
    .order("name");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-white">Dashboard Overview</h2>
        <p className="text-zinc-400">Manage your cinema chains and theater locations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chains Summary */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <Building2 className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white">Chains</h3>
            </div>
            <Link 
              href="/admin/chains/new"
              className="flex items-center gap-2 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md transition-colors"
            >
              <Plus className="w-4 h-4" /> Add
            </Link>
          </div>
          
          <div className="space-y-4">
            {chainsError && <p className="text-red-400">Error loading chains</p>}
            {chains?.length === 0 && <p className="text-zinc-500 text-sm">No chains added yet.</p>}
            {chains?.map(chain => (
              <div key={chain.id} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
                <span className="font-medium text-zinc-200">{chain.name}</span>
                {chain.website && (
                  <a href={chain.website} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">Link</a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Theaters Summary */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white">Theaters</h3>
            </div>
            <Link 
              href="/admin/theaters/new"
              className="flex items-center gap-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md transition-colors"
            >
              <Plus className="w-4 h-4" /> Add
            </Link>
          </div>

          <div className="space-y-4">
            {theatersError && <p className="text-red-400">Error loading theaters</p>}
            {theaters?.length === 0 && <p className="text-zinc-500 text-sm">No theaters added yet.</p>}
            {theaters?.map(theater => (
              <div key={theater.id} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
                <div>
                  <div className="font-medium text-zinc-200">{theater.name}</div>
                  <div className="text-xs text-zinc-500">{theater.city}, {theater.state}</div>
                </div>
                {/* @ts-ignore */}
                <div className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-300">{theater.chains?.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
