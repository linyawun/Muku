import axios from 'axios';
import { Modal } from 'bootstrap';
import { useContext, useEffect, useRef, useState } from 'react';
import CouponModal from '../../components/CouponModal';
import DeleteModal from '../../components/DeleteModal';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import {
  MessageContext,
  handleErrorMessage,
  handleSuccessMessage,
} from '../../store/messageStore';
import { timeStampToTime } from '../../utils/factory';
function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});
  //type: 決定 modal 展開的用途
  const [type, setType] = useState('create'); //預設為create，另一type為edit
  const [tempCoupon, setTempCoupon] = useState({});
  const couponModal = useRef(null);
  const deleteModal = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, dispatch] = useContext(MessageContext);

  const getCoupons = async (page = 1) => {
    setIsLoading(true);
    const res = await axios.get(
      `/v2/api/${import.meta.env.VITE_APP_API_PATH}/admin/coupons?page=${page}`
    );
    setCoupons(res.data.coupons);
    setPagination(res.data.pagination);
    setIsLoading(false);
  };
  const openCouponModal = (type, item) => {
    //展開modal時確認modal用途
    setType(type);
    setTempCoupon(item);
    couponModal.current.show();
  };
  const closeModal = () => {
    couponModal.current.hide();
  };

  const openDeleteModal = (coupon) => {
    setTempCoupon(coupon);
    deleteModal.current.show();
  };
  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };
  const deleteCoupon = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${import.meta.env.VITE_APP_API_PATH}/admin/coupon/${id}`
      );
      if (res.data.success) {
        handleSuccessMessage(dispatch, res);
        getCoupons();
        closeDeleteModal();
      }
    } catch (error) {
      handleErrorMessage(dispatch, error);
    }
  };
  useEffect(() => {
    couponModal.current = new Modal('#couponModal', {
      backdrop: 'static',
    }); //放在useEffect內榜定，確認DOM已被渲染
    deleteModal.current = new Modal('#deleteModal', {
      backdrop: 'static',
    });
    getCoupons();
  }, []);

  return (
    <div className='p-3'>
      <Loading isLoading={isLoading} />
      <CouponModal
        closeModal={closeModal}
        getCoupons={getCoupons}
        tempCoupon={tempCoupon}
        type={type}
      />
      <DeleteModal
        close={closeDeleteModal}
        text={tempCoupon.title}
        handleDelete={deleteCoupon}
        id={tempCoupon.id}
      />
      <h3>優惠券列表</h3>
      <hr />

      <div className='text-end mb-2'>
        <button
          type='button'
          className='btn btn-primary btn-sm'
          aria-label='Create Coupon'
          onClick={() => openCouponModal('create', {})}
        >
          建立新優惠券
        </button>
      </div>
      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>標題</th>
              <th scope='col'>折扣（%）</th>
              <th scope='col'>到期日</th>
              <th scope='col'>優惠碼</th>
              <th scope='col'>啟用狀態</th>
              <th scope='col'>編輯</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => {
              return (
                <tr key={coupon.id}>
                  <td>{coupon.title}</td>
                  <td>{coupon.percent}</td>
                  <td>{timeStampToTime(coupon.due_date)}</td>
                  <td>{coupon.code}</td>
                  <td>{coupon.is_enabled ? '啟用' : '未啟用'}</td>
                  <td>
                    <div className='d-flex gap-2'>
                      <button
                        type='button'
                        className='btn btn-primary btn-sm'
                        onClick={() => openCouponModal('edit', coupon)}
                        aria-label='Edit'
                      >
                        編輯
                      </button>
                      <button
                        type='button'
                        className='btn btn-outline-danger btn-sm'
                        onClick={() => openDeleteModal(coupon)}
                        aria-label='Delete'
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
      <Pagination pagination={pagination} changePage={getCoupons} />
    </div>
  );
}

export default AdminCoupons;
