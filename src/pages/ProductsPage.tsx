import React from "react";
import { useProducts } from "../hooks/useProducts";
import { useProductFilters } from "../hooks/useProductFilters";
import { ProductCard } from "../components/product/ProductCard";
import { ProductFilters } from "../components/product/ProductFilters";
import { Loading } from "../components/common/Loading";
import { ErrorState } from "../components/common/ErrorState";
import { EmptyState } from "../components/common/EmptyState";

export const ProductsPage: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = useProducts();
  const { filters, setFilters, clearFilters, filteredProducts, categories } =
    useProductFilters(data?.products);

  if (isLoading) {
    return <Loading message="Loading products..." />;
  }

  if (isError) {
    return (
      <ErrorState
        message={
          error instanceof Error ? error.message : "An unknown error occurred"
        }
        onRetry={() => refetch()}
      />
    );
  }

  if (!data?.products || data.products.length === 0) {
    return (
      <EmptyState
        title="No products available"
        description="We couldn't find any products in our store right now. Please check back later."
      />
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-main mb-2">Our Products</h1>
        <p className="text-text-muted">
          Discover our collection of premium items.
        </p>
      </div>

      <ProductFilters
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
        categories={categories}
      />

      {filteredProducts.length === 0 ? (
        <EmptyState
          title="No matches found"
          description="We couldn't find any products matching your current filters."
          action={
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
            >
              Clear Filters
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
