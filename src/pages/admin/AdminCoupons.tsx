import { Modal } from 'bootstrap';
import { useAdminCouponsQuery } from '@/hooks/api/admin/coupon/queries';
import { useEffect, useRef, useState } from 'react';
import CouponModal from '../../components/CouponModal';
import DeleteModal from '../../components/DeleteModal';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import { timeStampToTime } from '../../utils/factory';
import {
  TAdminCoupon,
  TAdminModalType,
  TCouponsPayload,
  TDeleteCouponPayload,
} from '@/types';
import { useDeleteCouponMutation } from '@/hooks/api/admin/coupon/mutations';

function AdminCoupons() {
  //type: 決定 modal 展開的用途
  const [type, setType] = useState<TAdminModalType>('create'); //預設為create，另一type為edit
  const [tempCoupon, setTempCoupon] = useState<TAdminCoupon>({});
  const couponModal = useRef<Modal | null>(null);
  const deleteModal = useRef<Modal | null>(null);
  const [couponsParams, setCouponsParams] = useState<TCouponsPayload>({
    page: '1',
  });
  const { data: coupons, status: couponsStatus } = useAdminCouponsQuery({
    params: couponsParams,
  });
  const pagination = coupons?.pagination || {};
  const { mutate: deleteCouponMutate, status: deleteCouponStatus } =
    useDeleteCouponMutation({
      reactQuery: {
        onSuccess: () => {
          closeDeleteModal();
        },
      },
    });

  const changePage = (page: number) => {
    setCouponsParams((pre) => ({
      ...pre,
      page: page.toString(),
    }));
  };
  const openCouponModal = (type: TAdminModalType, item: TAdminCoupon) => {
    //展開modal時確認modal用途
    setType(type);
    setTempCoupon(item);
    couponModal.current?.show();
  };
  const closeModal = () => {
    couponModal.current?.hide();
  };

  const openDeleteModal = (coupon: TAdminCoupon) => {
    setTempCoupon(coupon);
    deleteModal.current?.show();
  };
  const closeDeleteModal = () => {
    deleteModal.current?.hide();
  };
  const deleteCoupon = (id: TDeleteCouponPayload['id']) => {
    deleteCouponMutate({ id });
  };
  useEffect(() => {
    couponModal.current = new Modal('#couponModal', {
      backdrop: 'static',
    }); //放在useEffect內榜定，確認DOM已被渲染
    deleteModal.current = new Modal('#deleteModal', {
      backdrop: 'static',
    });
  }, []);

  return (
    <div className='p-3'>
      <Loading isLoading={couponsStatus === 'pending'} />
      <CouponModal
        closeModal={closeModal}
        tempCoupon={tempCoupon}
        type={type}
      />
      <DeleteModal
        close={closeDeleteModal}
        text={`優惠券「${tempCoupon.title || ''}」`}
        handleDelete={(id) => id && deleteCoupon(id)}
        id={tempCoupon.id || ''}
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
            {coupons?.coupons?.map((coupon) => {
              return (
                <tr key={coupon?.id}>
                  <td>{coupon?.title}</td>
                  <td>{coupon?.percent}</td>
                  <td>
                    {coupon?.due_date && timeStampToTime(coupon.due_date)}
                  </td>
                  <td>{coupon?.code}</td>
                  <td>{coupon?.is_enabled ? '啟用' : '未啟用'}</td>
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
                        disabled={deleteCouponStatus === 'pending'}
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

export default AdminCoupons;
