import { useState, useEffect } from "react";

const slides = [
  {
    title: "Buy Study Materials",
    subtitle: "From your department",
  },
  {
    title: "Canteen Specials",
    subtitle: "Order food easily",
  },
  {
    title: "ITRM Devices",
    subtitle: "Rent laptops & accessories",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-blue-100 p-10 rounded-xl mb-6 transition-all">
      <h1 className="text-3xl font-bold text-gray-800">
        {slides[index].title}
      </h1>
      <p className="text-gray-600 mt-2">{slides[index].subtitle}</p>
    </div>
  );
}