import { useMutation } from '@tanstack/react-query';

import { TSubmitUserCouponPayload } from '@/types';
import request from '@/utils/request';

// submitCoupon
const submitCoupon = (payload: TSubmitUserCouponPayload = {}) => {
  if (!payload.data) throw new Error('Payload data is empty');

  const { code } = payload.data;
  if (!code) throw new Error('code is empty');

  return request.post(`/coupon`, payload);
};

export const useSubmitCouponMutation = (config = {}) => {
  return useMutation({
    mutationFn: (payload: TSubmitUserCouponPayload) => submitCoupon(payload),
    ...config,
  });
};
