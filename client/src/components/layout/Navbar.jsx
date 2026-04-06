import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white shadow px-4 py-3">

      {/* TOP BAR */}
      <div className="flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <Menu
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
        <input
          placeholder="Search..."
          className="hidden md:block border px-3 py-1 rounded w-1/3"
        />

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <ShoppingCart onClick={() => navigate("/cart")} className="cursor-pointer" />

          {!user ? (
            <button onClick={() => navigate("/login")}>Login</button>
          ) : (
            <>
              <User onClick={() => navigate("/profile")} />
              <button onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex gap-6 mt-2 text-sm">
        <button onClick={() => navigate("/")}>Home</button>
        <button>Services</button>
        <button>Contact</button>
        <button>Help</button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-4 z-50">

          <X className="mb-4 cursor-pointer" onClick={() => setOpen(false)} />

          <div className="flex flex-col gap-4">
            <button onClick={() => navigate("/")}>Home</button>
            <button>Services</button>
            <button>Contact</button>
            <button>Help</button>
          </div>
        </div>
      )}
    </div>
  );
}