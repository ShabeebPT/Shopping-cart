import React from "react";
import { useCartStore } from "../../store/cartStore";
import { CartItem } from "../cart/CartItem";
import { CartSummary } from "../cart/CartSummary";

interface CartReviewProps {
  onNext: () => void;
  onBack: () => void;
}

export const CartReview: React.FC<CartReviewProps> = ({ onNext, onBack }) => {
  const { items } = useCartStore();

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <div className="bg-surface rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="p-4 sm:p-6 pb-2">
            <h2 className="text-lg font-medium text-text-main mb-4">
              Review Your Items
            </h2>
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 text-text-main rounded hover:bg-background transition-colors"
          >
            Back to Cart
          </button>
          <button
            onClick={onNext}
            className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
          >
            Continue to Shipping
          </button>
        </div>
      </div>

      <div className="w-full lg:w-96">
        <div className="sticky top-24">
          <CartSummary items={items} />
        </div>
      </div>
    </div>
  );
};
