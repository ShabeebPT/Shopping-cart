import { useState, useMemo } from 'react';
import type { Product } from '../types/product';

interface Filters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}

export const useProductFilters = (products: Product[] | undefined) => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 10000,
  });

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: 0,
      maxPrice: 10000,
    });
  };

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === '' || product.category === filters.category;
      const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, filters]);

  // Extract unique categories for dropdown
  const categories = useMemo(() => {
    if (!products) return [];
    const cats = new Set(products.map(p => p.category));
    return Array.from(cats);
  }, [products]);

  return {
    filters,
    setFilters,
    clearFilters,
    filteredProducts,
    categories,
  };
};
