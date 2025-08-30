import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ypfiuimgibtrthhpreax.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZml1aW1naWJ0cnRoaHByZWF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MTYxMTUsImV4cCI6MjA2ODE5MjExNX0.uFCvhjb1dROIYj9cHFmkkhl-tocuTZbbgzGFOez72ZE";

export const supabase = createClient(supabaseUrl, supabaseKey);
