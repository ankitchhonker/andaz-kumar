export function CoursesSkeleton() {
  return (
    <section className="p-5 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Hero */}
        <div className="skeleton col-span-1 md:col-span-2 h-52 rounded-2xl" />
        {/* Streak */}
        <div className="skeleton h-52 rounded-2xl" />
        {/* Stats */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton h-32 rounded-2xl" />
        ))}
        {/* Courses */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton h-44 rounded-2xl" />
        ))}
        {/* Activity */}
        <div className="skeleton col-span-1 md:col-span-2 lg:col-span-3 h-52 rounded-2xl" />
      </div>
    </section>
  );
}

export function CourseSkeleton() {
  return (
    <div className="skeleton rounded-2xl h-44" />
  );
}
