import React, { useState } from "react";
import {
  shippingSchema,
  type ShippingDetails,
} from "../../schemas/shippingSchema";
import { z } from "zod";

interface ShippingFormProps {
  initialData?: ShippingDetails;
  onNext: (data: ShippingDetails) => void;
  onBack: () => void;
}

export const ShippingForm: React.FC<ShippingFormProps> = ({
  initialData,
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState<ShippingDetails>({
    fullName: initialData?.fullName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    postalCode: initialData?.postalCode || "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ShippingDetails, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof ShippingDetails]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validData = shippingSchema.parse(formData);
      setErrors({});
      onNext(validData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ShippingDetails, string>> = {};
        (error as any).errors.forEach((err: any) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ShippingDetails] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const inputBaseClass =
    "block w-full px-4 py-3.5 bg-background border rounded-xl shadow-inner focus:bg-surface focus:outline-none transition-all sm:text-sm";
  const inputNormalClass =
    "border-transparent focus:ring-4 focus:ring-primary/10 focus:border-primary/30 placeholder-text-muted text-text-main";
  const inputErrorClass =
    "border-error/50 bg-error/5 focus:ring-4 focus:ring-error/20 focus:border-error text-error placeholder-error/50";

  return (
    <div className="bg-surface p-6 sm:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/20 transition-all">
      <h2 className="text-2xl font-semibold text-text-main mb-8">
        Shipping Information
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 mb-10">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-text-muted mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className={`${inputBaseClass} ${errors.fullName ? inputErrorClass : inputNormalClass}`}
            />
            {errors.fullName && (
              <p className="mt-2 text-sm text-error font-medium">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-muted mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className={`${inputBaseClass} ${errors.email ? inputErrorClass : inputNormalClass}`}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-error font-medium">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-text-muted mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className={`${inputBaseClass} ${errors.phone ? inputErrorClass : inputNormalClass}`}
            />
            {errors.phone && (
              <p className="mt-2 text-sm text-error font-medium">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-text-muted mb-2"
            >
              Street Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="Street Address"
              className={`${inputBaseClass} ${errors.address ? inputErrorClass : inputNormalClass}`}
            />
            {errors.address && (
              <p className="mt-2 text-sm text-error font-medium">
                {errors.address}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-text-muted mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className={`${inputBaseClass} ${errors.city ? inputErrorClass : inputNormalClass}`}
            />
            {errors.city && (
              <p className="mt-2 text-sm text-error font-medium">
                {errors.city}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="postalCode"
              className="block text-sm font-medium text-text-muted mb-2"
            >
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              required
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
              className={`${inputBaseClass} ${errors.postalCode ? inputErrorClass : inputNormalClass}`}
            />
            {errors.postalCode && (
              <p className="mt-2 text-sm text-error font-medium">
                {errors.postalCode}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-between items-center border-t border-slate-200/20 pt-8 gap-4 sm:gap-0">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-8 py-3.5 border-2 border-transparent text-text-muted bg-background rounded-lg hover:bg-slate-200/50 hover:text-text-main transition-colors font-semibold focus:outline-none focus:ring-4 focus:ring-slate-200/50"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all shadow-md hover:shadow-lg font-semibold focus:outline-none focus:ring-4 focus:ring-primary/30"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
};
