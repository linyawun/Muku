import axios from 'axios';
import { Modal } from 'bootstrap';
import { useEffect, useRef, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DeleteModal from '../../components/DeleteModal';
import { createAsyncMessage } from '../../slice/messageSlice';
import CheckoutSteps from '../../components/CheckoutSteps';
import Loading from '../../components/Loading';

function Cart() {
  const { cartData, getCart } = useOutletContext();
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const [loadingItems, setLoadingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const deleteModal = useRef(null);
  const dispatch = useDispatch();
  const hascoupon = cartData?.final_total !== cartData?.total;

  const removeCartItem = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`
      );
      getCart();
      dispatch(createAsyncMessage(res.data));
    } catch (error) {
      console.error(error);
      dispatch(createAsyncMessage(error.response.data));
    }
  };
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
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`,
        data
      );
      setLoadingItems(
        loadingItems.filter((loadingObj) => loadingObj !== item.id)
      );
      dispatch(createAsyncMessage(res.data));
      getCart();
    } catch (error) {
      console.error(error);
      dispatch(createAsyncMessage(error.response.data));
      setLoadingItems(
        loadingItems.filter((loadingObj) => loadingObj !== item.id)
      );
    }
  };
  const deleteAllCart = async () => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/carts`
      );
      getCart();
      closeDeleteModal();
      dispatch(createAsyncMessage(res.data));
    } catch (error) {
      console.error(error);
      dispatch(createAsyncMessage(error.response.data));
    }
  };
  const sendCoupon = async () => {
    if (!couponCode) {
      return;
    }
    const data = {
      data: {
        code: couponCode,
      },
    };
    setIsLoading(true);
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/coupon`,
        data
      );
      if (res.data.success) {
        setCouponMsg('');
        getCart();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error?.response?.data?.message);
      setCouponMsg(error?.response?.data?.message);
      setIsLoading(false);
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
          <div className='d-flex justify-content-between align-items-end'>
            <h2 className='mt-2 text-primary'>購物車</h2>
            <button
              type='button'
              className={`btn btn-secondary btn-sm ${
                cartData?.carts?.length === 0 ? 'd-none' : 'd-block'
              }`}
              onClick={() => {
                openDeleteModal();
              }}
            >
              刪除全部
            </button>
          </div>
          {cartData?.carts?.length !== 0 ? (
            <>
              {cartData?.carts?.map((item) => {
                return (
                  <div className='d-flex mt-4 mb-4 bg-light' key={item.id}>
                    <img
                      src={item.product.imageUrl}
                      alt=''
                      className='object-cover'
                      style={{
                        width: '120px',
                        height: '120px',
                      }}
                    />
                    <div className='w-100 p-3 position-relative d-flex flex-column justify-content-between'>
                      <button
                        type='button'
                        className='position-absolute btn border-0'
                        style={{ top: '10px', right: '10px' }}
                        onClick={() => removeCartItem(item.id)}
                      >
                        <i className='bi bi-x-lg'></i>
                      </button>

                      <p className='mb-0'>{item.product.title}</p>

                      <div className='row justify-content-between align-items-center w-100'>
                        <div className='col-lg-4 col-5 ps-3'>
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
                        <div className='col-lg-7 col-7 d-flex justify-content-end'>
                          {hascoupon ? (
                            <p className='mb-0 text-decoration-line-through text-muted text-end me-1'>
                              <small>NT$ {item.total.toLocaleString()}</small>
                            </p>
                          ) : (
                            ''
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
              <div className='d-flex align-items-center justify-content-between mb-2'>
                <label htmlFor='coupon' className='me-3'>
                  使用優惠券
                </label>
                {hascoupon ? (
                  <p className='text-end text-success fw-bold mb-0'>
                    已套用優惠券
                  </p>
                ) : (
                  <div className='input-group w-50'>
                    <input
                      type='text'
                      className='form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none'
                      placeholder='Coupon Code'
                      id='coupon'
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      aria-label="Recipient's username"
                      aria-describedby='button-addon2'
                      disabled={hascoupon}
                    />
                    <div className='input-group-append'>
                      <button
                        className='btn btn-outline-primary border-bottom border-top-0 border-start-0 border-end-0 rounded-0'
                        type='button'
                        id='button-addon2'
                        disabled={hascoupon}
                        onClick={() => {
                          sendCoupon();
                        }}
                      >
                        <i className='bi bi-send-fill'></i>
                      </button>
                    </div>
                    <div
                      className='text-danger w-100'
                      style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}
                    >
                      {couponMsg}
                    </div>
                  </div>
                )}
              </div>
              {hascoupon ? (
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
              ) : (
                ''
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
              >
                前往結帳
              </Link>{' '}
            </>
          ) : (
            <div className='row flex-column justify-content-center align-items-center p-5'>
              <svg
                className='col-lg-6 col-10'
                width='140px'
                height='140px'
                viewBox='0 0 140 140'
              >
                <g fillRule='nonzero'>
                  <path
                    d='M115.017233,96.6761444 C115.019648,96.6766105 115.02213,96.6766105 115.024544,96.6761444 L115.279733,96.6761444 C116.313396,96.6760286 117.236683,96.0296129 117.590433,95.0583666 L139.672167,34.3886666 C139.94654,33.634666 139.835909,32.7942325 139.375756,32.1369222 C138.915458,31.479862 138.163637,31.0885806 137.361389,31.0885556 L25.9963666,31.0885556 L20.5123334,16.1893666 C20.5072,16.1752888 20.5002778,16.1622222 20.4948334,16.1481444 C20.4764199,16.1010831 20.4564984,16.0546258 20.4351,16.0088444 C20.4210222,15.9779666 20.4066334,15.9474 20.3912334,15.9173 C20.371447,15.8787038 20.3505155,15.8407055 20.3284666,15.8033556 C20.3081666,15.7683556 20.2876332,15.7336668 20.2657,15.6997556 C20.2460588,15.67007 20.2258063,15.6407933 20.2049556,15.6119444 C20.1783123,15.5742727 20.1506389,15.5373402 20.1219666,15.5011888 C20.1026599,15.4773552 20.0828744,15.4539134 20.0626222,15.4308778 C20.0306741,15.3937569 19.9977364,15.3574994 19.9638444,15.3221444 C19.9425332,15.3005222 19.920211,15.2799888 19.8982778,15.2589888 C19.8640549,15.2260178 19.8289381,15.1939873 19.7929666,15.1629334 C19.766911,15.141 19.7394554,15.1200778 19.7127,15.0990778 C19.6787112,15.0731 19.6447222,15.0465778 19.6098,15.0223112 C19.5769,14.999289 19.5429112,14.9780556 19.5089222,14.9568222 C19.4777334,14.9373 19.4464666,14.9177 19.4146556,14.8995778 C19.3750411,14.877626 19.3348686,14.8566969 19.2941778,14.8368112 C19.2650112,14.8223446 19.2362334,14.8076446 19.2063666,14.7945778 C19.1629413,14.7756119 19.1190341,14.7577689 19.0746888,14.7410666 C19.0448222,14.7297888 19.0149554,14.7184332 18.9847778,14.7081666 C18.9417186,14.694029 18.898276,14.6810871 18.8545,14.6693556 C18.8194222,14.6597112 18.7845,14.6505334 18.7495,14.6422888 C18.7100191,14.6335921 18.6703417,14.6258122 18.6305,14.6189556 C18.5541079,14.6050612 18.4770218,14.5952988 18.3995778,14.5897112 C18.3502748,14.5857249 18.300864,14.5832089 18.2514112,14.5821666 C18.2356223,14.5818554 18.2205334,14.5797556 18.2046666,14.5797556 L2.63845559,14.5797556 C1.28037779,14.5797556 0.179511172,15.6805444 0.179511172,17.0387 C0.179511172,18.3967778 1.28037779,19.4976444 2.63845559,19.4976444 L16.4893556,19.4976444 L23.3544888,38.15 L43.2636556,92.8496334 C43.254089,92.873589 43.2424222,92.8966112 43.2330888,92.9212666 L36.4715556,111.291444 C36.4294,111.406011 36.3992222,111.522056 36.3748778,111.638333 C36.2284256,111.957918 36.152505,112.30529 36.1522778,112.656833 C36.1522778,114.014911 37.2531444,115.115856 38.6112222,115.115856 L48.2365334,115.115856 C49.1404668,120.944289 54.1921334,125.420322 60.27,125.420322 C66.3477888,125.420322 71.3995334,120.944211 72.3034666,115.115856 L89.1893334,115.115856 C90.093189,120.944289 95.145089,125.420322 101.222878,125.420322 C107.300744,125.420322 112.352333,120.944211 113.256344,115.115856 L120.076522,115.115856 C121.434756,115.115856 122.535467,114.014911 122.535467,112.656833 C122.535467,111.298678 121.434755,110.197889 120.076522,110.197889 L113.015156,110.197889 C111.660189,104.951311 106.886889,101.064522 101.222956,101.064522 C95.5588668,101.064522 90.7856444,104.951311 89.4306,110.197889 L72.0627444,110.197889 C70.7069222,104.951311 65.9338556,101.064522 60.2700778,101.064522 C54.6063778,101.064522 49.8331556,104.951311 48.4774112,110.197889 L42.1149556,110.197889 L47.0918778,96.6762222 L115.017233,96.6762222 L115.017233,96.6761444 Z M94.6410112,110.197811 C95.7955446,107.713511 98.3079223,105.982489 101.222878,105.982489 C104.137756,105.982489 106.650211,107.713511 107.804589,110.197811 C108.2354,111.125 108.482811,112.154156 108.482811,113.242422 C108.482811,113.891167 108.389089,114.516889 108.228944,115.115856 C107.399444,118.212189 104.577122,120.502433 101.222878,120.502433 C97.8684778,120.502433 95.0462334,118.212189 94.2168888,115.115856 C94.0565888,114.516889 93.9629444,113.891167 93.9629444,113.242422 C93.9629444,112.154156 94.2102,111.125 94.6410112,110.197811 Z M53.6882888,110.197811 C54.8423554,107.713511 57.3552,105.982489 60.2700778,105.982489 C63.1849556,105.982489 65.6978,107.713511 66.8517888,110.197811 C67.2827554,111.125 67.5300112,112.154156 67.5300112,113.242422 C67.5300112,113.891167 67.4364446,114.516889 67.2759112,115.115856 C66.4467223,118.212189 63.6244778,120.502433 60.2700778,120.502433 C56.9158334,120.502433 54.0934334,118.212189 53.2643222,115.115856 C53.1037888,114.516889 53.0101444,113.891167 53.0101444,113.242422 C53.0101444,112.154156 53.2574778,111.125 53.6882888,110.197811 Z M50.1528222,91.7581778 L48.1003444,91.7581778 L46.5095556,87.3880778 L42.6400334,76.7566334 L62.5197222,76.7566334 L62.5197222,91.7581778 L50.1528222,91.7581778 Z M120.807867,71.8387444 L98.2969556,71.8387444 L98.2969556,56.2653778 L126.476078,56.2653778 L120.807867,71.8387444 L120.807867,71.8387444 Z M93.3790666,71.8387444 L67.4376112,71.8387444 L67.4376112,56.2653778 L93.3790666,56.2653778 L93.3790666,71.8387444 Z M62.5197222,71.8387444 L40.8499778,71.8387444 L35.1818444,56.2653778 L62.5197222,56.2653778 L62.5197222,71.8387444 Z M67.4376112,91.7581778 L67.4376112,76.7566334 L93.3790666,76.7566334 L93.3790666,91.7581778 L67.4376112,91.7581778 Z M115.148367,87.3881556 L113.557889,91.7582556 L98.2970334,91.7582556 L98.2970334,76.7566334 L119.017967,76.7566334 L115.148367,87.3881556 L115.148367,87.3881556 Z M128.265822,51.3474112 L98.2970334,51.3474112 L98.2970334,36.0066 L133.849567,36.0066 L128.265822,51.3474112 L128.265822,51.3474112 Z M70.4448888,36.0066 L93.3790666,36.0066 L93.3790666,51.3474112 L67.4376112,51.3474112 L67.4376112,36.0066 L70.4448888,36.0066 Z M27.8082778,36.0066 L62.5197222,36.0066 L62.5197222,51.3474112 L33.3921,51.3474112 L27.9768222,36.4690666 L27.9764334,36.4687556 L27.9733222,36.4602 L27.8082778,36.0066 Z'
                    opacity='0.1'
                  ></path>
                </g>
              </svg>
              <h5 className='col-lg-6 col-10 text-center mb-5'>
                您還沒有選購任何商品
              </h5>
              <Link
                to='/'
                type='button'
                className='col-lg-6 col-10 btn btn-primary py-2'
              >
                繼續購物
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
