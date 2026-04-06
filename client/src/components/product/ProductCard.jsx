import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-xl shadow hover:shadow-xl transition p-4 cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      {/* IMAGE */}
      <div className="h-40 bg-gray-200 rounded mb-3 flex items-center justify-center">
        <span className="text-gray-400 text-sm">Image</span>
      </div>

      {/* NAME */}
      <h3 className="font-semibold text-gray-800">
        {product.name}
      </h3>

      {/* PRICE */}
      <p className="text-blue-600 font-bold">
        ₹{product.price}
      </p>
    </div>
  );
}