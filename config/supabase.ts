import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl: string = 'https://ougtnucobawcwkuqpski.supabase.co';
const supabaseKey: string | undefined = process.env.SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error("Missing SUPABASE_KEY in environment variables");
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

