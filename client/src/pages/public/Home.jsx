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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Products</h1>

      <div className="grid grid-cols-4 gap-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="border p-3 cursor-pointer"
            onClick={() => navigate(`/product/${p._id}`)}
          >
            <h2>{p.name}</h2>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}