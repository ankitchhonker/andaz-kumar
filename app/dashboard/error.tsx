"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <section className="flex items-center justify-center min-h-screen p-8">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-rose-400" />
        </div>
        <h2 className="font-display text-xl font-bold text-white mb-2">
          Something went wrong
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          We couldn&apos;t load your dashboard data. This might be a database connection issue.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors duration-150"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      </div>
    </section>
  );
}
