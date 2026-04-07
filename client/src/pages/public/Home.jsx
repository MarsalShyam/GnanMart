import Layout from "../../components/layout/Layout";
import HeroCarousel from "../../components/home/HeroCarousel";
import Categories from "../../components/home/Categories";
import ProductCard from "../../components/product/ProductCard";
import FilterSidebar from "../../components/product/FilterSidebar";
import SkeletonCard from "../../components/common/SkeletonCard";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../../api/product.api";

export default function Home() {
  const [products, setProducts] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    const params = {
      search: query.get("search") || "",
      category: query.get("category") || "",
      sort: query.get("sort") || "",
    };

    getProducts(params)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [location.search]);

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">

        {/* HERO */}
        <HeroCarousel />

        {/* CATEGORIES */}
        <div className="px-4">
          <Categories />
        </div>

        <div className="mt-6 flex gap-6 px-4">

          {/* FILTER */}
          <div className="hidden md:block w-1/4">
            <FilterSidebar />
          </div>

          {/* PRODUCTS */}
          <div className="flex-1">

            <h2 className="text-xl font-bold mb-4">
              Explore Products
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {!products
                ? Array(8).fill(0).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))

                : products.length === 0
                ? (
                  <div className="col-span-full text-center text-gray-500">
                    No products found
                  </div>
                )

                : products.map((p) => (
                    <ProductCard key={p._id} product={p} />
                  ))
              }

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}