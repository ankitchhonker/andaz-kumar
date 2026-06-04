import { Suspense } from "react";
import { fetchCourses } from "@/lib/supabase";
import { BentoGrid } from "@/components/dashboard/BentoGrid";
import { CoursesSkeleton } from "@/components/ui/Skeletons";

// Force dynamic rendering so we always get fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardPage() {
  const courses = await fetchCourses();

  return (
    <Suspense fallback={<CoursesSkeleton />}>
      <BentoGrid courses={courses} />
    </Suspense>
  );
}
