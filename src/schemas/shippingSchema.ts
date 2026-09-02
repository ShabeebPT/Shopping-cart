import { z } from 'zod';

export const shippingSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Email must be valid'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
});

export type ShippingDetails = z.infer<typeof shippingSchema>;
