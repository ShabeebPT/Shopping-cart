import { z } from 'zod';
import { productSchema, productResponseSchema } from '../schemas/productSchema';

export type Product = z.infer<typeof productSchema>;
export type ProductResponse = z.infer<typeof productResponseSchema>;
