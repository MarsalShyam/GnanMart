import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/products");
      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Explore Products</h1>

      <div className="grid grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="border rounded shadow hover:shadow-lg p-4 cursor-pointer"
            onClick={() => navigate(`/product/${p._id}`)}
          >
            <div className="h-32 bg-gray-200 mb-2"></div>

            <h2 className="font-semibold">{p.name}</h2>
            <p className="text-green-600">₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}