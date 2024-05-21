import { useMutation } from '@tanstack/react-query';

import { TSubmitUserCouponPayload, UseMutationOptions } from '@/types';
import request from '@/utils/request';
import { paths } from '@/lib/api/v1';

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
  return useMutation({
    mutationFn: (payload: TSubmitUserCouponPayload) => submitCoupon(payload),
    ...reactQuery,
  });
};
