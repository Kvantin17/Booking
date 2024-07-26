import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ubpjqrbkxuuntllpfsmw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVicGpxcmJreHV1bnRsbHBmc213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MDc0OTUsImV4cCI6MjAzNzM4MzQ5NX0.thviQDep6cBS1DIiLvmnzkSQ9VhQybQCtELAAFv5HCU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
