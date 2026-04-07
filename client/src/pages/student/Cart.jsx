import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/AuthContext";
import {
  getCart,
  removeFromCart,
} from "../../api/cart.api";
import { placeOrder } from "../../api/order.api";

export default function Cart() {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    const res = await getCart(user.token);
    setCart(res.data);
  };

  useEffect(() => {
    if (user) fetchCart();
  }, [user]);

  // ✅ REMOVE FUNCTION (you missed this)
  const handleRemove = async (productId) => {
    try {
      await removeFromCart(user.token, productId);
      fetchCart();
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  // ✅ PLACE ORDER
  const handleOrder = async () => {
    await placeOrder(user.token);
    alert("Order placed successfully");
    fetchCart();
  };

  // ✅ EMPTY CHECK (SAFE)
  if (!cart || !cart.items || cart.items.length === 0) {
    return <h1 className="p-6">Your cart is empty 🛒</h1>;
  }

  // ✅ TOTAL CALCULATION (ADDED)
  const total = cart.items.reduce(
    (sum, i) => sum + i.productId.price * i.quantity,
    0
  );

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Cart</h1>

        {cart.items.map((item) => (
          <div
            key={item.productId._id}
            className="flex justify-between items-center border p-4 mb-3 rounded shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.productId.image}
                className="h-16 w-16 object-cover rounded"
              />

              <div>
                <h2 className="font-semibold">{item.productId.name}</h2>
                <p>₹{item.productId.price}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleRemove(item.productId._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}

        {/* ✅ TOTAL + BUTTON UI (ADDED) */}
        <div className="mt-6 text-right">
          <h2 className="text-xl font-bold">Total: ₹{total}</h2>

          <button
            onClick={handleOrder}
            className="bg-green-600 text-white px-6 py-2 rounded mt-2"
          >
            Place Order
          </button>
        </div>
      </div>
    </Layout>
  );
}