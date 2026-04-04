import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, googleLogin, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleLogin = async () => {
    try {
      await login(email, password, role);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return alert("Enter email first");
    await resetPassword(email);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 shadow-lg rounded w-80 bg-white">
        <h2 className="text-xl mb-4 font-bold text-center">Login</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-3"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="vendor">Vendor</option>
        </select>

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full p-2 mb-2"
        >
          Login
        </button>

        {/* Google Login */}
        <button
          onClick={googleLogin}
          className="bg-red-500 text-white w-full p-2 mb-2"
        >
          Login with Google
        </button>

        {/* Forgot Password */}
        <p
          className="text-sm text-blue-500 cursor-pointer text-center"
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </p>

        {/* Register */}
        <p className="text-sm text-center mt-3">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}