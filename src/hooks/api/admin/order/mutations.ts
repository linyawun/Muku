import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAppDispatch } from '@/hooks/reduxHooks';
import { paths } from '@/lib/api/v1';
import { createAsyncMessage } from '@/slice/messageSlice';
import {
  TCreateMessagePayload,
  TDeleteOrderPayload,
  TEditOrderPayload,
  UseMutationOptions,
} from '@/types';
import request from '@/utils/request';

const EDIT_ORDER = '/v2/api/{api_path}/admin/order/{id}';
const DELETE_ORDER = '/v2/api/{api_path}/admin/order/{id}';

// edit order
const editOrder = (payload: TEditOrderPayload = {}) => {
  const { id, payloadData } = payload;
  if (!id) throw new Error('id is empty');
  if (!payloadData) throw new Error('payload data is empty');

  return request.put(`/admin/order/${id}`, payloadData);
};

export const useEditOrderMutation = ({
  reactQuery = {},
}: UseMutationOptions<paths[typeof EDIT_ORDER]['put']> = {}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { onSuccess: customOnSuccess = () => {}, ...restReactQuery } =
    reactQuery;

  return useMutation({
    mutationFn: (payload: TEditOrderPayload) => editOrder(payload),
    onSuccess: (res) => {
      const message = res?.data as TCreateMessagePayload;
      void dispatch(createAsyncMessage(message));
      void queryClient.invalidateQueries({
        queryKey: ['adminOrders'],
      });
      customOnSuccess(res);
    },
    ...restReactQuery,
  });
};

// delete order
const deleteOrder = ({ id }: TDeleteOrderPayload) => {
  if (!id) throw new Error('id is empty');

  return request.delete(`/admin/order/${id}`);
};

export const useDeleteOrderMutation = ({
  reactQuery = {},
}: UseMutationOptions<paths[typeof DELETE_ORDER]['delete']> = {}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { onSuccess: customOnSuccess = () => {}, ...restReactQuery } =
    reactQuery;

  return useMutation({
    mutationFn: ({ id }: TDeleteOrderPayload) => deleteOrder({ id }),
    onSuccess: (res) => {
      const message = res?.data as TCreateMessagePayload;
      void dispatch(createAsyncMessage(message));
      void queryClient.invalidateQueries({
        queryKey: ['adminOrders'],
      });
      customOnSuccess(res);
    },
    ...restReactQuery,
  });
};
