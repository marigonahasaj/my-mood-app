import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sijgotagzyyzbnyojthw.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpamdvdGFnenl5emJueW9qdGh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNjA1MDUsImV4cCI6MjA2NzgzNjUwNX0.cr8W0v2WLpjg1J1EKFqMKno0fzxTFH5aMTE4ReXhitM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
