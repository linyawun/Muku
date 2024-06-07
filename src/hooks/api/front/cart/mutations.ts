import { useMutation, useQueryClient } from '@tanstack/react-query';

import { paths } from '@/lib/api/v1';
import request from '@/utils/request';

import { useAppDispatch } from '@/hooks/reduxHooks';
import { createAsyncMessage } from '@/slice/messageSlice';
import {
  TAddUserCartPayload,
  TCreateMessagePayload,
  TDeleteUserCartPayload,
  UseMutationOptions,
} from '@/types';

const UPDATE_USER_CART = '/v2/api/{api_path}/cart/{id}';
const ADD_USER_CART = '/v2/api/{api_path}/cart';
const DELETE_USER_CART = '/v2/api/{api_path}/cart/{id}';
const DELETE_ALL_USER_CARTS = '/v2/api/{api_path}/carts';

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

export const useAddToCartMutation = ({
  reactQuery = {},
}: UseMutationOptions<paths[typeof ADD_USER_CART]['post']> = {}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: TAddUserCartPayload) => addToCart(payload),
    onSuccess: (res) => {
      const message = res?.data as TCreateMessagePayload;
      void dispatch(createAsyncMessage(message));
      void queryClient.invalidateQueries({
        queryKey: ['userCarts'],
      });
    },
    // onError: (error) => {
    //   const message = error.response.data as TCreateMessagePayload;
    //   void dispatch(createAsyncMessage(message));
    // },
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
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: ({ id, payload }: TUpdateCartArgs) =>
      updateCart({ id, payload }),
    onSuccess: (res) => {
      const message = res?.data as TCreateMessagePayload;
      void dispatch(createAsyncMessage(message));
      void queryClient.invalidateQueries({
        queryKey: ['userCarts'],
      });
    },
    ...reactQuery,
  });
};

// delete cart item
const deleteCart = ({ id }: TDeleteUserCartPayload) => {
  if (!id) throw new Error('id is empty');

  return request.delete(`/cart/${id}`);
};

export const useDeleteCartMutation = ({
  reactQuery = {},
}: UseMutationOptions<paths[typeof DELETE_USER_CART]['delete']> = {}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: ({ id }: TDeleteUserCartPayload) => deleteCart({ id }),
    onSuccess: (res) => {
      const message = res?.data as TCreateMessagePayload;
      void dispatch(createAsyncMessage(message));
      void queryClient.invalidateQueries({
        queryKey: ['userCarts'],
      });
    },
    ...reactQuery,
  });
};

// delete all cart
const deleteAllCart = () => {
  return request.delete(`/carts`);
};

export const useDeleteAllCartMutation = ({
  reactQuery = {},
}: UseMutationOptions<paths[typeof DELETE_ALL_USER_CARTS]['delete']> = {}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: () => deleteAllCart(),
    onSuccess: (res) => {
      const message = res?.data as TCreateMessagePayload;
      void dispatch(createAsyncMessage(message));
      void queryClient.invalidateQueries({
        queryKey: ['userCarts'],
      });
    },
    ...reactQuery,
  });
};
