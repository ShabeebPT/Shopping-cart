import React, { useState } from "react";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "../../types/product";
import { useCartStore } from "../../store/cartStore";
import { ProductModal } from "./ProductModal";

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="group bg-surface rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="aspect-square bg-background p-4 flex items-center justify-center overflow-hidden relative">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3
              className="font-medium text-text-main line-clamp-2"
              title={product.title}
            >
              {product.title}
            </h3>
            <span className="font-bold text-text-main whitespace-nowrap">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <p className="text-sm text-text-muted capitalize mb-3">
            {product.category}
          </p>

          <div className="flex items-center gap-1 mb-4 text-warning">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium text-text-main">
              {product.rating.toFixed(2)}
            </span>
          </div>

          <div className="mt-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addItem(product);
              }}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md font-medium transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 outline-none"
              aria-label={`Add ${product.title} to cart`}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
