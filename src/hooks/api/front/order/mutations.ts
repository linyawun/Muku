import { useMutation, useQueryClient } from '@tanstack/react-query';

import { paths } from '@/lib/api/v1';
import request from '@/utils/request';

import { useAppDispatch } from '@/hooks/reduxHooks';
import { createAsyncMessage } from '@/slice/messageSlice';
import {
  TPostUserOrderPayload,
  UseMutationOptions,
  TCreateMessagePayload,
} from '@/types';

const POST_USER_ORDER = '/v2/api/{api_path}/order';

// post order
const postOrder = (payload: TPostUserOrderPayload = {}) => {
  if (!payload.data) throw new Error('Payload data is empty');

  return request.post(`/order`, payload);
};

export const usePostOrderMutation = ({
  reactQuery = {},
}: UseMutationOptions<paths[typeof POST_USER_ORDER]['post']> = {}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: TPostUserOrderPayload) => postOrder(payload),
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
