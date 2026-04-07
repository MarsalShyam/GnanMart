import { useNavigate } from "react-router-dom";

export default function VendorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Vendor Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-4">

        <button
          className="bg-blue-500 text-white p-4 rounded"
          onClick={() => navigate("/vendor/add-product")}
        >
          Add Product
        </button>

        <button
          className="bg-green-500 text-white p-4 rounded"
        >
          View Orders
        </button>

        <button
          className="bg-purple-500 text-white p-4 rounded"
        >
          My Products
        </button>

        <button
          className="bg-orange-500 text-white p-4 rounded"
        >
          Earnings
        </button>

      </div>
    </div>
  );
}