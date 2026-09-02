import React from "react";
import { Search, X, Tag, DollarSign, ChevronDown } from "lucide-react";

interface Filters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}

interface ProductFiltersProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  clearFilters: () => void;
  categories: string[];
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  setFilters,
  clearFilters,
  categories,
}) => {
  return (
    <div className="bg-surface p-4 md:p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8 border border-slate-200/20 transition-all">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* Search Bar */}
        <div className="relative w-full lg:w-2/5 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-primary/70 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            id="search"
            className="block w-full pl-11 pr-4 py-3.5 bg-background border border-transparent rounded-xl leading-5 placeholder-text-muted focus:bg-surface focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/30 transition-all text-sm text-text-main shadow-inner"
            placeholder="Search for amazing products..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />
        </div>

        <div className="flex flex-col md:flex-row w-full lg:w-3/5 gap-4">
          {/* Category Dropdown */}
          <div className="relative w-full md:w-1/2 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Tag className="h-4 w-4 text-text-muted group-focus-within:text-primary transition-colors" />
            </div>
            <select
              id="category"
              className="block w-full pl-10 pr-10 py-3.5 bg-background border border-transparent rounded-xl focus:bg-surface focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/30 transition-all text-sm capitalize text-text-main shadow-inner appearance-none cursor-pointer"
              value={filters.category}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.replace("-", " ")}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <ChevronDown className="h-4 w-4 text-text-muted" />
            </div>
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-2 w-full md:w-1/2 bg-background border border-transparent rounded-xl px-4 py-2 shadow-inner focus-within:ring-4 focus-within:ring-primary/10 focus-within:border-primary/30 focus-within:bg-surface transition-all group">
            <DollarSign className="h-4 w-4 text-text-muted group-focus-within:text-primary" />
            <div className="flex-1 flex items-center">
              <input
                type="number"
                placeholder="Min"
                min="0"
                className="w-full bg-transparent border-none focus:ring-0 text-sm text-text-main placeholder-text-muted text-center p-0 m-0 focus:outline-none h-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    minPrice: Number(e.target.value),
                  }))
                }
                onWheel={(e) => (e.target as HTMLElement).blur()}
              />
              <span className="text-text-muted mx-2 font-light">|</span>
              <input
                type="number"
                placeholder="Max"
                min="0"
                className="w-full bg-transparent border-none focus:ring-0 text-sm text-text-main placeholder-text-muted text-center p-0 m-0 focus:outline-none h-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    maxPrice: Number(e.target.value),
                  }))
                }
                onWheel={(e) => (e.target as HTMLElement).blur()}
              />
            </div>
          </div>

          {/* Clear Button */}
          <div className="w-full md:w-auto flex items-center shrink-0">
            <button
              onClick={clearFilters}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-text-muted bg-background hover:bg-error/10 hover:text-error focus:outline-none focus:ring-4 focus:ring-error/20 transition-all"
              title="Clear all filters"
            >
              <X className="h-4 w-4" />
              <span className="md:hidden lg:inline">Clear</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
