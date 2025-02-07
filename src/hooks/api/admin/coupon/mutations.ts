import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAppDispatch } from '@/hooks/reduxHooks';
import { paths } from '@/lib/api/v1';
import { createAsyncMessage } from '@/slice/messageSlice';
import {
  TCreateCouponPayload,
  TCreateMessagePayload,
  TDeleteCouponPayload,
  TEditCouponPayload,
  UseMutationOptions,
} from '@/types';
import request from '@/utils/request';

const CREATE_COUPON = '/v2/api/{api_path}/admin/coupon';
const EDIT_COUPON = '/v2/api/{api_path}/admin/coupon/{id}';
const DELETE_COUPON = '/v2/api/{api_path}/admin/coupon/{id}';

// create coupon
const createCoupon = (payload: TCreateCouponPayload = {}) => {
  return request.post(`/admin/coupon`, payload);
};

export const useCreateCouponMutation = ({
  reactQuery = {},
}: UseMutationOptions<paths[typeof CREATE_COUPON]['post']> = {}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { onSuccess: customOnSuccess = () => {}, ...restReactQuery } =
    reactQuery;

  return useMutation({
    mutationFn: (payload: TCreateCouponPayload) => createCoupon(payload),
    onSuccess: (res) => {
      const message = res?.data as TCreateMessagePayload;
      void dispatch(createAsyncMessage(message));
      void queryClient.invalidateQueries({
        queryKey: ['adminCoupons'],
      });
      customOnSuccess(res);
    },
    ...restReactQuery,
  });
};

// edit coupon
const editCoupon = (payload: TEditCouponPayload = {}) => {
  const { id, payloadData } = payload;
  if (!id) throw new Error('id is empty');
  if (!payloadData) throw new Error('payload data is empty');

  return request.put(`/admin/coupon/${id}`, payloadData);
};

export const useEditCouponMutation = ({
  reactQuery = {},
}: UseMutationOptions<paths[typeof EDIT_COUPON]['put']> = {}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { onSuccess: customOnSuccess = () => {}, ...restReactQuery } =
    reactQuery;

  return useMutation({
    mutationFn: (payload: TEditCouponPayload) => editCoupon(payload),
    onSuccess: (res) => {
      const message = res?.data as TCreateMessagePayload;
      void dispatch(createAsyncMessage(message));
      void queryClient.invalidateQueries({
        queryKey: ['adminCoupons'],
      });
      customOnSuccess(res);
    },
    ...restReactQuery,
  });
};

// delete coupon
const deleteCoupon = ({ id }: TDeleteCouponPayload) => {
  if (!id) throw new Error('id is empty');

  return request.delete(`/admin/coupon/${id}`);
};

export const useDeleteCouponMutation = ({
  reactQuery = {},
}: UseMutationOptions<paths[typeof DELETE_COUPON]['delete']> = {}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { onSuccess: customOnSuccess = () => {}, ...restReactQuery } =
    reactQuery;

  return useMutation({
    mutationFn: ({ id }: TDeleteCouponPayload) => deleteCoupon({ id }),
    onSuccess: (res) => {
      const message = res?.data as TCreateMessagePayload;
      void dispatch(createAsyncMessage(message));
      void queryClient.invalidateQueries({
        queryKey: ['adminCoupons'],
      });
      customOnSuccess(res);
    },
    ...restReactQuery,
  });
};
