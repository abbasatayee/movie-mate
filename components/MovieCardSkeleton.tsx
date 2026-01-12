import { Skeleton } from '@/components/ui/skeleton';

export function MovieCardSkeleton() {
  return (
    <div className="group w-full">
      {/* Thumbnail skeleton */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-800 mb-3">
        <Skeleton className="w-full h-full bg-gray-700" />
        
        {/* Score badge skeleton */}
        <div className="absolute bottom-2 right-2">
          <Skeleton className="h-5 w-10 bg-gray-600 rounded" />
        </div>
      </div>

      {/* Video Info skeleton */}
      <div className="flex gap-3">
        {/* Avatar skeleton */}
        <div className="flex-shrink-0">
          <Skeleton className="w-9 h-9 rounded-full bg-gray-700" />
        </div>

        {/* Title and metadata skeleton */}
        <div className="flex-1 min-w-0 space-y-2">
          <Skeleton className="h-4 w-full bg-gray-700 rounded" />
          <Skeleton className="h-3 w-3/4 bg-gray-700 rounded" />
          <Skeleton className="h-3 w-1/2 bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}
