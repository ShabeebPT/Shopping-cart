import React from "react";
import { Loader2 } from "lucide-react";
import type { ShippingDetails } from "../../schemas/shippingSchema";
import { useCartStore } from "../../store/cartStore";
import {
  calculateDiscount,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
} from "../../utils/cartCalculations";

interface PaymentSummaryProps {
  shippingDetails: ShippingDetails;
  onBack: () => void;
  onPlaceOrder: () => void;
  isProcessing?: boolean;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  shippingDetails,
  onBack,
  onPlaceOrder,
  isProcessing = false,
}) => {
  const { items } = useCartStore();

  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const discount = calculateDiscount(subtotal);
  const total = calculateTotal(subtotal, tax, discount);

  return (
    <div className="bg-surface p-6 rounded-lg shadow-sm border border-gray-200 max-w-3xl mx-auto">
      <h2 className="text-xl font-medium text-text-main mb-6">Order Review</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">
            Shipping Address
          </h3>
          <div className="text-text-main bg-background p-4 rounded-md">
            <p className="font-medium">{shippingDetails.fullName}</p>
            <p>{shippingDetails.address}</p>
            <p>
              {shippingDetails.city}, {shippingDetails.postalCode}
            </p>
            <p className="mt-2 text-text-muted text-sm">
              {shippingDetails.email}
            </p>
            <p className="text-text-muted text-sm">{shippingDetails.phone}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">
            Order Summary
          </h3>
          <div className="text-text-main bg-background p-4 rounded-md text-sm">
            <div className="flex justify-between mb-2">
              <span className="text-text-muted">
                Items ({items.reduce((sum, i) => sum + i.quantity, 0)})
              </span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-text-muted">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between mb-2 text-success">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 font-bold text-base">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">
          Items
        </h3>
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li
                key={item.product.id}
                className="p-4 flex items-center justify-between hover:bg-background"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="w-12 h-12 object-contain bg-surface rounded"
                  />
                  <div>
                    <p className="font-medium text-text-main text-sm line-clamp-1">
                      {item.product.title}
                    </p>
                    <p className="text-text-muted text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-medium text-text-main">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-between border-t border-gray-200 pt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 text-text-main rounded hover:bg-background transition-colors"
        >
          Back to Shipping
        </button>
        <button
          onClick={onPlaceOrder}
          disabled={isProcessing}
          className="px-8 py-3 bg-success text-white font-medium rounded shadow opacity-90 hover:opacity-100 bg-success transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
        >
          {isProcessing ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Place Order"
          )}
        </button>
      </div>
    </div>
  );
};
