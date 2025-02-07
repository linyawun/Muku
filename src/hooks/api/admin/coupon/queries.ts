import { useQuery } from '@tanstack/react-query';

import request from '@/utils/request';

import { TAdminCoupons, TCouponsPayload, UseQueryOptions } from '@/types';
import { AxiosResponse } from 'axios';

const getAdminCoupons = async (
  params: TCouponsPayload
): Promise<TAdminCoupons> => {
  const response: AxiosResponse<TAdminCoupons> = await request.get(
    '/admin/coupons',
    { params: params }
  );
  return response.data;
};

export const useAdminCouponsQuery = ({
  params,
  reactQuery = {},
}: {
  params: TCouponsPayload;
  reactQuery?: UseQueryOptions<TAdminCoupons>;
}) => {
  return useQuery({
    queryKey: ['adminCoupons', params],
    queryFn: () => getAdminCoupons(params),
    ...reactQuery,
  });
};
