import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/AuthContext";
import {
  getMyProducts,
  deleteProduct,
  updateProduct,
} from "../../api/product.api";

export default function VendorProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [editData, setEditData] = useState(null);

  const fetchProducts = async () => {
    const res = await getMyProducts(user.token);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete product?")) return;
    await deleteProduct(id, user.token);
    fetchProducts();
  };

  const handleUpdate = async () => {
    await updateProduct(editData._id, editData, user.token);
    setEditData(null);
    fetchProducts();
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">

        <h1 className="text-xl font-bold mb-4">My Products</h1>

        {/* TABLE */}
        <div className="overflow-x-auto bg-white rounded shadow">

          <table className="w-full text-sm">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t text-center">

                  <td className="p-2">
                    <img
                      src={p.image || "https://via.placeholder.com/80"}
                      className="h-12 mx-auto"
                    />
                  </td>

                  <td>{p.name}</td>
                  <td>₹{p.price}</td>

                  <td>
                    <input
                      type="number"
                      value={
                        editData?._id === p._id
                          ? editData.stock
                          : p.stock
                      }
                      onChange={(e) =>
                        setEditData({
                          ...p,
                          stock: e.target.value,
                        })
                      }
                      className="border w-16 text-center"
                    />
                  </td>

                  <td className="flex gap-2 justify-center py-2">

                    <button
                      onClick={() => setEditData(p)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* EDIT PANEL */}
        {editData && (
          <div className="mt-6 bg-white p-4 rounded shadow max-w-md">

            <h2 className="font-bold mb-2">Edit Product</h2>

            <input
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />

            <input
              value={editData.price}
              onChange={(e) =>
                setEditData({ ...editData, price: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />

            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}