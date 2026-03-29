"use client";

import Skeleton from "@/app/components/Skeleton";

export default function TransactionSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="h-6 w-1/3" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}