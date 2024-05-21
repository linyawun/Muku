import { useQuery } from '@tanstack/react-query';

import request from '@/utils/request';

import { TUserCarts, UseQueryOptions } from '@/types';
import { AxiosResponse } from 'axios';

const getUserCarts = (): Promise<AxiosResponse<TUserCarts>> => {
  return request.get('/cart');
};

export const useUserCartsQuery = ({
  reactQuery,
}: UseQueryOptions<TUserCarts>) => {
  return useQuery({
    queryKey: ['userCarts'],
    queryFn: async () => {
      const { data } = await getUserCarts();
      return data;
      //throw new Error('getUserCarts failed');
    },
    ...reactQuery,
  });
};
