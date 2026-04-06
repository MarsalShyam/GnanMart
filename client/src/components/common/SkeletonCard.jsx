export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white p-4 rounded shadow">
      <div className="h-40 bg-gray-300 rounded mb-3"></div>
      <div className="h-4 bg-gray-300 mb-2"></div>
      <div className="h-4 bg-gray-200 w-1/2"></div>
    </div>
  );
}