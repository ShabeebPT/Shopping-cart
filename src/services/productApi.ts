import { productResponseSchema } from '../schemas/productSchema';
import type { ProductResponse } from '../types/product';

export const fetchProducts = async (): Promise<ProductResponse> => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const response = await fetch('https://dummyjson.com/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();

  const validatedData = productResponseSchema.parse(data);

  return validatedData;
};
