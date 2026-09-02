import { z } from 'zod';

const reviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
  date: z.string(),
  reviewerName: z.string(),
  reviewerEmail: z.string()
});

const metaSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  barcode: z.string(),
  qrCode: z.string()
});

const dimensionsSchema = z.object({
  width: z.number(),
  height: z.number(),
  depth: z.number()
});

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  price: z.number(),
  rating: z.number().optional().default(0),
  category: z.string(),
  thumbnail: z.string(),
  brand: z.string().optional(),
  stock: z.number().optional(),
  discountPercentage: z.number().optional(),
  availabilityStatus: z.string().optional(),
  images: z.array(z.string()).optional(),
  shippingInformation: z.string().optional(),
  warrantyInformation: z.string().optional(),
  returnPolicy: z.string().optional(),
  tags: z.array(z.string()).optional(),
  reviews: z.array(reviewSchema).optional(),
  minimumOrderQuantity: z.number().optional(),
  meta: metaSchema.optional(),
  weight: z.number().optional(),
  dimensions: dimensionsSchema.optional(),
  sku: z.string().optional(),
}).passthrough();

export const productResponseSchema = z.object({
  products: z.array(productSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});
