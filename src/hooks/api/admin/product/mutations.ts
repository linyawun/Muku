import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAppDispatch } from '@/hooks/reduxHooks';
import { paths } from '@/lib/api/v1';
import { createAsyncMessage } from '@/slice/messageSlice';
import {
  TCreateMessagePayload,
  TCreateProductPayload,
  TDeleteProductPayload,
  TEditProductPayload,
  UseMutationOptions,
} from '@/types';
import request from '@/utils/request';

const CREATE_PRODUCT = '/v2/api/{api_path}/admin/product';
const EDIT_PRODUCT = '/v2/api/{api_path}/admin/product/{id}';
const DELETE_PRODUCT = '/v2/api/{api_path}/admin/product/{id}';

// create product
const createProduct = (payload: TCreateProductPayload = {}) => {
  return request.post(`/admin/product`, payload);
};

export const useCreateProductMutation = ({
  reactQuery = {},
}: UseMutationOptions<paths[typeof CREATE_PRODUCT]['post']> = {}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { onSuccess: customOnSuccess = () => {}, ...restReactQuery } =
    reactQuery;

  return useMutation({
    mutationFn: (payload: TCreateProductPayload) => createProduct(payload),
    onSuccess: (res) => {
      const message = res?.data as TCreateMessagePayload;
      void dispatch(createAsyncMessage(message));
      void queryClient.invalidateQueries({
        queryKey: ['adminProducts'],
      });
      customOnSuccess(res);
    },
    ...restReactQuery,
  });
};

// edit product
const editProduct = (payload: TEditProductPayload = {}) => {
  const { id, payloadData } = payload;
  if (!id) throw new Error('id is empty');
  if (!payloadData) throw new Error('payload data is empty');

  return request.put(`/admin/product/${id}`, payloadData);
};

export const useEditProductMutation = ({
  reactQuery = {},
}: UseMutationOptions<paths[typeof EDIT_PRODUCT]['put']> = {}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { onSuccess: customOnSuccess = () => {}, ...restReactQuery } =
    reactQuery;

  return useMutation({
    mutationFn: (payload: TEditProductPayload) => editProduct(payload),
    onSuccess: (res) => {
      const message = res?.data as TCreateMessagePayload;
      void dispatch(createAsyncMessage(message));
      void queryClient.invalidateQueries({
        queryKey: ['adminProducts'],
      });
      customOnSuccess(res);
    },
    ...restReactQuery,
  });
};

// delete product
const deleteProduct = ({ id }: TDeleteProductPayload) => {
  if (!id) throw new Error('id is empty');

  return request.delete(`/admin/product/${id}`);
};

export const useDeleteProductMutation = ({
  reactQuery = {},
}: UseMutationOptions<paths[typeof DELETE_PRODUCT]['delete']> = {}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { onSuccess: customOnSuccess = () => {}, ...restReactQuery } =
    reactQuery;

  return useMutation({
    mutationFn: ({ id }: TDeleteProductPayload) => deleteProduct({ id }),
    onSuccess: (res) => {
      const message = res?.data as TCreateMessagePayload;
      void dispatch(createAsyncMessage(message));
      void queryClient.invalidateQueries({
        queryKey: ['adminProducts'],
      });
      customOnSuccess(res);
    },
    ...restReactQuery,
  });
};
