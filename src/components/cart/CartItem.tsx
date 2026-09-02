import React, { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItemType } from "../../utils/cartCalculations";
import { useCartStore } from "../../store/cartStore";
import { ConfirmModal } from "../common/ConfirmModal";

export const CartItem: React.FC<{ item: CartItemType }> = ({ item }) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const { product, quantity } = item;
  const itemTotal = product.price * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-center py-4 border-b border-gray-200 gap-4">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-background flex items-center justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain p-2"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between ml-0 sm:ml-4 text-center sm:text-left w-full sm:w-auto">
        <div>
          <div className="flex justify-between flex-col sm:flex-row gap-2 sm:gap-0">
            <h3 className="text-base font-medium text-text-main line-clamp-2 pr-4">
              {product.title}
            </h3>
            <p className="text-base font-medium text-text-main whitespace-nowrap">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-end justify-between mt-4">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              type="button"
              className="p-1 text-text-muted hover:text-primary hover:bg-background rounded-l-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center text-sm font-medium text-text-main">
              {quantity}
            </span>
            <button
              type="button"
              className="p-1 text-text-muted hover:text-primary hover:bg-background rounded-r-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              disabled={quantity >= 5}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-text-main hidden sm:block">
              Total: ${itemTotal.toFixed(2)}
            </div>
            <button
              type="button"
              onClick={() => setIsRemoveModalOpen(true)}
              className="font-medium text-error hover:text-red-700 flex items-center gap-1 transition-colors cursor-pointer"
              aria-label={`Remove ${product.title} from cart`}
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Remove</span>
            </button>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={() => removeItem(product.id)}
        title="Remove Item"
        message={`Are you sure you want to remove ${product.title} from your cart?`}
        confirmText="Remove"
        cancelText="Cancel"
      />
    </div>
  );
};
