import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification
} from "firebase/auth";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleRegister = async () => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(res.user, { displayName: name });

    await sendEmailVerification(res.user);

    alert("Verification email sent! Check your inbox or spam.");

    navigate("/verify-email"); // 🔥 NEW PAGE

  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 shadow-lg rounded w-80 bg-white">
        <h2 className="text-xl mb-4 font-bold text-center">Register</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={handleRegister}
          className="bg-green-500 text-white w-full p-2"
        >
          Register
        </button>
      </div>
    </div>
  );
}