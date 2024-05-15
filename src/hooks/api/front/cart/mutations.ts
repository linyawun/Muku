import { useMutation } from '@tanstack/react-query';

import request from '@/utils/request';

import { TAddUserCartPayload } from '@/types';

// add cart
const addCart = (payload: TAddUserCartPayload = {}) => {
  if (!payload.data) throw new Error('Payload data is empty');

  const { product_id, qty } = payload.data;
  if (!product_id || !qty) throw new Error('product_id or qty is empty');

  return request.post(`/cart`, {
    payload,
  });
};

export const useAddCartMutation = (config = {}) => {
  return useMutation({
    mutationFn: (payload: TAddUserCartPayload) => addCart(payload),
    ...config,
  });
};
