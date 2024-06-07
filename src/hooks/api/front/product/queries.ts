import { useQuery } from '@tanstack/react-query';

import request from '@/utils/request';

import {
  TUserProduct,
  TUserProductParams,
  TUserProducts,
  TUserProductsParams,
} from '@/types';
import { AxiosResponse } from 'axios';

const getAllUserProducts = async () => {
  const response: AxiosResponse<TUserProducts> = await request.get(
    '/products/all'
  );
  return response.data;
};

const useAllUserProductsQuery = (config = {}) => {
  return useQuery({
    queryKey: ['allUserProducts'],
    queryFn: () => getAllUserProducts(),
    select: (data) => data?.products,
    ...config,
  });
};

const getUserProducts = async (
  params: TUserProductsParams
): Promise<TUserProducts> => {
  const response: AxiosResponse<TUserProducts> = await request.get(
    '/products',
    { params: params }
  );
  return response.data;
};

export const useUserProductsQuery = (
  params: TUserProductsParams,
  config = {}
) => {
  return useQuery({
    queryKey: ['userProducts', params],
    queryFn: () => getUserProducts(params),
    select: (data) => data?.products,
    ...config,
  });
};

const getUserProductById = async (
  params: TUserProductParams
): Promise<TUserProduct> => {
  const { id } = params;
  if (!id) throw new Error('id is empty');
  const response: AxiosResponse<TUserProduct> = await request.get(
    `/product/${id}`
  );
  return response.data;
};

export const useUserProductByIdQuery = (
  params: TUserProductParams,
  config = {}
) => {
  return useQuery({
    queryKey: ['userProduct', params],
    queryFn: () => getUserProductById(params),
    select: (data) => data?.product,
    retry: 1,
    ...config,
  });
};
