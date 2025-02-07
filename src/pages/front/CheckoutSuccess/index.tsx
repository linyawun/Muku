import { useUserOrderByIdQuery } from '@/hooks/api/front/order/queries';
import { TUserOrder } from '@/types';
import { useParams } from 'react-router-dom';
import OrderNotFound from './components/OrderNotFound';
import OrderSuccess from './components/OrderSuccess';
import Loading from '@/components/Loading';
import ContainerLayout from './components/ContainerLayout';
import { TCouponData } from '@/types';

function CheckoutSuccess() {
  const { orderId } = useParams();
  const { data: orderData, status: orderDataStatus } = useUserOrderByIdQuery({
    params: {
      order_id: orderId!,
    },
    reactQuery: {
      enabled: !!orderId,
    },
  });

  const calculateCoupon = (orderData: TUserOrder['order']): TCouponData => {
    let couponData: TCouponData;
    const firstProduct = Object.values(orderData?.products || {})[0];
    if (firstProduct?.coupon) {
      couponData = {
        hasCoupon: true,
        discount: Object.values(orderData?.products || {}).reduce(
          (total, cur) => {
            total += cur.total;
            return total;
          },
          0
        ),
      };
    } else {
      couponData = {
        hasCoupon: false,
        discount: 0,
      };
    }

    return couponData;
  };

  const couponData = orderData && calculateCoupon(orderData);

  return (
    <div className='container'>
      <Loading isLoading={orderDataStatus === 'pending'} />
      <ContainerLayout>
        {orderDataStatus === 'success' ? (
          orderData ? (
            <OrderSuccess
              orderData={orderData}
              couponData={couponData}
              orderId={orderId!}
            />
          ) : (
            <OrderNotFound />
          )
        ) : null}
      </ContainerLayout>
    </div>
  );
}
export default CheckoutSuccess;
