import type { ParamsOption, RequestBodyOption } from 'openapi-fetch';

import { definitions, paths } from '../lib/api/v1';
import { UseQueryOptions as ReactQueryUseQueryOptions } from '@tanstack/react-query';
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

export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type ExtractJsonResponse<T> = T extends {
  responses: { 200: { schema: infer ContentType } };
}
  ? ContentType
  : never;

export type TResponse<T = any> = {
  success: boolean;
  message?: Record<string, any>[];
} & T;

// react-query options
export type UseQueryOptions<T> = {
  reactQuery?: {
    select: (res: T) => any;
  };
};
// export type UseQueryOptions<T> = ParamsOption<T> &
//   RequestBodyOption<T> & {
//     reactQuery?: ReactQueryUseQueryOptions<T>;
//   };
// export type UseQueryOptions<T> = ParamsOption<T> &
//   RequestBodyOption<T> & {
//     reactQuery?: {
//       enabled?: boolean;
//       select?: (data: any) => any;
//       onSuccess?: (data: any) => void;
//       onError?: (error: any) => void;
//     };
//   };

export type UseMutationOptions<T> =
  | (ParamsOption<T> &
      RequestBodyOption<T> & {
        reactQuery?: {
          onSuccess?: (res: Record<string, any>) => void;
          onError?: (error: any) => void;
          onSettled?: (data: any, error: any) => void;
        };
      })
  | {
      reactQuery?: {
        onSuccess?: (res: Record<string, any>) => void;
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

export type TUpdateUserCartPayload =
  paths['/v2/api/{api_path}/cart/{id}']['put']['parameters']['body']['data'];

// user coupon
export type TSubmitUserCouponPayload =
  paths['/v2/api/{api_path}/coupon']['post']['parameters']['body']['data'];
