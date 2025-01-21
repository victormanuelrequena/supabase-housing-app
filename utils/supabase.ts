import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseUrl = "https://zvmkfmmyipmapdpbumny.supabase.co";

// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2bWtmbW15aXBtYXBkcGJ1bW55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NDMwNDcsImV4cCI6MjA1MzAxOTA0N30.WqX3N7I_CYtyFCcEK_v228qsK9TVFuq2Yd7sDo7xV6M";

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const isSupabaseConnected = !!supabase;

//*Ys7#bQr6Q9X.qN
