import axios from 'axios';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input, Textarea, CheckboxRadio, Selectbox } from './FormElement';
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from '../store/messageStore';

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
    }),
    []
  );
  const [tempData, setTempData] = useState(initData);
  const [uploadImgMsg, setUploadImgMsg] = useState('');
  const [uploadImgVal, setUploadImgVal] = useState('');

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
  const imageUrl = watch('imageUrl');
  const originPrice = watch('origin_price');
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
      console.log('create', tempData);
    } else if (type === 'edit') {
      setTempData((pre) => ({ ...pre, ...tempProduct }));
    }
    setUploadImgMsg('');
    setUploadImgVal('');
  }, [type, tempProduct, initData]);

  useEffect(() => {
    const resetForm = () => {
      reset(tempData);
    };
    resetForm();
  }, [tempData, reset]);

  const uploadImg = async (e) => {
    setUploadImgVal(e.target.value);
    const file = e.target.files[0]; // 取得選定的檔案資訊
    const formData = new FormData(); // 建立FormData
    formData.append('file', file); // 將選定的檔案加入到FormData中
    if (file.type.split('/')[0] !== 'image') {
      setUploadImgMsg('格式錯誤，請選擇 jpg 或 png 檔');
      return;
    }
    try {
      setUploadImgMsg('上傳中...');
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/upload`,
        formData, // 傳送FormData
        {
          headers: {
            'Content-Type': 'multipart/form-data', // 設定Content-Type
          },
        }
      );
      if (res.data.success) {
        setValue('imageUrl', res.data.imageUrl);
        // setTempData((pre) => ({
        //   ...pre,
        //   uploadImg: e.target.value,
        //   imageUrl: res.data.imageUrl,
        // }));
        setUploadImgMsg('上傳成功');
      }
    } catch (error) {
      console.log(error);
      setUploadImgMsg('上傳失敗，請檢查檔案是否過大');
    }
  };
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
        data: data,
      });
      if (res.data.success) {
        handleSuccessMessage(dispatch, res);
        closeProductModal();
        getProducts();
      }
    } catch (error) {
      console.log(error);
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
              <div className='col-sm-4'>
                <div className='form-group mb-3'>
                  <Input
                    register={register}
                    errors={errors}
                    id='imageUrl'
                    type='text'
                    labelText='輸入圖片網址*'
                    placeholder='請輸入圖片連結'
                    rules={{
                      required: {
                        value: true,
                        message: '圖片網址為必填',
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

                <div className='form-group mb-3'>
                  <label className='w-100' htmlFor='customFile'>
                    或 上傳圖片
                    <input
                      type='file'
                      id='customFile'
                      className='form-control mb-2'
                      value={uploadImgVal}
                      onChange={uploadImg}
                    />
                  </label>
                  <p className='text-muted'>{uploadImgMsg}</p>
                </div>
                <img
                  className={imageUrl ? 'img-fluid' : 'd-none'}
                  src={imageUrl}
                  alt='product_mainImg'
                />
                <img src='' alt='' className='img-fluid' />
              </div>
              <div className='col-sm-8'>
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
                <hr />
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
