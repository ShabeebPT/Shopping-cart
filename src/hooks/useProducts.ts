import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/productApi';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });
};
