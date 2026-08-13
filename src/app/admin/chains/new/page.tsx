import { addChain } from "../../actions";
import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";

export default function NewChainPage() {
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
            <Building2 className="w-5 h-5 text-zinc-400" />
            Add New Chain
          </h2>
        </div>
      </div>

      <form action={addChain} className="bg-[#0a0a0a] border border-zinc-800/60 rounded-xl p-6 md:p-8 space-y-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
              Chain Name <span className="text-zinc-500">*</span>
            </label>
            <input 
              type="text" 
              id="name"
              name="name" 
              required 
              placeholder="e.g. AMC Theatres"
              className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="logo_uri" className="block text-sm font-medium text-zinc-300">
              Logo URI <span className="text-zinc-500">*</span>
            </label>
            <input 
              type="url" 
              id="logo_uri"
              name="logo_uri" 
              required 
              placeholder="https://example.com/logo.png"
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
              placeholder="https://example.com"
              className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
            />
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
            Save Chain
          </button>
        </div>
      </form>
    </div>
  );
}
