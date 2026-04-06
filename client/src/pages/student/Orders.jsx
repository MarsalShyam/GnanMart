import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/orders", {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      setOrders(res.data);
    };

    fetch();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Order History</h1>

      {orders.map(order => (
        <div key={order._id} className="border p-4 mt-3 rounded">
          <p>Total: ₹{order.totalAmount}</p>

          {order.items.map(item => (
            <p key={item._id}>
              {item.productId.name} x {item.quantity}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}