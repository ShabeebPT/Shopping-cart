import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { calculateSubtotal } from "../utils/cartCalculations";
import { CartReview } from "../components/checkout/CartReview";
import { ShippingForm } from "../components/checkout/ShippingForm";
import { PaymentSummary } from "../components/checkout/PaymentSummary";
import { CheckCircle2 } from "lucide-react";
import type { ShippingDetails } from "../schemas/shippingSchema";

type CheckoutStep = "review" | "shipping" | "payment" | "success";

export const CheckoutPage: React.FC = () => {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("review");
  const [shippingDetails, setShippingDetails] = useState<
    ShippingDetails | undefined
  >(undefined);

  const subtotal = calculateSubtotal(items);
  const canCheckout = items.length > 0 && subtotal >= 10;

  // Redirect if empty or below minimum
  useEffect(() => {
    if (currentStep !== "success" && !canCheckout) {
      navigate("/cart");
    }
  }, [canCheckout, currentStep, navigate]);

  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Artificial 2 second delay to simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setCurrentStep("success");
    clearCart();
  };

  if (currentStep === "success") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="h-20 w-20 text-success" />
        </div>
        <h1 className="text-3xl font-bold text-text-main mb-4">
          Order placed successfully!
        </h1>
        <p className="text-lg text-text-muted mb-8">
          Thank you for your purchase. We have received your order and will
          process it shortly.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-8 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const steps = [
    { id: "review", name: "1. Cart Review" },
    { id: "shipping", name: "2. Shipping" },
    { id: "payment", name: "3. Payment Summary" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-main mb-6">Checkout</h1>

        {/* Stepper */}
        <nav aria-label="Progress">
          <ol
            role="list"
            className="flex items-center space-x-2 md:space-x-4 border-b border-gray-200 pb-4"
          >
            {steps.map((step, stepIdx) => {
              const isCurrent = step.id === currentStep;
              const isPast =
                (currentStep === "shipping" && step.id === "review") ||
                (currentStep === "payment" &&
                  (step.id === "review" || step.id === "shipping"));

              return (
                <li key={step.name} className="relative pr-2 sm:pr-8">
                  <div className="flex items-center">
                    <span
                      className={`text-sm font-medium ${
                        isCurrent
                          ? "text-primary"
                          : isPast
                            ? "text-success"
                            : "text-text-muted"
                      }`}
                    >
                      {step.name}
                    </span>
                    {stepIdx !== steps.length - 1 ? (
                      <div
                        className="absolute top-1/2 right-0 -mt-px w-2 sm:w-6 h-px bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      <div className="mt-8">
        {currentStep === "review" && (
          <CartReview
            onNext={() => setCurrentStep("shipping")}
            onBack={() => navigate("/cart")}
          />
        )}

        {currentStep === "shipping" && (
          <ShippingForm
            initialData={shippingDetails}
            onNext={(data) => {
              setShippingDetails(data);
              setCurrentStep("payment");
            }}
            onBack={() => setCurrentStep("review")}
          />
        )}

        {currentStep === "payment" && shippingDetails && (
          <PaymentSummary
            shippingDetails={shippingDetails}
            onPlaceOrder={handlePlaceOrder}
            onBack={() => setCurrentStep("shipping")}
          />
        )}
      </div>
    </div>
  );
};
