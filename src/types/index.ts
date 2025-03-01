import type { ParamsOption, RequestBodyOption } from 'openapi-fetch';

import { UseQueryResult } from '@tanstack/react-query';
import { definitions, paths } from '../lib/api/v1';

// message types
export type TMessage = {
  id: string;
  type: string;
  title: string;
  text: string;
  timerId: number | NodeJS.Timeout | null;
};

export type TCreateMessagePayload = {
  success: boolean;
  message: string;
};

export type TMessageWithId = TCreateMessagePayload & {
  id: string;
  timerId: NodeJS.Timeout | null;
};

// upload image types
export type TImageState = {
  uploadMsg: string;
  uploadVal: string;
};

export type TUploadImgState = {
  mainImg: TImageState;
  detailImg1: TImageState;
  detailImg2: TImageState;
  detailImg3: TImageState;
  detailImg4: TImageState;
  detailImg5: TImageState;
};

// bootstrap types
export type TCollapse = {
  toggle: () => void;
  show: () => void;
  hide: () => void;
  dispose: () => void;
};

export type TModal = {
  show: () => void;
  hide: () => void;
  toggle: () => void;
};

// cart context types
export type CartContextType = {
  getCart: UseQueryResult['refetch'];
  cartData: TUserCarts['data'];
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
  select?: (res: T) => T | (T extends object ? Partial<T> : never);
  enabled?: boolean;
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
          // onError?: (error) => void;
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

export type TPagination = {
  total_pages?: number;
  current_page?: number;
  has_pre?: boolean;
  has_next?: boolean;
  category?: string;
};

// admin signin
export type TSigninPayload =
  paths['/v2/admin/signin']['post']['parameters']['body']['data'];

export type TSigninResponse = definitions['adminSignin'];

export type TSigninErrorResponse = {
  response?: {
    data?: {
      error?: {
        code: string;
      };
    };
  };
};

// admin user check
export type TUserCheckResponse = definitions['checkLoginAuth'];

export type TUserCheckErrorResponse = {
  response?: {
    data?: TUserCheckResponse;
  };
};

// admin coupon
export type TCouponsPayload =
  paths['/v2/api/{api_path}/admin/coupons']['get']['parameters']['query'];

export type TAdminCoupons = definitions['getCoupons'];

export type TAdminCoupon = NonNullable<TAdminCoupons['coupons']>[number];

export type TCreateCouponPayload =
  paths['/v2/api/{api_path}/admin/coupon']['post']['parameters']['body']['data'];

export type TEditCouponPayload = {
  id?: string;
  payloadData?: TCreateCouponPayload;
};

export type TDeleteCouponPayload = Omit<
  paths['/v2/api/{api_path}/admin/coupon/{id}']['delete']['parameters']['path'],
  'api_path'
>;

// admin order
export type TAdminOrdersPayload =
  paths['/v2/api/{api_path}/admin/orders']['get']['parameters']['query'];

export type TAdminOrders = definitions['getOrders'];

export type TAdminOrder = NonNullable<TAdminOrders['orders']>[number];

export type TAdminModalType = 'create' | 'edit';

export type TEditOrderPayload = {
  id?: string;
  payloadData?: { data: TAdminOrder };
};

export type TDeleteOrderPayload = Omit<
  paths['/v2/api/{api_path}/admin/order/{id}']['delete']['parameters']['path'],
  'api_path'
>;

// admin product
export type TAdminAllProducts = definitions['getProductsAll'];

export type TAdminAllProductsPayload = Omit<
  paths['/v2/api/{api_path}/admin/products/all']['get']['parameters']['path'],
  'api_path'
>;

export type TAdminProducts = definitions['getProducts'];

export type TAdminProductsPayload =
  paths['/v2/api/{api_path}/admin/products']['get']['parameters']['query'];

export type TAdminProduct = NonNullable<TAdminProducts['products']>[number];

export type TDeleteProductPayload = Omit<
  paths['/v2/api/{api_path}/admin/product/{id}']['delete']['parameters']['path'],
  'api_path'
>;

export type TEditProductPayload = {
  id?: string;
  payloadData?: { data: TAdminProduct };
};

export type TCreateProductPayload =
  paths['/v2/api/{api_path}/admin/product']['post']['parameters']['body']['data'];

// city and district
export type TCityItem = {
  countyName: string;
  countyCode: string;
};

export type TDistrictPayload = {
  countyCode?: string;
};

export type TDistrictItem = {
  townname: string;
  towncode: string;
  towncode01: string;
};

// user products
export type TUserProducts = definitions['userProductsAll'] & {
  pagination: TPagination;
};

export type TUserProductsPayload =
  paths['/v2/api/{api_path}/products']['get']['parameters']['query'];

export type TUserProduct = definitions['userProduct'];

export type TUserProductPayload = Pick<
  paths['/v2/api/{api_path}/product/{id}']['get']['parameters']['path'],
  'id'
>;

// user cart
export type TUserCarts = definitions['userGetCarts'];

export type TUserCartItem = {
  coupon?: {
    code?: string;
    due_date?: number;
    id?: string;
    is_enabled?: number;
    percent?: number;
    title?: string;
  };
  final_total?: number;
  id?: string;
  product?: {
    category?: string;
    content?: string;
    description?: string;
    id?: string;
    imageUrl?: string;
    imagesUrl?: string[];
    is_enabled?: number;
    num?: number;
    origin_price?: number;
    price?: number;
    title?: string;
    unit?: string;
  };
  product_id?: string;
  qty?: number;
  total?: number;
};

export type TAddUserCartPayload =
  paths['/v2/api/{api_path}/cart']['post']['parameters']['body']['data'];

export type TAddUserCartResponse = definitions['userAddCart'];

export type TUpdateUserCartPayload =
  paths['/v2/api/{api_path}/cart/{id}']['put']['parameters']['body']['data'];

export type TDeleteUserCartPayload = Omit<
  paths['/v2/api/{api_path}/cart/{id}']['delete']['parameters']['path'],
  'api_path'
>;

// user coupon
export type TSubmitUserCouponPayload =
  paths['/v2/api/{api_path}/coupon']['post']['parameters']['body']['data'];

export type TCouponData = {
  hasCoupon: boolean;
  discount: number;
};

// user order
export type TUserOrder = definitions['userGetOrder'] & {
  order: { products: TUserOrderProductItem[] };
};

export type TUserOrderPayload = Pick<
  paths['/v2/api/{api_path}/order/{order_id}']['get']['parameters']['path'],
  'order_id'
>;

export type TPostUserOrderPayload =
  paths['/v2/api/{api_path}/order']['post']['parameters']['body']['data'];

export type TUserOrderProductItem = {
  coupon: TUserCartItem['coupon'];
  final_total: number;
  product: TUserCartItem['product'];
  id: string;
  product_id: string;
  qty: number;
  total: number;
};

// user pay order
export type TPayUserOrderPayload = Pick<
  paths['/v2/api/{api_path}/pay/{order_id}']['post']['parameters']['path'],
  'order_id'
>;

// user checkout order form
export type TCheckoutFormData = {
  name: string;
  email: string;
  tel: string;
  city: string;
  district: string;
  address: string;
  message: string;
};
