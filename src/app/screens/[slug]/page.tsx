import adminSupabase from "../../../../supabase/Supabaseadmin";
import CinemaComponent, { ScreenData } from "@/components/Cinema";
import { layouts } from "@/data/layouts";
import { notFound } from "next/navigation";

export default async function ScreenPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // @ts-ignore - Ignore complex TS typings for Supabase joins
  const { data: audi, error } = await adminSupabase
    .from('auditoriums')
    .select(`
      *,
      theaters (
        name,
        chains (
          name
        )
      ),
      audi_ratings (*),
      audi_badges (badge_name)
    `)
    .eq('slug', slug)
    .single();
    
  if (error || !audi) {
    notFound();
  }

  // Format data into ScreenData
  // audi_ratings is a 1-to-1 relation (object), but we handle array just in case.
  const ratings: any = Array.isArray(audi.audi_ratings) 
    ? audi.audi_ratings[0] 
    : audi.audi_ratings || {};
  const badges = audi.audi_badges ? audi.audi_badges.map((b: any) => b.badge_name) : [];
  
  // Handling the string representations
  const screenWidthStr = audi.screen_width ? `${audi.screen_width} ft` : "Unknown";
  const screenHeightStr = audi.screen_height ? `${audi.screen_height} ft` : "Unknown";
  const seatingStr = audi.seating_capacity ? `${audi.seating_capacity}` : "N/A";

  const screenData: ScreenData = {
    id: audi.slug,
    // @ts-ignore
    chain: audi.theaters?.chains?.name || "Unknown Chain",
    // @ts-ignore
    venue: audi.theaters?.name || "Unknown Venue",
    auditorium: audi.name,
    badges: badges,
    screenWidth: screenWidthStr,
    screenHeight: screenHeightStr,
    aspectRatio: audi.aspect_ratio || "Unknown",
    projection: audi.projection || "Standard Projection",
    projectionDesc: audi.projection_desc || "",
    audio: audi.audio || "Standard Audio",
    audioDesc: audi.audio_desc || "",
    seating: seatingStr,
    type: audi.type || "Standard",
    ratings: {
      visual: ratings.visual_score?.toFixed(1) || "N/A",
      audio: ratings.audio_score?.toFixed(1) || "N/A",
      thirdLabel: ratings.third_label || "IMMERSION",
      thirdScore: ratings.third_score?.toFixed(1) || "N/A",
      overall: ratings.overall_score?.toFixed(1) || "N/A"
    },
    certification: audi.certification || "UNRATED",
    colorTheme: audi.color_theme || "zinc",
    isCurved: audi.is_curved ?? undefined,
    photoUrl: audi.photo_url || undefined
  };

  // Check if we have a layout in layouts.ts mapping to this slug
  const layout = layouts[audi.slug] || [];

  return <CinemaComponent screen={screenData} layoutSections={layout} />;
}
