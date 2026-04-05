import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { updateProfile } from "../../api/user.api";

export default function Profile() {
  const { user, setUser } = useAuth();

  const [name, setName] = useState(user.name);

  const handleUpdate = async () => {
    const updated = await updateProfile(user.token, { name });

    setUser({ ...updated, token: user.token });
    alert("Updated!");
  };

  return (
    <div>
      <h2 className="text-xl">Profile</h2>

      <input
        className="border p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleUpdate} className="bg-blue-500 text-white p-2">
        Update
      </button>
    </div>
  );
}