import Layout from "../../components/layout/Layout";
import HeroCarousel from "../../components/home/HeroCarousel";
import Categories from "../../components/home/Categories";
import ProductCard from "../../components/product/ProductCard";
import FilterSidebar from "../../components/product/FilterSidebar";
import SkeletonCard from "../../components/common/SkeletonCard";

import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function Home() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    axios.get("/products").then(res => setProducts(res.data));
  }, []);

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen p-4">

        <HeroCarousel />
        <Categories />

        <div className="mt-6 flex gap-6">

          {/* FILTER (desktop only) */}
          <div className="hidden md:block w-1/4">
            <FilterSidebar />
          </div>

          {/* PRODUCTS */}
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-3">Products</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {!products
                ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
                : products.map(p => (
                    <ProductCard key={p._id} product={p} />
                  ))}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}