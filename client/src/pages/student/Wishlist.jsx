import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { getWishlist } from "../../api/wishlist.api.js";
import ProductCard from "../../components/product/ProductCard.jsx";
import SkeletonCard from "../../components/common/SkeletonCard.jsx";

export default function Wishlist() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState(null);

  const fetchWishlist = async () => {
    try {
      const res = await getWishlist(user.token);
      setWishlist(res.data.products || []);
    } catch (err) {
      console.log(err);
      setWishlist([]);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user.token]);

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">My Wishlist ❤️</h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {!wishlist ? (
              Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
            ) : wishlist.length === 0 ? (
              <div className="col-span-full text-center py-10 bg-white rounded-xl shadow text-gray-500">
                Your wishlist is empty. Start saving your favorite items!
              </div>
            ) : (
              wishlist.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}