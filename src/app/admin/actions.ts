"use server";

import adminSupabase from "../../../supabase/Supabaseadmin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addChain(formData: FormData) {
  const name = formData.get("name") as string;
  const logo_uri = formData.get("logo_uri") as string;
  const website = formData.get("website") as string;

  if (!name || !logo_uri) {
    throw new Error("Name and Logo URI are required");
  }

  const { error } = await adminSupabase.from("chains").insert({
    name,
    logo_uri,
    website: website || null,
  });

  if (error) {
    console.error("Error inserting chain:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function addTheater(formData: FormData) {
  const chain_id = parseInt(formData.get("chain_id") as string);
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  const website = formData.get("website") as string;
  
  const latString = formData.get("latitude") as string;
  const lonString = formData.get("longitude") as string;
  
  const latitude = latString ? parseFloat(latString) : null;
  const longitude = lonString ? parseFloat(lonString) : null;

  if (!chain_id || !name || !city || !state) {
    throw new Error("Chain, Name, City, and State are required");
  }

  const { error } = await adminSupabase.from("theaters").insert({
    chain_id,
    name,
    address: address || null,
    city,
    state,
    website: website || null,
    latitude,
    longitude,
  });

  if (error) {
    console.error("Error inserting theater:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function addAuditorium(formData: FormData) {
  const theater_id = parseInt(formData.get("theater_id") as string);
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  
  if (!theater_id || !name || !slug) {
    throw new Error("Theater, Name, and Slug are required");
  }

  const type = formData.get("type") as string;
  const screen_width = formData.get("screen_width") ? parseFloat(formData.get("screen_width") as string) : null;
  const screen_height = formData.get("screen_height") ? parseFloat(formData.get("screen_height") as string) : null;
  const aspect_ratio = formData.get("aspect_ratio") as string;
  const is_curved = formData.get("is_curved") === "on";
  const projection = formData.get("projection") as string;
  const projection_desc = formData.get("projection_desc") as string;
  const audio = formData.get("audio") as string;
  const audio_desc = formData.get("audio_desc") as string;
  const seating_capacity = formData.get("seating_capacity") ? parseInt(formData.get("seating_capacity") as string) : null;
  const certification = formData.get("certification") as string;
  const color_theme = formData.get("color_theme") as string;
  const photo_url = formData.get("photo_url") as string;

  // Insert into auditoriums
  const { data: audi, error: audiError } = await adminSupabase.from("auditoriums").insert({
    theater_id,
    name,
    slug,
    type: type || null,
    screen_width,
    screen_height,
    aspect_ratio: aspect_ratio || null,
    is_curved,
    projection: projection || null,
    projection_desc: projection_desc || null,
    audio: audio || null,
    audio_desc: audio_desc || null,
    seating_capacity,
    certification: certification || null,
    color_theme: color_theme || null,
    photo_url: photo_url || null,
  }).select("id").single();

  if (audiError) {
    console.error("Error inserting auditorium:", audiError);
    throw new Error(audiError.message);
  }

  const auditorium_id = audi.id;

  // Ratings
  const visual_score = formData.get("visual_score") ? parseFloat(formData.get("visual_score") as string) : null;
  const audio_score = formData.get("audio_score") ? parseFloat(formData.get("audio_score") as string) : null;
  const overall_score = formData.get("overall_score") ? parseFloat(formData.get("overall_score") as string) : null;
  const third_label = formData.get("third_label") as string;
  const third_score = formData.get("third_score") ? parseFloat(formData.get("third_score") as string) : null;

  if (visual_score || audio_score || overall_score || third_label || third_score) {
    const { error: ratingError } = await adminSupabase.from("audi_ratings").insert({
      auditorium_id,
      visual_score,
      audio_score,
      overall_score,
      third_label: third_label || null,
      third_score,
    });
    if (ratingError) {
      console.error("Error inserting audi ratings:", ratingError);
    }
  }

  // Badges
  const badgesStr = formData.get("badges") as string;
  if (badgesStr) {
    const badges = badgesStr.split(",").map(b => b.trim()).filter(b => b.length > 0);
    if (badges.length > 0) {
      const badgeInserts = badges.map(badge_name => ({
        auditorium_id,
        badge_name
      }));
      const { error: badgeError } = await adminSupabase.from("audi_badges").insert(badgeInserts);
      if (badgeError) {
        console.error("Error inserting audi badges:", badgeError);
      }
    }
  }

  revalidatePath("/admin");
  redirect("/admin");
}
