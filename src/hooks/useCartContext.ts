import { CartContextType } from '@/types';
import { useOutletContext } from 'react-router-dom';

export function useCartContext() {
  return useOutletContext<CartContextType>();
}
