import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createProduct } from "../../api/product.api";

export default function AddProduct() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await createProduct(user.token, form);
      alert("Product Added!");
    } catch (err) {
      console.log(err);
      alert("Error adding product");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          placeholder={key}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
      ))}

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white p-2 w-full"
      >
        Add Product
      </button>
    </div>
  );
}