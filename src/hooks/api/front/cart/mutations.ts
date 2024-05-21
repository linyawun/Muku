import { useMutation } from '@tanstack/react-query';

import request from '@/utils/request';
import { paths } from '@/lib/api/v1';

import { TAddUserCartPayload, UseMutationOptions } from '@/types';

const UPDATE_USER_CART = '/v2/api/{api_path}/cart/{id}';

type TUpdateCartArgs = {
  id: string;
  payload: TAddUserCartPayload;
};

// add cart
const addToCart = (payload: TAddUserCartPayload = {}) => {
  if (!payload.data) throw new Error('Payload data is empty');

  const { product_id, qty } = payload.data;
  if (!product_id || !qty) throw new Error('product_id or qty is empty');

  return request.post(`/cart`, payload);
};

export const useAddToCartMutation = ({ reactQuery = {} }) => {
  return useMutation({
    mutationFn: (payload: TAddUserCartPayload) => addToCart(payload),
    ...reactQuery,
  });
};

// update cart
const updateCart = ({ id, payload }: TUpdateCartArgs) => {
  if (!id) throw new Error('id is empty');
  if (!payload.data) throw new Error('Payload data is empty');

  const { product_id, qty } = payload.data;
  if (!product_id || !qty) throw new Error('product_id or qty is empty');

  return request.put(`/cart/${id}`, payload);
};

export const useUpdateCartMutation = ({
  reactQuery = {},
}: UseMutationOptions<paths[typeof UPDATE_USER_CART]['put']> = {}) => {
  return useMutation({
    mutationFn: ({ id, payload }: TUpdateCartArgs) =>
      updateCart({ id, payload }),
    ...reactQuery,
  });
};
