import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { CartItem } from "../components/cart/CartItem";
import { CartSummary } from "../components/cart/CartSummary";
import { EmptyState } from "../components/common/EmptyState";
import { ConfirmModal } from "../components/common/ConfirmModal";
import { Trash2 } from "lucide-react";

export const CartPage: React.FC = () => {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Looks like you haven't added anything to your cart yet. Browse our products and find something you like!"
        action={
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors"
          >
            Start Shopping
          </button>
        }
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-text-main mb-2">
            Shopping Cart
          </h1>
          <p className="text-text-muted">Review your items before checkout.</p>
        </div>
        <button
          onClick={() => setIsClearModalOpen(true)}
          className="text-error hover:text-red-700 font-medium flex items-center gap-2 transition-colors mb-1 cursor-pointer"
        >
          <Trash2 className="h-5 w-5" />
          <span className="hidden sm:inline">Clear Cart</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="bg-surface rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-0 sm:p-6 sm:pb-2">
              <div className="hidden sm:grid sm:grid-cols-12 text-sm font-medium text-text-muted pb-4 border-b border-gray-200 px-4 sm:px-0">
                <div className="col-span-8">Product</div>
                <div className="col-span-4 text-right">Details</div>
              </div>
              <div className="divide-y divide-gray-200 px-4 sm:px-0">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-96">
          <div className="sticky top-24">
            <CartSummary items={items} />
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={clearCart}
        title="Clear Cart"
        message="Are you sure you want to remove all items from your cart? This action cannot be undone."
        confirmText="Clear Cart"
        cancelText="Cancel"
      />
    </div>
  );
};
