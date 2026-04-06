export default function FilterSidebar() {
  return (
    <div className="bg-white p-4 rounded shadow">

      <h3 className="font-bold mb-3">Filters</h3>

      <div className="mb-4">
        <p className="font-semibold">Category</p>
        <div className="flex flex-col text-sm">
          <label><input type="checkbox" /> Electronics</label>
          <label><input type="checkbox" /> Notes</label>
          <label><input type="checkbox" /> Canteen</label>
        </div>
      </div>

      <div>
        <p className="font-semibold">Price</p>
        <input type="range" />
      </div>
    </div>
  );
}