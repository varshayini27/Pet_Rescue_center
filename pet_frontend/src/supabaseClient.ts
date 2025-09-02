import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qftpetgwtmwcklezgbmk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmdHBldGd3dG13Y2tsZXpnYm1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3OTcyNDcsImV4cCI6MjA3MjM3MzI0N30._flf0agr3bL1F2F-qvFelsEhAjP_nqEd58k0xL5gfA4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
