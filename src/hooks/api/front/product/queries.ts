import { useQuery } from '@tanstack/react-query';

import request from '@/utils/request';

import {
  TUserProductParams,
  TUserProducts,
  TUserProductsParams,
} from '@/types';
import { AxiosResponse } from 'axios';

const getUserProducts = (
  params: TUserProductsParams
): Promise<AxiosResponse<TUserProducts>> => {
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
): Promise<AxiosResponse<TUserProducts>> => {
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
