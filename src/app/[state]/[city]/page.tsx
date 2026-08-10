import adminSupabase from "../../../../supabase/Supabaseadmin";
import Link from "next/link";
import { MapPin, Film, ArrowLeft } from "lucide-react";

export default async function CityTheatersPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const resolvedParams = await params;
  const decodedState = decodeURIComponent(resolvedParams.state);
  const decodedCity = decodeURIComponent(resolvedParams.city);

  // Fetch theaters matching the state and city
  const { data: theaters, error } = await adminSupabase
    .from("theaters")
    .select("*, chains(name, logo_uri)")
    .ilike("state", decodedState)
    .ilike("city", decodedCity)
    .order("name");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center gap-4 border-b border-zinc-800 pb-6">
          <Link
            href="/"
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <MapPin className="w-8 h-8 text-blue-500" />
              Theaters in {decodedCity}, {decodedState}
            </h1>
            <p className="text-zinc-400 mt-1">Find your favorite cinema locations</p>
          </div>
        </div>

        {/* Content */}
        {error ? (
          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-red-400">
            Error loading theaters: {error.message}
          </div>
        ) : theaters?.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
            <Film className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No theaters found</h3>
            <p className="text-zinc-400">We couldn't find any theaters matching this location.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {theaters?.map((theater) => (
              <Link 
                href={`/theater/${theater.id}`}
                key={theater.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors group block"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {theater.name}
                      </h3>
                      {/* @ts-ignore */}
                      <p className="text-sm text-zinc-400 mt-1">{theater.chains?.name}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mt-6">
                    {theater.address && (
                      <div className="text-sm text-zinc-300 flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                        <span>{theater.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
