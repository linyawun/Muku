import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import request from '@/utils/request';

import { TAdminOrders, TAdminOrdersPayload } from '@/types';
import { AxiosResponse } from 'axios';

const getAdminOrders = async (
  params: TAdminOrdersPayload
): Promise<TAdminOrders> => {
  const response: AxiosResponse<TAdminOrders> = await request.get(
    '/admin/orders',
    { params: params }
  );
  return response.data;
};

export const useAdminOrdersQuery = ({
  params,
  reactQuery,
}: {
  params: TAdminOrdersPayload;
  reactQuery?: UseQueryOptions<TAdminOrders>;
}) => {
  return useQuery<TAdminOrders>({
    queryKey: ['adminOrders', params],
    queryFn: () => getAdminOrders(params),
    ...reactQuery,
  });
};
