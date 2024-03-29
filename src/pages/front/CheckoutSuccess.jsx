import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createAsyncMessage } from '../../slice/messageSlice';
import CheckoutSteps from '../../components/CheckoutSteps';
import Loading from '../../components/Loading';
function CheckoutSuccess() {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState({});
  const [couponData, setCouponData] = useState({});

  const getOrder = useCallback(
    async (orderId) => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `/v2/api/${import.meta.env.VITE_APP_API_PATH}/order/${orderId}`
        );
        if (res.data.order) {
          setOrderData(res.data.order);
        } else {
          navigate('/');
        }
        setIsLoading(false);
      } catch (error) {
        dispatch(createAsyncMessage(error.response.data));
        setIsLoading(false);
      }
    },
    [dispatch, navigate]
  );

  const payOrder = async (orderId) => {
    try {
      const res = await axios.post(
        `/v2/api/${import.meta.env.VITE_APP_API_PATH}/pay/${orderId}`
      );
      if (res.data.success) {
        dispatch(createAsyncMessage(res.data));
        getOrder(orderId);
      }
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
    }
  };
  useEffect(() => {
    getOrder(orderId);
  }, [orderId, getOrder]);

  useEffect(() => {
    if (Object.values(orderData?.products || {})[0]?.coupon) {
      setCouponData({
        hasCoupon: true,
        discount: Object.values(orderData?.products || {}).reduce(
          (total, cur) => {
            total += cur.total;
            return total;
          },
          0
        ),
      });
    } else {
      setCouponData({
        hasCoupon: false,
        discount: 0,
      });
    }
  }, [orderData]);
  return (
    <div className='container'>
      <Loading isLoading={isLoading} />
      {orderData ? (
        <div
          className='mt-5 mb-7'
          style={{ minHeight: 'calc((100vh - 70px) - 350px)' }}
        >
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
                                  <small>
                                    NT$ {item.total.toLocaleString()}
                                  </small>
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
                              <th
                                scope='row'
                                className='border-0 px-0 fw-normal'
                              >
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
                                  couponData?.discount - orderData.total
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
                            <button
                              type='button'
                              className='btn btn-primary'
                              onClick={() => {
                                payOrder(orderId);
                              }}
                              aria-label='Pay'
                            >
                              確認付款
                            </button>
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
        </div>
      ) : (
        <div
          className='my-7'
          style={{ minHeight: 'calc((100vh - 70px) - 350px)' }}
        >
          <div className='row flex-column justify-content-center align-items-center py-5'>
            <h5 className='col-lg-4 col-10 text-center mb-4'>此訂單不存在</h5>
            <Link
              to='/'
              type='button'
              className='col-lg-4 col-10 btn btn-primary py-2'
              aria-label='Go to Home'
            >
              回到首頁
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
export default CheckoutSuccess;
