import { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import { Modal } from 'bootstrap';
import OrderModal from '../../components/OrderModal';
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from '../../store/messageStore';
import Loading from '../../components/Loading';
import { timeStampToTime } from '../../helpers/util';
function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [tempOrder, setTempOrder] = useState({});
  const orderModal = useRef(null);
  const deleteModal = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, dispatch] = useContext(MessageContext);

  const getOrders = async (page = 1) => {
    setIsLoading(true);
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`
    );
    setOrders(res.data.orders);
    setPagination(res.data.pagination);
    setIsLoading(false);
  };
  const deleteOrder = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${id}`
      );
      if (res.data.success) {
        handleSuccessMessage(dispatch, res);
        getOrders();
        closeDeleteModal();
      }
    } catch (error) {
      handleErrorMessage(dispatch, error);
    }
  };
  const openOrderModal = (order) => {
    setTempOrder(order);
    orderModal.current.show();
  };
  const closeModal = () => {
    setTempOrder({});
    orderModal.current.hide();
  };
  const openDeleteModal = (order) => {
    setTempOrder(order);
    deleteModal.current.show();
  };
  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };

  useEffect(() => {
    orderModal.current = new Modal('#orderModal', {
      backdrop: 'static',
    });
    deleteModal.current = new Modal('#deleteModal', {
      backdrop: 'static',
    });
    getOrders();
  }, []);

  return (
    <div className='p-3'>
      <Loading isLoading={isLoading} />
      <OrderModal
        closeModal={closeModal}
        getOrders={getOrders}
        tempOrder={tempOrder}
      />
      <DeleteModal
        close={closeDeleteModal}
        text={`訂單 ${tempOrder.id}`}
        handleDelete={deleteOrder}
        id={tempOrder.id}
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
            {orders.map((order) => {
              return (
                <tr key={order.id}>
                  <td>
                    <small>{order.id}</small>
                  </td>
                  <td>{order.user?.name}</td>
                  <td>${Math.round(order.total)?.toLocaleString()}</td>
                  <td>
                    {order.is_paid ? (
                      <span className='text-success fw-bold'>付款完成</span>
                    ) : (
                      '未付款'
                    )}
                  </td>
                  <td>{timeStampToTime(order.create_at)}</td>
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
                      >
                        查看
                      </button>
                      <button
                        type='button'
                        className='btn btn-outline-danger btn-sm'
                        onClick={() => openDeleteModal(order)}
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
      <Pagination pagination={pagination} changePage={getOrders} />
    </div>
  );
}

export default AdminOrders;
