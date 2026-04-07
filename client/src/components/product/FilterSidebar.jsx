import { useNavigate } from "react-router-dom";

export default function FilterSidebar() {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-xl shadow">

      <h3 className="font-bold mb-4">Filters</h3>

      {/* CATEGORY */}
      <div className="mb-4">
        <p className="font-semibold mb-2">Category</p>

        <div className="flex flex-col gap-2 text-sm">
          <button onClick={() => navigate("/?category=Electronics")}>
            Electronics
          </button>
          <button onClick={() => navigate("/?category=Library")}>
            Library
          </button>
          <button onClick={() => navigate("/?category=Canteen")}>
            Canteen
          </button>
        </div>
      </div>

      {/* SORT */}
      <div>
        <p className="font-semibold mb-2">Sort</p>

        <div className="flex flex-col gap-2 text-sm">
          <button onClick={() => navigate("/?sort=low")}>
            Price Low → High
          </button>
          <button onClick={() => navigate("/?sort=high")}>
            Price High → Low
          </button>
        </div>
      </div>
    </div>
  );
}