import Layout from "../../components/layout/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">

        <h1 className="text-2xl font-bold mb-6">
          Vendor Dashboard
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-500">Total Earnings</p>
            <h2 className="text-xl font-bold text-green-600">₹0</h2>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-500">Total Orders</p>
            <h2 className="text-xl font-bold">0</h2>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-500">Products</p>
            <h2 className="text-xl font-bold">0</h2>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-500">Cancelled</p>
            <h2 className="text-xl font-bold text-red-500">0</h2>
          </div>

        </div>

        {/* CHART PLACEHOLDER */}
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-600">
            📊 Sales Chart (Coming Next Step)
          </p>
        </div>

      </div>
    </Layout>
  );
}