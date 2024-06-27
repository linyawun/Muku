// -O0K6EWXf00nR4q9rTCN 訂單號碼

import CheckoutSteps from '@/components/CheckoutSteps';
import { Link } from 'react-router-dom';
import { TUserOrder } from '@/types';
import { usePayOrderMutation } from '@/hooks/api/front/pay/mutations';
import { TCouponData } from '@/types';

type TOrderSuccessProps = {
  orderData: TUserOrder['order'];
  couponData?: TCouponData;
  orderId: string;
};

function OrderSuccess({ orderData, couponData, orderId }: TOrderSuccessProps) {
  const { mutate: payOrder, status: payOrderStatus } = usePayOrderMutation();

  const handlePayOrder = (orderId: string) => {
    payOrder({
      order_id: orderId,
    });
  };

  return (
    <>
      <CheckoutSteps
        data={[
          { step: 1, content: '購物車', done: true },
          { step: 2, content: '填寫資料', done: true },
          { step: 3, content: '完成訂購', done: true },
        ]}
      />
      <div className='row mt-5'>
        <div className='col-md-6'>
          <h2 className='text-primary'>
            <i className='bi bi-check-circle-fill me-2'></i>
            訂購完成！
          </h2>
          <p>
            我們已收到您的訂單，感謝您在 Muku
            購物，謝謝您對我們的信任和支持，讓我們有機會為您提供優質的服務。
          </p>
          <p>
            <strong>請您於 3 日內付款</strong>
            ，我們會盡快準備商品，期待能將商品寄送給您，祝您有個美好的一天！
          </p>
          <Link
            to='/'
            className='btn btn-outline-primary me-2 rounded-0 mb-4'
            aria-label='Go to Home'
          >
            回到首頁
          </Link>
        </div>
        <div className='col-md-6'>
          <div className='card rounded-0 py-4'>
            <div className='card-header border-bottom-0 bg-white px-4 py-0'>
              <h3>訂單細節</h3>
            </div>
            <div className='card-body px-4 py-0'>
              <ul className='list-group list-group-flush'>
                {Object.values(orderData?.products || {}).map((item) => {
                  if (!item.product) return;
                  return (
                    <li className='list-group-item px-0' key={item.id}>
                      <div className='d-flex mt-2'>
                        <img
                          src={item.product.imageUrl}
                          alt=''
                          className='me-2'
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                          }}
                        />
                        <div className='w-100 d-flex flex-column'>
                          <div className='d-flex justify-content-between fw-bold'>
                            <h5>{item.product.title}</h5>
                            <p className='mb-0'>x{item.qty}</p>
                          </div>
                          <div className='d-flex justify-content-between mt-auto'>
                            <p
                              className={`text-muted mb-0 text-decoration-line-through me-1 ${
                                item.coupon ? 'd-block' : 'd-none'
                              }`}
                            >
                              <small>NT$ {item.total.toLocaleString()}</small>
                            </p>
                            <p className='mb-0'>
                              NT$ {item.final_total.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
                <li className='list-group-item px-0 pb-0'>
                  {couponData?.hasCoupon && (
                    <table className='table text-muted'>
                      <tbody>
                        <tr>
                          <th scope='row' className='border-0 px-0 fw-normal'>
                            商品總金額
                          </th>
                          <td className='text-end border-0 px-0'>
                            NT$ {couponData?.discount}
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope='row'
                            className='border-0 px-0 pt-0 fw-normal'
                          >
                            優惠折抵
                          </th>
                          <td className='text-end border-0 px-0 pt-0'>
                            -NT${' '}
                            {(
                              couponData?.discount - (orderData?.total || 0)
                            )?.toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                  <div className='d-flex justify-content-between align-items-center mt-2'>
                    <p className='mb-0 h5'>付款狀態</p>
                    <p className='mb-0'>
                      {orderData?.is_paid === false ? (
                        <>
                          <button
                            type='button'
                            className='btn btn-primary'
                            onClick={() => {
                              if (orderId) {
                                handlePayOrder(orderId);
                              }
                            }}
                            aria-label='payOrder'
                            disabled={payOrderStatus === 'pending'}
                          >
                            {payOrderStatus === 'pending' && (
                              <span
                                className='spinner-border spinner-border-sm me-2'
                                role='status'
                                aria-hidden='true'
                              ></span>
                            )}
                            確認付款
                          </button>
                        </>
                      ) : (
                        '已付款'
                      )}
                    </p>
                  </div>
                  <div className='d-flex justify-content-between mt-2'>
                    <p className='mb-0 h4 fw-bold'>訂單總金額</p>
                    <p className='mb-0 h4 fw-bold'>
                      NT${' '}
                      {orderData?.total &&
                        Math.round(orderData.total).toLocaleString()}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderSuccess;
