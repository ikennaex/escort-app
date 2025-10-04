const EscortSkeletonLoader = () => {
  return (
    <div className="w-full max-w-xs bg-gray-800 rounded-lg border border-gray-700 overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="relative w-full h-60 bg-gray-700">
        <div className="absolute top-2 right-2 w-16 h-6 bg-gray-600 rounded"></div>
      </div>

      {/* Content skeleton */}
      <div className="p-3 space-y-3">
        <div className="h-5 w-24 bg-gray-600 rounded"></div> {/* Name */}
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
          <div className="h-4 w-32 bg-gray-600 rounded"></div> {/* Phone */}
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
          <div className="h-4 w-40 bg-gray-600 rounded"></div> {/* Location */}
        </div>
        <div className="h-4 w-36 bg-gray-600 rounded"></div> {/* Bio */}
      </div>
    </div>
  );
};

export default EscortSkeletonLoader;