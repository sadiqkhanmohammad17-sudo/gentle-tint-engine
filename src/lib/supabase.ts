import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://gnrumghhsnqqjcqgqins.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImducnVtZ2hoc25xcWpjcWdxaW5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4NTg3MzgsImV4cCI6MjA5MzQzNDczOH0.K_45qFekxunTjhOapf7MJVXWJGXexR8-wAOn-UE1gE0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

export interface Appointment {
  id?: string;
  patient_name: string;
  phone: string;
  appointment_date: string; // YYYY-MM-DD
  appointment_time: string; // e.g. "10:30 AM"
  created_at?: string;
}
