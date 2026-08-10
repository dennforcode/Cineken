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
