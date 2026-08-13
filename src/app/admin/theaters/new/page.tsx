import { addTheater } from "../../actions";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import adminSupabase from "../../../../../supabase/Supabaseadmin";

export default async function NewTheaterPage() {
  const { data: chains } = await adminSupabase.from("chains").select("id, name").order("name");

  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-2">
        <Link
          href="/admin"
          className="p-2 bg-zinc-900 border border-zinc-800/60 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h2 className="text-2xl font-semibold text-zinc-100 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-zinc-400" />
            Add New Theater
          </h2>
        </div>
      </div>

      <form action={addTheater} className="bg-[#0a0a0a] border border-zinc-800/60 rounded-xl p-6 md:p-8 space-y-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="chain_id" className="block text-sm font-medium text-zinc-300">
              Cinema Chain <span className="text-zinc-500">*</span>
            </label>
            <select
              id="chain_id"
              name="chain_id"
              required
              defaultValue=""
              className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors appearance-none"
            >
              <option value="" disabled>Select a chain...</option>
              {chains?.map(chain => (
                <option key={chain.id} value={chain.id}>{chain.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
              Theater Name <span className="text-zinc-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="e.g. AMC Empire 25"
              className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="city" className="block text-sm font-medium text-zinc-300">
                City <span className="text-zinc-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                required
                placeholder="New York"
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="state" className="block text-sm font-medium text-zinc-300">
                State <span className="text-zinc-500">*</span>
              </label>
              <input
                type="text"
                id="state"
                name="state"
                required
                placeholder="NY"
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-medium text-zinc-300">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="234 W 42nd St"
              className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="website" className="block text-sm font-medium text-zinc-300">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              placeholder="https://..."
              className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="latitude" className="block text-sm font-medium text-zinc-300">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                id="latitude"
                name="latitude"
                placeholder="40.756"
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="longitude" className="block text-sm font-medium text-zinc-300">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                id="longitude"
                name="longitude"
                placeholder="-73.988"
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 flex justify-end gap-3 border-t border-zinc-800/60">
          <Link
            href="/admin"
            className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white bg-transparent hover:bg-zinc-900 rounded-md transition-colors border border-transparent"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 text-sm font-medium rounded-md transition-colors"
          >
            Save Theater
          </button>
        </div>
      </form>
    </div>
  );
}
