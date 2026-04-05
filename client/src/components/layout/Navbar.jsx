import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="font-bold">GCT Mart</h1>

      <div className="flex gap-4">
        <span>{user?.name}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}