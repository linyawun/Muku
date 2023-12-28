import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createAsyncMessage } from '../../slice/messageSlice';
import CheckoutSteps from '../../components/CheckoutSteps';
import { Input, Select, CheckboxRadio } from '../../components/FormElement';
import Loading from '../../components/Loading';

function Checkout() {
  const navigate = useNavigate();
  const [cityList, setCityList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const { cartData, getCart } = useOutletContext();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const hascoupon = cartData?.final_total !== cartData?.total;
  const defaultVal = useRef({
    name: '',
    email: '',
    tel: '',
    city: '',
    district: '',
    address: '',
    message: '',
  });
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: defaultVal.current,
    mode: 'onTouched',
  });
  const cityInput = getValues().city;
  const onSubmit = async (data) => {
    const { name, email, tel, city, district, address, message } = data;
    let msg = message ? message : ' ';
    const form = {
      data: {
        user: {
          name,
          email,
          tel,
          address: city + district + address,
        },
        message: msg,
      },
    };
    try {
      const res = await axios.post(
        `/v2/api/${import.meta.env.VITE_APP_API_PATH}/order`,
        form
      );
      if (res.data.success) {
        getCart();
        navigate(`/checkoutSuccess/${res.data.orderId}`);
        dispatch(createAsyncMessage(res.data));
      }
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
    }
  };
  useEffect(() => {
    if (cartData?.carts?.length === 0) {
      navigate('/');
    }
  }, [cartData, navigate]);
  useEffect(() => {
    const getCity = async () => {
      setIsLoading(true);
      const result = await axios.get(
        'https://api.nlsc.gov.tw/other/ListCounty'
      );
      const xmlString = result.data;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      const countyItems = xmlDoc.getElementsByTagName('countyItem');
      // 將每個 countyItem 元素轉換為物件，並存儲到陣列中
      const countyList = Array.from(countyItems, (countyItem) => ({
        countyName: countyItem.querySelector('countyname').textContent,
        countyCode: countyItem.querySelector('countycode01').textContent,
      }));

      setCityList(countyList);
      setIsLoading(false);
    };
    getCity();
  }, []);
  useEffect(() => {
    const getDistrict = async (countyCode) => {
      const res = await axios.get(
        `https://api.nlsc.gov.tw/other/ListTown1/${countyCode}`
      );
      setDistrictList(res.data);
    };
    if (cityInput) {
      const { countyCode } = cityList.find(
        (item) => item.countyName === cityInput
      );
      getDistrict(countyCode);
    }
  }, [cityInput, cityList]);

  useWatch({
    control,
    name: 'city',
  });

  useEffect(() => {
    setDisableSubmit(!isDirty || Object.keys(errors).length !== 0);
  }, [errors, isDirty]);

  return (
    <div className='pt-5 pb-7'>
      <Loading isLoading={isLoading} />
      <div className='container'>
        <CheckoutSteps
          data={[
            { step: 1, content: '購物車', done: true },
            { step: 2, content: '填寫資料', done: true },
            { step: 3, content: '完成訂購', done: false },
          ]}
        />
        <div className='row justify-content-center flex-md-row flex-column-reverse'>
          <div className='col-lg-6 col-md-6'>
            <div className='p-4'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h5>顧客資料</h5>
                <div className='mb-3'>
                  <Input
                    register={register}
                    errors={errors}
                    id='name'
                    type='text'
                    labelText='姓名*'
                    placeholder=''
                    rules={{
                      required: {
                        value: true,
                        message: '姓名為必填',
                      },
                    }}
                  />
                </div>
                <div className='mb-3'>
                  <Input
                    register={register}
                    errors={errors}
                    id='email'
                    type='email'
                    labelText='Email*'
                    rules={{
                      required: {
                        value: true,
                        message: 'Email 為必填',
                      },
                      pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: '信箱格式錯誤，需有@與.等符號',
                      },
                    }}
                  />
                </div>
                <div className='mb-5'>
                  <Input
                    register={register}
                    errors={errors}
                    id='tel'
                    type='tel'
                    labelText='手機*'
                    rules={{
                      required: {
                        value: true,
                        message: '手機為必填',
                      },
                      minLength: {
                        value: 6,
                        message: '手機不少於 6 碼',
                      },
                      maxLength: {
                        value: 12,
                        message: '手機不少於 12 碼',
                      },
                      pattern: {
                        value: /09\d{2}(\d{6}|-\d{3}-\d{3})/,
                        message: '需符合手機格式',
                      },
                    }}
                  />
                </div>
                <h5>送貨與付款資料</h5>
                <div className='row mb-3 g-3'>
                  <div className='col-6'>
                    <Select
                      register={register}
                      errors={errors}
                      labelText='縣市*'
                      id='city'
                      rules={{
                        required: { value: true, message: '縣市為必填' },
                      }}
                      disabled={false}
                    >
                      <option value='' disabled>
                        請選擇縣市
                      </option>
                      {cityList?.map((city) => (
                        <option value={city.countyName} key={city.countyCode}>
                          {city.countyName}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className='col-6'>
                    <Select
                      register={register}
                      errors={errors}
                      labelText='鄉鎮市區*'
                      id='district'
                      rules={{
                        required: { value: true, message: '鄉鎮市區為必填' },
                      }}
                      disabled={!getValues().city}
                    >
                      <option value='' disabled>
                        請選擇鄉鎮市區
                      </option>
                      {getValues().city
                        ? districtList.map((area) => (
                            <option value={area.townname} key={area.towncode01}>
                              {area.townname}
                            </option>
                          ))
                        : ''}
                    </Select>
                  </div>
                </div>

                <div className='mb-3'>
                  <Input
                    register={register}
                    errors={errors}
                    id='address'
                    type='text'
                    labelText='地址*'
                    rules={{
                      required: {
                        value: true,
                        message: '地址為必填',
                      },
                    }}
                  />
                </div>
                <div className='mb-5'>
                  <div className='form-label'>付款方式</div>
                  <CheckboxRadio
                    register={register}
                    errors={errors}
                    type='radio'
                    name='payment'
                    id='creditCard'
                    value='creditCard'
                    rules={{
                      required: {
                        value: true,
                        message: '請選擇付款方式',
                      },
                    }}
                    labelText='信用卡 (支援VISA, MasterCard, JCB)'
                    hasErrorMsg={false}
                  />
                  <CheckboxRadio
                    register={register}
                    errors={errors}
                    type='radio'
                    name='payment'
                    id='atm'
                    value='atm'
                    rules={{
                      required: {
                        value: true,
                        message: '請選擇付款方式',
                      },
                    }}
                    labelText='銀行轉帳／ATM'
                    hasErrorMsg={true}
                  />
                </div>
                <div className='mb-3'>
                  <h5>訂單備註</h5>
                  <textarea
                    className='form-control'
                    rows='3'
                    placeholder='有什麼資訊想備註給店家嗎?'
                  ></textarea>
                </div>
                <div className='mb-5'>
                  <CheckboxRadio
                    register={register}
                    errors={errors}
                    type='checkbox'
                    name='isSubscribed'
                    id='checkbox'
                    rules=''
                    labelText='我想收到最新資訊及優惠方案'
                    hasErrorMsg={false}
                  />
                </div>
                <div className='d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100'>
                  <Link to='/cart' className='text-dark mt-md-0 mt-3'>
                    <i className='bi bi-chevron-left me-2'></i>
                    返回購物車
                  </Link>
                  <button
                    type='submit'
                    className='btn btn-primary py-3 px-7'
                    disabled={disableSubmit}
                    style={{
                      pointerEvents: 'auto',
                    }}
                    aria-label='Submit'
                  >
                    確認送出
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='col-lg-4 col-md-5'>
            <div className='bg-light border p-4 mb-4'>
              <h4 className='mb-4'>商品明細</h4>
              {cartData?.carts?.map((item) => {
                return (
                  <div className='d-flex mb-3' key={item.id}>
                    <img
                      src={item.product.imageUrl}
                      alt=''
                      className='me-2'
                      style={{
                        width: '48px',
                        height: '48px',
                        objectFit: 'cover',
                      }}
                    />
                    <div className='w-100'>
                      <div className='d-flex justify-content-between'>
                        <p className='mb-0'>
                          <small>{item.product.title}</small>
                        </p>
                        <p className='mb-0'>
                          <small>x{item.qty}</small>
                        </p>
                      </div>
                      <div className='d-flex justify-content-between'>
                        <p
                          className={`text-muted mb-0 text-decoration-line-through me-1 ${
                            hascoupon ? 'd-block' : 'd-none'
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
                );
              })}
              {hascoupon ? (
                <table className='table mt-4 border-top border-bottom text-muted'>
                  <tbody>
                    <tr>
                      <th scope='row' className='border-0 px-0 pt-4 fw-normal'>
                        商品總金額
                      </th>
                      <td className='text-end border-0 px-0 pt-4'>
                        NT$ {cartData.total?.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope='row'
                        className='border-0 px-0 pt-0 pb-4 fw-normal'
                      >
                        優惠折抵
                      </th>
                      <td className='text-end border-0 px-0 pt-0 pb-4'>
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
                <p className='mb-0 h5 fw-bold'>總付款金額</p>
                <p className='mb-0 h5 fw-bold'>
                  NT$ {Math.round(cartData.final_total)?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkout;
