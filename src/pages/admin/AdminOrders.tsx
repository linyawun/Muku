import { Modal } from 'bootstrap';
import { useEffect, useRef, useState } from 'react';
import DeleteModal from '../../components/DeleteModal';
import Loading from '../../components/Loading';
import OrderModal from '../../components/OrderModal';
import Pagination from '../../components/Pagination';
import { timeStampToTime } from '../../utils/factory';
import { useAdminOrdersQuery } from '@/hooks/api/admin/order/queries';
import { TAdminOrder, TAdminOrdersPayload, TDeleteOrderPayload } from '@/types';
import { useDeleteOrderMutation } from '@/hooks/api/admin/order/mutations';

const defaultOrder: TAdminOrder = {
  create_at: 0,
  id: '',
  is_paid: false,
  message: '',
  total: 0,
  status: '',
  paid_date: null,
  products: {},
  user: {},
  num: 0,
};

function AdminOrders() {
  const [ordersParams, setOrdersParams] = useState<TAdminOrdersPayload>({
    page: '1',
  });
  const { data: orders, status: ordersStatus } = useAdminOrdersQuery({
    params: ordersParams,
  });
  const pagination = orders?.pagination || {};
  const [tempOrder, setTempOrder] = useState<TAdminOrder>(defaultOrder);
  const orderModal = useRef<Modal | null>(null);
  const deleteModal = useRef<Modal | null>(null);
  const { mutate: deleteOrderMutate, status: deleteOrderStatus } =
    useDeleteOrderMutation({
      reactQuery: {
        onSuccess: () => {
          closeDeleteModal();
        },
      },
    });
  const changePage = (page: string | number) => {
    setOrdersParams((pre) => ({
      ...pre,
      page: page.toString(),
    }));
  };
  const deleteOrder = (id: TDeleteOrderPayload['id']) => {
    deleteOrderMutate({ id });
  };
  const openOrderModal = (order: TAdminOrder) => {
    setTempOrder(order);
    orderModal.current?.show();
  };
  const closeModal = () => {
    orderModal.current?.hide();
  };
  const openDeleteModal = (order: TAdminOrder) => {
    setTempOrder(order);
    deleteModal.current?.show();
  };
  const closeDeleteModal = () => {
    deleteModal.current?.hide();
  };

  useEffect(() => {
    orderModal.current = new Modal('#orderModal', {
      backdrop: 'static',
    });
    deleteModal.current = new Modal('#deleteModal', {
      backdrop: 'static',
    });
  }, []);

  return (
    <div className='p-3'>
      <Loading isLoading={ordersStatus === 'pending'} />
      <OrderModal closeModal={closeModal} tempOrder={{ ...tempOrder }} />
      <DeleteModal
        close={closeDeleteModal}
        text={`訂單 ${tempOrder.id}`}
        handleDelete={(id) => id && deleteOrder(id)}
        id={tempOrder.id}
        deleteDisabled={deleteOrderStatus === 'pending'}
      />
      <h3>訂單列表</h3>
      <hr />
      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>訂單 id</th>
              <th scope='col'>顧客</th>
              <th scope='col'>總金額</th>
              <th scope='col'>付款狀態</th>
              <th scope='col'>建立日期</th>
              <th scope='col'>外送進度</th>
              <th scope='col'>編輯</th>
            </tr>
          </thead>
          <tbody>
            {orders?.orders?.map((order) => {
              return (
                <tr key={order.id}>
                  <td>
                    <small>{order.id}</small>
                  </td>
                  <td>{order.user?.name}</td>
                  <td>${Math.round(order.total || 0).toLocaleString()}</td>
                  <td>
                    {order.is_paid ? (
                      <span className='text-success fw-bold'>付款完成</span>
                    ) : (
                      '未付款'
                    )}
                  </td>
                  <td>{timeStampToTime(order.create_at || 0)}</td>
                  <td>
                    {order.status
                      ? ['未確認', '已確認', '外送中', '已送達'][order.status]
                      : '未確認'}
                  </td>
                  <td>
                    <div className='d-flex gap-2'>
                      <button
                        type='button'
                        className='btn btn-primary btn-sm'
                        onClick={() => {
                          openOrderModal(order);
                        }}
                        aria-label='View'
                      >
                        查看
                      </button>
                      <button
                        type='button'
                        className='btn btn-outline-danger btn-sm'
                        onClick={() => openDeleteModal(order)}
                        aria-label='Delete'
                        disabled={deleteOrderStatus === 'pending'}
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination pagination={pagination} changePage={changePage} />
    </div>
  );
}

export default AdminOrders;
