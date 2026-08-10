import { createClient } from "@supabase/supabase-js";
import { Database } from "../database.types";

const adminSupabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.SUPABASE_SECRET || "");

export default adminSupabase;