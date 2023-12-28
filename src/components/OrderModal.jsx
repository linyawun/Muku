import axios from 'axios';
import { useContext, useEffect, useMemo, useState } from 'react';
import { timeStampToTime } from '../helpers/util';
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from '../store/messageStore';

function OrderModal({ closeModal, getOrders, tempOrder }) {
  const [isLoading, setIsLoading] = useState(false);
  const initData = useMemo(
    () => ({
      is_paid: '',
      ...tempOrder,
    }),
    [tempOrder]
  );
  const [tempData, setTempData] = useState(initData);
  const [, dispatch] = useContext(MessageContext);

  useEffect(() => {
    setTempData({
      ...tempOrder,
      is_paid: tempOrder.is_paid,
      status: tempOrder.status,
    });
  }, [tempOrder, initData]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (['is_paid'].includes(name)) {
      //如果是is_paid的欄位
      setTempData((preState) => ({
        ...preState,
        [name]: checked,
        paid_date: new Date(),
      }));
    } else {
      setTempData((preState) => ({ ...preState, [name]: value }));
    }
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      let api = `/v2/api/${import.meta.env.VITE_APP_API_PATH}/admin/order/${
        tempOrder.id
      }`;
      const res = await axios.put(api, {
        data: {
          ...tempData,
        },
      });
      if (res.data.success) {
        handleSuccessMessage(dispatch, res);
        setIsLoading(false);
        getOrders();
        closeModal();
      }
    } catch (error) {
      setIsLoading(false);
      handleErrorMessage(dispatch, error);
    }
  };
  return (
    <div
      className='modal fade'
      tabIndex='-1'
      id='orderModal'
      aria-labelledby='orderModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='orderModalLabel'>
              編輯訂單
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={closeModal}
            />
          </div>
          <div className='modal-body'>
            <div className='mb-3 row'>
              <span className='col-sm-2 col-form-label'>訂單 id</span>
              <div className='col-sm-10'>
                <input
                  type='text'
                  readOnly
                  className='form-control-plaintext'
                  defaultValue={tempOrder?.id}
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <span className='col-sm-2 col-form-label'>建立日期</span>
              <div className='col-sm-10'>
                <input
                  type='text'
                  readOnly
                  className='form-control-plaintext'
                  defaultValue={timeStampToTime(tempOrder?.create_at)}
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <span className='col-sm-2 col-form-label'>顧客</span>
              <div className='col-sm-10'>
                <input
                  type='text'
                  readOnly
                  className='form-control-plaintext'
                  id='staticName'
                  defaultValue={tempOrder?.user?.name}
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <span className='col-sm-2 col-form-label'>Email</span>
              <div className='col-sm-10'>
                <input
                  type='email'
                  readOnly
                  className='form-control-plaintext'
                  id='staticEmail'
                  defaultValue={tempOrder?.user?.email}
                />
              </div>
            </div>

            <div className='mb-3 row'>
              <span className='col-sm-2 col-form-label'>外送地址</span>
              <div className='col-sm-10'>
                <input
                  type='text'
                  readOnly
                  className='form-control-plaintext'
                  defaultValue={tempOrder?.user?.address}
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <span className='col-sm-2 col-form-label'>留言</span>
              <div className='col-sm-10'>
                <textarea
                  name=''
                  id=''
                  cols='30'
                  readOnly
                  className='form-control-plaintext'
                  defaultValue={tempOrder.message}
                />
              </div>
            </div>
            {tempOrder.products && (
              <table className='table'>
                <thead>
                  <tr>
                    <th>品項名稱</th>
                    <th>數量</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(tempOrder.products).map((cart) => (
                    <tr key={cart.id}>
                      <td>{cart.product.title}</td>
                      <td>{cart.qty}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className='border-0 text-end'>總金額</td>
                    <td className='border-0'>
                      ${Math.round(tempOrder.total)?.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            )}

            <div>
              <h5 className='mt-4'>訂單狀態</h5>
              <div className='form-check mb-4'>
                <label className='form-check-label' htmlFor='is_paid'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    name='is_paid'
                    id='is_paid'
                    checked={!!tempData.is_paid}
                    onChange={handleChange}
                  />
                  付款狀態 (
                  {tempData.is_paid
                    ? `已付款，付款時間為 ${timeStampToTime(
                        tempData.paid_date ? tempData.paid_date : new Date()
                      )}`
                    : '未付款'}
                  )
                </label>
              </div>
              <div className='mb-4'>
                <label
                  className='col-sm-2 col-form-label d-block'
                  htmlFor='status'
                >
                  外送進度
                </label>
                <select
                  className='form-select'
                  name='status'
                  id='status'
                  value={tempData.status}
                  onChange={handleChange}
                  disabled={isLoading}
                >
                  <option value={0}>未確認</option>
                  <option value={1}>已確認</option>
                  <option value={2}>外送中</option>
                  <option value={3}>已送達</option>
                </select>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={closeModal}
              aria-label='Close'
            >
              關閉
            </button>
            <button type='button' className='btn btn-primary' onClick={submit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
