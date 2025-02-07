import {
  TAdminAllProducts,
  TAdminProducts,
  TAdminProductsPayload,
  TUserProductsPayload,
  UseQueryOptions,
} from '@/types';
import request from '@/utils/request';
import { useQuery } from '@tanstack/react-query';

import { AxiosResponse } from 'axios';

const getAllAdminProducts = async () => {
  const response: AxiosResponse<TAdminAllProducts> = await request.get(
    '/admin/products/all'
  );
  return response.data;
};

export const useAllAdminProductsQuery = (config = {}) => {
  return useQuery({
    queryKey: ['allAdminProducts'],
    queryFn: () => getAllAdminProducts(),
    select: (data) => data?.products,
    ...config,
  });
};

const getAdminProducts = async (
  params: TAdminProductsPayload
): Promise<TAdminProducts> => {
  const response: AxiosResponse<TAdminProducts> = await request.get(
    'admin/products',
    { params: params }
  );
  return response.data;
};

export const useAdminProductsQuery = ({
  params,
  reactQuery = {},
}: {
  params: TUserProductsPayload;
  reactQuery?: UseQueryOptions<TAdminProducts>;
}) => {
  return useQuery({
    queryKey: ['adminProducts', params],
    queryFn: () => getAdminProducts(params),
    //select: (data) => data?.products,
    ...reactQuery,
  });
};
