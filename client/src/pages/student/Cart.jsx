import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getCart, removeFromCart } from "../../api/cart.api";

export default function Cart() {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    const res = await getCart(user.token);
    setCart(res.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (id) => {
    await removeFromCart(user.token, id);
    fetchCart();
  };

  if (!cart) return <h1>Loading...</h1>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.items.map(item => (
        <div key={item.productId._id}
          className="flex justify-between border p-4 mb-3 rounded shadow">
          
          <div>
            <h2>{item.productId.name}</h2>
            <p>₹{item.productId.price}</p>
          </div>

          <button
            onClick={() => handleRemove(item.productId._id)}
            className="bg-red-500 text-white px-3 py-1"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}