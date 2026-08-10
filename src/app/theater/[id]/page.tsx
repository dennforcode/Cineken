import adminSupabase from "../../../../supabase/Supabaseadmin";
import Link from "next/link";
import { MapPin, ArrowLeft, Navigation } from "lucide-react";
import { notFound } from "next/navigation";

export default async function TheaterDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const theaterId = parseInt(resolvedParams.id, 10);

  if (isNaN(theaterId)) {
    notFound();
  }

  const { data: theater, error } = await adminSupabase
    .from("theaters")
    .select("*, chains(name, logo_uri, website)")
    .eq("id", theaterId)
    .single();

  if (error || !theater) {
    console.error("Error fetching theater:", error);
    notFound();
  }

  // @ts-ignore
  const chain = theater.chains;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Navigation */}
        <div>
          <Link
            href={`/${encodeURIComponent(theater.state)}/${encodeURIComponent(theater.city)}`}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {theater.city}, {theater.state} Theaters
          </Link>
        </div>

        {/* Theater Header Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            {chain?.logo_uri && (
              <img src={chain.logo_uri} alt="" className="w-48 h-48 object-contain" />
            )}
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {chain?.logo_uri && (
                  <img src={chain.logo_uri} alt={chain.name} className="w-8 h-8 rounded-full bg-white object-contain p-1" />
                )}
                <span className="text-blue-400 font-medium tracking-wide text-sm uppercase">{chain?.name || 'Independent Theater'}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                {theater.name}
              </h1>

              <div className="flex flex-col gap-3 mt-6">
                <div className="flex items-start gap-3 text-zinc-300">
                  <MapPin className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    {theater.address && <p>{theater.address}</p>}
                    <p>{theater.city}, {theater.state}</p>
                  </div>
                </div>

                {theater.website && (
                  <a
                    href={theater.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mt-2"
                  >
                    Visit Official Website &rarr;
                  </a>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="shrink-0 flex gap-3">
              {(theater.latitude && theater.longitude) || theater.address ? (
                <a
                  href={`https://maps.google.com/?q=${theater.latitude || ''},${theater.longitude || ''}${!theater.latitude ? encodeURIComponent(theater.address + ' ' + theater.city + ' ' + theater.state) : ''}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors border border-zinc-700"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* Additional sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
            <p className="text-zinc-500">Showtimes integration coming soon...</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h3 className="font-semibold text-white mb-4">Theater Details</h3>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex justify-between border-b border-zinc-800/50 pb-2">
                <span>Chain</span>
                <span className="text-zinc-200">{chain?.name || 'N/A'}</span>
              </li>
              <li className="flex justify-between border-b border-zinc-800/50 pb-2">
                <span>City</span>
                <span className="text-zinc-200">{theater.city}</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>State</span>
                <span className="text-zinc-200">{theater.state}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
