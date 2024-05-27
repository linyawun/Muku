import { useSubmitCouponMutation } from '@/hooks/api/front/coupon/mutations';
import { useState } from 'react';

function CouponInput({ hasCoupon }: { hasCoupon: boolean }) {
  const [couponCode, setCouponCode] = useState('');
  const { mutate: submitCoupon, status: submitCouponStatus } =
    useSubmitCouponMutation();

  const handleSubmitCoupon = () => {
    if (!couponCode) {
      return;
    }
    const data = {
      data: {
        code: couponCode,
      },
    };

    submitCoupon(data);
  };

  // const sendCoupon = async () => {
  //   if (!couponCode) {
  //     return;
  //   }
  //   const data = {
  //     data: {
  //       code: couponCode,
  //     },
  //   };
  //   setIsLoading(true);
  //   try {
  //     const res = await axios.post(
  //       `/v2/api/${import.meta.env.VITE_APP_API_PATH}/coupon`,
  //       data
  //     );
  //     if (res.data.success) {
  //       setCouponMsg('');
  //       getCart();
  //     }
  //     setIsLoading(false);
  //   } catch (error) {
  //     setCouponMsg(error?.response?.data?.message);
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className='d-flex align-items-center justify-content-between mb-2'>
      <label htmlFor='coupon' className='me-3'>
        使用優惠券
      </label>
      {hasCoupon ? (
        <p className='text-end text-success fw-bold mb-0'>已套用優惠券</p>
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
            disabled={hasCoupon}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-primary border-bottom border-top-0 border-start-0 border-end-0 rounded-0'
              type='button'
              id='button-addon2'
              disabled={submitCouponStatus === 'pending' || hasCoupon}
              onClick={handleSubmitCoupon}
              aria-label='Send Coupon'
            >
              {submitCouponStatus === 'pending' ? (
                <span
                  className='spinner-border spinner-border-sm'
                  role='status'
                  aria-hidden='true'
                ></span>
              ) : (
                <i className='bi bi-send-fill'></i>
              )}
            </button>
          </div>
          {/* <div
            className='text-danger w-100'
            style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}
          >
            {couponMsg}
          </div> */}
        </div>
      )}
    </div>
  );
}

export default CouponInput;
