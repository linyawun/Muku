import { useUpdateCartMutation } from '@/hooks/api/front/cart/mutations';
import { useAppDispatch } from '@/hooks/reduxHooks';
import axios from 'axios';
import { Modal } from 'bootstrap';
import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import CheckoutSteps from '../../components/CheckoutSteps';
import CouponInput from '../../components/CouponInput';
import DeleteModal from '../../components/DeleteModal';
import Loading from '../../components/Loading';
import NoCartData from '../../components/NoCartData';
import { createAsyncMessage } from '../../slice/messageSlice';

function Cart() {
  const { cartData, getCart } = useOutletContext();
  const [loadingItems, setLoadingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const deleteModal = useRef(null);
  const dispatch = useAppDispatch();
  const { mutate: updateCart, status: updateCartStatus } =
    useUpdateCartMutation();
  const hasCoupon = cartData?.final_total !== cartData?.total;

  const removeCartItem = useMemo(
    () => async (id) => {
      try {
        const res = await axios.delete(
          `/v2/api/${import.meta.env.VITE_APP_API_PATH}/cart/${id}`
        );
        getCart();
        dispatch(createAsyncMessage(res.data));
      } catch (error) {
        dispatch(createAsyncMessage(error.response.data));
      }
    },
    [dispatch, getCart]
  );
  const updateCartItem = async (item, quantity) => {
    const data = {
      data: {
        product_id: item.product_id,
        qty: quantity,
      },
    };
    setLoadingItems((pre) => [...pre, item.id]);
    try {
      const res = await axios.put(
        `/v2/api/${import.meta.env.VITE_APP_API_PATH}/cart/${item.id}`,
        data
      );
      setLoadingItems(
        loadingItems.filter((loadingObj) => loadingObj !== item.id)
      );
      dispatch(createAsyncMessage(res.data));
      getCart();
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
      setLoadingItems(
        loadingItems.filter((loadingObj) => loadingObj !== item.id)
      );
    }
  };
  const deleteAllCart = async () => {
    try {
      const res = await axios.delete(
        `/v2/api/${import.meta.env.VITE_APP_API_PATH}/carts`
      );
      getCart();
      closeDeleteModal();
      dispatch(createAsyncMessage(res.data));
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
    }
  };

  const openDeleteModal = () => {
    deleteModal.current.show();
  };
  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };
  useEffect(() => {
    deleteModal.current = new Modal('#deleteModal', {
      backdrop: 'static',
    });
  }, []);

  const debouncedClick = useMemo(
    () => debounce((id) => removeCartItem(id), 200),
    [removeCartItem]
  );

  return (
    <div className='container'>
      <DeleteModal
        close={closeDeleteModal}
        text='全部商品'
        handleDelete={deleteAllCart}
      />
      <Loading isLoading={isLoading} />
      <div className='row justify-content-center'>
        <div
          className='col-lg-6 col-md-8 bg-white py-5'
          style={{ minHeight: 'calc(100vh - 56px - 76px)' }}
        >
          <CheckoutSteps
            data={[
              { step: 1, content: '購物車', done: true },
              { step: 2, content: '填寫資料', done: false },
              { step: 3, content: '完成訂購', done: false },
            ]}
          />
          <div className='d-flex justify-content-between align-items-center'>
            <h2 className='mt-2 text-primary'>購物車</h2>
            <button
              type='button'
              className={`btn btn-secondary btn-sm ${
                cartData?.carts?.length === 0 ? 'd-none' : 'd-block'
              }`}
              onClick={() => {
                openDeleteModal();
              }}
              aria-label='Delete All'
            >
              刪除全部
            </button>
          </div>
          {cartData?.carts?.length !== 0 ? (
            <>
              {cartData?.carts?.map((item) => {
                return (
                  <div
                    className='d-flex mt-4 mb-4 p-2 bg-light align-items-center'
                    key={item.id}
                  >
                    <img
                      src={item.product.imageUrl}
                      alt='productImg'
                      className='object-cover'
                      style={{
                        width: '100px',
                        height: '100px',
                      }}
                    />
                    <div className='w-100 ms-3 position-relative d-flex flex-column justify-content-between'>
                      <button
                        type='button'
                        className='position-absolute btn border-0'
                        style={{ top: '-8px', right: '-8px' }}
                        onClick={() => debouncedClick(item.id)}
                        aria-label='Delete'
                      >
                        <i className='bi bi-x-lg'></i>
                      </button>

                      <p className='mb-2' style={{ width: '90%' }}>
                        {item.product.title}
                      </p>

                      <div className='row justify-content-between align-items-center w-100'>
                        <div className='col-lg-4 col-sm-5 col-7 md-mb-0 mb-2'>
                          <select
                            name=''
                            className='form-select'
                            id=''
                            value={item.qty}
                            disabled={loadingItems.includes(item.id)}
                            onChange={(e) => {
                              updateCartItem(item, e.target.value * 1);
                            }}
                          >
                            {[...new Array(20)].map((i, num) => {
                              return (
                                <option value={num + 1} key={num}>
                                  {num + 1}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className='col-lg-8 col-sm-7 col-12 d-flex justify-content-sm-end justify-content-start'>
                          {hasCoupon && (
                            <p className='mb-0 text-decoration-line-through text-muted text-end me-1'>
                              <small>NT$ {item.total.toLocaleString()}</small>
                            </p>
                          )}
                          <p className='mb-0 text-end'>
                            NT$ {item.final_total?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <CouponInput hasCoupon={hasCoupon} />
              {hasCoupon && (
                <table className='table text-muted'>
                  <tbody>
                    <tr>
                      <th scope='row' className='border-0 px-0 fw-normal'>
                        商品總金額
                      </th>
                      <td className='text-end border-0 px-0'>
                        NT$ ${cartData.total?.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <th scope='row' className='border-0 px-0 pt-0 fw-normal'>
                        優惠折抵
                      </th>
                      <td className='text-end border-0 px-0 pt-0'>
                        -NT${' '}
                        {(
                          cartData.total - cartData.final_total
                        ).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
              <div className='d-flex justify-content-between mt-4'>
                <p className='mb-0 h4 fw-bold'>總付款金額</p>
                <p className='mb-0 h4 fw-bold'>
                  NT$ {Math.round(cartData.final_total)?.toLocaleString()}
                </p>
              </div>
              <Link
                to='/checkout'
                className='btn btn-primary w-100 mt-4 rounded-0 py-3'
                aria-label='Go to Checkout'
              >
                前往結帳
              </Link>
            </>
          ) : (
            <NoCartData />
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
