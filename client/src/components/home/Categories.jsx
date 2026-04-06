import {
  Book,
  Coffee,
  Laptop,
  Shirt,
  Package,
  ShoppingBag
} from "lucide-react";

const categories = [
  { name: "Library", icon: Book },
  { name: "Canteen", icon: Coffee },
  { name: "Electronics", icon: Laptop },
  { name: "Stationary", icon: Package },
  { name: "Fashion", icon: Shirt },
  { name: "Notes", icon: ShoppingBag },
];

export default function Categories() {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-3">Categories</h2>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((cat, i) => {
          const Icon = cat.icon;

          return (
            <div
              key={i}
              className="bg-white shadow rounded-lg p-3 flex flex-col items-center hover:bg-blue-50 cursor-pointer"
            >
              <Icon size={24} className="text-blue-600 mb-1" />
              <p className="text-sm">{cat.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}