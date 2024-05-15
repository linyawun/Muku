import type { ParamsOption, RequestBodyOption } from 'openapi-fetch';

import { definitions, paths } from '../lib/api/v1';

export type TMessage = {
  id: string;
  type: string;
  title: string;
  text: string;
  timerId: number | NodeJS.Timeout | null;
};

// api util types
export type TAxiosRes<T = undefined> = {
  data: T;
};

export type ExtractJsonResponse<T> = T extends {
  responses: { 200: { schema: infer ContentType } };
}
  ? ContentType
  : never;

// react-query options
export type UseQueryOptions<T> = ParamsOption<T> &
  RequestBodyOption<T> & {
    reactQuery?: {
      enabled?: boolean;
      select?: (data: ExtractJsonResponse<T>) => any;
      onSuccess?: (data: any) => void;
      onError?: (error: any) => void;
    };
  };

export type UseMutationOptions<T> =
  | (ParamsOption<T> &
      RequestBodyOption<T> & {
        reactQuery?: {
          onSuccess?: (data: any) => void;
          onError?: (error: any) => void;
          onSettled?: (data: any, error: any) => void;
        };
      })
  | {
      reactQuery?: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
        onSettled?: (data: any, error: any) => void;
      };
    };

// user products
export type TUserProducts = definitions['userProductsAll'];

export type TUserProductsParams =
  paths['/v2/api/{api_path}/products']['get']['parameters']['query'];

export type TUserProduct = definitions['userProduct'];

export type TUserProductParams = Pick<
  paths['/v2/api/{api_path}/product/{id}']['get']['parameters']['path'],
  'id'
>;

// user cart
export type TUserCarts = definitions['userGetCarts'];

export type TAddUserCartPayload =
  paths['/v2/api/{api_path}/cart']['post']['parameters']['body']['data'];

export type TAddUserCartResponse = definitions['userAddCart'];

export type TResponse<T = any> = {
  success: boolean;
  message?: Record<string, any>[];
} & T;
