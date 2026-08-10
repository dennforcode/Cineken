import { addChain } from "../../actions";
import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";

export default function NewChainPage() {
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
            <Building2 className="w-6 h-6 text-red-500" />
            Add New Chain
          </h2>
          <p className="text-zinc-400 text-sm">Register a new cinema chain in the system.</p>
        </div>
      </div>

      <form action={addChain} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1">
              Chain Name <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="name"
              name="name" 
              required 
              placeholder="e.g. AMC Theatres"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            />
          </div>
          
          <div>
            <label htmlFor="logo_uri" className="block text-sm font-medium text-zinc-300 mb-1">
              Logo URI <span className="text-red-500">*</span>
            </label>
            <input 
              type="url" 
              id="logo_uri"
              name="logo_uri" 
              required 
              placeholder="https://example.com/logo.png"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
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
              placeholder="https://example.com"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            />
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
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors shadow-lg shadow-red-500/20"
          >
            Save Chain
          </button>
        </div>
      </form>
    </div>
  );
}
