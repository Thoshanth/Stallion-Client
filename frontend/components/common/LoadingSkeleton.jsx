export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#262626] px-6 py-8 animate-pulse">
      {/* Header skeleton */}
      <div className="mb-12">
        <div className="h-12 bg-gray-700 rounded-lg w-1/3 mb-4"></div>
        <div className="h-6 bg-gray-700 rounded-lg w-2/3"></div>
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gradient-to-br from-black/40 to-black/20 rounded-lg p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-600 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-600 rounded w-16"></div>
              </div>
              <div className="w-12 h-12 bg-gray-600 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="bg-gradient-to-br from-black/40 to-black/20 rounded-lg p-8 border border-gray-700/50">
        <div className="h-8 bg-gray-600 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-600 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TableLoadingSkeleton({ rows = 5, columns = 6 }) {
  return (
    <div className="bg-gradient-to-br from-black/40 to-black/20 rounded-lg border border-gray-700/50 overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-700/50 p-6">
        <div className="grid grid-cols-6 gap-4">
          {[...Array(columns)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-600 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
      
      {/* Rows */}
      <div className="divide-y divide-gray-700/50">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="p-6">
            <div className="grid grid-cols-6 gap-4 items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-600 rounded-full animate-pulse"></div>
                <div>
                  <div className="h-4 bg-gray-600 rounded w-24 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-600 rounded w-16 animate-pulse"></div>
                </div>
              </div>
              {[...Array(columns - 1)].map((_, j) => (
                <div key={j} className="h-4 bg-gray-600 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardLoadingSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-gradient-to-br from-black/40 to-black/20 rounded-lg p-6 border border-gray-700/50">
          <div className="animate-pulse">
            <div className="w-24 h-24 bg-gray-600 rounded-full mx-auto mb-4"></div>
            <div className="h-6 bg-gray-600 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-600 rounded w-1/2 mx-auto mb-4"></div>
            <div className="flex gap-2 justify-center">
              <div className="h-6 bg-gray-600 rounded-full w-16"></div>
              <div className="h-6 bg-gray-600 rounded-full w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}