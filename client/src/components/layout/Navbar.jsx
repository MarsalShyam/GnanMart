

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaSearch,
  FaHeart // ✅ Added FaHeart import
} from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const handleSearch = () => {
    navigate(`/?search=${search}`);
  };

  return (
    <div className="bg-white shadow sticky top-0 z-50">
      {/* TOP */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <FaBars
            className="md:hidden cursor-pointer"
            onClick={() => setOpen(true)}
          />

          <h1
            className="text-xl font-bold text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            GnanMart
          </h1>
        </div>

        {/* SEARCH */}
        <div className="hidden md:flex w-1/3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="border px-3 py-2 w-full rounded-l focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 rounded-r"
          >
            <FaSearch />
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {!user && (
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-medium hover:text-blue-600 transition"
            >
              Login
            </button>
          )}

          {user && (
            <>
              {/* COMMON ICONS FOR LOGGED IN USERS */}
              <FaHeart
                className="cursor-pointer text-gray-500 hover:text-red-500 transition"
                onClick={() => navigate("/wishlist")}
                title="Wishlist"
              />

              <FaShoppingCart
                className="cursor-pointer text-gray-500 hover:text-blue-600 transition"
                onClick={() => navigate("/cart")}
                title="Cart"
              />

              <FaUser
                className="cursor-pointer text-gray-500 hover:text-blue-600 transition"
                onClick={() => navigate("/profile")}
                title="Profile"
              />

              {/* VENDOR ONLY BUTTONS */}
              {user.role === "vendor" && (
                <>
                  <button 
                    onClick={() => navigate("/vendor/dashboard")}
                    className="text-sm font-medium hover:text-blue-600"
                  >
                    Dashboard
                  </button>

                  <button 
                    onClick={() => navigate("/vendor/products")}
                    className="text-sm font-medium hover:text-blue-600"
                  >
                    My Products
                  </button>

                  <button 
                    onClick={() => navigate("/vendor/add-product")}
                    className="text-sm font-medium hover:text-blue-600"
                  >
                    Add Product
                  </button>
                </>
              )}

              <button 
                onClick={logout}
                className="text-sm font-medium text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex gap-6 px-4 pb-2 text-sm text-gray-600">
        <button className="hover:text-blue-600" onClick={() => navigate("/")}>Home</button>
        <button className="hover:text-blue-600">Services</button>
        <button className="hover:text-blue-600">Contact</button>
        <button className="hover:text-blue-600">Help</button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-xl p-4 z-50 transition-all">
          <button 
            className="text-red-500 font-bold mb-6" 
            onClick={() => setOpen(false)}
          >
            Close ✕
          </button>

          <div className="flex flex-col gap-4 text-gray-700">
            <button className="text-left font-medium" onClick={() => { navigate("/"); setOpen(false); }}>Home</button>
            <button className="text-left font-medium">Services</button>
            <button className="text-left font-medium">Contact</button>
            <button className="text-left font-medium">Help</button>
          </div>
        </div>
      )}
    </div>
  );
}