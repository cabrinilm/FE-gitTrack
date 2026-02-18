import { createClient, SupabaseClient } from "@supabase/supabase-js";
console.log("Error")
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if(!supabaseUrl || !supabaseKey){
    throw new Error("Missing Supabase credentials. Check your .env.local file for VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY");
}
console.log("Error")
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);