import { addAuditorium } from "../../actions";
import Link from "next/link";
import { ArrowLeft, MonitorPlay } from "lucide-react";
import adminSupabase from "../../../../../supabase/Supabaseadmin";

export default async function NewAuditoriumPage() {
  const { data: theaters } = await adminSupabase.from("theaters").select("id, name, city").order("name");

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-2">
        <Link
          href="/admin"
          className="p-2 bg-zinc-900 border border-zinc-800/60 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h2 className="text-2xl font-semibold text-zinc-100 flex items-center gap-2">
            <MonitorPlay className="w-5 h-5 text-zinc-400" />
            Add New Screen
          </h2>
        </div>
      </div>

      <form action={addAuditorium} className="bg-[#0a0a0a] border border-zinc-800/60 rounded-xl p-6 md:p-8 space-y-8">
        
        {/* SECTION: BASIC INFO */}
        <div className="space-y-6">
          <h3 className="text-sm font-semibold text-zinc-100 border-b border-zinc-800/60 pb-2">Basic Information</h3>
          
          <div className="space-y-2">
            <label htmlFor="theater_id" className="block text-sm font-medium text-zinc-300">
              Theater <span className="text-zinc-500">*</span>
            </label>
            <select
              id="theater_id"
              name="theater_id"
              required
              defaultValue=""
              className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors appearance-none"
            >
              <option value="" disabled>Select a theater...</option>
              {theaters?.map(theater => (
                <option key={theater.id} value={theater.id}>{theater.name} ({theater.city})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
                Auditorium Name <span className="text-zinc-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="e.g. IMAX GT"
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="slug" className="block text-sm font-medium text-zinc-300">
                Slug (Unique ID) <span className="text-zinc-500">*</span>
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                required
                placeholder="e.g. science-city"
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-medium text-zinc-300">
                Type
              </label>
              <input
                type="text"
                id="type"
                name="type"
                placeholder="e.g. Premium Large Format"
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="seating_capacity" className="block text-sm font-medium text-zinc-300">
                Seating Capacity
              </label>
              <input
                type="number"
                id="seating_capacity"
                name="seating_capacity"
                placeholder="e.g. 650"
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>
            
            <div className="flex items-center justify-between h-full pt-6">
              <label htmlFor="is_curved" className="text-sm font-medium text-zinc-300 cursor-pointer">
                Curved Screen?
              </label>
              <input
                type="checkbox"
                id="is_curved"
                name="is_curved"
                className="w-5 h-5 rounded-md border-zinc-800/60 bg-[#050505] text-zinc-100 focus:ring-zinc-500 focus:ring-offset-0 focus:ring-1 transition-colors cursor-pointer accent-zinc-500"
              />
            </div>
          </div>
        </div>

        {/* SECTION: SCREEN & PROJECTION */}
        <div className="space-y-6 pt-4">
          <h3 className="text-sm font-semibold text-zinc-100 border-b border-zinc-800/60 pb-2">Screen & Projection</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="screen_width" className="block text-sm font-medium text-zinc-300">
                Width (ft)
              </label>
              <input
                type="number"
                step="any"
                id="screen_width"
                name="screen_width"
                placeholder="96"
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="screen_height" className="block text-sm font-medium text-zinc-300">
                Height (ft)
              </label>
              <input
                type="number"
                step="any"
                id="screen_height"
                name="screen_height"
                placeholder="67"
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="aspect_ratio" className="block text-sm font-medium text-zinc-300">
                Aspect Ratio
              </label>
              <input
                type="text"
                id="aspect_ratio"
                name="aspect_ratio"
                placeholder="1.43:1"
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="projection" className="block text-sm font-medium text-zinc-300">
                Projection System
              </label>
              <input
                type="text"
                id="projection"
                name="projection"
                placeholder="IMAX XT Laser 4K"
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="projection_desc" className="block text-sm font-medium text-zinc-300">
                Projection Description
              </label>
              <input
                type="text"
                id="projection_desc"
                name="projection_desc"
                placeholder="Dual 4K laser setup..."
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* SECTION: AUDIO */}
        <div className="space-y-6 pt-4">
          <h3 className="text-sm font-semibold text-zinc-100 border-b border-zinc-800/60 pb-2">Audio System</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="audio" className="block text-sm font-medium text-zinc-300">
                Audio Type
              </label>
              <input
                type="text"
                id="audio"
                name="audio"
                placeholder="Dolby Atmos"
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="audio_desc" className="block text-sm font-medium text-zinc-300">
                Audio Description
              </label>
              <input
                type="text"
                id="audio_desc"
                name="audio_desc"
                placeholder="64-channel spatial audio..."
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* SECTION: RATINGS & METADATA */}
        <div className="space-y-6 pt-4">
          <h3 className="text-sm font-semibold text-zinc-100 border-b border-zinc-800/60 pb-2">Ratings & Metadata</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label htmlFor="visual_score" className="block text-sm font-medium text-zinc-300">
                Visual Score
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                id="visual_score"
                name="visual_score"
                placeholder="10.0"
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="audio_score" className="block text-sm font-medium text-zinc-300">
                Audio Score
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                id="audio_score"
                name="audio_score"
                placeholder="9.8"
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="overall_score" className="block text-sm font-medium text-zinc-300">
                Overall Score
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                id="overall_score"
                name="overall_score"
                placeholder="9.9"
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="third_label" className="block text-sm font-medium text-zinc-300">
                Third Metric Label
              </label>
              <input
                type="text"
                id="third_label"
                name="third_label"
                placeholder="e.g. IMMERSION"
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="third_score" className="block text-sm font-medium text-zinc-300">
                Third Metric Score
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                id="third_score"
                name="third_score"
                placeholder="10.0"
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="certification" className="block text-sm font-medium text-zinc-300">
                Certification
              </label>
              <input
                type="text"
                id="certification"
                name="certification"
                placeholder="REFERENCE SCREEN"
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="color_theme" className="block text-sm font-medium text-zinc-300">
                Color Theme
              </label>
              <select
                id="color_theme"
                name="color_theme"
                defaultValue=""
                className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors appearance-none"
              >
                <option value="" disabled>Select theme...</option>
                <option value="blue">Blue (e.g. IMAX)</option>
                <option value="red">Red (e.g. PCX)</option>
                <option value="purple">Purple (e.g. ScreenX)</option>
                <option value="zinc">Zinc (Standard)</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="badges" className="block text-sm font-medium text-zinc-300">
              Badges (comma separated)
            </label>
            <input
              type="text"
              id="badges"
              name="badges"
              placeholder="imax, dolby-atmos, premium"
              className="w-full bg-[#050505] border border-zinc-800/60 rounded-md px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="photo_url" className="block text-sm font-medium text-zinc-300">
              Photo URL
            </label>
            <input
              type="text"
              id="photo_url"
              name="photo_url"
              placeholder="/cinemas/imax_GT.png"
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
            Save Auditorium
          </button>
        </div>
      </form>
    </div>
  );
}
