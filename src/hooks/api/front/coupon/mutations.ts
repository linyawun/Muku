import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAppDispatch } from '@/hooks/reduxHooks';
import { paths } from '@/lib/api/v1';
import { createAsyncMessage } from '@/slice/messageSlice';
import {
  TCreateMessagePayload,
  TSubmitUserCouponPayload,
  UseMutationOptions,
} from '@/types';
import request from '@/utils/request';

const SUBMIT_USER_COUPON = '/v2/api/{api_path}/coupon';

// submitCoupon
const submitCoupon = (payload: TSubmitUserCouponPayload = {}) => {
  if (!payload.data) throw new Error('Payload data is empty');

  const { code } = payload.data;
  if (!code) throw new Error('code is empty');

  return request.post(`/coupon`, payload);
};

export const useSubmitCouponMutation = ({
  reactQuery = {},
}: UseMutationOptions<paths[typeof SUBMIT_USER_COUPON]['post']> = {}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: TSubmitUserCouponPayload) => submitCoupon(payload),
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
