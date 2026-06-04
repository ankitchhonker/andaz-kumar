import { createClient } from "@supabase/supabase-js";
import type { Course } from "@/types";

// Server-side Supabase client (no cookies needed for public data reads)
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, supabaseKey);
}

// Browser-side Supabase client
export function createBrowserSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(supabaseUrl, supabaseKey);
}

export async function fetchCourses(): Promise<Course[]> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase error:", error.message);
      return getFallbackCourses();
    }

    return data as Course[];
  } catch (err) {
    console.error("Failed to connect to Supabase:", err);
    return getFallbackCourses();
  }
}

// Fallback data if DB is not connected yet
function getFallbackCourses(): Course[] {
  return [
    {
      id: "1",
      title: "Advanced React Patterns",
      progress: 75,
      icon_name: "Code2",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "System Design Fundamentals",
      progress: 42,
      icon_name: "Network",
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      title: "TypeScript Deep Dive",
      progress: 91,
      icon_name: "FileCode",
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Next.js App Router",
      progress: 58,
      icon_name: "Layers",
      created_at: new Date().toISOString(),
    },
  ];
}
