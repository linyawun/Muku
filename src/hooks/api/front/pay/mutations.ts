import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAppDispatch } from '@/hooks/reduxHooks';
import { paths } from '@/lib/api/v1';
import { createAsyncMessage } from '@/slice/messageSlice';
import {
  TCreateMessagePayload,
  TPayUserOrderPayload,
  UseMutationOptions,
} from '@/types';
import request from '@/utils/request';

const PAY_USER_ORDER = '/v2/api/{api_path}/pay/{order_id}';

// payOrder
const payOrder = (payload: Partial<TPayUserOrderPayload> = {}) => {
  const { order_id } = payload;
  if (!order_id) throw new Error('order_id is empty');

  return request.post(`/pay/${order_id}`, payload);
};

export const usePayOrderMutation = ({
  reactQuery = {},
}: UseMutationOptions<paths[typeof PAY_USER_ORDER]['post']> = {}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: TPayUserOrderPayload) => payOrder(payload),
    onSuccess: (res) => {
      const message = res?.data as TCreateMessagePayload;
      void dispatch(createAsyncMessage(message));
      void queryClient.invalidateQueries({
        queryKey: ['userOrder'],
      });
    },
    ...reactQuery,
  });
};
