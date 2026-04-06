export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl p-10 flex items-center justify-between">

      {/* LEFT */}
      <div>
        <h1 className="text-4xl font-bold text-gray-800">
          Your Campus <span className="text-blue-600">Marketplace</span>
        </h1>

        <p className="mt-3 text-gray-600">
          Buy, Sell & Rent within GCT
        </p>

        <button className="mt-5 bg-blue-600 text-white px-6 py-2 rounded">
          Explore Now
        </button>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hidden md:block">
        <div className="w-64 h-40 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}