import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { timeStampToTime } from '../utils/factory';
import { CheckboxRadio, Input } from './FormElement';
import {
  useCreateCouponMutation,
  useEditCouponMutation,
} from '@/hooks/api/admin/coupon/mutations';
import { TAdminCoupon, TAdminModalType } from '@/types';

type TCouponModalProps = {
  closeModal: () => void;
  type: TAdminModalType;
  tempCoupon: TAdminCoupon;
};

const determineTempData = (
  type: TAdminModalType,
  tempCoupon?: TAdminCoupon
): Record<string, any> => {
  const initData = {
    title: '',
    is_enabled: 1,
    percent: 80,
    due_date: new Date(),
    code: 'muku',
  };

  if (type === 'create') {
    return {
      ...initData,
      due_date: timeStampToTime(initData.due_date.getTime()),
    };
  } else if (type === 'edit' && tempCoupon) {
    return {
      ...tempCoupon,
      due_date: timeStampToTime(tempCoupon.due_date as number),
    };
  }
  return initData;
};

function CouponModal({ closeModal, type, tempCoupon }: TCouponModalProps) {
  const tempData = useMemo(() => {
    return determineTempData(type, tempCoupon);
  }, [type, tempCoupon]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...tempData,
    },
    mode: 'onTouched',
  });
  const { mutate: createCouponMutate } = useCreateCouponMutation({
    reactQuery: {
      onSuccess: () => {
        closeModal();
      },
    },
  });
  const { mutate: editCouponMutate } = useEditCouponMutation({
    reactQuery: {
      onSuccess: () => {
        closeModal();
      },
    },
  });

  useEffect(() => {
    const resetForm = () => {
      reset(tempData);
    };
    resetForm();
  }, [reset, tempData]);

  const submit = (data) => {
    const preparedData = {
      data: {
        ...data,
        is_enabled: +data.is_enabled,
        due_date: data.due_date.getTime(), //轉換成 unix timestamp
      },
    };

    // 根據類型選擇合適的函式
    if (type === 'edit') {
      editCouponMutate({
        id: tempCoupon.id,
        payloadData: preparedData,
      });
    } else {
      createCouponMutate(preparedData);
    }
  };

  // const submit = async (data) => {
  //   try {
  //     let api = `/v2/api/${import.meta.env.VITE_APP_API_PATH}/admin/coupon`;
  //     let method = 'post';
  //     if (type === 'edit') {
  //       //如果是編輯，要更改api路徑和方法
  //       api = `/v2/api/${import.meta.env.VITE_APP_API_PATH}/admin/coupon/${
  //         tempCoupon.id
  //       }`;
  //       method = 'put';
  //     }

  //     const res = await axios[method](api, {
  //       data: {
  //         ...data,
  //         is_enabled: +data.is_enabled,
  //         due_date: data.due_date.getTime(), //轉換成 unix timestamp
  //       },
  //     });
  //     if (res.data.success) {
  //       handleSuccessMessage(dispatch, res);
  //       closeModal();
  //       void queryClient.invalidateQueries({
  //         queryKey: ['adminCoupons'],
  //       });
  //     }
  //   } catch (error) {
  //     handleErrorMessage(dispatch, error);
  //   }
  // };
  return (
    <div
      className='modal fade'
      tabIndex={-1}
      id='couponModal'
      aria-labelledby='couponModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='couponModalLabel'>
              {type === 'create' ? '建立新優惠券' : `編輯 ${tempData.title}`}
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={closeModal}
            />
          </div>
          <div className='modal-body'>
            <form onSubmit={handleSubmit(submit)} className='row'>
              <div className='mb-3'>
                <Input
                  register={register}
                  errors={errors}
                  id='title'
                  type='text'
                  labelText='標題*'
                  placeholder='請輸入標題'
                  rules={{
                    required: {
                      value: true,
                      message: '標題為必填',
                    },
                  }}
                />
              </div>
              <div className='row'>
                <div className='col-md-6 mb-3'>
                  <Input
                    register={register}
                    errors={errors}
                    id='percent'
                    type='number'
                    labelText='折扣（%）*'
                    placeholder='請輸入折扣（%）'
                    rules={{
                      required: {
                        value: true,
                        message: '折扣為必填',
                      },
                      min: {
                        value: 1,
                        message: '折扣不能小於 1',
                      },
                      max: {
                        value: 99,
                        message: '折扣不能大於 99',
                      },
                      valueAsNumber: true,
                    }}
                  />
                </div>
                <div className='col-md-6 mb-3'>
                  <Input
                    register={register}
                    errors={errors}
                    id='due_date'
                    type='date'
                    labelText='到期日*'
                    placeholder='請輸入到期日'
                    rules={{
                      valueAsDate: true,
                      required: {
                        value: true,
                        message: '到期日為必填',
                      },
                      min: {
                        value: new Date().getTime() - 86400000,
                        message: '到期日不能小於今天日期',
                      },
                    }}
                  />
                </div>
                <div className='col-md-6 mb-3'>
                  <Input
                    register={register}
                    errors={errors}
                    id='code'
                    type='text'
                    labelText='優惠碼*'
                    placeholder='請輸入優惠碼'
                    rules={{
                      required: {
                        value: true,
                        message: '優惠碼為必填',
                      },
                      maxLength: {
                        value: 8,
                        message: '優惠碼長度不超過 8',
                      },
                    }}
                  />
                </div>
              </div>

              <div className='form-group mb-3'>
                <CheckboxRadio
                  register={register}
                  errors={errors}
                  type='checkbox'
                  name='is_enabled'
                  id='is_enabled'
                  labelText='是否啟用'
                  hasErrorMsg={false}
                />
              </div>
              <div className='modal-footer'>
                <button
                  aria-label='Close'
                  type='button'
                  className='btn btn-secondary'
                  onClick={closeModal}
                >
                  關閉
                </button>
                <button
                  type='submit'
                  className='btn btn-primary'
                  aria-label='Save'
                >
                  儲存
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponModal;
