import axios from 'axios';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input, Textarea, CheckboxRadio, Selectbox } from './FormElement';
import UploadImg from './UploadImg';
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from '../store/messageStore';
import { useDispatch } from 'react-redux';
import { resetUploadImg } from '../slice/uploadImgSlice';

function ProductModal({
  closeProductModal,
  getProducts,
  type,
  tempProduct,
  categoryList,
}) {
  const initData = useMemo(
    () => ({
      title: '',
      category: '',
      origin_price: 500,
      price: 300,
      unit: '',
      description: '',
      content: '',
      is_enabled: 1,
      imageUrl: '',
      ...Object.fromEntries(
        Array.from({ length: 5 }, (_, i) => [`detailImg${i + 1}`, ''])
      ),
    }),
    []
  );
  const [tempData, setTempData] = useState(initData);
  const dispatchRedux = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: tempData,
    mode: 'onTouched',
  });
  let imageUrl = watch('imageUrl');
  let detailImg1 = watch('detailImg1');
  let detailImg2 = watch('detailImg2');
  let detailImg3 = watch('detailImg3');
  let detailImg4 = watch('detailImg4');
  let detailImg5 = watch('detailImg5');
  let originPrice = watch('origin_price');
  const validatePrice = (value) => {
    if (value && originPrice && Number(value) >= Number(originPrice)) {
      return '售價必須低於原價';
    }
    return true;
  };
  const [, dispatch] = useContext(MessageContext);

  useEffect(() => {
    if (type === 'create') {
      setTempData(initData);
      dispatchRedux(resetUploadImg());
    } else if (type === 'edit') {
      dispatchRedux(resetUploadImg());
      let { imagesUrl, ...rest } = tempProduct;
      if (!imagesUrl) {
        imagesUrl = Array.from({ length: 5 }, (v, i) => '');
      }
      const imageData = imagesUrl?.reduce((result, url, index) => {
        result[`detailImg${index + 1}`] = url;
        return result;
      }, {});
      setTempData((pre) => ({
        ...pre,
        ...rest,
        ...imageData,
      }));
    }
  }, [type, tempProduct, initData]);

  useEffect(() => {
    const resetForm = () => {
      reset(tempData);
    };
    resetForm();
  }, [tempData, reset]);

  const submit = async (data) => {
    try {
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`;
      let method = 'post';
      if (type === 'edit') {
        //如果是編輯，要更改api路徑和方法
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${tempProduct.id}`;
        method = 'put';
      }
      const res = await axios[method](api, {
        data: {
          ...data,
          imagesUrl: [
            detailImg1,
            detailImg2,
            detailImg3,
            detailImg4,
            detailImg5,
          ],
        },
      });
      if (res.data.success) {
        handleSuccessMessage(dispatch, res);
        closeProductModal();
        getProducts();
      }
    } catch (error) {
      handleErrorMessage(dispatch, error);
    }
  };
  return (
    <div
      className='modal fade'
      tabIndex='-1'
      id='productModal'
      aria-labelledby='productModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='productModalLabel'>
              {type === 'create' ? '建立新商品' : `編輯 ${tempData.title}`}
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={closeProductModal}
            />
          </div>
          <div className='modal-body'>
            <form onSubmit={handleSubmit(submit)} className='row'>
              <div className='col-12'>
                <div className='form-group mb-3'>
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
                  <div className='form-group mb-3 col-md-6'>
                    <Selectbox
                      Controller={Controller}
                      control={control}
                      data={categoryList}
                      labelText='分類*'
                      id='category'
                      placeholder='請輸入分類'
                      rules={{
                        required: {
                          value: true,
                          message: '分類為必填',
                        },
                      }}
                    />
                  </div>
                  <div className='form-group mb-3 col-md-6'>
                    <Input
                      register={register}
                      errors={errors}
                      id='unit'
                      type='unit'
                      labelText='單位*'
                      placeholder='請輸入單位'
                      rules={{
                        required: {
                          value: true,
                          message: '單位為必填',
                        },
                      }}
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='form-group mb-3 col-md-6'>
                    <Input
                      register={register}
                      errors={errors}
                      id='origin_price'
                      type='number'
                      labelText='原價*'
                      placeholder='請輸入原價'
                      rules={{
                        required: {
                          value: true,
                          message: '原價為必填',
                        },
                        valueAsNumber: {
                          value: true,
                          message: '請輸入數值',
                        },
                      }}
                    />
                  </div>
                  <div className='form-group mb-3 col-md-6'>
                    <Input
                      register={register}
                      errors={errors}
                      id='price'
                      type='number'
                      labelText='售價*'
                      placeholder='請輸入售價'
                      rules={{
                        required: {
                          value: true,
                          message: '售價為必填',
                        },
                        validate: validatePrice,
                        valueAsNumber: {
                          value: true,
                          message: '請輸入數值',
                        },
                      }}
                    />
                  </div>
                </div>

                <div className='form-group mb-3'>
                  <Textarea
                    register={register}
                    errors={errors}
                    labelText='產品描述'
                    id='description'
                    placeholder='請輸入產品描述'
                    rowNum={2}
                  />
                </div>
                <div className='form-group mb-3'>
                  <Textarea
                    register={register}
                    errors={errors}
                    labelText='說明內容'
                    id='content'
                    placeholder='請輸入產品說明內容'
                    rowNum={4}
                  />
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
                  <hr />
                </div>
              </div>
              <div className='col-12'>
                <div className='row'>
                  <div className='col-md-4 col-sm-6 mb-3'>
                    <div className='form-group mb-2'>
                      <Input
                        register={register}
                        errors={errors}
                        id='imageUrl'
                        type='text'
                        labelText='主圖網址*'
                        placeholder='請輸入圖片連結'
                        rules={{
                          required: {
                            value: true,
                            message: '主圖網址為必填',
                          },
                        }}
                        onChange={(e) =>
                          setTempData((pre) => ({
                            ...pre,
                            imageUrl: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <UploadImg
                      id='imageUrl'
                      property='mainImg'
                      setValue={setValue}
                      imgUrl={imageUrl}
                    />
                  </div>
                  <div className='col-md-4 col-sm-6 mb-3'>
                    <div className='form-group mb-2'>
                      <Input
                        register={register}
                        errors={errors}
                        id='detailImg1'
                        type='text'
                        labelText='細圖 1 網址'
                        placeholder='請輸入圖片連結'
                        onChange={(e) =>
                          setTempData((pre) => ({
                            ...pre,
                            detailImg1: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <UploadImg
                      id='detailImg1'
                      property='detailImg1'
                      setValue={setValue}
                      imgUrl={detailImg1}
                    />
                  </div>
                  <div className='col-md-4 col-sm-6 mb-3'>
                    <div className='form-group mb-2'>
                      <Input
                        register={register}
                        errors={errors}
                        id='detailImg2'
                        type='text'
                        labelText='細圖 2 網址'
                        placeholder='請輸入圖片連結'
                        onChange={(e) =>
                          setTempData((pre) => ({
                            ...pre,
                            detailImg2: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <UploadImg
                      id='detailImg2'
                      property='detailImg2'
                      setValue={setValue}
                      imgUrl={detailImg2}
                    />
                  </div>
                  <div className='col-md-4 col-sm-6 mb-3'>
                    <div className='form-group mb-2'>
                      <Input
                        register={register}
                        errors={errors}
                        id='detailImg3'
                        type='text'
                        labelText='細圖 3 網址'
                        placeholder='請輸入圖片連結'
                        onChange={(e) =>
                          setTempData((pre) => ({
                            ...pre,
                            detailImg3: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <UploadImg
                      id='detailImg3'
                      property='detailImg3'
                      setValue={setValue}
                      imgUrl={detailImg3}
                    />
                  </div>
                  <div className='col-md-4 col-sm-6 mb-3'>
                    <div className='form-group mb-2'>
                      <Input
                        register={register}
                        errors={errors}
                        id='detailImg4'
                        type='text'
                        labelText='細圖 4 網址'
                        placeholder='請輸入圖片連結'
                        onChange={(e) =>
                          setTempData((pre) => ({
                            ...pre,
                            detailImg4: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <UploadImg
                      id='detailImg4'
                      property='detailImg4'
                      setValue={setValue}
                      imgUrl={detailImg4}
                    />
                  </div>
                  <div className='col-md-4 col-sm-6 mb-3'>
                    <div className='form-group mb-2'>
                      <Input
                        register={register}
                        errors={errors}
                        id='detailImg5'
                        type='text'
                        labelText='細圖 5 網址'
                        placeholder='請輸入圖片連結'
                        onChange={(e) =>
                          setTempData((pre) => ({
                            ...pre,
                            detailImg5: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <UploadImg
                      id='detailImg5'
                      property='detailImg5'
                      setValue={setValue}
                      imgUrl={detailImg5}
                    />
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={closeProductModal}
                >
                  關閉
                </button>
                <button type='submit' className='btn btn-primary'>
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

export default ProductModal;
