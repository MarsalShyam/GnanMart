import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { createProduct } from "../../api/product.api.js";
import Layout from "../../components/layout/Layout.jsx";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "", sku: "", category: "", size: "",
    price: "", originalPrice: "", stock: "",
    shortDescription: "", description: "", benefits: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price) {
      return alert("Name and Selling Price are required!");
    }

    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key] !== null) {
          formData.append(key, form[key]);
        }
      });

      await createProduct(user.token, formData);
      alert("Product Created Successfully!");
      navigate("/vendor/products");
    } catch (err) {
      console.error(err);
      alert("Failed to create product. Check console for 500 error details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-blue-600 text-sm mb-1">
                ← Back to Products
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Create New Product</h1>
            </div>
            <div className="space-x-3">
              <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100">
                Cancel
              </button>
              <button 
                onClick={handleSubmit} 
                disabled={loading}
                className="px-6 py-2 bg-green-700 hover:bg-green-800 text-white font-medium rounded-md shadow disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* BASIC INFO SECTION */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name *" className="border p-3 rounded-md w-full focus:outline-blue-500 bg-gray-50" />
                <input name="sku" value={form.sku} onChange={handleChange} placeholder="SKU (e.g., LIB-NOTE-01)" className="border p-3 rounded-md w-full focus:outline-blue-500 bg-gray-50" />
                <input name="category" value={form.category} onChange={handleChange} placeholder="Category (e.g., Library, Canteen)" className="border p-3 rounded-md w-full focus:outline-blue-500 bg-gray-50" />
                <input name="size" value={form.size} onChange={handleChange} placeholder="Size/Variant (e.g., 200 Pages, Large)" className="border p-3 rounded-md w-full focus:outline-blue-500 bg-gray-50" />
              </div>
            </div>

            {/* PRICING & INVENTORY */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Pricing & Inventory</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Selling Price (₹) *</label>
                  <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="0" className="border p-3 rounded-md w-full focus:outline-blue-500 bg-gray-50" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Original Price (₹)</label>
                  <input name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} placeholder="0" className="border p-3 rounded-md w-full focus:outline-blue-500 bg-gray-50" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Stock Quantity</label>
                  <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="0" className="border p-3 rounded-md w-full focus:outline-blue-500 bg-gray-50" />
                </div>
              </div>
            </div>

            {/* DESCRIPTIONS */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Descriptions & Details</h2>
              <div className="space-y-4">
                <textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} placeholder="Short Description (for Product Card)" className="border p-3 rounded-md w-full focus:outline-blue-500 bg-gray-50 h-20 resize-none"></textarea>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Full Product Description (for Product Details Page)" className="border p-3 rounded-md w-full focus:outline-blue-500 bg-gray-50 h-32"></textarea>
                <textarea name="benefits" value={form.benefits} onChange={handleChange} placeholder="Key Benefits / Features (One per line)" className="border p-3 rounded-md w-full focus:outline-blue-500 bg-gray-50 h-24"></textarea>
              </div>
            </div>

            {/* PRODUCT IMAGES */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-10">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Product Image</h2>
              <p className="text-sm text-gray-500 mb-4">This image will be used for the Home Page featured product card.</p>
              
              <div className="flex items-start gap-6">
                <div className="w-64 h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center relative overflow-hidden group">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-gray-400">
                      <span className="text-3xl">↑</span>
                      <p className="text-sm mt-2">Upload Image</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    onChange={handleImageChange} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}