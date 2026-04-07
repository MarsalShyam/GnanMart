import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.jsx";
import { addToCart } from "../../api/cart.api.js";
import { toggleWishlist } from "../../api/wishlist.api.js";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (!user) {
      alert("Please login first");
      return navigate("/login");
    }

    try {
      await addToCart(user.token, product._id);
      alert("Added to cart!");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleWishlist = async (e) => {
    e.stopPropagation();

    if (!user) {
      alert("Please login first");
      return navigate("/login");
    }

    try {
      await toggleWishlist(user.token, product._id);
      alert("Wishlist updated!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow hover:shadow-xl transition p-3 cursor-pointer flex flex-col justify-between"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <div>
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="h-40 w-full object-cover rounded-lg"
        />
        <h3 className="mt-2 font-semibold text-sm line-clamp-1">
          {product.name}
        </h3>
        <p className="text-blue-600 font-bold mt-1">
          ₹{product.price}
        </p>
      </div>

      <div className="mt-3">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-600">⭐ 4.2</span>

          <button
            onClick={handleWishlist}
            className="p-1 rounded-full hover:bg-red-50 transition"
          >
            <FaHeart className="text-gray-300 hover:text-red-500 text-lg" />
          </button>
        </div>

        {/* ✅ ADD TO CART BUTTON */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}