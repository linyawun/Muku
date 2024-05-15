import { useQuery } from '@tanstack/react-query';

import request from '@/utils/request';

import { TAxiosRes, TUserCarts } from '@/types';

const getUserCarts = (): Promise<TAxiosRes<TUserCarts>> => {
  return request.get('/cart');
};

export const useUserCartsQuery = (config = {}) => {
  return useQuery({
    queryKey: ['userCarts'],
    queryFn: () => getUserCarts(),
    ...config,
  });
};
