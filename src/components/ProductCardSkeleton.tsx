const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64 bg-gray-200 animate-pulse">
        <div className="absolute inset-0 bg-gray-300"></div>
      </div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-3"></div>
        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2 mb-3"></div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
          <div className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;