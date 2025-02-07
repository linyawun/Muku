import { useEffect, useMemo, useState } from 'react';
import { timeStampToTime } from '../utils/factory';
import { TAdminOrder } from '@/types';
import { useEditOrderMutation } from '@/hooks/api/admin/order/mutations';

type TOrderModalProps = {
  closeModal: () => void;
  tempOrder: TAdminOrder;
};

function OrderModal({ closeModal, tempOrder }: TOrderModalProps) {
  const initData = useMemo(
    () => ({
      is_paid: false,
      ...tempOrder,
    }),
    [tempOrder]
  );
  const [tempData, setTempData] = useState<TAdminOrder>(initData);
  const { mutate: editOrderMutate, status: editOrderStatus } =
    useEditOrderMutation({
      reactQuery: {
        onSuccess: () => {
          closeModal();
        },
      },
    });

  useEffect(() => {
    setTempData({
      ...tempOrder,
      is_paid: tempOrder.is_paid,
      status: tempOrder.status,
    });
  }, [tempOrder]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (['is_paid'].includes(name)) {
      // Handle checkbox input
      const checked = (e.target as HTMLInputElement).checked;
      setTempData((preState) => ({
        ...preState,
        [name]: checked,
        paid_date: new Date(),
      }));
    } else {
      setTempData((preState) => ({ ...preState, [name]: value }));
    }
  };

  const submit = () => {
    editOrderMutate({
      id: tempOrder.id,
      payloadData: { data: tempData },
    });
  };

  return (
    <div
      className='modal fade'
      tabIndex={-1}
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
                  defaultValue={
                    tempOrder?.create_at
                      ? timeStampToTime(tempOrder.create_at)
                      : ''
                  }
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
                  cols={30}
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
                      <td>{cart.product?.title}</td>
                      <td>{cart.qty}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className='border-0 text-end'>總金額</td>
                    <td className='border-0'>
                      ${Math.round(tempOrder.total || 0)?.toLocaleString()}
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
                        (tempData.paid_date as number) || new Date().getTime()
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
                  disabled={editOrderStatus === 'pending'}
                >
                  <option value={'0'}>未確認</option>
                  <option value={'1'}>已確認</option>
                  <option value={'2'}>外送中</option>
                  <option value={'3'}>已送達</option>
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
            <button
              type='button'
              className='btn btn-primary'
              onClick={submit}
              disabled={editOrderStatus === 'pending'}
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
