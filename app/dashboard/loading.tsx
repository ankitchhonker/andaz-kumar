export default function DashboardLoading() {
  return (
    <section className="p-6 lg:p-8">
      {/* Header skeleton */}
      <div className="mb-8 flex items-center gap-4">
        <div className="skeleton h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <div className="skeleton h-5 w-48 rounded-md" />
          <div className="skeleton h-3 w-32 rounded-md" />
        </div>
      </div>

      {/* Bento grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Hero tile */}
        <div className="skeleton col-span-1 md:col-span-2 lg:col-span-2 h-52 rounded-2xl" />
        {/* Streak tile */}
        <div className="skeleton h-52 rounded-2xl" />
        {/* Course tiles */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton h-44 rounded-2xl" />
        ))}
        {/* Activity tile */}
        <div className="skeleton col-span-1 md:col-span-2 lg:col-span-3 h-52 rounded-2xl" />
      </div>
    </section>
  );
}
