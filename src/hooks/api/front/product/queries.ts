import { useQuery } from '@tanstack/react-query';

import request from '@/utils/request';

import {
  TAxiosRes,
  TUserProductParams,
  TUserProducts,
  TUserProductsParams,
} from '@/types';

const getUserProducts = (
  params: TUserProductsParams
): Promise<TAxiosRes<TUserProducts>> => {
  return request.get('/products', { params: params });
};

export const useUserProductsQuery = (
  params: TUserProductsParams,
  config = {}
) => {
  return useQuery({
    queryKey: ['userProducts', 'all'],
    queryFn: () => getUserProducts(params),
    ...config,
  });
};

const getUserProductById = (
  params: TUserProductParams
): Promise<TAxiosRes<TUserProducts>> => {
  const { id } = params;
  if (!id) throw new Error('id is empty');
  return request.get(`/product/${id}`);
};

export const useUserProductByIdQuery = (
  params: TUserProductParams,
  config = {}
) => {
  return useQuery({
    queryKey: ['userProduct', params],
    queryFn: () => getUserProductById(params),
    ...config,
  });
};
