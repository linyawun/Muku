import { UseQueryOptions } from '@/types';
import request from '@/utils/request';
import { useQuery } from '@tanstack/react-query';

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

export const useAllUserProductsQuery = (config = {}) => {
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

export const useUserProductsQuery = ({
  params,
  reactQuery = {},
}: {
  params: TUserProductsParams;
  reactQuery?: UseQueryOptions<TUserProducts>;
}) => {
  return useQuery({
    queryKey: ['userProducts', params],
    queryFn: () => getUserProducts(params),
    //select: (data) => data?.products,
    ...reactQuery,
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

export const useUserProductByIdQuery = ({
  params,
  reactQuery = {},
}: {
  params: TUserProductParams;
  reactQuery?: Omit<UseQueryOptions<TUserProducts>, 'select'>;
}) => {
  return useQuery({
    queryKey: ['userProduct', params],
    queryFn: () => getUserProductById(params),
    select: (data) => data?.product,
    retry: 1,
    ...reactQuery,
  });
};
