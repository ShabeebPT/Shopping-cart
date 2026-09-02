import React from "react";
import {
  calculateDiscount,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  type CartItemType,
} from "../../utils/cartCalculations";
import { useNavigate } from "react-router-dom";

interface CartSummaryProps {
  items: CartItemType[];
}

export const CartSummary: React.FC<CartSummaryProps> = ({ items }) => {
  const navigate = useNavigate();

  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const discount = calculateDiscount(subtotal);
  const total = calculateTotal(subtotal, tax, discount);

  const canCheckout = subtotal >= 10;

  return (
    <div className="bg-surface p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-medium text-text-main mb-4">Order Summary</h2>

      <dl className="space-y-4 text-sm text-text-muted">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd className="font-medium text-text-main">${subtotal.toFixed(2)}</dd>
        </div>

        <div className="flex justify-between">
          <dt>Tax (5%)</dt>
          <dd className="font-medium text-text-main">${tax.toFixed(2)}</dd>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-success">
            <dt>Discount (10% over $100)</dt>
            <dd className="font-medium">-${discount.toFixed(2)}</dd>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4 flex justify-between">
          <dt className="text-base font-medium text-text-main">Final Total</dt>
          <dd className="text-base font-bold text-text-main">
            ${total.toFixed(2)}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <button
          onClick={() => navigate("/checkout")}
          disabled={!canCheckout}
          className="w-full bg-primary border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Proceed to Checkout
        </button>

        {!canCheckout && (
          <p className="mt-2 text-sm text-error text-center">
            Add ${(10 - subtotal).toFixed(2)} more to reach the minimum checkout
            value of $10.
          </p>
        )}
      </div>
    </div>
  );
};
