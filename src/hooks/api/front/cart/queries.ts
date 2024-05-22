import { useQuery } from '@tanstack/react-query';

import request from '@/utils/request';

import { TUserCarts } from '@/types';
import { AxiosResponse } from 'axios';

const getUserCarts = async (): Promise<TUserCarts> => {
  const response: AxiosResponse<TUserCarts> = await request.get('/cart');
  return response.data;
};

export const useUserCartsQuery = () =>
  //   {
  //   options,
  // }: {
  //   options?: UseQueryOptions<TUserCarts>;
  // }
  {
    return useQuery({
      queryKey: ['userCarts'],
      queryFn: getUserCarts,
      select: (data) => data.data,
      // ...options,
    });
  };
