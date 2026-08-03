import CinemaComponent from "@/components/Cinema";
import screensData from "@/data/screens.json";
import { layouts } from "@/data/layouts";
import { notFound } from "next/navigation";

export default async function CinemaScreenPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const screen = screensData.find(s => s.id === id);
  
  if (!screen) {
    notFound();
  }

  const layout = layouts[id];

  return <CinemaComponent screen={screen} layoutSections={layout} />;
}
