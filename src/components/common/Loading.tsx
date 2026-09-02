import React from "react";

export const Loading: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="w-full">
      {message && (
        <div className="text-center mb-8 animate-pulse">
          <p className="text-lg font-medium text-text-muted">{message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-surface rounded-lg shadow-sm border border-slate-200/50 overflow-hidden flex flex-col h-full animate-pulse"
          >
            {/* Image Skeleton */}
            <div className="aspect-square bg-slate-200/50 dark:bg-slate-700/50 w-full"></div>

            <div className="p-4 flex flex-col flex-grow">
              {/* Title & Price Skeleton */}
              <div className="flex justify-between items-start mb-2 gap-2">
                <div className="h-5 w-2/3 bg-slate-200/50 dark:bg-slate-700/50 rounded"></div>
                <div className="h-5 w-16 bg-slate-200/50 dark:bg-slate-700/50 rounded"></div>
              </div>

              {/* Category Skeleton */}
              <div className="h-4 w-1/3 bg-slate-200/50 dark:bg-slate-700/50 rounded mb-3"></div>

              {/* Rating Skeleton */}
              <div className="h-4 w-12 bg-slate-200/50 dark:bg-slate-700/50 rounded mb-4"></div>

              {/* Button Skeleton */}
              <div className="mt-auto">
                <div className="h-10 w-full bg-slate-200/50 dark:bg-slate-700/50 rounded-md"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
