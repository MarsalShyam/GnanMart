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
    fetchCart();
  }, []);

  const handleOrder = async () => {
    await placeOrder(user.token);
    alert("Order placed!");
    fetchCart();
  };

  return (
    <Layout>
      <div className="p-6">

        <h1 className="text-xl font-bold mb-4">Cart</h1>

        {!cart?.items?.length ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {cart.items.map((i) => (
              <div key={i._id} className="flex justify-between border p-2 mb-2">
                <p>{i.productId.name}</p>

                <button
                  onClick={() =>
                    removeFromCart(i.productId._id, user.token)
                  }
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              onClick={handleOrder}
              className="bg-green-500 text-white px-4 py-2 mt-4"
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </Layout>
  );
}