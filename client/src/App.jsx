import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";

import ProtectedRoute from "./routes/ProtectedRoute";

// import DashboardRouter from "./pages/common/DashboardRouter";
import DashboardRouter from "./pages/common/DashboardRouter.jsx";
import Profile from "./pages/profile/Profile";

// 🔥 NEW PUBLIC PAGES
import Home from "./pages/public/Home";
import ProductDetails from "./pages/public/ProductDetails";

// 🔥 FUTURE
import Cart from "./pages/student/Cart";
import AddProduct from "./pages/vendor/AddProduct.jsx";
import Dashboard from "./pages/vendor/Dashboard.jsx";

import VendorProducts from "./pages/vendor/Products.jsx";
import Wishlist from "./pages/student/Wishlist.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* 🔐 AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* 🔒 PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardRouter />
            </ProtectedRoute>
          }
        />

        <Route path="/wishlist" element={<ProtectedRoute>
            <Wishlist/>
        </ProtectedRoute>}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        
        <Route path="/vendor/dashboard" element={<Dashboard/>}/>

        <Route path="/vendor/products" element={<VendorProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;