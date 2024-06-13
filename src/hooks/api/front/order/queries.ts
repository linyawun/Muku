import { useQuery } from '@tanstack/react-query';

import { TUserOrder, TUserOrderPayload, UseQueryOptions } from '@/types';
import request from '@/utils/request';
import { AxiosResponse } from 'axios';

const getUserOrderById = async (
  params: TUserOrderPayload
): Promise<TUserOrder> => {
  const { order_id } = params;
  if (!order_id) throw new Error('order_id is empty');
  const response: AxiosResponse<TUserOrder> = await request.get(
    `/order/${order_id}`
  );
  return response.data;
};

export const useUserOrderByIdQuery = ({
  params,
  reactQuery = {},
}: {
  params: TUserOrderPayload;
  reactQuery?: Omit<UseQueryOptions<TUserOrder>, 'select'>;
}) => {
  return useQuery({
    queryKey: ['userOrder', params],
    queryFn: () => getUserOrderById(params),
    select: (data) => data?.order,
    retry: 0,
    ...reactQuery,
  });
};
