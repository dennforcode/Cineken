import { addTheater } from "../../actions";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import adminSupabase from "../../../../../supabase/Supabaseadmin";

export default async function NewTheaterPage() {
  const { data: chains } = await adminSupabase.from("chains").select("id, name").order("name");

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin"
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <MapPin className="w-6 h-6 text-blue-500" />
            Add New Theater
          </h2>
          <p className="text-zinc-400 text-sm">Register a new theater location.</p>
        </div>
      </div>

      <form action={addTheater} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="chain_id" className="block text-sm font-medium text-zinc-300 mb-1">
              Cinema Chain <span className="text-blue-500">*</span>
            </label>
            <select
              id="chain_id"
              name="chain_id"
              required
              defaultValue=""
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none"
            >
              <option value="" disabled>Select a chain...</option>
              {chains?.map(chain => (
                <option key={chain.id} value={chain.id}>{chain.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1">
              Theater Name <span className="text-blue-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="e.g. AMC Empire 25"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-zinc-300 mb-1">
                City <span className="text-blue-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                required
                placeholder="New York"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-zinc-300 mb-1">
                State <span className="text-blue-500">*</span>
              </label>
              <input
                type="text"
                id="state"
                name="state"
                required
                placeholder="NY"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-zinc-300 mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="234 W 42nd St"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-zinc-300 mb-1">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              placeholder="https://..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="latitude" className="block text-sm font-medium text-zinc-300 mb-1">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                id="latitude"
                name="latitude"
                placeholder="40.756"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label htmlFor="longitude" className="block text-sm font-medium text-zinc-300 mb-1">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                id="longitude"
                name="longitude"
                placeholder="-73.988"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-zinc-800">
          <Link
            href="/admin"
            className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors shadow-lg shadow-blue-500/20"
          >
            Save Theater
          </button>
        </div>
      </form>
    </div>
  );
}
