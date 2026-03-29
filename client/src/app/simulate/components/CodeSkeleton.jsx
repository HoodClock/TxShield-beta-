"use client";

import Skeleton from "@/app/components/Skeleton";

export default function CodeSkeleton() {
  return (
    <div className="p-4 space-y-3">
      <Skeleton className="h-5 w-1/4" />

      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-full" />
        ))}
      </div>
    </div>
  );
}